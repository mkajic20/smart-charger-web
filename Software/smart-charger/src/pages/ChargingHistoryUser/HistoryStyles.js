import styled from "styled-components";
import { colors } from "../../utils/styles/theme";

export const HistoryTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  color: white;
`;

export const HistoryController = styled.div`
  width: 62vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 auto;
  padding-top: 20px;
`;

export const HistoryControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HistoryTable = styled.table`
  margin: 0 auto;
  margin-top: 30px;
`;

export const HistoryTableHead = styled.thead``;

export const HistoryTableBody = styled.tbody``;

export const HistoryTableHeader = styled.th`
  padding: 5px;
  background-color: ${colors.tableHeader};
  font-size: 18px;
`;

export const HistoryTableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${colors.tableBackgroundSecondary};
  }
  &:nth-child(odd) {
    background-color: ${colors.tableBackgroundPrimary};
  }
`;

export const HistoryTableCell = styled.td`
  color: white;
  padding: 5px;
  width: 10vw;
  text-align: center;
`;
