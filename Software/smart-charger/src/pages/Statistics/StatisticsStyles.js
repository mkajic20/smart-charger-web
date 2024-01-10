import styled from "styled-components";

export const StatisticsTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  color: white;
`;

export const StatisticsSectionWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const StatisticsWrapper = styled.div`
  min-width: 40vw;
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;

export const StatisticsText = styled.p`
  margin-top: 40px;
  font-weight: bold;
`;

export const StatisticsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 20px 0;
  grid-row-gap: 20px;
`;

export const StatisticDescription = styled.p`
  font-weight: 1000;
  font-size: 20px;
`;

export const StatisticValue = styled.p``;
