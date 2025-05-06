// components/ui/LoadingBar.tsx
import { useEffect, useState } from 'react';

export default function LoadingBar() {
    const [progress, setProgress] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return 100;
                return prev + Math.random() * 5; // Random increment for a natural feel
            });
        }, 30); // Update every 100ms

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-2 bg-gray-200 rounded mt-4 overflow-hidden">
            <div
                className="h-full bg-yellow-600 transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
}
