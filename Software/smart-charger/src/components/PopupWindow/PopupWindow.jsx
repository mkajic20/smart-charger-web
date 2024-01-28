import React from 'react'
import PropTypes from 'prop-types'
import {
  PopupWindowBackground,
  PopupWindowContent,
  PopupWindowText,
  PopupWindowTitle,
  PopupWindowWrapper,
} from './PopupWindowStyles'

const PopupWindow = ({ title, text, children, onClose }) => {
  return (
    <PopupWindowWrapper>
      <PopupWindowBackground onClick={onClose} />
      <PopupWindowContent>
        <PopupWindowTitle>{title}</PopupWindowTitle>
        <PopupWindowText>{text}</PopupWindowText>
        {children}
      </PopupWindowContent>
    </PopupWindowWrapper>
  )
}

PopupWindow.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
}

export default PopupWindow
