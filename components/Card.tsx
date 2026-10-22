import React from 'react';

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div 
      className={`bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-primary-green/30 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
