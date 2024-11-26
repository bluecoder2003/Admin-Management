import React, { useState, useMemo, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/Table';
import { Pencil, Trash2 } from 'lucide-react';
import { Role } from '@/types/roles.type';
import EditRolesModal from '@/components/roles/EditRolesModal';
import { RolesTableProps } from '@/types/roles.type';
import { useRoles } from '@/hooks/queries/useGetRolesQuery';

const RolesTable: React.FC<RolesTableProps> = ({ searchQuery }) => {
  const { data: rolesData, isLoading, error } = useRoles(); // Ensure we handle loading state
  const [roles, setRoles] = useState<Role[]>([]); // Start with an empty array
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  // Sync `roles` state with `rolesData` once it loads
  useEffect(() => {
    if (rolesData) {
      setRoles(rolesData as Role[]);
    }
  }, [rolesData]);

  const filteredRoles = useMemo(() => {
    const query = (searchQuery || '').toLowerCase().trim();

    if (!query) return roles;

    return roles.filter((role) => {
      return (
        role.name.toLowerCase().includes(query) ||
        role.description.toLowerCase().includes(query) ||
        role.permissions.some((permission) =>
          permission.toLowerCase().includes(query)
        ) ||
        role.id.toString().includes(query)
      );
    });
  }, [roles, searchQuery]);

  const getPermissionColor = (permission: string) => {
    switch (permission) {
      case 'Read':
        return 'bg-green-100 text-green-800';
      case 'Write':
        return 'bg-blue-100 text-blue-800';
      case 'Delete':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter((role) => role.id !== id));
    }
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);
  };

  const handleSave = (editedRole: Role) => {
    setRoles(
      roles.map((role) => (role.id === editedRole.id ? editedRole : role))
    );
    setEditingRole(null);
  };

  if (isLoading) {
    return <p>Loading roles...</p>;
  }

  if (error) {
    // Type guard to check if error is an instance of Error
    if (error instanceof Error) {
      return <p>Error loading roles: {error.message}</p>;
    } else {
      return <p>Unexpected error occurred</p>;
    }
  }

  if (!roles || roles.length === 0) {
    return <p>No roles available.</p>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">ID</TableHead>
            <TableHead className="w-48">Role Name</TableHead>
            <TableHead className="w-64">Permissions</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRoles?.map((role) => (
            <TableRow key={role.id}>
              <TableCell className="font-medium">{role.id}</TableCell>
              <TableCell>{role.name}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission) => (
                    <span
                      key={permission}
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getPermissionColor(
                        permission
                      )}`}
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>{role.description}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(role)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Edit role"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(role.id)}
                    className="p-1 hover:bg-red-100 rounded-full transition-colors text-red-600"
                    aria-label="Delete role"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingRole && (
        <EditRolesModal
          title="Edit Role"
          role={editingRole}
          onClose={() => setEditingRole(null)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default RolesTable;
