import React, { useState } from "react";
import UsersTable from "../custom/UsersTable";
import useCreateUserMutation, {
  UserCreationResponse,
  UsersCreationRequestProps,
} from "@/hooks/mutations/useCreateUserMutation";
import AddUserModal from "./AddedUserModal";

const UserManagement = () => {
  const [addingUser, setAddingUser] = useState<UserCreationResponse | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const mutate = useCreateUserMutation();
  const handleSave = async (addingUser: UsersCreationRequestProps) => {
    try {
      await mutate.mutateAsync(addingUser);
      setAddingUser(null);
    } catch (error) {
      console.error("Error adding role:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="border-b border-product-border2 h-10"></div>
      <div className="flex justify-between py-10">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8 pr-4 py-2 rounded-md bg-product-leftnav border border-product-border2 focus:border-product-border1 focus:outline-none"
        />
        <button
          className="bg-product-leftnav border border-product-border1 text-product-border1 px-4 py-2 rounded-md"
          onClick={() =>
            setAddingUser({
              id: 0,
              name: "",
              email: "",
              role_id: 0,
              status: "",
            })
          }
        >
          + Add
        </button>
      </div>
      <UsersTable searchQuery={searchQuery} />
      {addingUser && (
        <AddUserModal
          title="Add User"
          user={addingUser}
          onClose={() => setAddingUser(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default UserManagement;