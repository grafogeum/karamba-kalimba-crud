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

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | boolean;
}

function FormField({ label, name, type, value, onChange, error }: FormFieldProps) {
  return (
    <FormGroup>
      <Label>{label}:</Label>
      <Input type={type} name={name} value={value} onChange={onChange} />
      {error && <span>{error}</span>}
    </FormGroup>
  );
}

export const formFields = [
  { label: "Email", name: "email", type: "email" },
  { label: "Hasło", name: "password", type: "password" },
];

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

    const requiredFields = ["email", "password"];
    !formData.isLogin && requiredFields.push("username");

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field as keyof typeof newErrors] =
          FormDataMessages[(field.charAt(0).toUpperCase() + field.slice(1)) as keyof typeof FormDataMessages];
      }
    }

    setErrors(newErrors);
  };

  return (
    <AuthFormContainer>
      <AuthTitle>{formData.isLogin ? "Logowanie" : "Rejestracja"}</AuthTitle>
      <form onSubmit={handleSubmit}>
        {!formData.isLogin && (
          <FormField
            label={"User Name"}
            name={"username"}
            type={"text"}
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />
        )}
        {formFields.map(field => (
          <FormField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            value={String(formData[field.name as keyof typeof formData])}
            onChange={handleChange}
            error={
              typeof formData[field.name as keyof typeof formData] === "boolean"
                ? formData[field.name as keyof typeof formData]
                : errors[field.name as keyof typeof errors]
            }
          />
        ))}
        <Button type="submit" onClick={() => handleLogin(formData)} style={LoginButton}>
          {formData.isLogin ? "Zaloguj" : "Zarejestruj"}
        </Button>
      </form>
      <Button onClick={toggleAuthMode} style={SwitchButton}>
        {formData.isLogin ? "Przejdź do rejestracji" : "Przejdź do logowania"}
      </Button>
    </AuthFormContainer>
  );
};

export default AuthForm;
