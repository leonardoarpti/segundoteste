
import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, Send, Loader2, BookOpen } from 'lucide-react';
import { analyzeImageAndText } from '../services/geminiService';

const AssistantTab: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image && !prompt) return;
    setIsLoading(true);
    setResponse(null);
    try {
      const base64 = image ? image.split(',')[1] : '';
      const result = await analyzeImageAndText(base64, prompt);
      setResponse(result || 'Nenhuma análise gerada.');
    } catch (err) {
      setResponse('Erro ao analisar conteúdo. Verifique sua conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-2">
            <Camera className="text-blue-600" /> Analisar Imagem ou Trecho
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Envie uma foto de uma página da Constituição, seus esquemas de estudo ou faça uma pergunta direta.
          </p>

          <div className="space-y-4">
            {image && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-100">
                <img src={image} alt="Preview" className="w-full h-full object-contain" />
                <button 
                  onClick={() => setImage(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            <div className="flex gap-2">
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-slate-500 hover:text-blue-600"
              >
                <ImageIcon size={24} className="mb-1" />
                <span className="text-xs font-semibold">Carregar Foto</span>
              </button>
              <button 
                onClick={() => fileInputRef.current?.click()} // Simulating camera if mobile
                className="flex-1 flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-slate-500 hover:text-blue-600"
              >
                <Camera size={24} className="mb-1" />
                <span className="text-xs font-semibold">Tirar Foto</span>
              </button>
            </div>

            <div className="relative">
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Resuma os principais pontos deste artigo ou tire uma dúvida..."
                className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none text-slate-700"
              />
              <button 
                onClick={handleAnalyze}
                disabled={isLoading || (!image && !prompt)}
                className="absolute bottom-3 right-3 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                Analisar
              </button>
            </div>
          </div>
        </div>

        {response && (
          <div className="border-t border-slate-100 p-6 bg-slate-50">
             <div className="flex items-center gap-2 mb-4 text-blue-700 font-bold text-sm uppercase">
                <BookOpen size={16} /> Resultado da Análise
              </div>
              <div className="prose prose-slate max-w-none text-slate-700 whitespace-pre-wrap text-sm leading-relaxed">
                {response}
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssistantTab;
