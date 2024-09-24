import ButtonProps from "../interface/ButtonProps";

export const Button = ({ children, type, className, onClick }: ButtonProps) => (
  <button onClick={onClick} type={type} className={className}>

    {children}

  </button>
);