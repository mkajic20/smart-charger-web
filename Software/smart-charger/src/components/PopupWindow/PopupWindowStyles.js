import styled from 'styled-components'
import { colors } from '../../utils/styles/theme'

export const PopupWindowWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`

export const PopupWindowBackground = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 101;
`

export const PopupWindowContent = styled.div`
  background-color: ${colors.bgSecondary};
  padding: 20px;
  border-radius: 10px;
  z-index: 102;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  padding: 30px;
  border: 1px solid black;
`

export const PopupWindowTitle = styled.h3``

export const PopupWindowText = styled.p``
