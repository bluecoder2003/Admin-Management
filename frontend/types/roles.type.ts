export interface Role {
    id: number;
    name: string;
    permissions: string[];
    description: string;
  }

export interface RolesTableProps {
  searchQuery?: string;
}