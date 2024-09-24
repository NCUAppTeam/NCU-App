import ImageProps from '../interface/ImageProps';

export const Image = ({ children, className, src, alt }: ImageProps) => {
    return (
        <>
            <img className={className} src={src} alt={alt} />
            {children}
        </>
    );
};
