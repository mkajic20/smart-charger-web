import React from "react";
import PropTypes from "prop-types";
import { Button as ButtonWrapper } from "./ButtonStyles";

const Button = ({ onClick, buttonText, isSecondary, isDisabled }) => {
  return (
    <ButtonWrapper
      onClick={onClick}
      issecondary={isSecondary ? "true" : "false"}
      disabled={isDisabled}
    >
      {buttonText}
    </ButtonWrapper>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
  isSecondary: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

export default Button;
