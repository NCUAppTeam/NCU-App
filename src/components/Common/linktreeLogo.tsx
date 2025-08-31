import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";

const LinktreeIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
        fill={"currentColor"} viewBox="0 0 24 24" {...props} >
        {/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}
        <path d="M18.77 5.42 16.83 3.45 13.47 6.87 13.47 2 10.57 2 10.57 6.87 7.21 3.45 5.27 5.42 8.81 8.77 3.86 8.77 3.82 8.77 3.82 11.51 8.79 11.51 5.25 14.92 7.19 16.87 12 12.04 16.81 16.85 18.75 14.92 15.21 11.51 20.18 11.51 20.18 8.75 15.23 8.75 18.77 5.42z"></path><path d="M10.59 15.46H13.49V22H10.59z"></path>
    </svg>
);

export default LinktreeIcon;