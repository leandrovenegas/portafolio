'use client';
import { useState, useEffect } from 'react';
import { useDraggable } from './useDraggable';
import TypographyPanel from './TypographyPanel';

export default function GlobalTypographyPanel({ onClose, selectedComponent, onApplyStyle, focusedField }) {
  const { pos, dragProps } = useDraggable({ x: window.innerWidth - 300, y: 150 });
  const [selectedField, setSelectedField] = useState('');

  // Auto-select first available typography field when component changes, or switch to focused field
  useEffect(() => {
    if (!selectedComponent || !selectedComponent.props._styles) {
      setSelectedField('');
      return;
    }

    const fields = Object.keys(selectedComponent.props._styles);
    if (fields.length === 0) {
      setSelectedField('');
      return;
    }

    // If the newly focused field is valid for typography, switch to it automatically
    if (focusedField && fields.includes(focusedField)) {
      setSelectedField(focusedField);
    } 
    // Otherwise, ensure we have a valid selection if none is set
    else if (!fields.includes(selectedField)) {
      setSelectedField(fields[0]);
    }
  }, [selectedComponent, focusedField, selectedField]);

  const fields = selectedComponent?.props?._styles ? Object.keys(selectedComponent.props._styles) : [];

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
          {/* Typography Icon */}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 7 4 4 20 4 20 7"></polyline>
            <line x1="9" y1="20" x2="15" y2="20"></line>
            <line x1="12" y1="4" x2="12" y2="20"></line>
          </svg>
          <span className="text-[10px] font-bold tracking-wider text-white">Carácter / Párrafo</span>
        </div>
        <button onClick={onClose} className="text-[#888] hover:text-white transition-colors" title="Cerrar">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div className="flex flex-col p-2 gap-2">
        {!selectedComponent ? (
          <div className="text-[10px] text-[#666] text-center p-4 italic">
            Selecciona un componente para editar sus tipografías.
          </div>
        ) : fields.length === 0 ? (
          <div className="text-[10px] text-[#666] text-center p-4 italic">
            Este componente no tiene tipografías editables.
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-[#666]">Campo a editar</label>
              <select 
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="w-full bg-[#333] border border-[#404040] text-white text-[11px] p-1.5 rounded outline-none focus:ring-1 focus:ring-accent cursor-pointer"
              >
                {fields.map(f => (
                  <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>
                ))}
              </select>
            </div>

            {selectedField && (
              <div className="-mx-2 -mb-2 mt-1 border-t border-[#404040]">
                <TypographyPanel 
                  fieldKey={selectedField}
                  styles={selectedComponent.props._styles}
                  onStylesChange={(newStyles) => onApplyStyle(selectedComponent.id, '_styles', newStyles)}
                  embedded={true}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
