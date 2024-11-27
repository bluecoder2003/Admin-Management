import { useMutation } from 'react-query'
import { ENDPOINTS } from '@/utils/api.config'
import { client } from '@/utils/client'

export interface UserRequest
{
  name: string,
  email: string,
  role_id: number,
  status: string
}

export interface UserResponse
{
    id:number ,
    name: string,
    email: string,
    role_id: number,
    status: string
}


export default function useUpdateUserMutation(user: UserRequest,id:number) {
  return useMutation<UserResponse, Error, UserRequest, unknown>(async () => {
    const response = await client
      .put(`${ENDPOINTS.UPDATE_USER}/${id}`, { json: user })
      .json<UserResponse>()
    return response
    },
  )
}
