'use client';

import { useState, useEffect } from 'react';

export default function StylesPanel({ onClose, selectedComponent, onApplyStyle }) {
  const [stylesList, setStylesList] = useState([]);
  const [newStyleName, setNewStyleName] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ps_styles');
    if (saved) {
      try {
        setStylesList(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse styles');
      }
    }
  }, []);

  // Save to localStorage whenever styles change
  useEffect(() => {
    localStorage.setItem('ps_styles', JSON.stringify(stylesList));
  }, [stylesList]);

  const addCurrentStyle = () => {
    if (!selectedComponent || !newStyleName.trim()) return;
    const styleData = selectedComponent.props._styles;
    if (!styleData) {
      alert("El componente seleccionado no tiene configuraciones de estilo.");
      return;
    }
    
    const newStyle = {
      id: Date.now().toString(),
      name: newStyleName.trim(),
      type: selectedComponent.type, // Track component type to know compatibility
      data: styleData
    };
    
    setStylesList([...stylesList, newStyle]);
    setNewStyleName('');
  };

  const removeStyle = (id) => {
    setStylesList(stylesList.filter(s => s.id !== id));
  };

  const applyStyle = (style) => {
    if (!selectedComponent) {
      alert("Selecciona un componente primero para aplicar el estilo.");
      return;
    }
    // Opcional: advertir si los tipos no coinciden
    if (style.type !== selectedComponent.type) {
      const confirm = window.confirm(`Este estilo fue guardado de un [${style.type}]. ¿Estás seguro de aplicarlo a [${selectedComponent.type}]? Puede que algunas propiedades no coincidan.`);
      if (!confirm) return;
    }
    onApplyStyle(selectedComponent.id, '_styles', style.data);
  };

  return (
    <div className="fixed top-32 right-8 w-64 bg-[#2c2c2c] border border-[#404040] rounded shadow-2xl z-50 overflow-hidden flex flex-col text-[#b3b3b3] select-none" style={{ fontFamily: 'sans-serif' }}>
      
      {/* Header */}
      <div className="flex items-center justify-between px-2 py-1 bg-[#1e1e1e] border-b border-[#404040]">
        <div className="flex items-center gap-2">
          {/* Mini lines icon */}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <span className="text-[10px] font-bold tracking-wider text-white">Estilos Gráficos</span>
        </div>
        <button onClick={onClose} className="text-[#888] hover:text-white transition-colors" title="Cerrar">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div className="p-2 flex flex-col gap-2">
        {/* Styles List */}
        <div className="bg-[#222] border border-[#111] rounded shadow-inner min-h-[150px] max-h-[250px] overflow-y-auto content-start p-1 flex flex-col gap-1">
          {stylesList.length === 0 && (
            <div className="text-[10px] text-[#666] text-center italic mt-4">No hay estilos guardados</div>
          )}
          {stylesList.map((style) => (
            <div
              key={style.id}
              className="group flex items-center justify-between p-1.5 border border-[#333] hover:border-[#666] bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded cursor-pointer transition-colors"
              title={`Aplicar a componente seleccionado\nOrigen: ${style.type}`}
              onClick={() => applyStyle(style)}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <svg className="w-3 h-3 text-accent shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                <div className="flex flex-col truncate">
                  <span className="text-[11px] text-white truncate">{style.name}</span>
                  <span className="text-[8px] text-[#888] uppercase tracking-wider">{style.type.replace('Section','')}</span>
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); removeStyle(style.id); }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 text-[#888] transition-all"
                title="Eliminar estilo"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          ))}
        </div>

        {/* Save Current Style Controls */}
        <div className="flex items-center gap-1 mt-1 pt-2 border-t border-[#404040]">
          <div className="flex-1 flex items-center border border-[#404040] rounded bg-[#333] px-2 focus-within:ring-1 focus-within:ring-accent">
            <input
              type="text"
              placeholder={selectedComponent ? `Nombrar estilo actual...` : "Selecciona comp..."}
              value={newStyleName}
              onChange={e => setNewStyleName(e.target.value)}
              className="w-full bg-transparent text-[10px] text-white outline-none py-1.5"
              disabled={!selectedComponent}
            />
          </div>
          <button 
            onClick={addCurrentStyle}
            disabled={!selectedComponent || !newStyleName.trim()}
            className="bg-[#444] hover:bg-[#555] disabled:opacity-50 disabled:cursor-not-allowed text-white p-1.5 rounded transition-colors"
            title="Guardar Estilo del Componente Seleccionado"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
