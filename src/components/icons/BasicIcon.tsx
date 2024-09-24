import React from 'react';
import IconProps from '../interface/IconProps';

export const BasicIcon: React.FC<IconProps & { children: React.ReactNode }> = ({ color = 'currentColor', size = 24, children }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={color}
        width={size}
        height={size}
        className={`size-${size}`}
    >
        {children}
    </svg>
);

