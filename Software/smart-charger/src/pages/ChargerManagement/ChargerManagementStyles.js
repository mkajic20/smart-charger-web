import styled from "styled-components";
import { colors } from "../../utils/styles/theme";

export const ChargerManagementTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  color: white;
`;

export const ChargerManagementController = styled.div`
  width: 62vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 auto;
  padding-top: 20px;
`;

export const ChargerManagementControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChargerTable = styled.table`
  margin: 0 auto;
  margin-top: 30px;
`;

export const ChargerTableHead = styled.thead``;

export const ChargerTableBody = styled.tbody``;

export const ChargerTableHeader = styled.th`
  padding: 5px;
  background-color: ${colors.tableHeader};
  font-size: 18px;
`;

export const ChargerTableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${colors.tableBackgroundSecondary};
  }
  &:nth-child(odd) {
    background-color: ${colors.tableBackgroundPrimary};
  }
`;

export const ChargerTableCell = styled.td`
  color: white;
  padding: 5px;
  width: 15vw;
  text-align: center;
`;

export const ChargerTableCellDelete = styled.td``;

export const ChargerTableCellDeleteIcon = styled.img`
  width: 2vw;
  &:hover {
    cursor: pointer;
  }
`;

export const PopupButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

export const TextFieldLabel = styled.label`
  width: 100%;
  text-align: left;
`;
