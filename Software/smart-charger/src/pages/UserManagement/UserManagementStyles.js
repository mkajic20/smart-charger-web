import styled from "styled-components";
import { colors } from "../../utils/styles/theme";

export const UserManagementTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

export const UserManagementTitle = styled.h1`
  color: white;
`;

export const UserTable = styled.table`
  margin: 0 auto;
  margin-top: 30px;
`;

export const UserTableHead = styled.thead``;

export const UserTableBody = styled.tbody``;

export const UserTableHeader = styled.th`
  padding: 5px;
  background-color: ${colors.tableHeader};
`;

export const UserTableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${colors.tableBackgroundSecondary};
  }
  &:nth-child(odd) {
    background-color: ${colors.tableBackgroundPrimary};
  }
`;

export const UserTableCell = styled.td`
  color: white;
  padding: 5px;
  width: 20vw;
  text-align: center;
`;

export const UserTableCellButton = styled.td`
  color: white;
  padding: 5px;
  width: 20vw;
  text-align: center;
  &:hover {
    background-color: ${colors.bgPrimary};
    cursor: pointer;
  }
`;

export const UserTableRole = styled.select`
  padding: 5px;
  width: 100%;
  background: transparent;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  text-align: center;
`;

export const UserTableRoleOption = styled.option`
  background-color: ${colors.tableBackgroundPrimary};
  color: white;
  font-size: 16px;
  text-align: center;
  vertical-align: middle;
`;
