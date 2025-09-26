import React from 'react';

interface CardProps {
    title: string;
    children: React.ReactNode;
    actionButton?: React.ReactNode;
    exportAction?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, actionButton, exportAction }) => {
    return (
        <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg p-6 flex flex-col h-full border border-gray-200/50 border-t-4 border-t-[#02a7a0]">
            <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <div className="flex items-center gap-2">
                    {exportAction}
                    {actionButton}
                </div>
            </div>
            <div className="flex-grow overflow-y-auto pr-2 -mr-2">
                {children}
            </div>
        </div>
    );
};

export default Card;