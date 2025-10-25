
import React, { useEffect, useState } from 'react';

const ScreenshotBlocker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [warningVisible, setWarningVisible] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'PrintScreen') {
                event.preventDefault();
                setWarningVisible(true);
                setTimeout(() => setWarningVisible(false), 3000);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const watermarkSvg = `
        <svg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 100 100'>
            <text x='50' y='50' font-size='10' fill='rgba(255,255,255,0.05)' font-family='Arial, sans-serif' text-anchor='middle' dominant-baseline='middle' transform='rotate(-45 50 50)'>
                INCOGNITO
            </text>
        </svg>
    `;
    const watermarkDataUrl = `url("data:image/svg+xml;base64,${btoa(watermarkSvg)}")`;

    return (
        <div className="relative w-full h-full" onContextMenu={(e) => e.preventDefault()}>
            {children}
            <div
                className="absolute inset-0 pointer-events-none z-50"
                style={{ backgroundImage: watermarkDataUrl, backgroundRepeat: 'repeat' }}
            ></div>
            {warningVisible && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
                    Screenshots are disabled for this session.
                </div>
            )}
        </div>
    );
};

export default ScreenshotBlocker;
