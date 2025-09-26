import React, { useState } from 'react';
import type { CheckListItem, FichaTecnica, ShoppingListItem, Ingredient, CategoryInfo, CategoryData, Category } from '../types';
import Card from './Card';
import FichaTecnicaCard from './FichaTecnicaCard';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import Modal from './Modal';
import FichaTecnicaForm from './FichaTecnicaForm';
import FichaTecnicaViewModal from './FichaTecnicaViewModal';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ExportIcon } from './icons/ExportIcon';
import Spinner from './Spinner';


interface MainContentProps {
    categoryInfo: CategoryInfo;
    data: CategoryData;
    onSaveNewFicha: (newFichaData: Omit<FichaTecnica, 'id'>) => void;
    onDeleteFicha: (fichaId: string) => void;
    onUpdateFichaTitle: (fichaId: string, newTitle: string) => void;
    onUpdateFichaSubcategory: (fichaId: string, newSubcategory: string) => void;
    onUpdateFichaImage: (fichaId: string, imageUrl: string) => void;
    onAddIngredient: (fichaId: string, newIngredientData: Omit<Ingredient, 'id'>) => void;
    onUpdateIngredient: (fichaId: string, ingredientId: string, updatedIngredient: Omit<Ingredient, 'id'>) => void;
    onDeleteIngredient: (fichaId: string, ingredientId: string) => void;
    onAddStep: (fichaId: string, newStep: string) => void;
    onUpdateStep: (fichaId: string, stepIndex: number, updatedStep: string) => void;
    onDeleteStep: (fichaId: string, stepIndex: number) => void;
    onAddChecklistItem: (text: string) => void;
    onToggleChecklistItem: (id: string) => void;
    onDeleteChecklistItem: (id: string) => void;
    onUpdateChecklistItem: (id: string, text: string) => void;
    onAddShoppingListItem: (name: string, quantity: string) => void;
    onToggleShoppingListItem: (id: string) => void;
    onDeleteShoppingListItem: (id: string) => void;
    onUpdateShoppingListItem: (id: string, name: string, quantity: string) => void;
}

type ActiveView = 'fichas' | 'checklists' | 'compras';

const MainContent: React.FC<MainContentProps> = ({ 
    categoryInfo, data,
    onSaveNewFicha, onDeleteFicha, onUpdateFichaTitle, onUpdateFichaSubcategory, onUpdateFichaImage,
    onAddIngredient, onUpdateIngredient, onDeleteIngredient,
    onAddStep, onUpdateStep, onDeleteStep,
    onAddChecklistItem, onToggleChecklistItem, onDeleteChecklistItem, onUpdateChecklistItem,
    onAddShoppingListItem, onToggleShoppingListItem, onDeleteShoppingListItem, onUpdateShoppingListItem
}) => {
    // Get data for the current category from props
    const { fichas, checklist, shoppingList } = data;
    const hasFichas = fichas && fichas.length > 0;

    const [activeView, setActiveView] = useState<ActiveView>(hasFichas ? 'fichas' : 'checklists');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [viewingFicha, setViewingFicha] = useState<FichaTecnica | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
    const [isExporting, setIsExporting] = useState(false);
    
    // State for inline editing
    const [editingShoppingItemId, setEditingShoppingItemId] = useState<string | null>(null);
    const [editingShoppingItemText, setEditingShoppingItemText] = useState({ name: '', quantity: '' });
    const [editingChecklistItemId, setEditingChecklistItemId] = useState<string | null>(null);
    const [editingChecklistItemText, setEditingChecklistItemText] = useState('');
    const [newChecklistItemText, setNewChecklistItemText] = useState('');
    const [newShoppingItem, setNewShoppingItem] = useState({ name: '', quantity: '' });

    // --- PDF Export Handler ---
    const handleExportPdf = async (elementId: string, fileName: string) => {
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
                height: input.scrollHeight,
                windowHeight: input.scrollHeight,
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            
            let heightLeft = pdfHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pdf.internal.pageSize.getHeight();

            while (heightLeft > 0) {
                position -= pdf.internal.pageSize.getHeight();
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
                heightLeft -= pdf.internal.pageSize.getHeight();
            }
            pdf.save(`${fileName}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsExporting(false);
        }
    };


    // --- Form Submission Handlers ---
    const handleAddChecklistItemForm = (e: React.FormEvent) => {
        e.preventDefault();
        if (newChecklistItemText.trim() === '') return;
        onAddChecklistItem(newChecklistItemText.trim());
        setNewChecklistItemText('');
    };

    const handleUpdateChecklistItem = () => {
        if (!editingChecklistItemId) return;
        onUpdateChecklistItem(editingChecklistItemId, editingChecklistItemText);
        setEditingChecklistItemId(null);
        setEditingChecklistItemText('');
    };

    const handleAddShoppingListItemForm = (e: React.FormEvent) => {
        e.preventDefault();
        if (newShoppingItem.name.trim() === '') return;
        onAddShoppingListItem(newShoppingItem.name.trim(), newShoppingItem.quantity.trim() || '1 un');
        setNewShoppingItem({ name: '', quantity: '' });
    };

    const handleUpdateShoppingListItem = () => {
        if (!editingShoppingItemId) return;
        onUpdateShoppingListItem(editingShoppingItemId, editingShoppingItemText.name, editingShoppingItemText.quantity);
        setEditingShoppingItemId(null);
        setEditingShoppingItemText({ name: '', quantity: ''});
    };
    
    const handleSaveNewFicha = (newFichaData: Omit<FichaTecnica, 'id'>) => {
        onSaveNewFicha(newFichaData);
        setIsCreateModalOpen(false);
    };

    const getTabClass = (view: ActiveView) => `pb-3 px-1 mr-6 text-sm sm:text-base font-medium transition-all duration-200 ease-in-out border-b-2 ${activeView === view ? 'border-[#02a7a0] text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900'}`;

    const uniqueSubcategories = [...new Set(fichas.map(f => f.subcategory || 'Geral'))].sort();

    const filteredFichas = selectedSubcategory
        ? fichas.filter(f => (f.subcategory || 'Geral') === selectedSubcategory)
        : fichas;

    const groupedFichas = filteredFichas.reduce((acc, ficha) => {
        const subcategory = ficha.subcategory || 'Geral';
        if (!acc[subcategory]) {
            acc[subcategory] = [];
        }
        acc[subcategory].push(ficha);
        return acc;
    }, {} as Record<string, FichaTecnica[]>);

    const titlePlaceholders: Partial<Record<Category, string>> = {
        bar: "Ex: Caipirinha de Morango",
        parrilha: "Ex: Picanha na Grelha",
        cozinha_manha: "Ex: Ovos Mexidos",
        cozinha_noite: "Ex: Filé Mignon ao Madeira",
        gerente: "Ex: Relatório Semanal",
        caixa: "Ex: Procedimento de Sangria",
    };
    const titlePlaceholder = titlePlaceholders[categoryInfo.id] || "Ex: Nome da Receita";

    const subcategoryPlaceholders: Partial<Record<Category, string>> = {
        bar: "Ex: Drinks Clássicos, Autorais",
        parrilha: "Ex: Entrada, Prato Principal",
        cozinha_manha: "Ex: Produção, Café da Manhã",
        cozinha_noite: "Ex: Prato Principal, Sobremesa",
        gerente: "Ex: Financeiro, RH",
        caixa: "Ex: Operacional, Fechamento",
    };
    const subcategoryPlaceholder = subcategoryPlaceholders[categoryInfo.id] || "Ex: Subcategoria";


    return (
        <div className="w-full">
            <div className="flex border-b border-gray-200">
                {hasFichas && (
                    <button onClick={() => { setActiveView('fichas'); setSelectedSubcategory(null); }} className={getTabClass('fichas')}>Fichas Técnicas</button>
                )}
                <button onClick={() => setActiveView('checklists')} className={getTabClass('checklists')}>Checklists</button>
                <button onClick={() => setActiveView('compras')} className={getTabClass('compras')}>Lista de Compras</button>
            </div>

            {activeView === 'fichas' && uniqueSubcategories.length > 0 && (
                <div className="py-4 flex items-center gap-2 flex-wrap border-b border-gray-200/50">
                    <button
                        onClick={() => setSelectedSubcategory(null)}
                        className={`text-xs sm:text-sm font-medium py-1.5 px-4 rounded-full transition-colors ${
                            !selectedSubcategory ? 'bg-[#02a7a0] text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Todos
                    </button>
                    {uniqueSubcategories.map(sub => (
                        <button
                            key={sub}
                            onClick={() => setSelectedSubcategory(sub)}
                            className={`text-xs sm:text-sm font-medium py-1.5 px-4 rounded-full transition-colors ${
                                selectedSubcategory === sub ? 'bg-[#02a7a0] text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {sub}
                        </button>
                    ))}
                </div>
            )}

            <div className="mt-6">
                {activeView === 'fichas' && (
                    <Card 
                        title="Fichas Técnicas" 
                        actionButton={
                            <button onClick={() => setIsCreateModalOpen(true)} className="text-sm bg-[#02a7a0] hover:bg-[#018d87] text-white font-bold py-1 px-3 rounded-full transition-colors">
                               Criar Ficha Técnica
                           </button>
                        }
                        exportAction={
                            <button 
                                onClick={() => handleExportPdf('fichas-content', `Fichas_Técnicas_${categoryInfo.name}`)}
                                disabled={isExporting}
                                className="text-sm bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded-full transition-colors flex items-center gap-1.5"
                            >
                                {isExporting ? <Spinner /> : <ExportIcon className="h-4 w-4" />}
                                Exportar PDF
                            </button>
                        }
                    >
                        <div id="fichas-content">
                             {fichas.length > 0 ? (
                                <div className="space-y-8">
                                    {Object.entries(groupedFichas).map(([subcategory, fichasInSubcategory]) => (
                                        <div key={subcategory}>
                                            <h4 className="text-lg font-semibold text-gray-500 mb-4 border-b border-gray-200 pb-2">
                                                {subcategory}
                                            </h4>
                                            <div className="space-y-6">
                                                {fichasInSubcategory.map(ficha => (
                                                    <FichaTecnicaCard 
                                                        key={ficha.id} 
                                                        ficha={ficha}
                                                        onView={setViewingFicha}
                                                        onUpdateTitle={onUpdateFichaTitle}
                                                        onUpdateSubcategory={onUpdateFichaSubcategory}
                                                        onDeleteFicha={onDeleteFicha}
                                                        onUpdateImage={onUpdateFichaImage}
                                                        onAddIngredient={onAddIngredient}
                                                        onUpdateIngredient={onUpdateIngredient}
                                                        onDeleteIngredient={onDeleteIngredient}
                                                        onAddStep={onAddStep}
                                                        onUpdateStep={onUpdateStep}
                                                        onDeleteStep={onDeleteStep}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                    {Object.keys(groupedFichas).length === 0 && (
                                        <p className="text-gray-500 text-center py-4">Nenhuma ficha técnica para a subcategoria selecionada.</p>
                                    )}
                                </div>
                             ) : (
                                <p className="text-gray-500 text-center py-4">Nenhuma ficha técnica para esta categoria.</p>
                             )}
                        </div>
                    </Card>
                )}
                {activeView === 'checklists' && (
                    <Card 
                        title="Checklists"
                        exportAction={
                            <button 
                                onClick={() => handleExportPdf('checklist-content', `Checklist_${categoryInfo.name}`)}
                                disabled={isExporting || checklist.length === 0}
                                className="text-sm bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded-full transition-colors flex items-center gap-1.5 disabled:opacity-50"
                            >
                                {isExporting ? <Spinner /> : <ExportIcon className="h-4 w-4" />}
                                Exportar PDF
                            </button>
                        }
                    >
                        <div id="checklist-content">
                            {checklist.length > 0 ? (
                                <ul className="space-y-3">
                                    {checklist.map(item => (
                                        <li key={item.id} className="flex items-center gap-3 group">
                                            <input type="checkbox" checked={item.completed} onChange={() => onToggleChecklistItem(item.id)} className="h-5 w-5 rounded bg-gray-200 border-gray-300 text-[#02a7a0] focus:ring-[#02a7a0] cursor-pointer"/>
                                            {editingChecklistItemId === item.id ? (
                                                <input type="text" value={editingChecklistItemText} onChange={e => setEditingChecklistItemText(e.target.value)} onBlur={handleUpdateChecklistItem} onKeyDown={e => e.key === 'Enter' && handleUpdateChecklistItem()} autoFocus className="flex-grow bg-gray-200 text-gray-900 border border-[#02a7a0] rounded px-2 py-1 text-sm"/>
                                            ) : (
                                                <span className={`flex-grow ${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>{item.text}</span>
                                            )}
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                                                <button onClick={() => { setEditingChecklistItemId(item.id); setEditingChecklistItemText(item.text); }} className="text-gray-500 hover:text-gray-800"><EditIcon className="h-4 w-4" /></button>
                                                <button onClick={() => onDeleteChecklistItem(item.id)} className="text-gray-500 hover:text-[#02a7a0]"><TrashIcon className="h-4 w-4" /></button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 text-center py-4">Nenhum item no checklist. Adicione um item abaixo.</p>
                            )}
                            <div className="mt-4 border-t border-gray-200 pt-4">
                                <form onSubmit={handleAddChecklistItemForm} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newChecklistItemText}
                                        onChange={(e) => setNewChecklistItemText(e.target.value)}
                                        placeholder="Adicionar novo item ao checklist"
                                        className="flex-grow bg-gray-200 text-gray-900 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#02a7a0] focus:border-[#02a7a0]"
                                    />
                                    <button type="submit" className="bg-[#02a7a0] hover:bg-[#018d87] text-white font-bold py-2 px-4 rounded-md transition-colors flex-shrink-0">
                                        Adicionar Item
                                    </button>
                                </form>
                            </div>
                        </div>
                    </Card>
                )}
                {activeView === 'compras' && (
                    <Card 
                        title="Lista de Compras"
                        exportAction={
                            <button 
                                onClick={() => handleExportPdf('compras-content', `Lista_de_Compras_${categoryInfo.name}`)}
                                disabled={isExporting || shoppingList.length === 0}
                                className="text-sm bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded-full transition-colors flex items-center gap-1.5 disabled:opacity-50"
                            >
                                {isExporting ? <Spinner /> : <ExportIcon className="h-4 w-4" />}
                                Exportar PDF
                            </button>
                        }
                    >
                        <div id="compras-content">
                            {shoppingList.length > 0 ? (
                                <ul className="space-y-3">
                                    {shoppingList.map(item => (
                                        <li key={item.id} className="flex items-center justify-between gap-3 p-2 bg-gray-200/50 rounded group">
                                            <div className="flex items-center gap-3 flex-grow">
                                                <input type="checkbox" checked={item.acquired} onChange={() => onToggleShoppingListItem(item.id)} className="h-5 w-5 rounded bg-gray-200 border-gray-300 text-[#02a7a0] focus:ring-[#02a7a0] cursor-pointer flex-shrink-0"/>
                                                {editingShoppingItemId === item.id ? (
                                                    <div className="flex gap-2 flex-grow">
                                                        <input type="text" value={editingShoppingItemText.name} onChange={e => setEditingShoppingItemText(prev => ({...prev, name: e.target.value}))} className="flex-grow bg-gray-200 text-gray-900 border border-[#02a7a0] rounded px-2 py-1 text-sm min-w-0" />
                                                        <input type="text" value={editingShoppingItemText.quantity} onChange={e => setEditingShoppingItemText(prev => ({...prev, quantity: e.target.value}))} onBlur={handleUpdateShoppingListItem} onKeyDown={e => e.key === 'Enter' && handleUpdateShoppingListItem()} className="w-24 bg-gray-200 text-gray-900 border border-[#02a7a0] rounded px-2 py-1 text-sm" autoFocus/>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <span className={`flex-grow ${item.acquired ? 'line-through text-gray-500' : 'text-gray-700'}`}>{item.name}</span>
                                                        <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-md flex-shrink-0">{item.quantity}</span>
                                                    </>
                                                )}
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                                                <button onClick={() => { setEditingShoppingItemId(item.id); setEditingShoppingItemText({ name: item.name, quantity: item.quantity }); }} className="text-gray-500 hover:text-gray-800"><EditIcon className="h-4 w-4" /></button>
                                                <button onClick={() => onDeleteShoppingListItem(item.id)} className="text-gray-500 hover:text-[#02a7a0]"><TrashIcon className="h-4 w-4" /></button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 text-center py-4">Nenhum item na lista de compras. Adicione um item abaixo.</p>
                            )}
                             <div className="mt-4 border-t border-gray-200 pt-4">
                                <form onSubmit={handleAddShoppingListItemForm} className="flex flex-col sm:flex-row gap-2">
                                    <input
                                        type="text"
                                        value={newShoppingItem.name}
                                        onChange={(e) => setNewShoppingItem(prev => ({ ...prev, name: e.target.value }))}
                                        placeholder="Nome do item"
                                        className="flex-grow bg-gray-200 text-gray-900 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#02a7a0] focus:border-[#02a7a0]"
                                    />
                                    <input
                                        type="text"
                                        value={newShoppingItem.quantity}
                                        onChange={(e) => setNewShoppingItem(prev => ({ ...prev, quantity: e.target.value }))}
                                        placeholder="Quantidade"
                                        className="w-full sm:w-32 bg-gray-200 text-gray-900 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[#02a7a0] focus:border-[#02a7a0]"
                                    />
                                    <button type="submit" className="bg-[#02a7a0] hover:bg-[#018d87] text-white font-bold py-2 px-4 rounded-md transition-colors flex-shrink-0">
                                        Adicionar
                                    </button>
                                </form>
                            </div>
                        </div>
                    </Card>
                )}
            </div>

            <Modal isOpen={isCreateModalOpen} title="Criar Nova Ficha Técnica" onClose={() => setIsCreateModalOpen(false)}>
                <FichaTecnicaForm 
                    onSave={handleSaveNewFicha}
                    onClose={() => setIsCreateModalOpen(false)}
                    existingSubcategories={uniqueSubcategories}
                    titlePlaceholder={titlePlaceholder}
                    subcategoryPlaceholder={subcategoryPlaceholder}
                />
            </Modal>
            
            <FichaTecnicaViewModal
                ficha={viewingFicha}
                onClose={() => setViewingFicha(null)}
            />
        </div>
    );
};

export default MainContent;