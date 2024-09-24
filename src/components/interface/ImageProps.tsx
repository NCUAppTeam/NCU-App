import React from 'react';

interface ImageProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    src?: string;
    alt?: string;
}

export default ImageProps;