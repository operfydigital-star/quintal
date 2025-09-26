

import React from 'react';
// FIX: Import Category and CategoryInfo types from the centralized types.ts file.
import { Category, type CategoryInfo } from './types';
import { BarIcon } from './components/icons/BarIcon';
import { GrillIcon } from './components/icons/GrillIcon';
import { KitchenIcon } from './components/icons/KitchenIcon';
import { ServiceIcon } from './components/icons/ServiceIcon';
import { CleaningIcon } from './components/icons/CleaningIcon';
import { GerenteIcon } from './components/icons/GerenteIcon';
import { CaixaIcon } from './components/icons/CaixaIcon';

export const CATEGORIES: CategoryInfo[] = [
    { id: Category.BAR, name: 'Bar', icon: BarIcon },
    { id: Category.PARRILHA, name: 'Parrilha', icon: GrillIcon },
    { id: Category.COZINHA_MANHA, name: 'Cozinha Manhã', icon: KitchenIcon },
    { id: Category.COZINHA_NOITE, name: 'Cozinha Noite', icon: KitchenIcon },
    { id: Category.ATENDIMENTO, name: 'Atendimento', icon: ServiceIcon },
    { id: Category.LIMPEZA, name: 'Limpeza', icon: CleaningIcon },
    { id: Category.CAIXA, name: 'Caixa', icon: CaixaIcon },
    { id: Category.GERENTE, name: 'Gerente', icon: GerenteIcon },
];