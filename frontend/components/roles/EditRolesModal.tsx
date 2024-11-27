import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Role } from '@/types/roles.type';

interface EditModalProps {
  title: string;
  role: Role;
  onClose: () => void;
  onSave: (editedRole: Role) => void;
}


const EditModal: React.FC<EditModalProps> = ({ title, role, onClose, onSave }) => {
  const [editedRole, setEditedRole] = useState<Role>({ ...role });
  const availablePermissions = ['Read', 'Write', 'Delete'];

  const handlePermissionToggle = (permission: string) => {
    setEditedRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-product-leftnav rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-[#252235] rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Role Name</label>
            <input
              type="text"
              value={editedRole.name}
              onChange={e => setEditedRole(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 bg-product-leftnav border rounded-md border-product-border2 focus:border-product-border1 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={editedRole.description}
              onChange={e => setEditedRole(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 bg-product-leftnav border rounded-md border-product-border2 focus:border-product-border1 focus:outline-none"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Permissions</label>
            <div className="flex flex-wrap gap-2">
              {availablePermissions.map(permission => (
                <button
                  key={permission}
                  onClick={() => handlePermissionToggle(permission)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    editedRole.permissions.includes(permission)
                      ? 'bg-product-border1 text-product-text1'
                      : 'bg-product-text3 text-gray-800'
                  }`}
                >
                  {permission}
                  {editedRole.permissions.includes(permission) ? ' ✓' : ''}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-product-border1 rounded-lg hover:text-purple-300"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(editedRole)}
            className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-product-border1"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;