import { useMutation } from "react-query";
import { ENDPOINTS } from "@/utils/api.config";
import { client } from "@/utils/client";

export interface UserRequest {
  name: string;
  email: string;
  role_id: number;
  status: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  role_id: number;
  status: string;
}

export default function useUpdateUserMutation() {
  return useMutation<UserResponse, Error, { id: number; user: UserRequest }>(
    async ({ id, user }) => {
      const response = await client
        .put(`${ENDPOINTS.UPDATE_USER}/${id}`, { json: user })
        .json<UserResponse>();
      return response;
    }
  );
}