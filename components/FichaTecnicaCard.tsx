import React, { useState, useRef, useEffect } from 'react';
import type { FichaTecnica, Ingredient } from '../types';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import { ImageIcon } from './icons/ImageIcon';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ExportIcon } from './icons/ExportIcon';
import Spinner from './Spinner';


interface FichaTecnicaCardProps {
    ficha: FichaTecnica;
    onView: (ficha: FichaTecnica) => void;
    onUpdateTitle: (fichaId: string, newTitle: string) => void;
    onUpdateSubcategory: (fichaId: string, newSubcategory: string) => void;
    onDeleteFicha: (fichaId: string) => void;
    onUpdateImage: (fichaId: string, imageUrl: string) => void;
    onAddIngredient: (fichaId: string, ingredient: Omit<Ingredient, 'id'>) => void;
    onUpdateIngredient: (fichaId: string, ingredientId: string, ingredient: Omit<Ingredient, 'id'>) => void;
    onDeleteIngredient: (fichaId: string, ingredientId: string) => void;
    onAddStep: (fichaId: string, step: string) => void;
    onUpdateStep: (fichaId: string, stepIndex: number, step: string) => void;
    onDeleteStep: (fichaId: string, stepIndex: number) => void;
}

const unitOptions = ['g', 'kg', 'ml', 'L', 'unidade'];

const FichaTecnicaCard: React.FC<FichaTecnicaCardProps> = ({ 
    ficha, onView, onUpdateTitle, onUpdateSubcategory, onDeleteFicha, onUpdateImage, onAddIngredient, onUpdateIngredient, onDeleteIngredient,
    onAddStep, onUpdateStep, onDeleteStep 
}) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    
    const [editingIngredientId, setEditingIngredientId] = useState<string | null>(null);
    const [editingIngredientText, setEditingIngredientText] = useState({ name: '', quantity: 0, unit: 'g' as Ingredient['unit']});

    const [editingStepIndex, setEditingStepIndex] = useState<number | null>(null);
    const [editingStepText, setEditingStepText] = useState('');

    const [editingTitleText, setEditingTitleText] = useState(ficha.title);
    const [editingSubcategoryText, setEditingSubcategoryText] = useState(ficha.subcategory || '');
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setEditingTitleText(ficha.title);
        setEditingSubcategoryText(ficha.subcategory || '');
    }, [ficha.title, ficha.subcategory]);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onUpdateImage(ficha.id, reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleUpdateIngredientClick = () => {
        if (!editingIngredientId) return;
        onUpdateIngredient(ficha.id, editingIngredientId, editingIngredientText);
        setEditingIngredientId(null);
        setEditingIngredientText({name: '', quantity: 0, unit: 'g'});
    };

    const handleUpdateStepClick = () => {
        if (editingStepIndex === null) return;
        onUpdateStep(ficha.id, editingStepIndex, editingStepText);
        setEditingStepIndex(null);
        setEditingStepText('');
    };

    const handleUpdateTitle = () => {
        if (editingTitleText.trim()) {
            onUpdateTitle(ficha.id, editingTitleText.trim());
        } else {
            setEditingTitleText(ficha.title);
        }
    };

    const handleUpdateSubcategory = () => {
        onUpdateSubcategory(ficha.id, editingSubcategoryText.trim());
    };
    
    const handleEditToggle = () => {
        if (isEditMode) {
            handleUpdateTitle();
            handleUpdateSubcategory();
        } else {
            setEditingTitleText(ficha.title);
            setEditingSubcategoryText(ficha.subcategory || '');
        }
        setIsEditMode(!isEditMode);
    };

    const handleExportPdf = async () => {
        const elementId = `ficha-card-content-${ficha.id}`;
        const input = document.getElementById(elementId);
        if (!input) {
            console.error(`Element with id ${elementId} not found.`);
            return;
        }
        setIsExporting(true);
        try {
            const canvas = await html2canvas(input, {
                scale: 2,
                useCORS: true,
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${ficha.title}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200/50 overflow-hidden flex flex-col">
            <div id={`ficha-card-content-${ficha.id}`} className="flex flex-col md:flex-row">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                />
                <div 
                    className="w-full md:w-1/3 h-48 md:h-auto bg-gray-100 flex-shrink-0 cursor-pointer group flex items-center justify-center"
                    onClick={handleImageClick}
                >
                    {ficha.imageUrl ? (
                        <img src={ficha.imageUrl} alt={ficha.title} className="w-full h-full object-cover"/>
                    ) : (
                        <div className="text-center text-gray-500">
                            <ImageIcon className="h-12 w-12 mx-auto mb-2"/>
                            <span className="text-sm font-medium">Adicionar Foto</span>
                        </div>
                    )}
                </div>
                
                <div className="p-4 flex-grow">
                     <div className="mb-3">
                        {isEditMode ? (
                            <div className="space-y-2">
                                <input 
                                    type="text" 
                                    value={editingTitleText}
                                    onChange={e => setEditingTitleText(e.target.value)}
                                    onBlur={handleUpdateTitle}
                                    onKeyDown={e => e.key === 'Enter' && handleUpdateTitle()}
                                    className="font-semibold text-gray-900 text-lg bg-gray-100 border border-[#02a7a0] rounded px-2 py-1 -my-1 w-full"
                                    placeholder="Nome da Receita"
                                />
                                 <input 
                                    type="text" 
                                    value={editingSubcategoryText}
                                    onChange={e => setEditingSubcategoryText(e.target.value)}
                                    onBlur={handleUpdateSubcategory}
                                    onKeyDown={e => e.key === 'Enter' && handleUpdateSubcategory()}
                                    className="text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded px-2 py-1 w-full"
                                    placeholder="Subcategoria"
                                />
                            </div>
                        ) : (
                            <>
                                {ficha.subcategory && (
                                    <span className="text-xs font-semibold bg-[#02a7a0]/20 text-[#02a7a0] px-2 py-1 rounded-full mb-2 inline-block">
                                        {ficha.subcategory}
                                    </span>
                                )}
                                <h4 className="font-semibold text-gray-900 text-lg">{ficha.title}</h4>
                            </>
                        )}
                    </div>
                    
                    <h5 className="font-medium text-gray-700 mb-2">Ingredientes:</h5>
                    {ficha.ingredients.length > 0 ? (
                        <ul className="space-y-2 mb-4">
                            {ficha.ingredients.map(ingredient => (
                                <li key={ingredient.id} className="text-gray-700 flex items-center gap-2">
                                   {editingIngredientId === ingredient.id ? (
                                        <div className="flex gap-2 flex-grow items-center">
                                            <input type="text" value={editingIngredientText.name} onChange={e => setEditingIngredientText(prev => ({...prev, name: e.target.value}))} className="flex-grow bg-gray-100 text-gray-900 border border-[#02a7a0] rounded px-2 py-1 text-sm min-w-0"/>
                                            <input type="number" value={editingIngredientText.quantity} onChange={e => setEditingIngredientText(prev => ({...prev, quantity: parseFloat(e.target.value) || 0}))} className="w-20 bg-gray-100 text-gray-900 border border-[#02a7a0] rounded px-2 py-1 text-sm"/>
                                            <select value={editingIngredientText.unit} onChange={e => setEditingIngredientText(prev => ({...prev, unit: e.target.value as Ingredient['unit']}))} onBlur={handleUpdateIngredientClick} className="w-24 bg-gray-100 text-gray-900 border border-[#02a7a0] rounded px-2 py-1 text-sm" >
                                                {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
                                            </select>
                                        </div>
                                   ) : (
                                        <>
                                            <span className="flex-grow">{ingredient.name} - <span className="text-gray-500 text-sm">{ingredient.quantity} {ingredient.unit}</span></span>
                                            {isEditMode && (
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => { setEditingIngredientId(ingredient.id); setEditingIngredientText({name: ingredient.name, quantity: ingredient.quantity, unit: ingredient.unit})}} className="text-gray-500 hover:text-gray-800"><EditIcon className="h-4 w-4"/></button>
                                                    <button onClick={() => onDeleteIngredient(ficha.id, ingredient.id)} className="text-gray-500 hover:text-[#02a7a0]"><TrashIcon className="h-4 w-4"/></button>
                                                </div>
                                            )}
                                        </>
                                   )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-sm mb-4">Nenhum ingrediente adicionado.</p>
                    )}
                    {isEditMode && (
                        <button onClick={() => onAddIngredient(ficha.id, { name: 'Novo Ingrediente', quantity: 1, unit: 'unidade'})} className="text-xs bg-[#02a7a0]/20 hover:bg-[#02a7a0]/30 text-[#02a7a0] font-semibold py-1 px-3 rounded-full transition-colors">+ Adicionar Ingrediente</button>
                    )}


                    <h5 className="font-medium text-gray-700 mt-4 mb-2">Modo de Preparo:</h5>
                     <ol className="space-y-2 list-decimal list-inside text-gray-500 text-sm">
                        {ficha.steps.map((step, index) => (
                            <li key={index} className="flex items-center gap-2">
                                {editingStepIndex === index ? (
                                     <input type="text" value={editingStepText} onChange={e => setEditingStepText(e.target.value)} onBlur={handleUpdateStepClick} onKeyDown={e => e.key === 'Enter' && handleUpdateStepClick()} autoFocus className="flex-grow bg-gray-100 text-gray-900 border border-[#02a7a0] rounded px-2 py-1 text-sm min-w-0"/>
                                ) : (
                                    <>
                                        <span className="flex-grow">{step}</span>
                                        {isEditMode && (
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => {setEditingStepIndex(index); setEditingStepText(step);}} className="text-gray-500 hover:text-gray-800"><EditIcon className="h-4 w-4"/></button>
                                                <button onClick={() => onDeleteStep(ficha.id, index)} className="text-gray-500 hover:text-[#02a7a0]"><TrashIcon className="h-4 w-4"/></button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </li>
                        ))}
                    </ol>
                     {isEditMode && (
                        <button onClick={() => onAddStep(ficha.id, 'Novo passo.')} className="mt-2 text-xs bg-[#02a7a0]/20 hover:bg-[#02a7a0]/30 text-[#02a7a0] font-semibold py-1 px-3 rounded-full transition-colors">+ Adicionar Passo</button>
                    )}
                </div>
            </div>
            <div className="border-t border-gray-200/50 mt-4 p-4 flex flex-wrap justify-end gap-3 bg-gray-100/50">
                <button
                    onClick={handleExportPdf}
                    disabled={isExporting}
                    className="text-sm bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                    {isExporting ? <Spinner /> : <ExportIcon className="h-4 w-4" />}
                    Exportar PDF
                </button>
                <button onClick={() => onView(ficha)} className="text-sm bg-[#02a7a0] hover:bg-[#018d87] text-white font-bold py-2 px-4 rounded-md transition-colors">
                    Visualizar
                </button>
                <button onClick={handleEditToggle} className="text-sm bg-[#02a7a0] hover:bg-[#018d87] text-white font-bold py-2 px-4 rounded-md transition-colors">
                    {isEditMode ? 'Salvar' : 'Editar'}
                </button>
                <button onClick={() => onDeleteFicha(ficha.id)} className="text-sm bg-[#02a7a0] hover:bg-[#018d87] text-white font-bold py-2 px-4 rounded-md transition-colors">
                    Excluir
                </button>
            </div>
        </div>
    );
};

export default FichaTecnicaCard;