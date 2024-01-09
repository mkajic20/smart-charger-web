import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import {
  MonthPickerButtonWrapper,
  MonthPickerDate,
  MonthPicker as MonthPickerWrapper,
} from "./MonthPickerStyles";

const MonthPicker = ({ month, clickPrev, clickNext, enableNext }) => {
  return (
    <MonthPickerWrapper>
      <MonthPickerButtonWrapper>
        <Button isSecondary buttonText="<" onClick={clickPrev} />
      </MonthPickerButtonWrapper>
      <MonthPickerDate>{month}</MonthPickerDate>
      <MonthPickerButtonWrapper>
        <Button isSecondary buttonText=">" onClick={clickNext} />
      </MonthPickerButtonWrapper>
    </MonthPickerWrapper>
  );
};

MonthPicker.propTypes = {};

export default MonthPicker;
