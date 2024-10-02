
import React from 'react';
import IconProps from '../interface/IconProps';
import { BasicIcon } from './BasicIcon';

export const LogoutIcon: React.FC<IconProps> = ({ fill, stroke, size }) => (
    <BasicIcon fill={fill} stroke={stroke} size={size}>
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
        />
    </BasicIcon>
);

export default LogoutIcon;
