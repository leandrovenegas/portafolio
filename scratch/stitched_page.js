'use client';

import './photoshop.css';

import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { COMPONENT_DEFINITIONS, COMPONENT_REGISTRY } from '../../../components/page-builder/registry';
import { migrateToTreeStructure, findComponent, updateComponentProp, removeComponentFromTree, cloneComponentInTree, addComponentToTree, updateGridLayout, performMove } from './treeHelpers';
import { DEFAULT_HOME_COMPONENTS } from '@/components/page-builder/defaultConfig';
import PageRenderer from '@/components/page-builder/PageRenderer';
import GridEditor from '@/components/page-builder/GridEditor';
import StructureTree from '../../../components/page-builder/StructureTree';
import Nav from '@/components/Nav';
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
  const [activeGridId, setActiveGridId] = useState(null); // null = root

  // Drag & Drop state
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [editingNameId, setEditingNameId] = useState(null);
  const [previewBp, setPreviewBp] = useState('desktop'); // mobile | tablet | desktop

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

  // Guarda silenciosamente el array de componentes en Supabase (para renombres de bloques)
  const saveComponentsSilently = useCallback(async (updatedComps) => {
    if (!currentVersionId) return;
    try {
      await fetch('/api/pages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: currentVersionId, components: updatedComps })
      });
    } catch (_) {
      // silencioso — el nombre igual queda en estado local
    }
  }, [currentVersionId]);

  const handleGridLayoutChange = useCallback((parentId, allLayouts) => {
    setComponents(prev => updateGridLayout(prev, parentId, allLayouts));
  }, []);

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
    // Reemplazado por treeHelpers / StructurePanel
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // --- AUTOSAVE TO LOCALSTORAGE ---
  useEffect(() => {
    if (components.length > 0 && slug) {
      const backup = {
        slug,
        components,
        timestamp: Date.now(),
        versionId: currentVersionId
      };
      localStorage.setItem(`editor_backup_${slug}`, JSON.stringify(backup));
    }
  }, [components, slug, currentVersionId]);

  // --- BROADCAST REAL-TIME UPDATES TO PREVIEW ---
  useEffect(() => {
    if (components.length > 0 && typeof window !== 'undefined' && window.BroadcastChannel) {
      const bc = new BroadcastChannel('editor-updates');
      bc.postMessage({ type: 'update', components });
      bc.close();
    }
  }, [components]);

  const restoreLocalBackup = () => {
    const saved = localStorage.getItem(`editor_backup_${slug}`);
    if (saved) {
      try {
        const backup = JSON.parse(saved);
        if (confirm(`¿Restaurar copia de seguridad local del ${new Date(backup.timestamp).toLocaleString()}?`)) {
          setComponents(backup.components);
          setSaveSuccess('Restaurado desde copia local');
          setTimeout(() => setSaveSuccess(''), 3000);
        }
      } catch (e) {
        console.error("Error al restaurar backup:", e);
      }
    } else {
      alert("No se encontró ninguna copia de seguridad local para esta página.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [slug]);

  // Ctrl+S / Ctrl+Z shortcut
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (historyIndex > 0) { // Hay cambios sin persistir en la DB
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [historyIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (!saving) {
          if (currentVersionId) {
            saveVersion(false);
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
      const ts = Date.now();
      // Fetch history
      const histRes = await fetch(`/api/pages?slug=${slug}&action=history&_=${ts}`, { cache: 'no-store' });
      const histData = await histRes.json();
      
      if (!histRes.ok) throw new Error(histData.error || 'Failed to fetch history');
      setVersions(histData);

      // Fetch active or latest
      const versionParam = searchParams.get('versionId');
      const targetVersion = versionParam 
        ? histData.find(v => String(v.id) === String(versionParam)) 
        : (histData.find(v => v.is_active) || histData[0]);
      
      if (targetVersion) {
        setCurrentVersionId(targetVersion.id);
        const verRes = await fetch(`/api/pages?slug=${slug}&versionId=${targetVersion.id}&_=${ts}`, { cache: 'no-store' });
        const verData = await verRes.json();
        const loadedComps = migrateToTreeStructure(verData.components || []);
        setComponents(loadedComps);
        setHistory([{ actionName: 'Cargar versión', components: loadedComps, timestamp: Date.now() }]);
        setHistoryIndex(0);
      } else {
        // Fallback for first time
        if (slug === 'home') {
          const defaultComps = migrateToTreeStructure(DEFAULT_HOME_COMPONENTS);
          setComponents(defaultComps);
          setHistory([{ actionName: 'Inicio (Local)', components: defaultComps, timestamp: Date.now() }]);
          setHistoryIndex(0);
        }
      }
    } catch (err) {
      console.warn("Editor error:", err.message);
      setError("No se pudo conectar a la base de datos de versiones. Asegúrate de haber ejecutado el script SQL en Supabase. Cargando versión local por defecto...");
      if (slug === 'home') {
        const defaultComps = migrateToTreeStructure(DEFAULT_HOME_COMPONENTS);
        setComponents(defaultComps);
        setHistory([{ actionName: 'Inicio (Local)', components: defaultComps, timestamp: Date.now() }]);
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
          bc.postMessage({ type: 'saved', components });
          bc.close();
        }
      }
      
      // Guardar estado en historial local cuando se guarda el documento
      pushHistory(components, `Guardado: ${new Date().toLocaleTimeString()}`);
    } catch (err) {
      setError("Error al guardar: " + err.message);
    } finally {
    } finally {
      setSaving(false);
    }
  };

  const publishVersion = async () => {
    if (!currentVersionId) return;
    setSaving(true);
    setSaveSuccess('');
    setError('');
    try {
      const res = await fetch('/api/pages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: currentVersionId, is_published: true })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setSaveSuccess('¡Publicado en Producción!');
      setTimeout(() => setSaveSuccess(''), 3000);
      fetchData(); // Reload versions to get updated is_published status
    } catch (err) {
      setError("Error al publicar: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const moveComponent = (id, direction) => {
    setComponents(prev => {
      if (idx === -1) return prev;
      const newArr = [...prev];
      if (direction === 'up' && idx > 0) {
        [newArr[idx - 1], newArr[idx]] = [newArr[idx], newArr[idx - 1]];
      } else if (direction === 'down' && idx < newArr.length - 1) {
        [newArr[idx], newArr[idx + 1]] = [newArr[idx + 1], newArr[idx]];
      }
      return newArr;
    });
  };



  const removeComponent = (id) => {
    setComponents(prev => removeComponentFromTree(prev, id));
    if (selectedId === id) setSelectedId(null);
  };

  const cloneComponent = (id) => {
    setComponents(prev => cloneComponentInTree(prev, id));
  };

  const handleCopyStyle = (id) => {
    const compToCopy = findComponent(components, id);
    if (compToCopy && compToCopy.props._styles) {
      setClipboardStyle({ type: compToCopy.type, data: compToCopy.props._styles });
      alert('Configuración (Estilos) copiada al portapapeles.');
    } else {
      alert('Este componente no tiene configuración de estilos para copiar.');
    }
  };

  const handlePasteStyle = (id) => {
    if (!clipboardStyle) {
      alert('No hay ninguna configuración copiada.');
      return;
    }
    const compTarget = findComponent(components, id);
    if (!compTarget) return;
    if (compTarget.type !== clipboardStyle.type) {
      const confirm = window.confirm(`El estilo copiado es de un componente [${clipboardStyle.type}]. ¿Estás seguro de pegarlo en un componente [${compTarget.type}]?`);
      if (!confirm) return;
    }
    updateProp(compTarget.id, '_styles', clipboardStyle.data);
    alert('Configuración pegada exitosamente.');
  };

  const addComponent = (e, targetParentId = null) => {
    const type = e.target.value;
    if (!type) return;
    
    const def = COMPONENT_DEFINITIONS.find(d => d.type === type);
    if (def) {
      const newComp = {
        id: Date.now().toString(),
        type: def.type,
        props: JSON.parse(JSON.stringify(def.defaultProps)),
        children: []
      };
      setComponents(prev => addComponentToTree(prev, newComp, targetParentId));
    }
    e.target.value = "";
  };

  const updateProp = (id, propKey, value) => {
    setComponents(prev => updateComponentProp(prev, id, propKey, value));
  };

  const selectedComp = findComponent(components, selectedId);

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
          activeBp={previewBp}
          onActiveBpChange={setPreviewBp}
        />
      )}

      {/* Integrated Admin Header */}
      <header 
        className="hidden w-full z-50 items-center justify-between sticky top-0"
        style={{
          height: 'var(--toolbar-height)',
          background: 'var(--ps-bg-toolbar)',
          borderBottom: 'var(--ps-border-width) solid var(--ps-border-dark)',
          padding: '0 var(--sp-md)',
          color: 'var(--ps-text)',
          fontFamily: 'var(--font-ui)',
          fontSize: 'var(--font-size-sm)'
        }}
      >
        <div className="flex items-center gap-6">
          <Link href="/admin" style={{ color: 'var(--ps-text)', fontWeight: 'var(--font-weight-bold)' }} className="hover:opacity-70 transition-opacity">
            Administración
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/admin" 
              style={{
                padding: '0 var(--sp-sm)',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                color: 'var(--ps-text-dim)',
                textDecoration: 'none'
              }}
              className="hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            
            {/* Ventanas Sub-menu */}
            <div className="relative">
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  padding: '0 var(--sp-sm)',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: 'var(--ps-text-dim)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
                className="hover:text-white transition-colors focus:outline-none"
              >
                Ventanas
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)}></div>
                  <div 
                    className="absolute top-full left-0 mt-1 w-48 z-50 flex flex-col"
                    style={{
                      background: 'var(--ps-bg-panel)',
                      border: 'var(--ps-border-width) solid var(--ps-border)',
                      borderRadius: 'var(--ps-radius)',
                      boxShadow: 'var(--shadow-dropdown)',
                      padding: 'var(--sp-xs) 0'
                    }}
                  >
                    <button 
                      onClick={() => { setShowSwatches(!showSwatches); setMenuOpen(false); }}
                      style={{
                        padding: 'var(--sp-sm) var(--sp-md)',
                        textAlign: 'left',
                        color: 'var(--ps-text)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 'var(--font-size-sm)'
                      }}
                      className="hover:bg-[var(--ps-bg-hover)] flex items-center justify-between"
                    >
                      <span>Muestras (Color)</span>
                      {showSwatches && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </button>
                    <button 
                      onClick={() => { setShowStyles(!showStyles); setMenuOpen(false); }}
                      style={{
                        padding: 'var(--sp-sm) var(--sp-md)',
                        textAlign: 'left',
                        color: 'var(--ps-text)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 'var(--font-size-sm)'
                      }}
                      className="hover:bg-[var(--ps-bg-hover)] flex items-center justify-between"
                    >
                      <span>Estilos Gráficos</span>
                      {showStyles && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </button>
                    <button 
                      onClick={() => { setShowTypography(!showTypography); setMenuOpen(false); }}
                      style={{
                        padding: 'var(--sp-sm) var(--sp-md)',
                        textAlign: 'left',
                        color: 'var(--ps-text)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 'var(--font-size-sm)'
                      }}
                      className="hover:bg-[var(--ps-bg-hover)] flex items-center justify-between"
                    >
                      <span>Tipografía</span>
                      {showTypography && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </button>
                    <button 
                      onClick={() => { setShowHistory(!showHistory); setMenuOpen(false); }}
                      style={{
                        padding: 'var(--sp-sm) var(--sp-md)',
                        textAlign: 'left',
                        color: 'var(--ps-text)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 'var(--font-size-sm)'
                      }}
                      className="hover:bg-[var(--ps-bg-hover)] flex items-center justify-between"
                    >
                      <span>Historia de Cambios</span>
                      {showHistory && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </button>
                    <div style={{ height: '1px', background: 'var(--ps-border-dark)', margin: 'var(--sp-xs) 0' }} />
                    <button 
                      onClick={() => { restoreLocalBackup(); setMenuOpen(false); }}
                      style={{
                        padding: 'var(--sp-sm) var(--sp-md)',
                        textAlign: 'left',
                        color: 'var(--ps-text-link)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 'var(--font-size-xs)'
                      }}
                      className="hover:bg-[var(--ps-bg-hover)] flex items-center gap-2"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      RESCATAR COPIA LOCAL
                    </button>
                  </div>
                </>
              )}
            </div>

            <Link href="/admin/videos" 
              style={{ padding: '0 var(--sp-sm)', height: '24px', display: 'flex', alignItems: 'center', color: 'var(--ps-text-dim)', textDecoration: 'none' }}
              className="hover:text-white transition-colors"
            >
              Data Videos
            </Link>
            <Link href="/admin/portafolio" 
              style={{ padding: '0 var(--sp-sm)', height: '24px', display: 'flex', alignItems: 'center', color: 'var(--ps-text-dim)', textDecoration: 'none' }}
              className="hover:text-white transition-colors"
            >
              Data Portafolio
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          
          <select
            style={{
              height: '24px',
              padding: '0 var(--sp-sm)',
              background: 'var(--ps-bg-input)',
              border: 'var(--ps-border-width) solid var(--ps-border-light)',
              borderRadius: 'var(--ps-radius)',
              color: 'var(--ps-text)',
              fontSize: 'var(--font-size-sm)',
              outline: 'none'
            }}
            className="focus:border-[var(--ps-border-focus)] transition-colors font-medium"
            value={slug}
            onChange={(e) => {
              const url = new URL(window.location);
              url.searchParams.set('slug', e.target.value);
              url.searchParams.delete('versionId');
              window.location.href = url.toString();
            }}
            title="Seleccionar página para editar"
          >
            <option value="home">home</option>
            <option value="sistema">sistema</option>
            <option value="videos">videos</option>
            <option value="portafolio">portafolio</option>
            <option value="contacto">contacto</option>
          </select>

          <div style={{ width: '1px', height: '16px', background: 'var(--ps-border-dark)', margin: '0 var(--sp-xs)' }} />

          <select 
            style={{
              height: '24px',
              padding: '0 var(--sp-sm)',
              background: 'var(--ps-bg-input)',
              border: 'var(--ps-border-width) solid var(--ps-border-light)',
              borderRadius: 'var(--ps-radius)',
              color: 'var(--ps-text)',
              fontSize: 'var(--font-size-sm)',
              outline: 'none',
              maxWidth: '140px'
            }}
            className="focus:border-[var(--ps-border-focus)] transition-colors font-medium"
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
                {v.version_name} {v.is_active ? '(Activa)' : ''} {v.is_published ? '(EN VIVO)' : ''}
              </option>
            ))}
          </select>

          <button 
            onClick={() => saveVersion(false)} 
            disabled={saving || !currentVersionId}
            disabled={saving || !currentVersionId}
            style={{
              height: '24px',
              padding: '0 var(--sp-md)',
              background: 'var(--ps-bg-panel)',
              border: '1px solid var(--ps-border-light)',
              borderRadius: 'var(--ps-radius)',
              color: 'var(--ps-text)',
              fontSize: 'var(--font-size-sm)',
              cursor: (saving || !currentVersionId) ? 'not-allowed' : 'pointer',
              opacity: (saving || !currentVersionId) ? 0.5 : 1
            }}
            className="hover:bg-[var(--ps-bg-hover)] transition-colors font-medium"
          >
            {saving ? 'Guardando...' : 'Guardar'}
          </button>

          <button 
            onClick={publishVersion} 
            disabled={saving || !currentVersionId}
            style={{
              height: '24px',
              padding: '0 var(--sp-md)',
              background: 'var(--ps-accent)',
              border: 'none',
              borderRadius: 'var(--ps-radius)',
              color: '#fff',
              fontSize: 'var(--font-size-sm)',
              cursor: (saving || !currentVersionId) ? 'not-allowed' : 'pointer',
              opacity: (saving || !currentVersionId) ? 0.5 : 1
            }}
            className="hover:bg-[var(--ps-accent-hover)] transition-colors font-semibold"
          >
            Publicar
          </button>

          <a 
            href={currentVersionId ? `/${slug === 'home' ? '' : slug}?versionId=${currentVersionId}` : `/${slug === 'home' ? '' : slug}`} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              height: '24px',
              padding: '0 var(--sp-md)',
              background: 'var(--ps-bg-panel)',
              border: 'var(--ps-border-width) solid var(--ps-border-light)',
              borderRadius: 'var(--ps-radius)',
              color: 'var(--ps-text)',
              fontSize: 'var(--font-size-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            className="hover:bg-[var(--ps-bg-hover)] hover:text-white transition-colors font-medium"
            title="Abrir Vista Previa Externa en tiempo real"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span>Vista Previa Externa ↗</span>
          </a>

          <button
            onClick={async () => {
              await fetch('/api/auth/login', { method: 'DELETE' });
              window.location.href = '/';
            }}
            style={{
              color: 'var(--ps-text-dim)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            {saveSuccess}
          </div>
        )}
<div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-display text-ink flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            Editando: <span className="text-accent">{slug}</span>
          </h1>
          
        </div>

      <div className="flex flex-col lg:flex-row gap-8 relative">
        {/* LEFT - Editor Tools */}
        <div className="lg:w-[400px] w-full flex-shrink-0 flex flex-col gap-6 sticky top-[73px] self-start max-h-[calc(100vh-100px)] overflow-y-auto pr-2 scrollbar-thin">
          
          {selectedComp ? (
            /* Properties Editor Panel (Focused Mode) */
            <div className="flex-1">
              <SmartPropertiesPanel
                comp={selectedComp}
                updateProp={updateProp}
                onClose={() => setSelectedId(null)}
                onFocusField={setFocusedField}
                activeBp={previewBp}
                onActiveBpChange={setPreviewBp}
              />
            </div>
          ) : (
            /* Structure Panel (List view when nothing is selected) */
            <div className="bg-bg border border-border rounded-xl p-3 shadow-sm">
              <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-3 px-1">Estructura de la Página</h3>
              <div className="flex flex-col gap-1">
                {components.map((c, idx) => (
                  <div
                    key={c.id}
                    draggable={editingNameId !== c.id}
                    onDragStart={(e) => handleDragStart(e, idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDrop={(e) => handleDrop(e, idx)}
                    onDragEnd={handleDragEnd}
                    className={`relative flex justify-between items-center p-2 border rounded-lg cursor-pointer transition-all select-none
                      ${selectedId === c.id ? 'border-accent bg-accent/5 ring-1 ring-accent/20' : 'border-border hover:border-accent/30 hover:bg-s1'}
                      ${draggedIndex === idx ? 'opacity-40 scale-[0.98]' : 'opacity-100'}
                    `}
                    onClick={() => setSelectedId(c.id)}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      setEditingNameId(c.id);
                    }}
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
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Página Actual</label>
                  <select
                    className="w-full p-2 border border-border rounded-lg text-xs bg-s1 text-ink focus:border-accent outline-none font-medium cursor-pointer"
                    value={slug}
                    onChange={(e) => {
                      const url = new URL(window.location);
                      url.searchParams.set('slug', e.target.value);
                      url.searchParams.delete('versionId');
                      window.location.href = url.toString();
                    }}
                  >
                    <option value="home">home</option>
                    <option value="sistema">sistema</option>
                    <option value="videos">videos</option>
                    <option value="portafolio">portafolio</option>
                    <option value="contacto">contacto</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Versión</label>
                  <div className="flex gap-2">
                    <select 
                      className="flex-1 p-2 border border-border rounded-lg text-xs bg-s1 text-ink focus:border-accent outline-none font-medium cursor-pointer"
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
                          {v.version_name} {v.is_active ? '(Activa)' : ''} {v.is_published ? '(EN VIVO)' : ''}
                        </option>
                      ))}
                    </select>
                    <button 
                      onClick={() => saveVersion(false)} 
                      disabled={saving || !currentVersionId}
                      className="bg-s2 hover:bg-border text-ink px-3 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
                    >
                      Guardar
                    </button>
                    <button 
                      onClick={publishVersion} 
                      disabled={saving || !currentVersionId}
                      className="bg-accent hover:bg-accent/90 text-bg px-3 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
                    >
                      Publicar
                    </button>
                  </div>
                  <a 
                    href={currentVersionId ? `/${slug === 'home' ? '' : slug}?versionId=${currentVersionId}` : `/${slug === 'home' ? '' : slug}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-1 flex items-center justify-center gap-2 p-2 border border-border rounded-lg text-xs hover:bg-s2 transition-colors text-ink font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Vista Previa Externa ↗
                  </a>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar flex flex-col gap-6">
                {selectedComp ? (
                  <div className="flex-1">
                    <SmartPropertiesPanel
                      comp={selectedComp}
                      updateProp={updateProp}
                      onClose={() => setSelectedId(null)}
                      onFocusField={setFocusedField}
                      activeBp={previewBp}
                      onActiveBpChange={setPreviewBp}
                    />
                  </div>
                ) : (
                  <div className="bg-bg border border-border rounded-xl shadow-sm flex flex-col" style={{minHeight: '200px'}}>
                    <StructureTree
                      tree={components}
                      selectedId={selectedId}
                      onSelect={(id) => setSelectedId(id)}
                      onRemove={(id) => removeComponent(id)}
                      onClone={(id) => cloneComponent(id)}
                      onMove={(sourceId, targetParentId, dropIndex) => {
                        setComponents(prev => {
                          const newTree = performMove(prev, sourceId, targetParentId === 'sibling' ? null : targetParentId, dropIndex);
                          return recalculateZIndices(newTree, previewBp);
                        });
                      }}
                      onUpdateName={(id, name) => {
                        setComponents(prev => prev.map(c => c.id === id ? { ...c, name } : c));
                      }}
                      activeBp={previewBp}
                      onToggleVisibility={(id) => {
                        setComponents(prev => toggleComponentVisibility(prev, id, previewBp));
                      }}
                    />
                    <ToolboxPanel />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT - FULL BLEED CANVAS */}
          <div className="flex-1 w-full h-full relative overflow-y-auto" style={{
            backgroundImage: `radial-gradient(var(--ps-border) 1px, transparent 1px)`,
            backgroundSize: `20px 20px`
          }}>
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-s1/90 backdrop-blur border border-border shadow-2xl px-3 py-2 rounded-full flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[
                  { id: 'mobile', label: '📱', title: 'Vista Móvil (390 x 844px)' },
                  { id: 'tablet', label: '💻', title: 'Vista Tablet (768px)' },
                  { id: 'desktop', label: '🖥', title: 'Vista Escritorio (100%)' }
                ].map(dev => (
                  <button
                    key={dev.id}
                    onClick={() => setPreviewBp(dev.id)}
                    title={dev.title}
                    className={`w-8 h-8 flex items-center justify-center text-sm rounded-full transition-all ${
                      previewBp === dev.id 
                        ? 'bg-accent text-bg shadow-md scale-110' 
                        : 'text-muted hover:text-ink hover:bg-border'
                    }`}
                  >
                    {dev.label}
                  </button>
                ))}
              </div>
              <div className="w-[1px] h-4 bg-border"></div>
              <span className="text-[10px] font-mono text-muted tracking-widest uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
                {slug}.cl
              </span>
            </div>

            {/* Actual Content Mockup Wrapper */}
            <div className="min-h-full w-full flex items-start justify-center pb-32">
              <div 
                id="mockup-viewport"
                onClick={(e) => {
                  const link = e.target.closest('a');
                  if (link) e.preventDefault();
                }}
                style={{
                  width: previewBp === 'mobile' ? '390px' : previewBp === 'tablet' ? '768px' : '100%',
                  height: previewBp === 'mobile' ? '844px' : previewBp === 'tablet' ? '1024px' : 'auto',
                  minHeight: '100%',
                  transition: 'width 0.4s cubic-bezier(0.25, 1, 0.5, 1), height 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
                className={`bg-bg transition-all duration-400 relative flex flex-col ${
                  previewBp === 'desktop' ? '' : 'mt-8 border border-border shadow-2xl rounded-[2rem] overflow-hidden'
                }`}
                className={`bg-bg transition-all duration-400 relative flex flex-col ${
                  previewBp === 'desktop' ? '' : 'mt-8 border border-border shadow-2xl rounded-[2rem] overflow-hidden'
                }`}
              >
                <Nav forceShow={true} forceAbsolute={true} />
                
                <div className="flex-1 w-full h-full relative z-10">
                  {activeGridId && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50 pointer-events-none">
                      <button 
                        onClick={() => setActiveGridId(null)}
                        className="bg-accent text-bg px-4 py-1.5 rounded-full text-xs font-bold shadow-lg pointer-events-auto hover:bg-accent/90 transition-colors flex items-center gap-2"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                        Volver a Grid Principal
                      </button>
                    </div>
                  )}
                  <GridEditor 
                    components={components} 
                    forceBp={previewBp}
                    onUpdateProp={updateProp}
                    onLayoutChange={handleGridLayoutChange}
                    onSelectComponent={(compId, fieldKey) => {
                      setSelectedId(compId);
                      if (fieldKey) {
                        setFocusedField(fieldKey);
                        setShowTypography(true);
                      }
                    }}
                    selectedId={selectedId}
                    activeGridId={activeGridId}
                    setActiveGridId={setActiveGridId}
                    registry={COMPONENT_REGISTRY}
                  />
                </div>
              </div>
            </div>
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
