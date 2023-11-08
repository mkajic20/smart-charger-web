import React from "react";
import {
  UserManagementTitleWrapper,
  UserManagementTitle,
  UserTable,
  UserTableRow,
  UserTableHeader,
  UserTableCell,
} from "./UserManagementStyles";

export const UserManagement = () => {
  return (
    <>
      <UserManagementTitleWrapper>
        <UserManagementTitle>User Management</UserManagementTitle>
      </UserManagementTitleWrapper>
      <UserTable>
        <UserTableRow>
          <UserTableHeader>Name</UserTableHeader>
          <UserTableHeader>Email</UserTableHeader>
          <UserTableHeader>Role</UserTableHeader>
          <UserTableHeader>Active</UserTableHeader>
        </UserTableRow>
        <UserTableRow>
          <UserTableCell>Marko</UserTableCell>
          <UserTableCell>marko@gmail.com</UserTableCell>
          <UserTableCell>Customer</UserTableCell>
          <UserTableCell>Active</UserTableCell>
        </UserTableRow>
        <UserTableRow>
          <UserTableCell>Ivan</UserTableCell>
          <UserTableCell>ivan@gmail.com</UserTableCell>
          <UserTableCell>Admin</UserTableCell>
          <UserTableCell>Active</UserTableCell>
        </UserTableRow>
      </UserTable>
    </>
  );
};
