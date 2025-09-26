
import React from 'react';

export const KitchenIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 2h14" />
        <path d="M2 6h20" />
        <path d="M10 15v5" />
        <path d="M14 15v5" />
        <path d="M2 10h20v5H2z" />
        <path d="M6 10v-4" />
    </svg>
);
