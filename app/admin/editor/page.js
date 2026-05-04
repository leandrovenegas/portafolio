'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { COMPONENT_DEFINITIONS } from '@/components/page-builder/registry';
import { DEFAULT_HOME_COMPONENTS } from '@/components/page-builder/defaultConfig';
import PageRenderer from '@/components/page-builder/PageRenderer';
import SmartPropertiesPanel from '@/components/page-builder/SmartPropertiesPanel';
import SwatchesPanel from '@/components/page-builder/SwatchesPanel';
import StylesPanel from '@/components/page-builder/StylesPanel';
import HistoryPanel from '@/components/page-builder/HistoryPanel';
import GlobalTypographyPanel from '@/components/page-builder/GlobalTypographyPanel';


function VisualEditorContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug') || 'home';

  const [components, setComponents] = useState([]);
  const [versions, setVersions] = useState([]);
  const [currentVersionId, setCurrentVersionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [newVersionName, setNewVersionName] = useState('');
  
  const [focusedField, setFocusedField] = useState(null);

  const [showSwatches, setShowSwatches] = useState(false);
  const [showStyles, setShowStyles] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showTypography, setShowTypography] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const [clipboardStyle, setClipboardStyle] = useState(null);

  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Selected component for editing props
  const [selectedId, setSelectedId] = useState(null);

  // Drag & Drop state
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // Needed for Firefox
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (index !== draggedIndex) {
      setDragOverIndex(index);
    }
  };

  const pushHistory = useCallback((newComps, actionName) => {
    setHistory(prev => {
      const nextIndex = historyIndex + 1;
      const newHist = prev.slice(0, nextIndex);
      newHist.push({ actionName, components: newComps, timestamp: Date.now() });
      
      // Limitar a 10 pasos
      if (newHist.length > 10) {
        newHist.shift(); // Elimina el elemento más antiguo
        setHistoryIndex(9); // Apunta al último índice (10 elementos, de 0 a 9)
        return newHist;
      }
      
      setHistoryIndex(newHist.length - 1);
      return newHist;
    });
  }, [historyIndex]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setComponents(history[prevIndex].components);
    }
  }, [historyIndex, history]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setComponents(history[nextIndex].components);
    }
  }, [historyIndex, history]);

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }
    const newComps = [...components];
    const [removed] = newComps.splice(draggedIndex, 1);
    newComps.splice(dropIndex, 0, removed);
    setComponents(newComps);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  useEffect(() => {
    fetchData();
  }, [slug]);

  // Ctrl+S / Ctrl+Z shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (!saving) {
          if (currentVersionId) {
            saveVersion(false);
          } else {
            // Si no hay versión activa (modo local), creamos una nueva rama automáticamente
            saveVersion(true);
          }
        }
      }
      // Undo/Redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [saving, currentVersionId, handleUndo, handleRedo]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch history
      const histRes = await fetch(`/api/pages?slug=${slug}&action=history`);
      const histData = await histRes.json();
      
      if (!histRes.ok) throw new Error(histData.error || 'Failed to fetch history');
      setVersions(histData);

      // Fetch active or latest
      const versionParam = searchParams.get('versionId');
      const targetVersion = versionParam 
        ? histData.find(v => v.id === parseInt(versionParam)) 
        : (histData.find(v => v.is_active) || histData[0]);
      
      if (targetVersion) {
        setCurrentVersionId(targetVersion.id);
        const verRes = await fetch(`/api/pages?slug=${slug}&versionId=${targetVersion.id}`);
        const verData = await verRes.json();
        const loadedComps = verData.components || [];
        setComponents(loadedComps);
        setHistory([{ actionName: 'Cargar versión', components: loadedComps, timestamp: Date.now() }]);
        setHistoryIndex(0);
      } else {
        // Fallback for first time
        if (slug === 'home') {
          setComponents(DEFAULT_HOME_COMPONENTS);
          setHistory([{ actionName: 'Inicio (Local)', components: DEFAULT_HOME_COMPONENTS, timestamp: Date.now() }]);
          setHistoryIndex(0);
        }
      }
    } catch (err) {
      console.warn("Editor error:", err.message);
      setError("No se pudo conectar a la base de datos de versiones. Asegúrate de haber ejecutado el script SQL en Supabase. Cargando versión local por defecto...");
      if (slug === 'home') {
        setComponents(DEFAULT_HOME_COMPONENTS);
        setHistory([{ actionName: 'Inicio (Local)', components: DEFAULT_HOME_COMPONENTS, timestamp: Date.now() }]);
        setHistoryIndex(0);
      }
    } finally {
      setLoading(false);
    }
  };

  const saveVersion = async (isNew = false) => {
    setSaving(true);
    setSaveSuccess('');
    setError('');
    try {
      const vName = isNew ? newVersionName || `v${versions.length + 1}` : versions.find(v=>v.id===currentVersionId)?.version_name || 'v1';
      
      const payload = {
        slug,
        version_name: vName,
        components,
        is_active: true // Always set active when saving from editor for simplicity
      };

      let url = '/api/pages';
      let method = 'POST';

      if (!isNew && currentVersionId) {
        payload.id = currentVersionId;
        method = 'PUT';
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setSaveSuccess('Guardado correctamente');
      setTimeout(() => setSaveSuccess(''), 3000);
      
      if (isNew) {
        setNewVersionName('');
        fetchData(); // Reload to get the new version ID
      } else {
        // Broadcast update to any open preview tabs so they refresh without F5
        if (typeof window !== 'undefined' && window.BroadcastChannel) {
          const bc = new BroadcastChannel('editor-updates');
          bc.postMessage({ type: 'saved' });
          bc.close();
        }
      }
      
      // Guardar estado en historial local cuando se guarda el documento
      pushHistory(components, `Guardado: ${new Date().toLocaleTimeString()}`);
    } catch (err) {
      setError("Error al guardar: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const moveComponent = (index, dir) => {
    if (dir === 'up' && index === 0) return;
    if (dir === 'down' && index === components.length - 1) return;
    
    const newComps = [...components];
    const temp = newComps[index];
    newComps[index] = newComps[dir === 'up' ? index - 1 : index + 1];
    newComps[dir === 'up' ? index - 1 : index + 1] = temp;
    setComponents(newComps);
  };

  const removeComponent = (index) => {
    const newComps = [...components];
    const removed = newComps.splice(index, 1);
    setComponents(newComps);
    if (selectedId === removed[0].id) setSelectedId(null);
  };

  const cloneComponent = (index) => {
    const compToClone = components[index];
    // Deep clone to copy all nested props and _styles
    const clonedComp = JSON.parse(JSON.stringify(compToClone));
    clonedComp.id = Date.now().toString() + '-' + Math.random().toString(36).substr(2, 5);
    
    const newComps = [...components];
    // Insert immediately after the original
    newComps.splice(index + 1, 0, clonedComp);
    setComponents(newComps);
    // Optionally auto-select the clone
    setSelectedId(clonedComp.id);
  };

  const handleCopyStyle = (index) => {
    const compToCopy = components[index];
    if (compToCopy.props._styles) {
      setClipboardStyle({ type: compToCopy.type, data: compToCopy.props._styles });
      alert('Configuración (Estilos) copiada al portapapeles.');
    } else {
      alert('Este componente no tiene configuración de estilos para copiar.');
    }
  };

  const handlePasteStyle = (index) => {
    if (!clipboardStyle) {
      alert('No hay ninguna configuración copiada.');
      return;
    }
    const compTarget = components[index];
    if (compTarget.type !== clipboardStyle.type) {
      const confirm = window.confirm(`El estilo copiado es de un componente [${clipboardStyle.type}]. ¿Estás seguro de pegarlo en un componente [${compTarget.type}]?`);
      if (!confirm) return;
    }
    updateProp(compTarget.id, '_styles', clipboardStyle.data);
    alert('Configuración pegada exitosamente.');
  };

  const addComponent = (e) => {
    const type = e.target.value;
    if (!type) return;
    
    const def = COMPONENT_DEFINITIONS.find(d => d.type === type);
    if (def) {
      setComponents([
        ...components,
        {
          id: Date.now().toString(),
          type: def.type,
          props: JSON.parse(JSON.stringify(def.defaultProps))
        }
      ]);
    }
    e.target.value = "";
  };

  const updateProp = (id, propKey, value) => {
    setComponents(components.map(c => {
      if (c.id === id) {
        return { ...c, props: { ...c.props, [propKey]: value } };
      }
      return c;
    }));
  };

  const selectedComp = components.find(c => c.id === selectedId);

  if (loading) return <div>Cargando editor...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-s1">
      {/* Floating panels */}
      {showSwatches && <SwatchesPanel onClose={() => setShowSwatches(false)} />}
      {showStyles && (
        <StylesPanel 
          onClose={() => setShowStyles(false)} 
          selectedComponent={selectedComp} 
          onApplyStyle={updateProp} 
        />
      )}
      {showHistory && (
        <HistoryPanel
          onClose={() => setShowHistory(false)}
          history={history}
          currentIndex={historyIndex}
          onSelectHistory={(index) => {
            setHistoryIndex(index);
            setComponents(history[index].components);
          }}
        />
      )}
      {showTypography && (
        <GlobalTypographyPanel
          onClose={() => setShowTypography(false)}
          selectedComponent={selectedComp}
          onApplyStyle={updateProp}
          focusedField={focusedField}
        />
      )}

      {/* Integrated Admin Header */}
      <header className="w-full border-b border-border bg-bg px-6 py-3 z-50 flex items-center justify-between sticky top-0 shadow-sm">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-display text-xl text-ink hover:opacity-70 transition-opacity">
            Administración
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/admin" className="px-3 py-2 rounded-lg hover:bg-s1 text-ink font-body text-xs transition-colors">
              Dashboard
            </Link>
            
            {/* Ventanas Sub-menu */}
            <div className="relative">
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-s1 text-ink font-body text-xs transition-colors focus:outline-none"
              >
                Ventanas
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)}></div>
                  <div className="absolute top-full left-0 mt-1 w-48 bg-bg border border-border rounded-lg shadow-lg z-50 py-1 flex flex-col">
                    <button 
                      onClick={() => { setShowSwatches(!showSwatches); setMenuOpen(false); }}
                      className="px-4 py-2 text-left text-xs font-medium text-ink hover:bg-s1 flex items-center justify-between"
                    >
                      <span>Muestras (Color)</span>
                      {showSwatches && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </button>
                    <button 
                      onClick={() => { setShowStyles(!showStyles); setMenuOpen(false); }}
                      className="px-4 py-2 text-left text-xs font-medium text-ink hover:bg-s1 flex items-center justify-between"
                    >
                      <span>Estilos Gráficos</span>
                      {showStyles && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </button>
                    <button 
                      onClick={() => { setShowTypography(!showTypography); setMenuOpen(false); }}
                      className="px-4 py-2 text-left text-xs font-medium text-ink hover:bg-s1 flex items-center justify-between"
                    >
                      <span>Tipografía (Carácter/Párrafo)</span>
                      {showTypography && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </button>
                    <button 
                      onClick={() => { setShowHistory(!showHistory); setMenuOpen(false); }}
                      className="px-4 py-2 text-left text-xs font-medium text-ink hover:bg-s1 flex items-center justify-between"
                    >
                      <span>Historia</span>
                      {showHistory && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </button>
                  </div>
                </>
              )}
            </div>

            <Link href="/admin/videos" className="px-3 py-2 rounded-lg hover:bg-s1 text-ink font-body text-xs transition-colors">
              Videos
            </Link>
            <Link href="/admin/portafolio" className="px-3 py-2 rounded-lg hover:bg-s1 text-ink font-body text-xs transition-colors">
              Portafolio
            </Link>
            <span className="px-3 py-2 rounded-lg text-muted font-body text-[10px] uppercase tracking-widest opacity-50">
              Proyectos (Pronto)
            </span>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="h-8 w-px bg-border mx-2 hidden md:block" />
          
          <select 
            className="p-2 rounded bg-s1 border border-border text-xs font-medium focus:ring-1 focus:ring-accent outline-none text-ink"
            value={currentVersionId || ''}
            onChange={(e) => {
              if (e.target.value) {
                const url = new URL(window.location);
                url.searchParams.set('versionId', e.target.value);
                window.history.pushState({}, '', url);
                setCurrentVersionId(e.target.value);
                fetchData();
              }
            }}
          >
            {versions.map(v => (
              <option key={v.id} value={v.id}>
                {v.version_name} {v.is_active ? '(Activa)' : ''}
              </option>
            ))}
          </select>

          <button 
            onClick={() => saveVersion(false)} 
            disabled={saving || !currentVersionId}
            className="bg-accent text-bg px-4 py-2 rounded text-xs font-bold hover:bg-accent2 transition-colors disabled:opacity-50 shadow-sm"
          >
            {saving ? '...' : 'Guardar'}
          </button>

          <a 
            href={currentVersionId ? `/?versionId=${currentVersionId}` : '/'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-s2 text-ink font-body text-xs transition-colors border border-border"
            title="Ver Página en Vivo"
          >
            <span>Ver Live</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>

          <button
            onClick={async () => {
              await fetch('/api/auth/login', { method: 'DELETE' });
              window.location.href = '/';
            }}
            className="p-2 text-muted hover:text-red-500 transition-colors"
            title="Cerrar Sesión"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
        </div>
      </header>

      <div className="flex-1 p-6 flex flex-col gap-6">
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            {error}
          </div>
        )}
        
        {saveSuccess && (
          <div className="bg-green-50 border border-green-100 text-green-600 p-3 rounded-lg text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            {saveSuccess}
          </div>
        )}

        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-display text-ink flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            Editando: <span className="text-accent">{slug}</span>
          </h1>
          
          <div className="flex gap-2 items-center bg-bg p-1 rounded-lg border border-border shadow-sm">
            <input 
              type="text" 
              placeholder="Nueva versión..." 
              className="px-3 py-1.5 text-xs border-none focus:ring-0 outline-none w-32 bg-transparent text-ink placeholder:text-muted"
              value={newVersionName}
              onChange={e => setNewVersionName(e.target.value)}
            />
            <button 
              onClick={() => saveVersion(true)}
              disabled={saving}
              className="bg-accent text-bg px-3 py-1.5 rounded-md text-xs font-medium hover:opacity-90 transition-opacity"
            >
              Nueva Rama
            </button>
          </div>
        </div>

      <div className="flex flex-col md:flex-row gap-6 relative">
        {/* Sidebar components list */}
        <div className="w-full md:w-64 flex-shrink-0 flex flex-col gap-4 sticky top-[73px] self-start max-h-[calc(100vh-100px)] overflow-y-auto pr-2 scrollbar-thin">
          <div className="bg-bg border border-border rounded-xl p-3 shadow-sm">
            <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-3 px-1">Estructura</h3>
            <div className="flex flex-col gap-1">
              {components.map((c, idx) => (
                <div
                  key={c.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDrop={(e) => handleDrop(e, idx)}
                  onDragEnd={handleDragEnd}
                  className={`relative flex justify-between items-center p-2 border rounded-lg cursor-pointer transition-all select-none
                    ${selectedId === c.id ? 'border-accent bg-accent/5 ring-1 ring-accent/20' : 'border-border hover:border-accent/30 hover:bg-s1'}
                    ${draggedIndex === idx ? 'opacity-40 scale-[0.98]' : 'opacity-100'}
                  `}
                  onClick={() => setSelectedId(c.id)}
                >
                  {/* Drop indicator line - above */}
                  {dragOverIndex === idx && draggedIndex !== idx && draggedIndex > idx && (
                    <div className="absolute -top-px left-2 right-2 h-0.5 bg-accent rounded-full z-10" />
                  )}

                  {/* Drag handle */}
                  <div
                    className="flex items-center gap-1.5 flex-1 min-w-0"
                    title="Arrastrar para reordenar"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-muted/50 flex-shrink-0 cursor-grab active:cursor-grabbing"
                    >
                      <circle cx="8" cy="6" r="1.5"/>
                      <circle cx="16" cy="6" r="1.5"/>
                      <circle cx="8" cy="12" r="1.5"/>
                      <circle cx="16" cy="12" r="1.5"/>
                      <circle cx="8" cy="18" r="1.5"/>
                      <circle cx="16" cy="18" r="1.5"/>
                    </svg>
                    <span className="font-medium truncate text-xs text-ink">
                      {COMPONENT_DEFINITIONS.find(d => d.type === c.type)?.name || c.type}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-0.5 flex-shrink-0" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => moveComponent(idx, 'up')}
                      className="p-1 hover:bg-border rounded text-muted hover:text-ink transition-colors"
                      title="Mover arriba"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                    </button>
                    <button
                      onClick={() => moveComponent(idx, 'down')}
                      className="p-1 hover:bg-border rounded text-muted hover:text-ink transition-colors"
                      title="Mover abajo"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <button
                      onClick={() => cloneComponent(idx)}
                      className="p-1 hover:bg-border rounded text-muted hover:text-ink transition-colors"
                      title="Duplicar componente"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleCopyStyle(idx); }}
                      className="p-1 hover:bg-border rounded text-muted hover:text-blue-500 transition-colors"
                      title="Copiar Configuración"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handlePasteStyle(idx); }}
                      className="p-1 hover:bg-border rounded text-muted hover:text-green-500 transition-colors"
                      title="Pegar Configuración"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                    </button>
                    <button
                      onClick={() => removeComponent(idx)}
                      className="p-1 hover:bg-red-50 text-muted hover:text-red-500 transition-colors rounded"
                      title="Eliminar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    </button>
                  </div>

                  {/* Drop indicator line - below */}
                  {dragOverIndex === idx && draggedIndex !== idx && draggedIndex < idx && (
                    <div className="absolute -bottom-px left-2 right-2 h-0.5 bg-accent rounded-full z-10" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3">
              <select onChange={addComponent} className="w-full p-2 border border-border rounded-lg text-xs bg-s1 hover:bg-white transition-colors outline-none cursor-pointer font-medium" defaultValue="">
                <option value="" disabled>+ Añadir bloque</option>
                {COMPONENT_DEFINITIONS.map(d => (
                  <option key={d.type} value={d.type}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-2xl flex flex-col gap-4 self-start">
          {/* Properties Editor */}
          {selectedComp ? (
            <SmartPropertiesPanel
              comp={selectedComp}
              updateProp={updateProp}
              onClose={() => setSelectedId(null)}
              onFocusField={setFocusedField}
            />
          ) : (
            <div className="bg-s1 border border-border rounded-xl p-8 flex flex-col items-center justify-center text-center text-muted">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
              <p className="text-sm">Selecciona un componente en la estructura para editar sus propiedades.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
}

export default function VisualEditor() {
  return (
    <Suspense fallback={<div>Cargando editor...</div>}>
      <VisualEditorContent />
    </Suspense>
  );
}
