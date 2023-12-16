import React, { useEffect, useState } from "react";
import {
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
import { decodeToken } from "react-jwt";

export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [changedUser, setChangedUser] = useState(null);
  const [loggedUserId, setLoggedUserId] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const userData = await getAllUsers();
      setUsers(userData);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const asyncCall = async () => {
      const roleData = await getAllRoles();
      setRoles(roleData);

      const jwt = localStorage.getItem("jwt");
      const data = decodeToken(jwt);
      setLoggedUserId(data.userId);
    };

    asyncCall();
  }, []);

  const handleRoleChange = async (userId, newRoleId) => {
    await changeUserRole(userId, newRoleId);
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
      <UserManagementTitle>User Management</UserManagementTitle>
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
                {user.id == loggedUserId ? (
                  <>{roles.find((role) => role.id === user.roleId)?.name}</>
                ) : (
                  <>
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
                  </>
                )}
              </UserTableCell>
              {user.id == loggedUserId ? (
                <>
                  <UserTableCell>Active</UserTableCell>
                </>
              ) : (
                <>
                  <UserTableCellButton
                    onClick={() => {
                      setChangedUser(user.id);
                    }}
                  >
                    {user.active ? "Deactivate" : "Activate"}
                  </UserTableCellButton>
                </>
              )}
            </UserTableRow>
          ))}
        </UserTableBody>
      </UserTable>
      {changedUser !== null && (
        <PopupWindow
          title={
            users.find((user) => user.id === changedUser).active
              ? "Deactivate User?"
              : "Activate User?"
          }
          text={`Are you sure you want to ${
            users.find((user) => user.id === changedUser).active
              ? "deactivate"
              : "activate"
          } user ${users.find((user) => user.id === changedUser).firstName} ${
            users.find((user) => user.id === changedUser).lastName
          }?`}
          onClose={() => {
            setChangedUser(null);
          }}
        >
          <PopupButtonWrapper>
            <Button
              buttonText="Yes"
              onClick={async () => {
                await changeActivation(changedUser);
                setChangedUser(null);
              }}
            />
            <Button
              buttonText="No"
              onClick={() => {
                setChangedUser(null);
              }}
            />
          </PopupButtonWrapper>
        </PopupWindow>
      )}
    </>
  );
};
