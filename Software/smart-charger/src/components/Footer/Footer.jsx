import React from 'react'
import {
  FooterLogoImage,
  FooterLogo,
  Footer as FooterWrapper,
  FooterText,
  FooterLink,
} from './FooterStyles'
import Logo from '../../assets/logo.png'

export const Footer = () => {
  return (
    <FooterWrapper>
      <FooterLogo>
        <FooterLogoImage src={Logo} />
        Smart Charger
      </FooterLogo>
      <FooterText>
        <FooterLink>CAREERS</FooterLink> | <FooterLink>SUPPORT</FooterLink> |{' '}
        <FooterLink>CONTACT US</FooterLink> | <FooterLink>PRESS</FooterLink> |{' '}
        <FooterLink>API</FooterLink>
      </FooterText>
      <FooterText>&copy;2023, Bacc Boys, Inc. All rights reserved.</FooterText>
    </FooterWrapper>
  )
}
