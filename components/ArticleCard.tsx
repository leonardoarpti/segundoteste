
import React, { useState } from 'react';
import { Article } from '../types';
import { Sparkles, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { getExplanation } from '../services/geminiService';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleExplain = async () => {
    if (explanation) {
      setExplanation(null);
      return;
    }
    setIsLoading(true);
    try {
      const result = await getExplanation(article.content + (article.details?.join(' ') || ''));
      setExplanation(result || 'Não foi possível gerar uma explicação no momento.');
    } catch (error) {
      setExplanation('Erro ao carregar explicação da IA.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-4 transition-all hover:shadow-md">
      <div 
        className="p-5 flex justify-between items-start cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-bold">Art. {article.number}</span>
            <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">{article.topic}</span>
          </div>
          <p className="legal-text text-slate-800 leading-relaxed font-medium">
            {article.content}
          </p>
        </div>
        <div className="ml-4 text-slate-400 group-hover:text-blue-500 transition-colors">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {isExpanded && (
        <div className="px-5 pb-5 border-t border-slate-50 pt-4 bg-slate-50/50">
          {article.details && (
            <ul className="space-y-2 mb-6">
              {article.details.map((detail, idx) => (
                <li key={idx} className="legal-text text-slate-700 text-sm border-l-2 border-blue-200 pl-4 py-1">
                  {detail}
                </li>
              ))}
            </ul>
          )}

          <div className="flex gap-2">
            <button 
              onClick={handleExplain}
              disabled={isLoading}
              className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Sparkles size={16} />
              )}
              {explanation ? 'Esconder Explicação' : 'Explicar com IA'}
            </button>
          </div>

          {explanation && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-lg">
              <div className="flex items-center gap-2 mb-2 text-amber-800 font-semibold text-xs uppercase">
                <MessageCircle size={14} /> Professor Virtual
              </div>
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                {explanation}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
