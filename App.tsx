
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import MainContent from './components/MainContent';
import LoginPage from './components/LoginPage';
import { CATEGORIES } from './constants';
import { mockData } from './mockData';
import type { Category, CategoryData, FichaTecnica, Ingredient, CheckListItem, ShoppingListItem } from './types';
import { MenuIcon } from './components/icons/MenuIcon';
import { generateChecklistForCategory } from './services/geminiService';
import Spinner from './components/Spinner';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return localStorage.getItem('isAuthenticated') === 'true';
    });

    const [data, setData] = useState<Record<Category, CategoryData>>(() => {
        const savedData = localStorage.getItem('appData');
        return savedData ? JSON.parse(savedData) : mockData;
    });

    const [selectedCategory, setSelectedCategory] = useState<Category>(CATEGORIES[0].id);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        localStorage.setItem('appData', JSON.stringify(data));
    }, [data]);

    // Verificar autenticação no carregamento
    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated');
        setIsAuthenticated(authStatus === 'true');
    }, []);

    // Se não estiver autenticado, mostrar página de login
    if (!isAuthenticated) {
        return <LoginPage />;
    }

    // Função de logout
    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userEmail');
        setIsAuthenticated(false);
    };

    const currentCategoryInfo = CATEGORIES.find(c => c.id === selectedCategory)!;
    const currentCategoryData = data[selectedCategory];

    const updateCategoryData = (categoryId: Category, updates: Partial<CategoryData>) => {
        setData(prevData => ({
            ...prevData,
            [categoryId]: {
                ...prevData[categoryId],
                ...updates
            }
        }));
    };
    
    // AI Checklist Generation
    const handleGenerateChecklist = async () => {
        if (data[selectedCategory].checklist.length > 0) {
            if (!window.confirm('Isso substituirá o checklist existente. Deseja continuar?')) {
                return;
            }
        }
        setIsGenerating(true);
        try {
            const items = await generateChecklistForCategory(currentCategoryInfo.name);
            const newChecklist: CheckListItem[] = items.map((text, index) => ({
                id: `ai-item-${Date.now()}-${index}`,
                text,
                completed: false,
            }));
            updateCategoryData(selectedCategory, { checklist: newChecklist });
        } catch (error) {
            console.error("Failed to generate checklist:", error);
            alert("Não foi possível gerar o checklist. Tente novamente.");
        } finally {
            setIsGenerating(false);
        }
    };


    // Ficha Técnica Handlers
    const handleSaveNewFicha = (newFichaData: Omit<FichaTecnica, 'id'>) => {
        const newFicha: FichaTecnica = {
            ...newFichaData,
            id: `ficha-${Date.now()}`
        };
        const updatedFichas = [...currentCategoryData.fichas, newFicha];
        updateCategoryData(selectedCategory, { fichas: updatedFichas });
    };

    const handleDeleteFicha = (fichaId: string) => {
        const updatedFichas = currentCategoryData.fichas.filter(f => f.id !== fichaId);
        updateCategoryData(selectedCategory, { fichas: updatedFichas });
    };
    
    const updateFicha = (fichaId: string, updates: Partial<FichaTecnica>) => {
        const updatedFichas = currentCategoryData.fichas.map(f =>
            f.id === fichaId ? { ...f, ...updates } : f
        );
        updateCategoryData(selectedCategory, { fichas: updatedFichas });
    }

    const handleUpdateFichaTitle = (fichaId: string, newTitle: string) => updateFicha(fichaId, { title: newTitle });
    const handleUpdateFichaSubcategory = (fichaId: string, newSubcategory: string) => updateFicha(fichaId, { subcategory: newSubcategory });
    const handleUpdateFichaImage = (fichaId: string, imageUrl: string) => updateFicha(fichaId, { imageUrl });

    // Ingredient Handlers
    const handleAddIngredient = (fichaId: string, newIngredientData: Omit<Ingredient, 'id'>) => {
        const newIngredient: Ingredient = { ...newIngredientData, id: `ing-${Date.now()}`};
        const ficha = currentCategoryData.fichas.find(f => f.id === fichaId);
        if (ficha) {
            const updatedIngredients = [...ficha.ingredients, newIngredient];
            updateFicha(fichaId, { ingredients: updatedIngredients });
        }
    };

    const handleUpdateIngredient = (fichaId: string, ingredientId: string, updatedIngredient: Omit<Ingredient, 'id'>) => {
        const ficha = currentCategoryData.fichas.find(f => f.id === fichaId);
        if (ficha) {
            const updatedIngredients = ficha.ingredients.map(ing => 
                ing.id === ingredientId ? { id: ing.id, ...updatedIngredient } : ing
            );
            updateFicha(fichaId, { ingredients: updatedIngredients });
        }
    };
    
    const handleDeleteIngredient = (fichaId: string, ingredientId: string) => {
        const ficha = currentCategoryData.fichas.find(f => f.id === fichaId);
        if (ficha) {
            const updatedIngredients = ficha.ingredients.filter(ing => ing.id !== ingredientId);
            updateFicha(fichaId, { ingredients: updatedIngredients });
        }
    };

    // Step Handlers
    const handleAddStep = (fichaId: string, newStep: string) => {
        const ficha = currentCategoryData.fichas.find(f => f.id === fichaId);
        if (ficha) {
            updateFicha(fichaId, { steps: [...ficha.steps, newStep] });
        }
    };

    const handleUpdateStep = (fichaId: string, stepIndex: number, updatedStep: string) => {
        const ficha = currentCategoryData.fichas.find(f => f.id === fichaId);
        if (ficha) {
            const updatedSteps = [...ficha.steps];
            updatedSteps[stepIndex] = updatedStep;
            updateFicha(fichaId, { steps: updatedSteps });
        }
    };

    const handleDeleteStep = (fichaId: string, stepIndex: number) => {
        const ficha = currentCategoryData.fichas.find(f => f.id === fichaId);
        if (ficha) {
            const updatedSteps = ficha.steps.filter((_, index) => index !== stepIndex);
            updateFicha(fichaId, { steps: updatedSteps });
        }
    };

    // Checklist Handlers
    const handleAddChecklistItem = (text: string) => {
        const newItem: CheckListItem = { id: `cl-${Date.now()}`, text, completed: false };
        updateCategoryData(selectedCategory, { checklist: [...currentCategoryData.checklist, newItem] });
    };

    const handleToggleChecklistItem = (id: string) => {
        const updatedChecklist = currentCategoryData.checklist.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        );
        updateCategoryData(selectedCategory, { checklist: updatedChecklist });
    };

    const handleDeleteChecklistItem = (id: string) => {
        const updatedChecklist = currentCategoryData.checklist.filter(item => item.id !== id);
        updateCategoryData(selectedCategory, { checklist: updatedChecklist });
    };
    
    const handleUpdateChecklistItem = (id: string, text: string) => {
        const updatedChecklist = currentCategoryData.checklist.map(item =>
            item.id === id ? { ...item, text } : item
        );
        updateCategoryData(selectedCategory, { checklist: updatedChecklist });
    };

    // Shopping List Handlers
    const handleAddShoppingListItem = (name: string, quantity: string) => {
        const newItem: ShoppingListItem = { id: `sl-${Date.now()}`, name, quantity, acquired: false };
        updateCategoryData(selectedCategory, { shoppingList: [...currentCategoryData.shoppingList, newItem] });
    };

    const handleToggleShoppingListItem = (id: string) => {
        const updatedList = currentCategoryData.shoppingList.map(item =>
            item.id === id ? { ...item, acquired: !item.acquired } : item
        );
        updateCategoryData(selectedCategory, { shoppingList: updatedList });
    };

    const handleDeleteShoppingListItem = (id: string) => {
        const updatedList = currentCategoryData.shoppingList.filter(item => item.id !== id);
        updateCategoryData(selectedCategory, { shoppingList: updatedList });
    };
    
    const handleUpdateShoppingListItem = (id: string, name: string, quantity: string) => {
        const updatedList = currentCategoryData.shoppingList.map(item =>
            item.id === id ? { ...item, name, quantity } : item
        );
        updateCategoryData(selectedCategory, { shoppingList: updatedList });
    };


    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <Sidebar 
                    categories={CATEGORIES}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                    isSidebarOpen={isSidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    onLogout={handleLogout}
                />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center p-4 bg-white/50 backdrop-blur-md border-b border-gray-200/50">
                    <div className="flex items-center">
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-gray-500 mr-4 lg:hidden">
                            <MenuIcon className="h-6 w-6" />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-800">{currentCategoryInfo.name}</h1>
                    </div>
                     <button
                        onClick={handleGenerateChecklist}
                        disabled={isGenerating}
                        className="text-sm bg-[#02a7a0] hover:bg-[#018d87] text-white font-bold py-2 px-4 rounded-full transition-colors flex items-center gap-1.5 disabled:opacity-50"
                    >
                        {isGenerating ? <Spinner /> : 'Gerar Checklist com IA'}
                    </button>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-6">
                    <MainContent
                        categoryInfo={currentCategoryInfo}
                        data={currentCategoryData}
                        onSaveNewFicha={handleSaveNewFicha}
                        onDeleteFicha={handleDeleteFicha}
                        onUpdateFichaTitle={handleUpdateFichaTitle}
                        onUpdateFichaSubcategory={handleUpdateFichaSubcategory}
                        onUpdateFichaImage={handleUpdateFichaImage}
                        onAddIngredient={handleAddIngredient}
                        onUpdateIngredient={handleUpdateIngredient}
                        onDeleteIngredient={handleDeleteIngredient}
                        onAddStep={handleAddStep}
                        onUpdateStep={handleUpdateStep}
                        onDeleteStep={handleDeleteStep}
                        onAddChecklistItem={handleAddChecklistItem}
                        onToggleChecklistItem={handleToggleChecklistItem}
                        onDeleteChecklistItem={handleDeleteChecklistItem}
                        onUpdateChecklistItem={handleUpdateChecklistItem}
                        onAddShoppingListItem={handleAddShoppingListItem}
                        onToggleShoppingListItem={handleToggleShoppingListItem}
                        onDeleteShoppingListItem={handleDeleteShoppingListItem}
                        onUpdateShoppingListItem={handleUpdateShoppingListItem}
                    />
                </main>
            </div>
        </div>
    );
}

export default App;
