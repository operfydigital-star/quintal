
import { GoogleGenAI, Type } from "@google/genai";

// FIX: Initialize GoogleGenAI client directly with the API key from the environment variable as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateChecklistForCategory(category: string): Promise<string[]> {
    const prompt = `Crie um checklist conciso para a área de "${category}" em um bar e restaurante brasileiro. Os itens devem ser ações práticas e diretas. Retorne apenas uma lista de strings em JSON.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        checklist: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING
                            }
                        }
                    }
                }
            }
        });

        const jsonString = response.text.trim();
        const parsed = JSON.parse(jsonString);
        
        if (parsed && Array.isArray(parsed.checklist)) {
            return parsed.checklist;
        } else {
            console.error("Parsed response is not in the expected format:", parsed);
            // Fallback for unexpected structure
            return ["Formato de resposta inesperado da IA."];
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate checklist from AI.");
    }
}