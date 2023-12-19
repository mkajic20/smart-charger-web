import styled from "styled-components";
import { colors } from "../../utils/styles/theme";

export const UserManagementTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
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
  font-size: 18px;
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

  appearance: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23fff' width='18px' height='18px'%3E%3Cpath d='M24 24H0V0h24v24z' fill='none' opacity='.87'/%3E%3Cpath d='M8.62 12.62L12 16l3.38-3.38L18 14l-6 6-6-6 1.62-1.62z'/%3E%3C/svg%3E")
    no-repeat right 8px center/12px;
`;

export const UserTableRoleOption = styled.option`
  background-color: ${colors.tableBackgroundPrimary};
  color: white;
  font-size: 16px;
  text-align: center;
  vertical-align: middle;

  &:hover {
    background-color: ${colors.bgPrimary};
    cursor: pointer;
  }
`;

export const PopupButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

export const UserManagementController = styled.div`
  width: 62vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 auto;
  padding-top: 20px;
`;

export const UserManagementControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
