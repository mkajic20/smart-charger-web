import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  TextFieldIcon,
  TextFieldInput,
  TextFieldWrapper,
} from './TextFieldStyles'
import icon from '../../assets/show-pass-icon.png'

const TextField = ({ placeholder, isPassword, changeValue, validateInput }) => {
  const [visible, setVisible] = useState(false)

  return (
    <TextFieldWrapper>
      <TextFieldInput
        type={!isPassword || visible ? 'text' : 'password'}
        placeholder={placeholder}
        onChange={() => {
          changeValue(event.target.value)
        }}
        onBlur={validateInput}
      />
      {isPassword && (
        <TextFieldIcon
          src={icon}
          onClick={() => {
            setVisible(!visible)
          }}
        />
      )}
    </TextFieldWrapper>
  )
}

TextField.propTypes = {
  placeholder: PropTypes.string,
  isPassword: PropTypes.bool,
  changeValue: PropTypes.func,
  validateInput: PropTypes.func,
}

export default TextField
