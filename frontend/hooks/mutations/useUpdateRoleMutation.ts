import { useMutation } from 'react-query'
import { Role } from '@/types/roles.type'
import { ENDPOINTS } from '@/utils/api.config'
import { client } from '@/utils/client'

export default function useUpdateRoleMutation() {
  return useMutation({
    mutationFn: async (role: Role & { id: number }) => {
      const response = await client
        .put(`${ENDPOINTS.UPDATE_ROLE}/${role.id}`, { json: role })
        .json<Role>()
      return response
    },
    onError: (error: Error) => {
      console.error("Error updating role:", error)
    },
    onSuccess: (data: Role) => {
      console.log("Role updated successfully:", data)
    }
  })
}
