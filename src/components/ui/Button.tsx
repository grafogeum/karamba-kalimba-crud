import { FC } from "react";
export const Button: FC<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = ({
  children,
  style,
  ...rest
}) => (
  <button
    {...rest}
    style={{
      backgroundColor: "#8ADA33",
      border: "none",
      padding: "10px 55px",
      borderRadius: "10px",
      maxWidth: "450px",
      margin: "10px 0",
      ...style,
    }}
  >
    {children}
  </button>
);
