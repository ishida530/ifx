import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../services/api';
import { User } from '../../user/types';
import { PostType as Post } from '../types';


export type PostsAndUsersResponse = {
    users: User[];
    posts: Post[];
};

const getPosts = async (): Promise<Post[]> => {
    const response = await axiosInstance.get('/posts');
    return response.data;
};

const getUsers = async (): Promise<User[]> => {
    const response = await axiosInstance.get('/users');
    return response.data;
};

const useGetPostsAndUsers = () => {
    const { data, error, isLoading } = useQuery<PostsAndUsersResponse, Error>({
        queryKey: ['postsAndUsers'],
        queryFn: async () => {
            const [posts, users] = await Promise.all([getPosts(), getUsers()]);
            return { posts, users };
        },
        staleTime: 300000,
    });

    return {
        users: data ? data.users : [],
        posts: data ? data.posts : [],
        error,
        isLoading,
    };
};


export default useGetPostsAndUsers;
