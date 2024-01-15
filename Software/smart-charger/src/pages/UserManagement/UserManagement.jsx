import React, { useEffect, useState } from "react";
import { UserTableRole, UserTableRoleOption } from "./UserManagementStyles";
import {
  changeUserActivation,
  changeUserRole,
  getAllRoles,
  getAllUsers,
} from "../../utils/api/users";
import PopupWindow from "../../components/PopupWindow/PopupWindow";
import Button from "../../components/Button/Button";
import Search from "../../components/Search/Search";
import Pagination from "../../components/Pagination/Pagination";
import { decodeToken } from "react-jwt";
import {
  Control,
  Controller,
  Table,
  TableBody,
  TableCell,
  TableCellButton,
  TableHead,
  TableHeader,
  TableRow,
  Title,
  PopupButtonWrapper,
} from "../../utils/styles/generalStyles";

export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [changedUser, setChangedUser] = useState(null);
  const [loggedUserId, setLoggedUserId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pages, setPages] = useState(0);

  const fetchUsers = async () => {
    const userData = await getAllUsers(currentPage, pageSize, searchTerm);
    setPages(userData.totalPages);
    setUsers(userData.users);
  };

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, currentPage]);

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
    const currentUser = users.find((user) => user.id === userId);

    if (currentUser.roleId != newRoleId) {
      await changeUserRole(userId, newRoleId);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, roleId: newRoleId } : user
        )
      );
    }
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
      <Title>User Management</Title>
      <Controller>
        <Control></Control>
        <Control>
          <Pagination
            pages={pages}
            currentPage={currentPage}
            prevCall={async () => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
                await fetchUsers();
              }
            }}
            firstCall={async () => {
              setCurrentPage(1);
              await fetchUsers();
            }}
            nextCall={async () => {
              if (currentPage < pages) {
                setCurrentPage(currentPage + 1);
                await fetchUsers();
              }
            }}
            lastCall={async () => {
              setCurrentPage(pages);
              await fetchUsers();
            }}
            withSelect
            onSelectChange={async (size) => {
              setPageSize(size);
              setCurrentPage(1);
              await fetchUsers();
            }}
          />
        </Control>
        <Control>
          <Search
            placeholder="Search"
            onCancel={() => {
              setCurrentPage(1);
              setSearchTerm("");
            }}
            search={(term) => {
              setCurrentPage(1);
              setSearchTerm(term);
            }}
            showCancel={searchTerm.trim().length > 0}
          />
        </Control>
      </Controller>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Full name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Role</TableHeader>
            <TableHeader>Active</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
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
              </TableCell>
              {user.id == loggedUserId ? (
                <>
                  <TableCell>Active</TableCell>
                </>
              ) : (
                <>
                  <TableCellButton
                    onClick={() => {
                      setChangedUser(user.id);
                    }}
                  >
                    {user.active ? "Deactivate" : "Activate"}
                  </TableCellButton>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
