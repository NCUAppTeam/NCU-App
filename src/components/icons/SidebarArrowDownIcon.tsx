
import React from 'react';
import IconProps from '../interface/IconProps';
import { BasicIcon } from './BasicIcon';

export const SidebarArrowDownIcon: React.FC<IconProps> = ({ fill, stroke, size }) => (
    <BasicIcon fill={fill} stroke={stroke} size={size}>
        <path fillRule="evenodd" d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z" clipRule="evenodd" />
    </BasicIcon>
);

export default SidebarArrowDownIcon;
