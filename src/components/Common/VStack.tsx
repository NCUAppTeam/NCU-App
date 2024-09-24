import ChildrenProps from '../interface/ChildrenProps';

export const VStack = ({ children, className }: ChildrenProps) => {
    return (
        <div className={`flex flex-col ${className}`}>
            {children}
        </div>
    );
};
