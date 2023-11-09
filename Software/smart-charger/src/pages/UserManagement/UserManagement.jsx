import React, { useEffect, useState } from "react";
import {
  UserManagementTitleWrapper,
  UserManagementTitle,
  UserTable,
  UserTableRow,
  UserTableHeader,
  UserTableCell,
  UserTableBody,
  UserTableHead,
  UserTableCellButton,
  UserTableRole,
  UserTableRoleOption,
} from "./UserManagementStyles";
import {
  changeUserRole,
  getAllRoles,
  getAllUsers,
} from "../../utils/api/users";

export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const asyncCall = async () => {
      const userData = await getAllUsers();
      setUsers(userData);
      const roleData = await getAllRoles();
      setRoles(roleData);
    };

    asyncCall();
  }, []);

  const handleRoleChange = async (userId, newRoleId) => {
    await changeUserRole();
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, roleId: newRoleId } : user
      )
    );
  };

  return (
    <>
      <UserManagementTitleWrapper>
        <UserManagementTitle>User Management</UserManagementTitle>
      </UserManagementTitleWrapper>
      <UserTable>
        <UserTableHead>
          <UserTableRow>
            <UserTableHeader>Full name</UserTableHeader>
            <UserTableHeader>Email</UserTableHeader>
            <UserTableHeader>Role</UserTableHeader>
            <UserTableHeader>Active</UserTableHeader>
          </UserTableRow>
        </UserTableHead>
        <UserTableBody>
          {users.map((user, index) => (
            <UserTableRow key={index}>
              <UserTableCell>
                {user.firstName} {user.lastName}
              </UserTableCell>
              <UserTableCell>{user.email}</UserTableCell>
              <UserTableCell>
                <UserTableRole
                  defaultValue={user.roleId}
                  onChange={(e) =>
                    handleRoleChange(user.id, parseInt(e.target.value))
                  }
                >
                  {roles.map((role) => (
                    <UserTableRoleOption key={role.id} value={role.id}>
                      {role.name}
                    </UserTableRoleOption>
                  ))}
                </UserTableRole>
              </UserTableCell>
              <UserTableCellButton>
                {user.active ? "Deactivate" : "Activate"}
              </UserTableCellButton>
            </UserTableRow>
          ))}
        </UserTableBody>
      </UserTable>
    </>
  );
};
