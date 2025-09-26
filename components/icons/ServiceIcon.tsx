
import React from 'react';

export const ServiceIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 11a4 4 0 0 1 0-8 4 4 0 0 1 0 8Z" />
        <path d="M18 21a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2" />
        <path d="M17 11a5 5 0 0 0-10 0" />
        <path d="M3 21h18" />
    </svg>
);
