import React from "react";
import PropTypes from "prop-types";
import { Button as ButtonWrapper } from "./ButtonStyles";

const Button = ({ onClick, buttonText, isSecondary }) => {
  return (
    <ButtonWrapper
      onClick={onClick}
      issecondary={isSecondary ? "true" : "false"}
    >
      {buttonText}
    </ButtonWrapper>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
  isSecondary: PropTypes.bool,
};

export default Button;
