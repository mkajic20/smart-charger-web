import styled from "styled-components";
import { colors } from "../../utils/styles/theme";

export const Footer = styled.footer`
  width: 100%;
  min-height: 30px;
  background-color: ${colors.bgSecondary};
  position: absolute;
  bottom: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding-bottom: 5px;
`;

export const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-size: 16px;
`;

export const FooterLogoImage = styled.img`
  width: 45px;
`;

export const FooterText = styled.div`
  color: white;
  font-size: 12px;
`;

export const FooterLink = styled.a`
  &:hover {
    cursor: pointer;
  }
`;
