import React from 'react';
import type { Category, CategoryInfo } from '../types';
import { XIcon } from './icons/XIcon';

interface SidebarProps {
    categories: CategoryInfo[];
    selectedCategory: Category;
    onSelectCategory: (category: Category) => void;
    isSidebarOpen: boolean;
    setSidebarOpen: (isOpen: boolean) => void;
    onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ categories, selectedCategory, onSelectCategory, isSidebarOpen, setSidebarOpen, onLogout }) => {
    
    const handleCategoryClick = (category: Category) => {
        onSelectCategory(category);
        setSidebarOpen(false); // Close sidebar on mobile after selection
    };

    return (
        <>
            {/* Overlay for mobile */}
            <div 
                className={`fixed inset-0 bg-black/50 z-30 transition-opacity lg:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setSidebarOpen(false)}
            ></div>

            <aside className={`fixed lg:relative inset-y-0 left-0 bg-white border-r border-gray-200 w-64 z-40 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col`}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                     <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center h-10 w-10 bg-[#02a7a0] rounded-full flex-shrink-0">
                           <span className="text-xl font-bold text-white tracking-tighter">QM</span>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800">Quintal do Marchetti</h2>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-800">
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>
                <nav className="flex-grow p-2">
                    <ul>
                        {categories.map(category => {
                            const isSelected = category.id === selectedCategory;
                            return (
                                <li key={category.id}>
                                    <button 
                                        onClick={() => handleCategoryClick(category.id)}
                                        className={`w-full text-left flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                            isSelected
                                                ? 'bg-[#02a7a0] text-white shadow-md'
                                                : 'text-gray-600 hover:bg-gray-200/50 hover:text-gray-900'
                                        }`}
                                    >
                                        <category.icon className="h-5 w-5 flex-shrink-0" />
                                        <span>{category.name}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                {onLogout && (
                    <div className="p-4 border-t border-gray-200">
                        <button
                            onClick={onLogout}
                            className="w-full flex items-center justify-center gap-2 p-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                            <span>Sair</span>
                        </button>
                    </div>
                )}
                 <footer className="p-4 border-t border-gray-200 text-center text-xs text-gray-500">
                    <p>Quintal do Marchetti</p>
                    <p>&copy; {new Date().getFullYear()}</p>
                </footer>
            </aside>
        </>
    );
};
