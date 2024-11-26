export interface User {
  name: string;
  email: string;
  role_id: number;
  status: string;
}

export interface UsersTableProps {
  searchQuery?: string;
}