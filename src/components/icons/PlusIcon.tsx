import React from 'react';
import IconProps from '../interface/IconProps';
import { BasicIcon } from './BasicIcon';

export const PlusIcon: React.FC<IconProps> = ({ fill, stroke, size }) => (
    <BasicIcon fill={fill} stroke={stroke} size={size}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </BasicIcon>
);

export default PlusIcon;