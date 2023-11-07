import React from "react";
import PropTypes from "prop-types";
import { Button as ButtonWrapper } from "./ButtonStyles";

const Button = ({ onClick, buttonText }) => {
  return <ButtonWrapper onClick={onClick}>{buttonText}</ButtonWrapper>;
};

Button.propTypes = {
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
};

export default Button;
