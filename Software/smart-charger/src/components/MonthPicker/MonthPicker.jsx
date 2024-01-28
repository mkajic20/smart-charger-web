import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import {
  MonthPickerButtonWrapper,
  MonthPickerDate,
  MonthPicker as MonthPickerWrapper,
} from './MonthPickerStyles'

const MonthPicker = ({ month, clickPrev, clickNext, enableNext }) => {
  return (
    <MonthPickerWrapper>
      <MonthPickerButtonWrapper>
        <Button buttonText="<" onClick={clickPrev} />
      </MonthPickerButtonWrapper>
      <MonthPickerDate>{month}</MonthPickerDate>
      <MonthPickerButtonWrapper>
        <Button buttonText=">" onClick={clickNext} isDisabled={!enableNext} />
      </MonthPickerButtonWrapper>
    </MonthPickerWrapper>
  )
}

MonthPicker.propTypes = {
  month: PropTypes.string,
  clickNext: PropTypes.func,
  clickPrev: PropTypes.func,
  enableNext: PropTypes.bool,
}

export default MonthPicker
