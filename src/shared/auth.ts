import { FormDataProps } from "../constants/types";

export const userDataLogin = ({ email, password }: Pick<FormDataProps, "email" | "password">) => ({
  user: {
    email,
    password,
  },
});

export const authUser = (formData: FormDataProps): Promise<void> =>
  fetch("api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDataLogin(formData)),
    credentials: "include",
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      const { token } = data.user;
      localStorage.setItem("jwtToken", token);
      console.log("Rejestracja zakończona pomyślnie:");
    })
    .catch(error => {
      console.error("Wystąpił problem z żądaniem:", error);
    });
