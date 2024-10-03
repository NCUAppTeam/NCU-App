
import React from 'react';
import IconProps from '../interface/IconProps';
import { BasicIcon } from './BasicIcon';

export const SidebarArrowRightIcon: React.FC<IconProps> = ({ fill, stroke, size }) => (
    <BasicIcon fill={fill} stroke={stroke} size={size}>
        <path fillRule="evenodd" d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z" clipRule="evenodd" />
    </BasicIcon>
);

export default SidebarArrowRightIcon;
