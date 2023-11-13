import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/AuthContext";
import {
  HeaderInner,
  HeaderLogo,
  HeaderTitle,
  Header as HeaderWrapper,
  HeaderButtonWrapper,
  HeaderNav,
  HeaderLink,
} from "./HeaderStyles";
import Logo from "../../assets/logo.png";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, setRole } = useContext(AuthContext);
  const navigate = useNavigate();

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
          <HeaderNav>
            <HeaderLink
              onClick={() => {
                navigate("/user-management");
              }}
            >
              Users
            </HeaderLink>
            <HeaderLink
              onClick={() => {
                navigate("/card-management");
              }}
            >
              RFID cards
            </HeaderLink>
          </HeaderNav>
        </HeaderInner>
        <HeaderButtonWrapper>
          {isLoggedIn ? (
            <Button buttonText="LOG OUT" onClick={logOut} />
          ) : (
            <></>
          )}
        </HeaderButtonWrapper>
      </HeaderWrapper>
    </>
  );
};

Header.propTypes = {};

export default Header;
