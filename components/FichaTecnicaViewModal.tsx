import React from 'react';
import type { FichaTecnica } from '../types';
import Modal from './Modal';
import { ImageIcon } from './icons/ImageIcon';

interface FichaTecnicaViewModalProps {
    ficha: FichaTecnica | null;
    onClose: () => void;
}

const FichaTecnicaViewModal: React.FC<FichaTecnicaViewModalProps> = ({ ficha, onClose }) => {
    if (!ficha) {
        return null;
    }

    return (
        <Modal isOpen={!!ficha} onClose={onClose} title={ficha.title}>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 flex-shrink-0">
                    {ficha.imageUrl ? (
                        <img src={ficha.imageUrl} alt={ficha.title} className="w-full h-auto object-cover rounded-lg shadow-md"/>
                    ) : (
                        <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-center text-gray-500">
                             <div>
                                <ImageIcon className="h-12 w-12 mx-auto mb-2"/>
                                <span className="text-sm font-medium">Sem Foto</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">Ingredientes</h3>
                     {ficha.ingredients.length > 0 ? (
                        <ul className="space-y-2 mb-4">
                            {ficha.ingredients.map(ingredient => (
                                <li key={ingredient.id} className="text-gray-700 flex justify-between">
                                    <span>{ingredient.name}</span>
                                    <span className="text-gray-500 text-sm">{ingredient.quantity} {ingredient.unit}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-sm mb-4">Nenhum ingrediente listado.</p>
                    )}

                    <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-3 border-b border-gray-200 pb-2">Modo de Preparo</h3>
                    {ficha.steps.length > 0 ? (
                        <ol className="space-y-2 list-decimal list-inside text-gray-500 text-sm">
                            {ficha.steps.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                    ) : (
                        <p className="text-gray-500 text-sm">Nenhum passo de preparo listado.</p>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default FichaTecnicaViewModal;