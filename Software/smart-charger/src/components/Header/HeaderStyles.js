import styled from "styled-components";
import { colors } from "../../utils/styles/theme";

export const Header = styled.header`
  background-color: ${colors.bgSecondary};
`;

export const HeaderInner = styled.div`
  width: 100%;
  height: 80px;
  align-items: center;
  display: flex;
`;

export const HeaderLogo = styled.img`
  height: 70px;
`;

export const HeaderTitle = styled.h2`
  color: ${colors.textPrimary};
`;
