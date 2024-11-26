import { useQuery } from 'react-query';
import { client } from '@/utils/client';
import { ENDPOINTS } from '@/utils/api.config';
import { User } from '@/types/users.type';

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const response = await client.get(ENDPOINTS.GET_USERS).json<User[]>();
        return response;
      } catch (error) {
        console.error('Failed to fetch users:', error);
        if (error instanceof Error) {
          throw new Error(`Failed to fetch users: ${error.message}`);
        }
        throw new Error('Failed to fetch users. Please try again later.');
      }
    },
  });
};