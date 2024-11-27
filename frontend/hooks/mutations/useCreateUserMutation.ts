import { useMutation } from "react-query";
import { ENDPOINTS } from "@/utils/api.config";
import { client } from "@/utils/client";
export type UsersCreationRequestProps = {
  name: string;
  email: string;
  role_id: number;
  status: string; // Using a union type assuming these are the possible values
};
export type UserCreationResponse = {
  id: number;
  name: string;
  email: string;
  role_id: number;
  status: string;
};
export default function useCreateUserMutation() {
  return useMutation({
    mutationFn: async (user: UsersCreationRequestProps) => {
      const response = await client
        .post(ENDPOINTS.CREATE_USER, { json: user })
        .json<UserCreationResponse>();
      return response;
    },
  });
}