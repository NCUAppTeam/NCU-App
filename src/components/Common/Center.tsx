import ChildrenProps from '../interface/ChildrenProps';

export const Center = ({ children }: ChildrenProps) => {
    return (
        <div className="flex mx-auto">
            {children}
        </div>
    );
};
