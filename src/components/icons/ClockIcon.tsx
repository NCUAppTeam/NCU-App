
import React from 'react';
import IconProps from '../interface/IconProps';
import { BasicIcon } from './BasicIcon';

export const ClockIcon: React.FC<IconProps> = ({ fill, stroke, size }) => (
    <BasicIcon fill={fill} stroke={stroke} size={size}>
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
    </BasicIcon>
);

export default ClockIcon;
