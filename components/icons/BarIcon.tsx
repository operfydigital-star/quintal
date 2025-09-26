
import React from 'react';

export const BarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14" />
        <path d="M3 19h18" />
        <path d="M12 19v-8" />
        <path d="M8 19v-4" />
        <path d="M16 19v-4" />
        <path d="m8 7 4 4 4-4" />
    </svg>
);
