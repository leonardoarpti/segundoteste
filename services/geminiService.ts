
import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `Você é um Professor Especialista em Direito Constitucional Brasileiro. 
Seu objetivo é ajudar estudantes a entenderem a Constituição Federal de 1988 de forma clara, didática e precisa.
Sempre cite os artigos relevantes e explique termos jurídicos complexos ("juridiquês") para linguagem simples.
Ao analisar imagens de textos da constituição ou anotações, identifique os tópicos e resuma os pontos chave.`;

export const getExplanation = async (text: string, context?: string) => {
  const model = 'gemini-3-flash-preview';
  const prompt = `Explique o seguinte trecho da Constituição: "${text}". ${context ? `Considere este contexto adicional: ${context}` : ''}`;
  
  const response = await ai.models.generateContent({
    model,
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });

  return response.text;
};

export const analyzeImageAndText = async (base64Image: string, prompt: string) => {
  const model = 'gemini-3-flash-preview';
  
  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
        { text: prompt || "Analise esta imagem relacionada ao estudo da Constituição e explique o conteúdo principal." }
      ]
    },
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });

  return response.text;
};

export const generateQuiz = async (topic: string) => {
  const model = 'gemini-3-flash-preview';
  const response = await ai.models.generateContent({
    model,
    contents: `Gere uma questão de múltipla escolha (A a D) sobre o tema: ${topic} na Constituição Federal. Inclua a resposta correta e uma breve explicação no final.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          correctIndex: { type: Type.INTEGER },
          explanation: { type: Type.STRING }
        },
        required: ["question", "options", "correctIndex", "explanation"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
