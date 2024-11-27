export interface User {
  user_id: number;
  user_name: string;
  email: string;
  status: string;
  role_name: string;
  role_id: number;
}

export interface UsersTableProps {
  searchQuery?: string;
}