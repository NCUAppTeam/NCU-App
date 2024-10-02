import React from 'react';
import IconProps from '../interface/IconProps';

export const BasicIcon: React.FC<IconProps & { children: React.ReactNode }> = ({ fill = 'currentColor', stroke = 'currentColor', size = 24, children }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={fill}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={stroke}
        width={size}
        height={size}
    >
        {children}

    </svg>



);

