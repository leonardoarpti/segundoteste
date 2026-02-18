
import React, { useState } from 'react';
import { CONSTITUTION_DATA } from './constants';
import { ViewMode } from './types';
import { Book, BrainCircuit, Search, Menu, X, Landmark, ClipboardList } from 'lucide-react';
import ArticleCard from './components/ArticleCard';
import AssistantTab from './components/AssistantTab';

const App: React.FC = () => {
  const [activeMode, setActiveMode] = useState<ViewMode>(ViewMode.READING);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredTopics = CONSTITUTION_DATA.map(topic => ({
    ...topic,
    articles: topic.articles.filter(art => 
      art.content.toLowerCase().includes(searchTerm.toLowerCase()) || 
      art.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.number.toString().includes(searchTerm)
    )
  })).filter(topic => topic.articles.length > 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-slate-100 rounded-lg lg:hidden"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-blue-700 text-white p-2 rounded-lg">
              <Landmark size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">Legis IA</h1>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Constituição Federal</p>
            </div>
          </div>
        </div>

        <nav className="hidden md:flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveMode(ViewMode.READING)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${activeMode === ViewMode.READING ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Book size={18} /> Leitura
          </button>
          <button 
            onClick={() => setActiveMode(ViewMode.ANALYSIS)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${activeMode === ViewMode.ANALYSIS ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <BrainCircuit size={18} /> Assistente IA
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text"
              placeholder="Pesquisar artigo..."
              className="bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-48 md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 flex">
        {/* Sidebar Navigation */}
        <aside className={`fixed inset-0 z-40 bg-white lg:static lg:block lg:w-72 border-r border-slate-200 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center lg:hidden">
               <span className="font-bold">Navegação</span>
               <button onClick={() => setIsSidebarOpen(false)}><X size={20}/></button>
            </div>
            <div className="p-4 overflow-y-auto">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Tópicos Principais</h3>
              <nav className="space-y-1">
                {CONSTITUTION_DATA.map(topic => (
                  <button 
                    key={topic.id}
                    onClick={() => {
                      setActiveMode(ViewMode.READING);
                      setIsSidebarOpen(false);
                      document.getElementById(topic.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center gap-3"
                  >
                    <ClipboardList size={16} className="text-slate-400" />
                    <span className="truncate">{topic.title}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-8 p-4 bg-blue-50 rounded-xl">
                 <p className="text-xs font-bold text-blue-800 mb-1">Dica de Estudo</p>
                 <p className="text-[11px] text-blue-600 leading-relaxed">
                   Use o Assistente IA para explicar artigos que possuem termos em latim ou conceitos abstratos.
                 </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          {activeMode === ViewMode.READING ? (
            <div className="max-w-3xl mx-auto">
              {filteredTopics.length > 0 ? (
                filteredTopics.map(topic => (
                  <section key={topic.id} id={topic.id} className="mb-12">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                      <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                      {topic.title}
                    </h2>
                    <div className="space-y-4">
                      {topic.articles.map(article => (
                        <ArticleCard key={article.id} article={article} />
                      ))}
                    </div>
                  </section>
                ))
              ) : (
                <div className="text-center py-20">
                  <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <Search size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">Nenhum resultado</h3>
                  <p className="text-slate-500">Tente buscar por um número de artigo ou palavra-chave diferente.</p>
                </div>
              )}
            </div>
          ) : (
            <AssistantTab />
          )}
        </div>
      </main>

      {/* Mobile Nav Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-around items-center z-30">
        <button 
          onClick={() => setActiveMode(ViewMode.READING)}
          className={`flex flex-col items-center gap-1 ${activeMode === ViewMode.READING ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <Book size={20} />
          <span className="text-[10px] font-bold">Leitura</span>
        </button>
        <button 
          onClick={() => setActiveMode(ViewMode.ANALYSIS)}
          className={`flex flex-col items-center gap-1 ${activeMode === ViewMode.ANALYSIS ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <BrainCircuit size={20} />
          <span className="text-[10px] font-bold">IA</span>
        </button>
      </div>
    </div>
  );
};

export default App;
