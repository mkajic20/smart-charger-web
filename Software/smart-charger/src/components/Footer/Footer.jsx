import React, { useState, useLayoutEffect } from "react";
import {
  FooterLogoImage,
  FooterLogo,
  Footer as FooterWrapper,
  FooterText,
  FooterLink,
} from "./FooterStyles";
import Logo from "../../assets/logo.png";

export const Footer = () => {
  const [isFooterFixed, setIsFooterFixed] = useState(false);

  const handleResize = () => {
    requestAnimationFrame(() => {
      const contentHeight = document.body.scrollHeight;
      const screenHeight = window.innerHeight;

      setIsFooterFixed(contentHeight + 200 <= screenHeight);
    });
  };

  const handleContentChange = () => {
    handleResize();
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", handleResize);

    const observer = new MutationObserver(handleContentChange);
    observer.observe(document.body, { subtree: true, childList: true });

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <FooterWrapper isfixed={isFooterFixed ? "true" : "false"}>
      <FooterLogo>
        <FooterLogoImage src={Logo} />
        Smart Charger
      </FooterLogo>
      <FooterText>
        <FooterLink>CAREERS</FooterLink> | <FooterLink>SUPPORT</FooterLink> |{" "}
        <FooterLink>CONTACT US</FooterLink> | <FooterLink>PRESS</FooterLink> |{" "}
        <FooterLink>API</FooterLink>
      </FooterText>
      <FooterText>&copy;2023, Bacc Boys, Inc. All rights reserved.</FooterText>
    </FooterWrapper>
  );
};
