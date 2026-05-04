'use client';

import { useState, useEffect } from 'react';
import { useDraggable } from './useDraggable';

export default function SwatchesPanel({ onClose }) {
  const [swatches, setSwatches] = useState([]);
  const [newColor, setNewColor] = useState('#ff0000');
  
  const { pos, dragProps } = useDraggable({ x: window.innerWidth - 300, y: 150 });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ps_swatches');
    if (saved) {
      try {
        setSwatches(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse swatches');
      }
    } else {
      // Default basic swatches
      setSwatches([
        '#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff',
        '#ffff00', '#00ffff', '#ff00ff', '#888888', '#cccccc'
      ]);
    }
  }, []);

  // Save to localStorage whenever swatches change
  useEffect(() => {
    if (swatches.length > 0) {
      localStorage.setItem('ps_swatches', JSON.stringify(swatches));
    }
  }, [swatches]);

  const addSwatch = () => {
    if (!swatches.includes(newColor)) {
      setSwatches([...swatches, newColor]);
    }
  };

  const removeSwatch = (index) => {
    const newSwatches = [...swatches];
    newSwatches.splice(index, 1);
    setSwatches(newSwatches);
  };

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
  };

  return (
    <div 
      className="fixed bg-[#2c2c2c] border border-[#404040] rounded shadow-2xl z-[100] overflow-hidden flex flex-col text-[#b3b3b3] select-none w-64" 
      style={{ left: pos.x, top: pos.y, fontFamily: 'sans-serif' }}
    >
      
      {/* Header / Drag Handle area (visual only for now) */}
      <div 
        className="flex items-center justify-between px-2 py-1 bg-[#1e1e1e] border-b border-[#404040] cursor-move"
        {...dragProps}
      >
        <div className="flex items-center gap-2">
          {/* Mini lines icon */}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <span className="text-[10px] font-bold tracking-wider text-white">Muestras</span>
        </div>
        <button onClick={onClose} className="text-[#888] hover:text-white transition-colors" title="Cerrar">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div className="p-2 flex flex-col gap-2">
        {/* Swatches Grid */}
        <div className="grid grid-cols-7 gap-1 p-1 bg-[#222] border border-[#111] rounded shadow-inner min-h-[100px] content-start">
          {swatches.map((color, idx) => (
            <div
              key={idx}
              className="w-full pt-[100%] relative cursor-pointer border border-[#444] hover:border-white transition-colors"
              title={`Copiar ${color} (Click derecho para eliminar)`}
              onClick={() => copyToClipboard(color)}
              onContextMenu={(e) => {
                e.preventDefault();
                removeSwatch(idx);
              }}
            >
              <div className="absolute inset-0" style={{ backgroundColor: color }} />
            </div>
          ))}
        </div>

        {/* Add new color controls */}
        <div className="flex items-center gap-2 mt-1">
          <div className="flex-1 flex items-center border border-[#404040] rounded bg-[#333] px-1 focus-within:ring-1 focus-within:ring-accent">
            <input
              type="color"
              value={newColor}
              onChange={e => setNewColor(e.target.value)}
              className="w-5 h-5 rounded cursor-pointer border-none bg-transparent p-0"
              title="Seleccionar color"
            />
            <input
              type="text"
              value={newColor}
              onChange={e => setNewColor(e.target.value)}
              className="w-full bg-transparent text-[10px] font-mono text-white outline-none px-2 uppercase"
            />
          </div>
          <button 
            onClick={addSwatch}
            className="bg-[#444] hover:bg-[#555] text-white p-1 rounded transition-colors"
            title="Añadir a muestras"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
        </div>
        
        <div className="text-[9px] text-[#666] text-center mt-1">
          Click: Copiar HEX • Click Derecho: Eliminar
        </div>
      </div>
    </div>
  );
}
