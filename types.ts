import React from 'react';

export enum Category {
    BAR = 'bar',
    PARRILHA = 'parrilha',
    COZINHA_MANHA = 'cozinha_manha',
    COZINHA_NOITE = 'cozinha_noite',
    ATENDIMENTO = 'atendimento',
    LIMPEZA = 'limpeza',
    CAIXA = 'caixa',
    GERENTE = 'gerente',
}

export interface CategoryInfo {
    id: Category;
    name: string;
    icon: React.FC<{ className?: string }>;
}

export interface Ingredient {
    id: string;
    name: string;
    quantity: number;
    unit: 'g' | 'kg' | 'ml' | 'L' | 'unidade';
}

export interface FichaTecnica {
    id: string;
    title: string;
    subcategory?: string;
    imageUrl: string;
    ingredients: Ingredient[];
    steps: string[];
}

export interface CheckListItem {
    id: string;
    text: string;
    completed: boolean;
}

export interface ShoppingListItem {
    id: string;
    name: string;
    quantity: string;
    acquired: boolean;
}

// FIX: Define and export CategoryData to be used across the application.
export interface CategoryData {
    fichas: FichaTecnica[];
    shoppingList: ShoppingListItem[];
    checklist: CheckListItem[];
}