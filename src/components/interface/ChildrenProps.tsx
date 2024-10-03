import { ReactNode } from 'react';

interface ChildrenProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;

}export default ChildrenProps;