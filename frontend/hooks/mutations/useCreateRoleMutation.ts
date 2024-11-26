import { useMutation } from 'react-query'
import { Role } from '@/types/roles.type';
import { ENDPOINTS } from '@/utils/api.config';
import { client } from '@/utils/client';

export default function useCreateRoleMutation() {

  return useMutation(
    {
        mutationFn: async (role:Role) => {
            const response = await client.post(ENDPOINTS.CREATE_ROLE,{json:role}).json<Role>();
            return response;
            
        }
    }
  )
}
