import React, { useState } from "react";
import Section from "../../components/Section/Section";
import {
  ButtonWrapper,
  RegisterError,
  RegisterForm,
  RegisterFormError,
  RegisterFormField,
  RegisterFormLabel,
  RegisterFormLink,
  RegisterFormText,
  RegisterWrapper,
} from "./RegisterStyles";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";

export const Register = () => {
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const registerUser = () => {};

  const validateFirstName = () => {
    if (firstName.length === 0) {
      setFirstNameError("First name can't be empty!");
      return false;
    } else {
      setFirstNameError("");
      return true;
    }
  };

  const validateLastName = () => {
    if (lastName.length === 0) {
      setLastNameError("Last name can't be empty!");
      return false;
    } else {
      setLastNameError("");
      return true;
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Email is invalid!");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long!");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords must match!");
      return false;
    } else {
      setConfirmPasswordError("");
      return true;
    }
  };

  return (
    <RegisterWrapper>
      <Section
        title="Create account"
        subtitle="Please fill in the following fields in order to register:"
      >
        <RegisterForm>
          <RegisterFormField>
            <RegisterFormLabel>First name:</RegisterFormLabel>
            <TextField
              placeholder="Your first name"
              changeValue={setFirstName}
              validateInput={() => {
                validateFirstName();
              }}
            />
            <RegisterFormError>{firstNameError}</RegisterFormError>
          </RegisterFormField>

          <RegisterFormField>
            <RegisterFormLabel>Last name:</RegisterFormLabel>
            <TextField
              placeholder="Your last name"
              changeValue={setLastName}
              validateInput={validateLastName}
            />
            <RegisterFormError>{lastNameError}</RegisterFormError>
          </RegisterFormField>

          <RegisterFormField>
            <RegisterFormLabel>Email:</RegisterFormLabel>
            <TextField
              placeholder="Your email"
              changeValue={setEmail}
              validateInput={() => {
                validateEmail();
              }}
            />
            <RegisterFormError>{emailError}</RegisterFormError>
          </RegisterFormField>

          <RegisterFormField>
            <RegisterFormLabel>Password:</RegisterFormLabel>
            <TextField
              placeholder="Your password"
              changeValue={setPassword}
              isPassword
              validateInput={validatePassword}
            />
            <RegisterFormError>{passwordError}</RegisterFormError>
          </RegisterFormField>

          <RegisterFormField>
            <RegisterFormLabel>Confirm password:</RegisterFormLabel>
            <TextField
              placeholder="Confirm password"
              changeValue={setConfirmPassword}
              isPassword
              validateInput={validateConfirmPassword}
            />
            <RegisterFormError>{confirmPasswordError}</RegisterFormError>
          </RegisterFormField>

          <RegisterError>{error}</RegisterError>

          <ButtonWrapper>
            <Button buttonText="REGISTER" onClick={registerUser} />
          </ButtonWrapper>
          <RegisterFormText>
            Already have an account? &nbsp;
            <RegisterFormLink>-&gt; LOGIN</RegisterFormLink>
          </RegisterFormText>
        </RegisterForm>
      </Section>
    </RegisterWrapper>
  );
};
