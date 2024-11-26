import { useMutation } from 'react-query'
import { ENDPOINTS } from '@/utils/api.config'
import { client } from '@/utils/client'
import { User } from '@/types/users.type'

export default function useUpdateRoleMutation() {
  return useMutation({
    mutationFn: async (user: User & { id: number }) => {
      const response = await client
        .put(`${ENDPOINTS.UPDATE_ROLE}/${user.id}`, { json: user })
        .json<User>()
      return response
    },
    onError: (error: Error) => {
      console.error("Error updating role:", error)
    },
    onSuccess: (data: User) => {
      console.log("User updated successfully:", data)
    }
  })
}
