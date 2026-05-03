'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { COMPONENT_DEFINITIONS } from '@/components/page-builder/registry';
import { DEFAULT_HOME_COMPONENTS } from '@/components/page-builder/defaultConfig';
import PageRenderer from '@/components/page-builder/PageRenderer';

import { Suspense } from 'react';
import Link from 'next/link';

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

  // Selected component for editing props
  const [selectedId, setSelectedId] = useState(null);

  // View mode for preview
  const [viewMode, setViewMode] = useState('mobile');

  useEffect(() => {
    fetchData();
  }, [slug]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch history
      const histRes = await fetch(`/api/pages?slug=${slug}&action=history`);
      const histData = await histRes.json();
      
      if (!histRes.ok) throw new Error(histData.error || 'Failed to fetch history');
      setVersions(histData);

      // Fetch active or latest
      const activeVer = histData.find(v => v.is_active) || histData[0];
      
      if (activeVer) {
        const verRes = await fetch(`/api/pages?slug=${slug}&versionId=${activeVer.id}`);
        const verData = await verRes.json();
        setComponents(verData.components || []);
        setCurrentVersionId(activeVer.id);
      } else {
        // Fallback for first time
        if (slug === 'home') {
          setComponents(DEFAULT_HOME_COMPONENTS);
        }
      }
    } catch (err) {
      console.warn("Editor error:", err.message);
      setError("No se pudo conectar a la base de datos de versiones. Asegúrate de haber ejecutado el script SQL en Supabase. Cargando versión local por defecto...");
      if (slug === 'home') {
        setComponents(DEFAULT_HOME_COMPONENTS);
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
      if (isNew) setNewVersionName('');
      fetchData(); // Reload
    } catch (err) {
      setError("Error al guardar: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const moveComponent = (index, direction) => {
    const newComps = [...components];
    if (direction === 'up' && index > 0) {
      const temp = newComps[index - 1];
      newComps[index - 1] = newComps[index];
      newComps[index] = temp;
    } else if (direction === 'down' && index < newComps.length - 1) {
      const temp = newComps[index + 1];
      newComps[index + 1] = newComps[index];
      newComps[index] = temp;
    }
    setComponents(newComps);
  };

  const removeComponent = (index) => {
    const newComps = [...components];
    const removed = newComps.splice(index, 1);
    setComponents(newComps);
    if (selectedId === removed[0].id) setSelectedId(null);
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
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Integrated Admin Header */}
      <header className="w-full border-b border-border bg-white px-6 py-3 z-50 flex items-center justify-between sticky top-0 shadow-sm">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-display text-xl text-ink hover:opacity-70 transition-opacity">
            Administración
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/admin" className="px-3 py-2 rounded-lg hover:bg-s1 text-ink font-body text-xs transition-colors">
              Dashboard
            </Link>
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
            className="p-2 rounded bg-s1 border border-border text-xs font-medium focus:ring-1 focus:ring-accent outline-none"
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
          
          <div className="flex gap-2 items-center bg-white p-1 rounded-lg border border-border shadow-sm">
            <input 
              type="text" 
              placeholder="Nueva versión..." 
              className="px-3 py-1.5 text-xs border-none focus:ring-0 outline-none w-32 bg-transparent"
              value={newVersionName}
              onChange={e => setNewVersionName(e.target.value)}
            />
            <button 
              onClick={() => saveVersion(true)}
              disabled={saving}
              className="bg-ink text-bg px-3 py-1.5 rounded-md text-xs font-medium hover:opacity-90 transition-opacity"
            >
              Nueva Rama
            </button>
          </div>
        </div>

      <div className="flex flex-col md:flex-row gap-6 relative">
        {/* Sidebar components list */}
        <div className="w-full md:w-64 flex-shrink-0 flex flex-col gap-4 sticky top-[73px] self-start max-h-[calc(100vh-100px)] overflow-y-auto pr-2 scrollbar-thin">
          <div className="bg-white border border-border rounded-xl p-3 shadow-sm">
            <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-3 px-1">Estructura</h3>
            <div className="flex flex-col gap-1.5">
              {components.map((c, idx) => (
                <div 
                  key={c.id} 
                  className={`flex justify-between items-center p-2 border rounded-lg cursor-pointer transition-all ${selectedId === c.id ? 'border-accent bg-accent/5 ring-1 ring-accent/20' : 'border-border hover:border-accent/30 hover:bg-s1'}`}
                  onClick={() => setSelectedId(c.id)}
                >
                  <span className="font-medium truncate text-xs text-ink pl-1">{COMPONENT_DEFINITIONS.find(d=>d.type===c.type)?.name || c.type}</span>
                  <div className="flex items-center gap-0.5" onClick={e => e.stopPropagation()}>
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
                      onClick={() => removeComponent(idx)} 
                      className="p-1 hover:bg-red-50 text-muted hover:text-red-500 transition-colors"
                      title="Eliminar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    </button>
                  </div>
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

          {/* Properties Editor */}
          {selectedComp && (
            <div className="bg-white border border-border rounded-xl p-3 shadow-sm animate-in fade-in slide-in-from-bottom-2">
              <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-3 px-1 flex justify-between items-center">
                Propiedades
                <button onClick={() => setSelectedId(null)} className="hover:text-ink">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              </h3>
              <div className="flex flex-col gap-3">
                {Object.keys(selectedComp.props).map(propKey => {
                  const val = selectedComp.props[propKey];
                  if (typeof val === 'string') {
                    return (
                      <div key={propKey}>
                        <label className="block text-[10px] font-bold text-muted mb-1 uppercase tracking-wider pl-1">{propKey}</label>
                        {val.length > 50 ? (
                          <textarea 
                            value={val} 
                            onChange={e => updateProp(selectedComp.id, propKey, e.target.value)}
                            className="w-full p-2 border border-border rounded-lg text-xs min-h-[80px] bg-s1 focus:bg-white focus:ring-1 focus:ring-accent outline-none transition-all"
                          />
                        ) : (
                          <input 
                            type="text" 
                            value={val} 
                            onChange={e => updateProp(selectedComp.id, propKey, e.target.value)}
                            className="w-full p-2 border border-border rounded-lg text-xs bg-s1 focus:bg-white focus:ring-1 focus:ring-accent outline-none transition-all"
                          />
                        )}
                      </div>
                    )
                  }
                  if (Array.isArray(val)) {
                    // Very simple JSON edit for arrays like paragraphs, items, faqs
                    return (
                      <div key={propKey}>
                        <label className="block text-xs font-bold text-muted mb-1 uppercase tracking-wider">{propKey} (JSON)</label>
                        <textarea 
                          value={JSON.stringify(val, null, 2)} 
                          onChange={e => {
                            try {
                              updateProp(selectedComp.id, propKey, JSON.parse(e.target.value))
                            } catch (e) {} // ignore parse errors until valid
                          }}
                          className="w-full p-2 font-mono text-xs border border-border rounded min-h-[150px] bg-bg"
                        />
                      </div>
                    )
                  }
                  return null;
                })}
              </div>
            </div>
          )}
        </div>

        {/* Live Preview */}
        <div className="flex-1 border border-border rounded-lg bg-s1 overflow-hidden relative flex flex-col max-h-[80vh] shadow-inner">
          <div className="p-3 border-b border-border bg-white sticky top-0 z-50 flex justify-between items-center px-4 shadow-sm">
            <span className="font-mono text-sm text-muted">Vista Previa</span>
            <div className="flex bg-s1 rounded p-1">
              <button 
                onClick={() => setViewMode('mobile')} 
                className={`px-3 py-1 text-xs rounded transition-colors ${viewMode === 'mobile' ? 'bg-white shadow text-ink font-bold' : 'text-muted hover:text-ink'}`}
              >
                Móvil
              </button>
              <button 
                onClick={() => setViewMode('desktop')} 
                className={`px-3 py-1 text-xs rounded transition-colors ${viewMode === 'desktop' ? 'bg-white shadow text-ink font-bold' : 'text-muted hover:text-ink'}`}
              >
                Escritorio
              </button>
            </div>
          </div>
          
          <div className={`overflow-y-auto w-full flex-1 bg-bg ${viewMode === 'mobile' ? 'flex justify-center p-4 md:p-8' : ''}`}>
            <div 
              className={`pointer-events-none transition-all duration-300 ${
                viewMode === 'mobile' 
                  ? 'w-[375px] min-h-[812px] border-[8px] border-ink rounded-[2.5rem] shadow-2xl overflow-hidden bg-bg origin-top scale-[0.8] md:scale-100' 
                  : 'w-full scale-100 transform-none'
              }`}
            >
              <PageRenderer components={components} />
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
