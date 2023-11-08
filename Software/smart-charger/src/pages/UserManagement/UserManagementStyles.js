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

export const UserTableHeader = styled.th`
  padding: 5px;
  background-color: ${colors.tableHeader};
`;

export const UserTableRow = styled.tr`
  background-color: ${colors.tableBackgroundPrimary};
`;

export const UserTableCell = styled.td`
  color: white;
  padding: 5px;
  width: 20vw;
  text-align: center;
`;
