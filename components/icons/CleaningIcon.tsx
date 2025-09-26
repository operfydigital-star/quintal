
import React from 'react';

export const CleaningIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
        <path d="M3 10h18" />
        <path d="M10 16h8" />
        <path d="m19.5 13-2.5 2.5 2.5 2.5" />
    </svg>
);
