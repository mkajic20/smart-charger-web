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
  PopupButtonWrapper,
} from "./UserManagementStyles";
import {
  changeUserActivation,
  changeUserRole,
  getAllRoles,
  getAllUsers,
} from "../../utils/api/users";
import PopupWindow from "../../components/PopupWindow/PopupWindow";
import Button from "../../components/Button/Button";

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

  const changeActivation = async (userId) => {
    await changeUserActivation(userId);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, active: !user.active } : user
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
              <UserTableCellButton onClick={() => {}}>
                {user.active ? "Deactivate" : "Activate"}
              </UserTableCellButton>
            </UserTableRow>
          ))}
        </UserTableBody>
      </UserTable>
      <PopupWindow
        title="Are you sure"
        text="Are you sure you want to activate user"
      >
        <PopupButtonWrapper>
          <Button buttonText="Yes" />
          <Button buttonText="No" />
        </PopupButtonWrapper>
      </PopupWindow>
    </>
  );
};
