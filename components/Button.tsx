import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
}

export function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center px-6 py-2.5 rounded-2xl font-medium text-sm sm:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover shadow-xs hover:shadow-md",
    outline: "border border-primary text-primary hover:bg-primary hover:text-white bg-transparent shadow-xs hover:shadow-md",
    ghost: "text-primary hover:bg-sage-light bg-transparent"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
