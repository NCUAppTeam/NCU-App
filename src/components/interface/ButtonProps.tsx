import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    type?: 'submit' | 'reset' | 'button';
    className?: string;
}

export default ButtonProps;