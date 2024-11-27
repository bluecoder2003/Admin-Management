import React, { useState } from 'react';
import RolesTable from '../custom/RolesTable';
import { Role } from '@/types/roles.type';
import EditModal from './EditRolesModal';
import useCreateRoleMutation from '@/hooks/mutations/useCreateRoleMutation';

const Rolesmanagement = () => {
  const [addingRole, setAddingRole] = useState<Role | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const mutate = useCreateRoleMutation();
  const handleSave = async(addingRole:Role) => {
    try {
      await mutate.mutateAsync(addingRole);
      setAddingRole(null);
    } catch (error) {
      console.error('Error adding role:', error);
    }
  };

  return (
    <div className='w-full'>
      <div className='h-10 '></div>
      <div className="flex justify-between py-10">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8 pr-4 py-2 bg-product-leftnav border rounded-md border-product-border2 focus:border-product-border1 focus:outline-none"
        />
        <button
          className="bg-product-leftnav border border-product-border1 text-product-border1 px-4 py-2 rounded-md"
          onClick={() => setAddingRole({ id: Date.now(), name: '', description: '', permissions: [] })}
        >
          + Add
        </button>
      </div>
      <RolesTable searchQuery={searchQuery} />
      {addingRole && (
        <EditModal
          title="Add Role"
          role={addingRole}
          onClose={() => setAddingRole(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Rolesmanagement;