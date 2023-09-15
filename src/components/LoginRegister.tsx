import React, { useState } from "react";
import styled from "@emotion/styled";
import { Button } from "./ui";
import { authUser } from "../shared/auth";
import { FormDataMessages } from "../constants/enums";
import { FormDataProps } from "../constants/types";

const AuthFormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const AuthTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const LoginButton = {
  width: "100%",
  backgroundColor: "rgb(156 118 247)",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};
export const SwitchButton = {
  ...LoginButton,
  backgroundColor: "rgb(213 197 251)",
  border: "1px solid rgb(156 118 247)",
  color: "#000",
};

const AuthForm = () => {
  const [formData, setFormData] = useState({
    isLogin: true,
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
  });

  // *********
  // TODO !!!
  // Add debounce on buttons and inputs !!!
  // *********

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleLogin = (formData: FormDataProps) => isSubmitDisabled && authUser(formData);

  const toggleAuthMode = () => {
    setFormData(prevData => ({
      ...prevData,
      isLogin: !prevData.isLogin,
    }));

    setErrors({
      email: "",
      username: "",
      password: "",
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: "",
    }));

    (formData.isLogin && formData.email && formData.password) ||
    (!formData.isLogin && formData.email && formData.username && formData.password)
      ? setIsSubmitDisabled(false)
      : setIsSubmitDisabled(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = {
      email: "",
      username: "",
      password: "",
    };

    if (!formData.email) {
      newErrors.email = FormDataMessages.Email;
    }

    if (!formData.password) {
      newErrors.password = FormDataMessages.Password;
    }

    if (!formData.isLogin && !formData.username) {
      newErrors.username = FormDataMessages.Username;
    }

    setErrors(newErrors);
  };

  return (
    <AuthFormContainer>
      <AuthTitle>{formData.isLogin ? "Logowanie" : "Rejestracja"}</AuthTitle>
      <form onSubmit={handleSubmit}>
        {!formData.isLogin && (
          <FormGroup>
            <Label>Nazwa użytkownika:</Label>
            <Input type="text" name="username" value={formData.username} onChange={handleChange} />
            {errors.username && <span>{errors.username}</span>}
          </FormGroup>
        )}
        <FormGroup>
          <Label>Email:</Label>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span>{errors.email}</span>}
        </FormGroup>
        <FormGroup>
          <Label>Hasło:</Label>
          <Input type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <span>{errors.password}</span>}
        </FormGroup>
        <Button type="submit" onClick={() => handleLogin(formData)} style={LoginButton}>
          {formData.isLogin ? "Zaloguj" : "Zarejestruj"}
        </Button>
        {/* <Button type="submit" onClick={handleLogin} style={LoginButton}>
          {formData.isLogin ? "Zaloguj" : "Zarejestruj"}
        </Button> */}
      </form>
      <Button onClick={toggleAuthMode} style={SwitchButton}>
        {formData.isLogin ? "Przejdź do rejestracji" : "Przejdź do logowania"}
      </Button>
    </AuthFormContainer>
  );
};

export default AuthForm;
