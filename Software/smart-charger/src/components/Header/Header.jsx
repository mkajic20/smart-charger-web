import React from "react";
import PropTypes from "prop-types";
import {
  HeaderInner,
  HeaderLogo,
  HeaderTitle,
  Header as HeaderWrapper,
} from "./HeaderStyles";
import Logo from "../../assets/logo.png";

const Header = () => {
  return (
    <>
      <HeaderWrapper>
        <HeaderInner>
          <HeaderLogo src={Logo} />
          <HeaderTitle>Smart Charger</HeaderTitle>
        </HeaderInner>
      </HeaderWrapper>
    </>
  );
};

Header.propTypes = {};

export default Header;
