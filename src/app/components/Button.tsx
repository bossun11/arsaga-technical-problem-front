import React from "react";

type ButtonProps = {
  buttonText: string;
};

const Button = ({ buttonText }: ButtonProps) => {
  return <button className="btn">{buttonText}</button>;
};

export default Button;
