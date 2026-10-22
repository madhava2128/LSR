import React from 'react';

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div 
      className={`bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 border border-border-subtle hover:border-secondary/40 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
