"use client";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button = ({ onClick, children, className, disabled }: ButtonProps) => (
  <button
    onClick={onClick}
    type="button"
    className={`cursor-pointer bg-black hover:bg-white hover:text-black font-bold leading-normal text-ock-inverse inline-flex min-w-[153px] items-center justify-center rounded-xl p-3 text-xl ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
