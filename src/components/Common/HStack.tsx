import ChildrenProps from '../interface/ChildrenProps';

export const HStack = ({ children, className }: ChildrenProps) => {
  return (
    <div className={`flex flex-row ${className}`}>
      {children}
    </div>
  );
};
