import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostType as Post } from '../types';
import { PostsAndUsersResponse } from './useGetPostsAndUsers';
import { sampleUser } from '../../../utils/utils';

const addPostSimulation = (newPost: Post) => {
    return Promise.resolve(newPost);
};

const useAddPost = () => {
    const queryClient = useQueryClient();

    const { data, status, mutate } = useMutation<Post, Error, { title: string; body: string; userId: number, id: number }>({
        mutationFn: ({ title, body, userId, id }) => addPostSimulation({ title, body, userId, id }),

        onMutate: async (variables) => {
            const newPost = await addPostSimulation(variables);

            const previousData = queryClient.getQueryData<PostsAndUsersResponse>(['postsAndUsers']) || { posts: [], users: [] };

            console.log('Previous Data:', previousData);

            queryClient.setQueryData(['postsAndUsers'], {
                posts: [newPost, ...previousData.posts],
                users: [sampleUser, ...previousData.users]
            });

            return { previousData };
        },

        onSuccess: (data) => {
            console.log('Post added successfully.', data);
        },

        onError: (error) => {
            console.log('error', error);
        },
    });

    return {
        mutate,
        data,
        isError: status === 'error',
        isLoading: status === 'pending',
    };
};

export default useAddPost;
