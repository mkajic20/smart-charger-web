import styled from "styled-components";
import { colors } from "../../utils/styles/theme";

export const CardManagementTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  color: white;
`;

export const CardTable = styled.table`
  margin: 0 auto;
  margin-top: 30px;
`;

export const CardTableHead = styled.thead``;

export const CardTableBody = styled.tbody``;

export const CardTableHeader = styled.th`
  padding: 5px;
  background-color: ${colors.tableHeader};
  font-size: 18px;
`;

export const CardTableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${colors.tableBackgroundSecondary};
  }
  &:nth-child(odd) {
    background-color: ${colors.tableBackgroundPrimary};
  }
`;

export const CardTableCell = styled.td`
  color: white;
  padding: 5px;
  width: 20vw;
  text-align: center;
`;

export const CardTableCellButton = styled.td`
  color: white;
  padding: 5px;
  width: 20vw;
  text-align: center;
  &:hover {
    background-color: ${colors.bgPrimary};
    cursor: pointer;
  }
`;
