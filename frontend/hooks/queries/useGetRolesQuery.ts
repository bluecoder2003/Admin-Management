import { useQuery } from 'react-query';
import { client } from '@/utils/client';
import { ENDPOINTS } from '@/utils/api.config';
import { Role } from '@/types/roles.type';

export const useRoles = () => {
  return useQuery<Role[]>({
    queryKey: ['roles'],
    queryFn: async () => {
      try {
        const response = await client.get(ENDPOINTS.GET_ROLES).json<Role[]>();
        return response;
      } catch (error) {
        console.error('Failed to fetch roles:', error);
        if (error instanceof Error) {
          throw new Error(`Failed to fetch roles: ${error.message}`);
        }
        throw new Error('Failed to fetch roles. Please try again later.');
      }
    },
  });
};