import { useEffect, useState } from "react";
import acorn from "../../../assets/acorn.png";
import LoadingBar from "./LoadingBar";

export default function AcornLoading() {
    const [progress, setProgress] = useState(0); // 0 to 3
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 3) return prev;
                return prev + 1;
            });
        }, 300); // Delay between each stage

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`w-full flex flex-col h-screen justify-center items-center`}>
            <div className="relative w-full max-w-xl h-16 flex items-center justify-center">
                {/* Acorn loading bar */}
                <div className="flex gap-6">
                    {[1, 2, 3].map((index) => (
                        <img
                            key={index}
                            src={acorn}
                            alt={`Acorn ${index}`}
                            style={{
                                opacity: progress >= index ? 1 : 0.2,
                                transition: "opacity 0.3s ease-in-out",
                                width: "40px",
                            }}
                        />
                    ))}
                </div>
            </div>
            <div className="w-5/6 xl:w-2/3 text-center">
                <p className="text-gray-600 font-bold italic dark:text-white">
                    {progress === 3
                        ? "Almost there! Just a moment..."
                        : "Gathering the Acorns, please wait..."}
                </p>
                <LoadingBar />
            </div>
        </div >
    );
}
