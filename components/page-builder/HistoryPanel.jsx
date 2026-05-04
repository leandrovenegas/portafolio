'use client';

import { useDraggable } from './useDraggable';

export default function HistoryPanel({ onClose, history, currentIndex, onSelectHistory }) {
  const { pos, dragProps } = useDraggable({ x: window.innerWidth - 300, y: 150 });

  return (
    <div 
      className="fixed bg-[#2c2c2c] border border-[#404040] rounded shadow-2xl z-[100] overflow-hidden flex flex-col text-[#b3b3b3] select-none w-64" 
      style={{ left: pos.x, top: pos.y, fontFamily: 'sans-serif' }}
    >
      
      {/* Header */}
      <div 
        className="flex items-center justify-between px-2 py-1 bg-[#1e1e1e] border-b border-[#404040] cursor-move"
        {...dragProps}
      >
        <div className="flex items-center gap-2">
          {/* Mini history icon */}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10"></polyline>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
          </svg>
          <span className="text-[10px] font-bold tracking-wider text-white">Historia</span>
        </div>
        <button onClick={onClose} className="text-[#888] hover:text-white transition-colors" title="Cerrar">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div className="flex flex-col">
        {/* History List */}
        <div className="bg-[#2a2a2a] max-h-[300px] overflow-y-auto content-start flex flex-col">
          {history.length === 0 && (
            <div className="text-[10px] text-[#666] text-center italic p-4">No hay historial disponible</div>
          )}
          {history.map((item, idx) => {
            const isCurrent = idx === currentIndex;
            const isFuture = idx > currentIndex;
            
            return (
              <div
                key={idx}
                className={`flex items-center gap-2 px-3 py-1.5 cursor-pointer transition-colors border-b border-[#333] ${
                  isCurrent ? 'bg-[#404040] text-white' : 
                  isFuture ? 'text-[#666] italic' : 'hover:bg-[#333] text-[#ccc]'
                }`}
                title={new Date(item.timestamp).toLocaleTimeString()}
                onClick={() => onSelectHistory(idx)}
              >
                {/* Active Indicator Icon */}
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                  {isCurrent && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  )}
                </div>
                
                {/* Action Icon depending on type */}
                <div className="w-4 h-4 flex items-center justify-center shrink-0 opacity-70">
                  {item.actionName.includes('Inicio') ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                  ) : item.actionName.includes('Añadir') ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                  ) : item.actionName.includes('Eliminar') ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  ) : item.actionName.includes('Mover') ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="5 9 2 12 5 15"></polyline><polyline points="9 5 12 2 15 5"></polyline><polyline points="19 9 22 12 19 15"></polyline><polyline points="9 19 12 22 15 19"></polyline><line x1="2" y1="12" x2="22" y2="12"></line><line x1="12" y1="2" x2="12" y2="22"></line></svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  )}
                </div>
                
                <span className="text-[11px] truncate flex-1">{item.actionName}</span>
              </div>
            );
          })}
        </div>
        
        {/* Footer info */}
        <div className="px-2 py-1.5 border-t border-[#404040] bg-[#222] text-[9px] text-[#666] text-center">
          Ctrl + Z para deshacer
        </div>
      </div>
    </div>
  );
}
