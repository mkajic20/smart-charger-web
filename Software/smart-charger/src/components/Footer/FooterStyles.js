import styled from "styled-components";
import { colors } from "../../utils/styles/theme";

export const Footer = styled.footer`
  width: 100%;
  min-height: 30px;
  background-color: ${colors.bgSecondary};
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 15px 0;
  position: ${(props) => (props.isfixed === "true" ? "fixed" : "relative")};
  bottom: 0;
  margin-top: 100px;
  z-index: 20;
`;

export const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-size: 20px;
`;

export const FooterLogoImage = styled.img`
  width: 55px;
`;

export const FooterText = styled.div`
  color: white;
  font-size: 13px;
`;

export const FooterLink = styled.a`
  &:hover {
    cursor: pointer;
  }
`;
