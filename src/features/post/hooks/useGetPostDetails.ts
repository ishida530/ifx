import { useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../../services/api';
import { User } from '../../user/types';
import { PostType as Post } from '../types';
import { PostsAndUsersResponse } from './useGetPostsAndUsers';

const getPost = async (postId: number): Promise<Post> => {
    const response = await axiosInstance.get(`/posts/${postId}`);
    return response.data;
};

const getUser = async (userId: number): Promise<User> => {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
};

interface PostDetailsData {
    post: Post;
    user: User | null;
}

const useGetPostDetails = (postId: number) => {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery<PostDetailsData, Error>({
        queryKey: ['post', postId],
        queryFn: async () => {
            try {
                const post = await getPost(postId);
                const user = await getUser(post.userId);
                return { post, user };
            } catch (err) {
                const cachedData = queryClient.getQueryData<PostsAndUsersResponse>(['postsAndUsers']);
                if (cachedData) {
                    const flatPosts = Array.isArray(cachedData.posts?.flat)
                        ? cachedData.posts.flat()
                        : cachedData.posts;

                    const numericPostId = Number(postId);
                    const cachedPost = flatPosts.find(post => post.id === numericPostId);
                    const cachedUser = cachedData.users.find(user => user.id === cachedPost?.userId);

                    if (cachedPost) {
                        return { post: cachedPost, user: cachedUser || null };
                    } else {
                        console.error('Brak posta w cache!');
                        throw err;
                    }
                }

                throw err;
            }
        },
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });

    return {
        post: data?.post,
        user: data?.user,
        error,
        isLoading,
    };
};

export default useGetPostDetails;
