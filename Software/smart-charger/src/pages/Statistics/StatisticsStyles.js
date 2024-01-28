import styled from 'styled-components'

export const StatisticsSectionWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`

export const StatisticsWrapper = styled.div`
  min-width: 35vw;
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px 30px 30px;
`

export const StatisticsText = styled.p`
  margin-top: 40px;
  font-weight: bold;
`

export const StatisticsLayout = styled.table`
  margin: 30px 0;
`

export const StatisticsLayoutRow = styled.tr`
  width: 40vw;
  display: flex;
  flex-direction: row;
  padding-bottom: 20px;
`

export const StatisticDescription = styled.td`
  font-weight: 1000;
  font-size: 20px;
  width: 20vw;
  padding-right: 10px;
  display: flex;
  justify-content: end;
  align-items: center;
`

export const StatisticValue = styled.td`
  width: 20vw;
  display: flex;
  justify-content: start;
  align-items: center;
`
