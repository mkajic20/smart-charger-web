import styled from "styled-components";
import { colors } from "../../utils/styles/theme";

export const CardManagementTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  color: white;
`;

export const CardManagementController = styled.div`
  width: 62vw;
  display: grid;
  grid-template-columns: auto auto auto;
  margin: 0 auto;
  padding-top: 20px;
`;

export const CardManagementControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  padding: 7px;
  width: 20vw;
  text-align: center;
  &:hover {
    background-color: ${colors.bgPrimary};
    cursor: pointer;
  }
`;

export const CardTableCellDelete = styled.td``;

export const CardTableCellDeleteIcon = styled.img`
  width: 2vw;
  &:hover {
    cursor: pointer;
  }
`;

export const PopupButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
`;
