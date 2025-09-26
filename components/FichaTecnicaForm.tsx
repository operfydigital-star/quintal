import React, { useState } from 'react';
import type { FichaTecnica, Ingredient } from '../types';
import { TrashIcon } from './icons/TrashIcon';

interface FichaTecnicaFormProps {
    onSave: (ficha: Omit<FichaTecnica, 'id'>) => void;
    onClose: () => void;
    existingSubcategories: string[];
    titlePlaceholder?: string;
    subcategoryPlaceholder?: string;
}

const unitOptions = ['g', 'kg', 'ml', 'L', 'unidade'];

const FichaTecnicaForm: React.FC<FichaTecnicaFormProps> = ({ onSave, onClose, existingSubcategories, titlePlaceholder, subcategoryPlaceholder }) => {
    const [title, setTitle] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [ingredients, setIngredients] = useState<Omit<Ingredient, 'id'>[]>([]);
    const [steps, setSteps] = useState<string[]>([]);

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: 0, unit: 'g' }]);
    };

    const handleRemoveIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleIngredientChange = (index: number, field: keyof Omit<Ingredient, 'id'>, value: string | number) => {
        const newIngredients = [...ingredients];
        const ingredient = newIngredients[index];
        
        if (field === 'quantity') {
            (ingredient as any)[field] = parseFloat(value as string) || 0;
        } else {
            (ingredient as any)[field] = value;
        }

        setIngredients(newIngredients);
    };

    const handleAddStep = () => {
        setSteps([...steps, '']);
    };

    const handleRemoveStep = (index: number) => {
        setSteps(steps.filter((_, i) => i !== index));
    };
    
    const handleStepChange = (index: number, value: string) => {
        const newSteps = [...steps];
        newSteps[index] = value;
        setSteps(newSteps);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            title: title || 'Nova Ficha Técnica',
            subcategory: subcategory,
            imageUrl: '',
            ingredients: ingredients.map(ing => ({...ing, id: `ing-${Date.now()}-${Math.random()}`})),
            steps,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Nome da Receita</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-[#02a7a0] focus:border-[#02a7a0]"
                        placeholder={titlePlaceholder || "Ex: Nome da Receita"}
                    />
                </div>
                 <div>
                    <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1">Subcategoria</label>
                    <input
                        type="text"
                        id="subcategory"
                        list="subcategory-list"
                        value={subcategory}
                        onChange={e => setSubcategory(e.target.value)}
                        className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-[#02a7a0] focus:border-[#02a7a0]"
                        placeholder={subcategoryPlaceholder || "Ex: Subcategoria"}
                    />
                    <datalist id="subcategory-list">
                        {existingSubcategories.map(sub => (
                            <option key={sub} value={sub} />
                        ))}
                    </datalist>
                </div>
            </div>

            <div>
                <h3 className="text-md font-medium text-gray-700 mb-2">Ingredientes</h3>
                <div className="space-y-3">
                    {ingredients.map((ing, index) => (
                        <div key={index} className="flex flex-wrap items-center gap-2">
                            <input
                                type="text"
                                value={ing.name}
                                onChange={e => handleIngredientChange(index, 'name', e.target.value)}
                                placeholder="Nome do Ingrediente"
                                className="flex-grow bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-[#02a7a0] focus:border-[#02a7a0]"
                            />
                            <input
                                type="number"
                                value={ing.quantity}
                                onChange={e => handleIngredientChange(index, 'quantity', e.target.value)}
                                placeholder="Qtd."
                                className="w-24 bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-[#02a7a0] focus:border-[#02a7a0]"
                            />
                            <select
                                value={ing.unit}
                                onChange={e => handleIngredientChange(index, 'unit', e.target.value)}
                                className="w-28 bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-[#02a7a0] focus:border-[#02a7a0]"
                            >
                                {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
                            </select>
                            <button type="button" onClick={() => handleRemoveIngredient(index)} className="text-gray-500 hover:text-[#02a7a0] p-1">
                                <TrashIcon className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>
                <button type="button" onClick={handleAddIngredient} className="mt-2 text-sm text-[#02a7a0] hover:text-[#018d87] font-semibold">+ Adicionar Ingrediente</button>
            </div>

            <div>
                <h3 className="text-md font-medium text-gray-700 mb-2">Modo de Preparo</h3>
                 <div className="space-y-3">
                    {steps.map((step, index) => (
                         <div key={index} className="flex items-center gap-2">
                            <span className="text-gray-500 font-medium">{index + 1}.</span>
                            <input
                                type="text"
                                value={step}
                                onChange={e => handleStepChange(index, e.target.value)}
                                placeholder="Descreva o passo"
                                className="flex-grow bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-[#02a7a0] focus:border-[#02a7a0]"
                            />
                            <button type="button" onClick={() => handleRemoveStep(index)} className="text-gray-500 hover:text-[#02a7a0] p-1">
                                <TrashIcon className="h-5 w-5" />
                            </button>
                         </div>
                    ))}
                 </div>
                 <button type="button" onClick={handleAddStep} className="mt-2 text-sm text-[#02a7a0] hover:text-[#018d87] font-semibold">+ Adicionar Passo</button>
            </div>
            
            <footer className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button type="button" onClick={onClose} className="text-sm bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors">
                    Cancelar
                </button>
                <button type="submit" className="text-sm bg-[#02a7a0] hover:bg-[#018d87] text-white font-bold py-2 px-4 rounded-md transition-colors">
                    Salvar Ficha
                </button>
            </footer>
        </form>
    );
};

export default FichaTecnicaForm;