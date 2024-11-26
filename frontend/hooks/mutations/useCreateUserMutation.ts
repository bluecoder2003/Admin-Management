import { useMutation } from 'react-query'
import { ENDPOINTS } from '@/utils/api.config';
import { client } from '@/utils/client';
import { User } from '@/types/users.type';

export default function useCreateUserMutation() {

  return useMutation(
    {
        mutationFn: async (user:User) => {
            const response = await client.post(ENDPOINTS.CREATE_USER,{json:user}).json<User>();
            return response;
            
        }
    }
  )
}
