'use client';

import { useState } from 'react';

const BREAKPOINTS = [
  { key: 'mobile',  label: '📱', title: 'Móvil' },
  { key: 'tablet',  label: '💻', title: 'Tablet' },
  { key: 'desktop', label: '🖥', title: 'Desktop' },
];

export default function TypographyPanel({ fieldKey, styles, onStylesChange, embedded = false, activeBp, onActiveBpChange }) {
  const [localActiveBp, setLocalActiveBp] = useState('mobile');

  const resolvedActiveBp = activeBp !== undefined ? activeBp : localActiveBp;
  const setActiveBp = onActiveBpChange !== undefined ? onActiveBpChange : setLocalActiveBp;

  const currentStyle = styles?.[fieldKey]?.[resolvedActiveBp] || {
    fontSize: 16, color: '#ffffff', fontWeight: '400', fontStyle: 'normal',
    textTransform: 'none', letterSpacing: 0, lineHeight: 1.5,
    paddingTop: 0, paddingBottom: 0, textAlign: 'left', textDecoration: 'none'
  };

  const updateStyle = (prop, value) => {
    const updated = {
      ...(styles || {}),
      [fieldKey]: {
        ...(styles?.[fieldKey] || {}),
        [resolvedActiveBp]: {
          ...currentStyle,
          [prop]: value,
        }
      }
    };
    onStylesChange(updated);
  };

  const toggleStyle = (prop, activeValue, inactiveValue) => {
    updateStyle(prop, currentStyle[prop] === activeValue ? inactiveValue : activeValue);
  };

  return (
    <div 
      className={`bg-[#2c2c2c] overflow-hidden select-none text-[#b3b3b3] ${embedded ? '' : 'mt-2 border border-[#404040] rounded-md shadow-lg'}`} 
      style={{ width: '100%', fontFamily: 'sans-serif' }}
    >
      
      {/* Breakpoint Tabs (Like workspace tabs) */}
      <div className="flex bg-[#1e1e1e] border-b border-[#404040]">
        {BREAKPOINTS.map(bp => (
          <button
            key={bp.key}
            onClick={() => setActiveBp(bp.key)}
            title={bp.title}
            className={`flex-1 py-1.5 text-[10px] uppercase font-bold transition-colors border-r border-[#404040] last:border-r-0 ${
              resolvedActiveBp === bp.key ? 'bg-[#2c2c2c] text-white' : 'text-[#888] hover:text-[#bbb] hover:bg-[#2a2a2a]'
            }`}
          >
            {bp.label} {bp.key}
          </button>
        ))}
      </div>

      <div className="p-3 flex flex-col gap-4">
        
        {/* === CHARACTER PANEL SECTION === */}
        <div className="flex flex-col gap-3">
          {/* Section title */}
          <div className="text-[9px] font-bold uppercase tracking-widest text-[#666] mb-1">Character</div>

          {/* Row 1: Font Family & Font Weight */}
          <div className="flex gap-2">
            <div className="flex-1 border border-[#404040] rounded bg-[#333] px-2 py-1 focus-within:ring-1 focus-within:ring-accent">
              <select
                value={currentStyle.fontFamily || ''}
                onChange={e => updateStyle('fontFamily', e.target.value)}
                className="w-full text-[10px] bg-transparent text-white outline-none cursor-pointer"
              >
                <option value="" className="bg-[#333] text-white">Default Font</option>
                <option value="var(--font-display)" className="bg-[#333] text-white">Display (Heading)</option>
                <option value="var(--font-body)" className="bg-[#333] text-white">Body (Sans)</option>
                <option value="sans-serif" className="bg-[#333] text-white">System Sans-Serif</option>
                <option value="serif" className="bg-[#333] text-white">System Serif</option>
                <option value="monospace" className="bg-[#333] text-white">Monospace</option>
              </select>
            </div>
            <div className="w-24 border border-[#404040] rounded bg-[#333] px-2 py-1 focus-within:ring-1 focus-within:ring-accent">
              <select
                value={currentStyle.fontWeight || '400'}
                onChange={e => updateStyle('fontWeight', e.target.value)}
                className="w-full text-[10px] bg-transparent text-white outline-none cursor-pointer"
              >
                <option value="100" className="bg-[#333] text-white">Thin</option>
                <option value="300" className="bg-[#333] text-white">Light</option>
                <option value="400" className="bg-[#333] text-white">Regular</option>
                <option value="500" className="bg-[#333] text-white">Medium</option>
                <option value="600" className="bg-[#333] text-white">SemiBold</option>
                <option value="700" className="bg-[#333] text-white">Bold</option>
                <option value="900" className="bg-[#333] text-white">Black</option>
              </select>
            </div>
          </div>

          {/* Row 2: Font Size with Slider */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-[10px]">
              <span className="flex items-center gap-1 text-[#888] font-bold uppercase tracking-wider">
                <svg className="w-3.5 h-3.5 text-[#888]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
                Tamaño (px)
              </span>
              <input
                type="number"
                value={currentStyle.fontSize ?? 16}
                onChange={e => updateStyle('fontSize', Number(e.target.value))}
                className="w-16 bg-[#333] border border-[#404040] rounded text-[10px] text-white text-center py-0.5 outline-none font-mono"
              />
            </div>
            <input
              type="range"
              min="8"
              max="160"
              step="1"
              value={currentStyle.fontSize ?? 16}
              onChange={e => updateStyle('fontSize', Number(e.target.value))}
              style={{ accentColor: 'var(--color-accent, #FFCC00)' }}
              className="w-full h-1 bg-[#444] rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Row 3: Line Height (Interlineado) with Slider supporting negative values */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-[10px]">
              <span className="flex items-center gap-1 text-[#888] font-bold uppercase tracking-wider">
                <svg className="w-3.5 h-3.5 text-[#888]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v16"/><path d="m8 8 4-4 4 4"/><path d="m8 16 4 4 4-4"/></svg>
                Interlineado
              </span>
              <input
                type="number"
                step="0.05"
                value={currentStyle.lineHeight ?? 1.5}
                onChange={e => updateStyle('lineHeight', Number(e.target.value))}
                className="w-16 bg-[#333] border border-[#404040] rounded text-[10px] text-white text-center py-0.5 outline-none font-mono"
              />
            </div>
            <input
              type="range"
              min="-2"
              max="3"
              step="0.05"
              value={currentStyle.lineHeight ?? 1.5}
              onChange={e => updateStyle('lineHeight', Number(e.target.value))}
              style={{ accentColor: 'var(--color-accent, #FFCC00)' }}
              className="w-full h-1 bg-[#444] rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Row 4: Tracking / Letter Spacing with Slider */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-[10px]">
              <span className="flex items-center gap-1 text-[#888] font-bold uppercase tracking-wider">
                <svg className="w-3.5 h-3.5 text-[#888]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16"/><path d="m8 8-4 4 4 4"/><path d="m16 16 4-4-4-4"/></svg>
                Espaciado (em)
              </span>
              <input
                type="number"
                step="0.01"
                value={currentStyle.letterSpacing ?? 0}
                onChange={e => updateStyle('letterSpacing', Number(e.target.value))}
                className="w-16 bg-[#333] border border-[#404040] rounded text-[10px] text-white text-center py-0.5 outline-none font-mono"
              />
            </div>
            <input
              type="range"
              min="-0.2"
              max="1"
              step="0.01"
              value={currentStyle.letterSpacing ?? 0}
              onChange={e => updateStyle('letterSpacing', Number(e.target.value))}
              style={{ accentColor: 'var(--color-accent, #FFCC00)' }}
              className="w-full h-1 bg-[#444] rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Row 5: Color Picker */}
          <div className="flex gap-2 items-center">
            <label className="text-[10px] text-[#888] font-bold uppercase tracking-wider">Color</label>
            <div className="flex-1 flex items-center gap-2 border border-[#404040] rounded bg-[#333] px-2 py-1">
              <input
                type="color"
                value={currentStyle.color || '#ffffff'}
                onChange={e => updateStyle('color', e.target.value)}
                className="w-4 h-4 rounded cursor-pointer border border-[#666] bg-transparent p-0"
                title="Text Color"
              />
              <input
                type="text"
                value={currentStyle.color || ''}
                onChange={e => updateStyle('color', e.target.value)}
                placeholder="Auto"
                className="w-full bg-transparent text-[11px] text-white outline-none font-mono"
              />
            </div>
          </div>

          {/* Faux Character Styles (Toggles) */}
          <div className="flex gap-0.5 mt-1 border border-[#404040] rounded bg-[#333] p-0.5 w-fit">
            <button
              onClick={() => toggleStyle('fontStyle', 'italic', 'normal')}
              className={`p-1.5 rounded transition-colors ${currentStyle.fontStyle === 'italic' ? 'bg-[#555] text-white shadow-inner' : 'hover:bg-[#444]'}`}
              title="Faux Italic"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>
            </button>
            <button
              onClick={() => toggleStyle('textTransform', 'uppercase', 'none')}
              className={`p-1.5 rounded transition-colors ${currentStyle.textTransform === 'uppercase' ? 'bg-[#555] text-white shadow-inner' : 'hover:bg-[#444]'}`}
              title="All Caps"
            >
              <span className="text-[10px] font-bold tracking-tighter leading-none">TT</span>
            </button>
            <button
              onClick={() => toggleStyle('textDecoration', 'underline', 'none')}
              className={`p-1.5 rounded transition-colors ${currentStyle.textDecoration === 'underline' ? 'bg-[#555] text-white shadow-inner' : 'hover:bg-[#444]'}`}
              title="Underline"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>
            </button>
            <button
              onClick={() => toggleStyle('textDecoration', 'line-through', 'none')}
              className={`p-1.5 rounded transition-colors ${currentStyle.textDecoration === 'line-through' ? 'bg-[#555] text-white shadow-inner' : 'hover:bg-[#444]'}`}
              title="Strikethrough"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" y1="12" x2="20" y2="12"/></svg>
            </button>
          </div>
        </div>

        <div className="h-px bg-[#404040] w-full" />

        {/* === PARAGRAPH PANEL SECTION === */}
        <div className="flex flex-col gap-2">
          <div className="text-[9px] font-bold uppercase tracking-widest text-[#666] mb-1">Paragraph</div>

          {/* Alignment Row */}
          <div className="flex gap-0.5 border border-[#404040] rounded bg-[#333] p-0.5 w-fit">
            {['left', 'center', 'right', 'justify'].map(align => (
              <button
                key={align}
                onClick={() => updateStyle('textAlign', align)}
                className={`p-1.5 rounded transition-colors ${currentStyle.textAlign === align ? 'bg-[#555] text-white shadow-inner' : 'hover:bg-[#444]'}`}
                title={`Align ${align.charAt(0).toUpperCase() + align.slice(1)}`}
              >
                {align === 'left' && <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="6" x2="3" y2="6"/><line x1="15" y1="12" x2="3" y2="12"/><line x1="17" y1="18" x2="3" y2="18"/></svg>}
                {align === 'center' && <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="6" x2="3" y2="6"/><line x1="17" y1="12" x2="7" y2="12"/><line x1="19" y1="18" x2="5" y2="18"/></svg>}
                {align === 'right' && <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="12" x2="9" y2="12"/><line x1="21" y1="18" x2="7" y2="18"/></svg>}
                {align === 'justify' && <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="12" x2="3" y2="12"/><line x1="21" y1="18" x2="3" y2="18"/></svg>}
              </button>
            ))}
          </div>

          {/* Indents & Margins (Padding used as margins here per user request) */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            {/* Left Indent */}
            <div className="flex items-center border border-[#404040] rounded bg-[#333] px-2 py-1 focus-within:ring-1 focus-within:ring-accent">
              <svg className="w-3.5 h-3.5 text-[#888] mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="12" x2="7" y2="12"/><line x1="21" y1="18" x2="3" y2="18"/><polyline points="3 10 5 12 3 14"/></svg>
              <input
                type="number"
                value={currentStyle.textIndent ?? 0}
                onChange={e => updateStyle('textIndent', Number(e.target.value))}
                className="w-full bg-transparent text-[11px] text-white outline-none"
                title="First Line Indent (px)"
              />
            </div>
            
            {/* Right Indent (simulated by empty block for layout matching PS) */}
            <div className="flex items-center border border-[#404040] rounded bg-[#333] px-2 py-1 opacity-50 cursor-not-allowed">
              <svg className="w-3.5 h-3.5 text-[#888] mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="6" x2="3" y2="6"/><line x1="17" y1="12" x2="3" y2="12"/><line x1="21" y1="18" x2="3" y2="18"/><polyline points="21 10 19 12 21 14"/></svg>
              <input disabled className="w-full bg-transparent text-[11px] text-[#666] outline-none" value="0" />
            </div>

            {/* Space Before (Padding Top) */}
            <div className="flex items-center border border-[#404040] rounded bg-[#333] px-2 py-1 focus-within:ring-1 focus-within:ring-accent">
              <svg className="w-3.5 h-3.5 text-[#888] mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8H3"/><path d="m16 4-4-4-4 4"/><path d="M12 0v8"/><path d="M21 16H3"/></svg>
              <input
                type="number"
                value={currentStyle.paddingTop ?? 0}
                onChange={e => updateStyle('paddingTop', Number(e.target.value))}
                className="w-full bg-transparent text-[11px] text-white outline-none"
                title="Space Before / Padding Top (px)"
              />
            </div>

            {/* Space After (Padding Bottom) */}
            <div className="flex items-center border border-[#404040] rounded bg-[#333] px-2 py-1 focus-within:ring-1 focus-within:ring-accent">
              <svg className="w-3.5 h-3.5 text-[#888] mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16H3"/><path d="m8 20 4 4 4-4"/><path d="M12 16v8"/><path d="M21 8H3"/></svg>
              <input
                type="number"
                value={currentStyle.paddingBottom ?? 0}
                onChange={e => updateStyle('paddingBottom', Number(e.target.value))}
                className="w-full bg-transparent text-[11px] text-white outline-none"
                title="Space After / Padding Bottom (px)"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
