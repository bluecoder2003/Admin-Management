import React, { useState } from "react";
import { X } from "lucide-react";
import { useRoles } from "@/hooks/queries/useGetRolesQuery";
import useUpdateUserMutation, {
  UserResponse,
} from "@/hooks/mutations/useUpdateUserMutation";

interface EditUserModalProps {
  title: string;
  user: {
    user_id: number;
    user_name: string;
    email: string;
    role_id: number;
    status: string;
  };
  onClose: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  title,
  user,
  onClose,
  // onSave,
}) => {
  const [editedUser, setEditedUser] = useState<UserResponse>({
    id: user.user_id,
    name: user.user_name,
    email: user.email,
    role_id: user.role_id,
    status: user.status,
  });

  const { data: availableRoles } = useRoles();
  const updateUser = useUpdateUserMutation();

  const handleSave = async () => {
    try {
      await updateUser.mutate(
        {
          id: editedUser.id,
          user: {
            name: editedUser.name,
            email: editedUser.email,
            role_id: editedUser.role_id,
            status: editedUser.status,
          },
        },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const availableStatuses = ["Active", "Inactive"];
  const handleInputChange = (
    field: keyof UserResponse,
    value: string | number
  ) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getRoleButtonClass = (role: number) => {
    const baseClass =
      "px-3 py-1 rounded-full text-sm font-medium transition-colors";
    if (editedUser.role_id === role) {
      switch (role) {
        default:
          return `${baseClass} bg-gray-800 text-white`;
      }
    }
    return `${baseClass} bg-gray-800 text-white hover:bg-gray-700`;
  };

  const getStatusButtonClass = (status: string) => {
    const baseClass =
      "px-3 py-1 rounded-full text-sm font-medium transition-colors";
    if (editedUser.status === status) {
      return status === "Active"
        ? `${baseClass} bg-[#252235] text-green-800`
        : `${baseClass} bg-[#252235] text-red-800`;
    }
    return `${baseClass} bg-[#252235] text-white`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-product-leftnav rounded-lg p-6 w-full max-w-md relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-product-text1">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#252235] rounded-full"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-product-text1 mb-1">
              Name
            </label>
            <input
              type="text"
              value={editedUser.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full p-2 bg-product-leftnav border rounded-md border-product-border2 focus:border-product-border1 focus:outline-none"
              placeholder="Enter user name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-product-text1 mb-1">
              Email
            </label>
            <input
              type="email"
              value={editedUser.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`w-full p-2 bg-product-leftnav border rounded-md border-product-border2 focus:border-product-border1 focus:outline-none ${
                editedUser.email && !validateEmail(editedUser.email)
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
              placeholder="Enter email address"
            />
            {editedUser.email && !validateEmail(editedUser.email) && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid email address
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-product-text1 mb-2">
              Role
            </label>
            <div className="flex flex-wrap gap-2">
              {availableRoles?.map((role) => (
                <button
                  key={role.id}
                  onClick={() => {
                    handleInputChange("role_id", role.id);
                  }}
                  className={getRoleButtonClass(role.id)}
                >
                  {role.name}
                  {editedUser.role_id === role.id && (
                    <span className="ml-1">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-product-text1mb-2">
              Status
            </label>
            <div className="flex flex-wrap gap-2">
              {availableStatuses?.map((status) => (
                <button
                  key={status}
                  onClick={() => handleInputChange("status", status)}
                  className={getStatusButtonClass(status)}
                >
                  {status}
                  {editedUser.status === status && (
                    <span className="ml-1">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-product-border1 rounded-lg hover:text-purple-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-product-border1"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;