import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/AuthContext";
import {
  HeaderInner,
  HeaderLogo,
  HeaderTitle,
  Header as HeaderWrapper,
} from "./HeaderStyles";
import Logo from "../../assets/logo.png";
import Button from "../../components/Button/Button";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, setRole } = useContext(AuthContext);

  const logOut = async () => {
    setIsLoggedIn(!isLoggedIn);
    setRole(null);
    localStorage.removeItem("jwt");
  };

  return (
    <>
      <HeaderWrapper>
        <HeaderInner>
          <HeaderLogo src={Logo} />
          <HeaderTitle>Smart Charger</HeaderTitle>
        </HeaderInner>
        {isLoggedIn ? <Button buttonText="LOG OUT" onClick={logOut} /> : <></>}
      </HeaderWrapper>
    </>
  );
};

Header.propTypes = {};

export default Header;
