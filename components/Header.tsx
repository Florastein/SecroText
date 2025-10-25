
import React from 'react';

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a12.02 12.02 0 009 2.056c4.502 0 8.29-2.99 9-7.104a12.02 12.02 0 00-2.382-9.016z" />
    </svg>
);

const Header: React.FC = () => {
    return (
        <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-4 shadow-lg flex justify-between items-center z-20">
            <div className="flex items-center">
                 <ShieldIcon />
                <h1 className="text-xl font-bold text-slate-100">Incognito Chat</h1>
            </div>
            <div className="flex items-center space-x-2">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-sm text-emerald-400 font-medium">Secure Session</span>
            </div>
        </header>
    );
};

export default Header;
