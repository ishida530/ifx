import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../services/api';

type User = {
    id: number;
    name: string;
    email: string;
};

export const getUsers = async (): Promise<User[]> => {
    const response = await axiosInstance.get('/users');
    return response.data;
};

const useGetUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });
};

export default useGetUsers;
