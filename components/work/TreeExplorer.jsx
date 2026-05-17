'use client';

import { Folder, FileText, ChevronRight, ChevronDown, Plus, Trash2, FolderPlus, FilePlus } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function TreeExplorer({ topics }) {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedTopics, setExpandedTopics] = useState({});
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    type: null, // 'empty', 'topic', 'version'
    targetId: null, // topicId o versionId
    targetName: null, // topicName o versionName
    parentTopicName: null // para archivos
  });

  // Cerrar el menú contextual con clic ordinario o tecla Escape
  useEffect(() => {
    const handleClose = () => setContextMenu(prev => ({ ...prev, visible: false }));
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('click', handleClose);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('click', handleClose);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleTopic = (topicId) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const handleContextMenu = (e, type, data = {}) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Evitar que el menú flote fuera del margen inferior/derecho de la pantalla
    const menuWidth = 190;
    const menuHeight = type === 'topic' ? 100 : 40;
    let x = e.clientX;
    let y = e.clientY;

    if (window.innerWidth - x < menuWidth) x = window.innerWidth - menuWidth - 10;
    if (window.innerHeight - y < menuHeight) y = window.innerHeight - menuHeight - 10;

    setContextMenu({
      visible: true,
      x,
      y,
      type,
      targetId: data.id || null,
      targetName: data.name || null,
      parentTopicName: data.parentTopicName || null
    });
  };

  // --- Operaciones del API ---

  const handleCreateFolder = async () => {
    const name = prompt('Nombre de la nueva carpeta (Tópico):');
    if (!name || !name.trim()) return;

    try {
      const res = await fetch('/api/work/explorer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create-folder', topicName: name.trim() })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // Auto expandir la nueva carpeta
      if (data.topic?.id) {
        setExpandedTopics(prev => ({ ...prev, [data.topic.id]: true }));
      }
      
      router.refresh();
    } catch (err) {
      alert(`Error al crear carpeta: ${err.message}`);
    }
  };

  const handleCreateFile = async () => {
    const name = prompt('Nombre del nuevo archivo (ej: plan.md):', 'plan.md');
    if (!name || !name.trim()) return;

    let formattedName = name.trim();
    if (!formattedName.endsWith('.md')) formattedName += '.md';

    try {
      const res = await fetch('/api/work/explorer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create-file',
          topicName: contextMenu.targetName,
          fileName: formattedName
        })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      router.refresh();
      
      // Intentar redirigir automáticamente al nuevo archivo creado
      if (data.version?.id && contextMenu.targetId) {
        router.push(`/admin/work/${contextMenu.targetId}/${data.version.id}`);
      }
    } catch (err) {
      alert(`Error al crear el archivo: ${err.message}`);
    }
  };

  const handleDeleteFolder = async () => {
    const confirmDelete = confirm(`¿Estás seguro de eliminar el tópico "${contextMenu.targetName}" y todos sus planes asociados? Esta acción borrará los archivos físicos y los registros en la base de datos.`);
    if (!confirmDelete) return;

    try {
      const res = await fetch('/api/work/explorer', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete-folder',
          topicId: contextMenu.targetId,
          topicName: contextMenu.targetName
        })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // Redirigir a raiz por seguridad
      router.push('/admin/work');
      router.refresh();
    } catch (err) {
      alert(`Error al eliminar: ${err.message}`);
    }
  };

  const handleDeleteFile = async () => {
    const cleanFileName = contextMenu.targetName.split(' - ')[0];
    const confirmDelete = confirm(`¿Estás seguro de eliminar el archivo "${cleanFileName}"? Se borrará físicamente del disco duro y de Supabase.`);
    if (!confirmDelete) return;

    try {
      const res = await fetch('/api/work/explorer', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete-file',
          versionId: contextMenu.targetId,
          topicName: contextMenu.parentTopicName,
          fileName: cleanFileName
        })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      router.push('/admin/work');
      router.refresh();
    } catch (err) {
      alert(`Error al eliminar archivo: ${err.message}`);
    }
  };

  return (
    <div 
      onContextMenu={(e) => handleContextMenu(e, 'empty')}
      className="w-[var(--panel-left-width,240px)] h-full bg-[var(--ps-bg-panel)] border-r border-[var(--ps-border)] text-[var(--ps-text)] text-[var(--font-size-sm,12px)] overflow-y-auto flex flex-col font-sans select-none"
    >
      {/* Toolbar */}
      <div className="flex-none flex items-center justify-between px-3 py-2 border-b border-[var(--ps-border-dark)] bg-[var(--ps-bg-toolbar)]">
        <span className="font-semibold text-[var(--ps-text)] tracking-wide">WorkTree Explorer</span>
        <button 
          onClick={handleCreateFolder}
          title="Nuevo Tópico"
          className="text-[#999999] hover:text-white p-0.5 rounded hover:bg-[var(--ps-bg-input)]"
        >
          <FolderPlus size={13} />
        </button>
      </div>
      
      {/* Directorio */}
      <div className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {topics?.length === 0 ? (
          <div className="text-[#666666] text-center mt-4 italic">
            Clic derecho para crear un Tópico
          </div>
        ) : (
          topics?.map(topic => {
            const isExpanded = expandedTopics[topic.id];
            return (
              <div key={topic.id} className="flex flex-col">
                <div 
                  onClick={() => toggleTopic(topic.id)}
                  onContextMenu={(e) => handleContextMenu(e, 'topic', { id: topic.id, name: topic.name })}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-[var(--ps-radius)] hover:bg-[var(--ps-bg-input)] cursor-pointer text-[#cccccc]"
                >
                  {isExpanded ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                  <Folder size={13} className="text-[var(--ps-accent)]" strokeWidth={1.5} />
                  <span className="truncate flex-1">{topic.name}</span>
                </div>

                {/* Archivos (Versiones Activas del Topic) */}
                {isExpanded && (
                  <div className="border-l border-[#3c3c3c] ml-3.5 pl-1.5 my-0.5 space-y-0.5">
                    {topic.plan_versions?.filter(v => v.is_active).length === 0 ? (
                      <div 
                        onContextMenu={(e) => handleContextMenu(e, 'topic', { id: topic.id, name: topic.name })}
                        className="text-[#555555] italic text-[10px] pl-3 py-0.5"
                      >
                        (Carpeta vacía)
                      </div>
                    ) : (
                      topic.plan_versions?.filter(v => v.is_active).map(version => {
                        const url = `/admin/work/${topic.id}/${version.id}`;
                        const isActiveFile = pathname === url;
                        const cleanName = version.version_name.split(' - ')[0];

                        return (
                          <Link 
                            href={url} 
                            key={version.id} 
                            onContextMenu={(e) => handleContextMenu(e, 'version', { 
                              id: version.id, 
                              name: version.version_name, 
                              parentTopicName: topic.name 
                            })}
                            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-[var(--ps-radius)] cursor-pointer text-[#cccccc] ${isActiveFile ? 'bg-[var(--ps-bg-input)] text-white font-medium border-l-2 border-[var(--ps-accent)] rounded-l-none' : 'hover:bg-[var(--ps-bg-input)]'}`}
                          >
                            <FileText size={11} className="text-[var(--ps-text)] opacity-70" strokeWidth={1.5} />
                            <span className="truncate flex-1">{cleanName}</span>
                          </Link>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ========================================================= */}
      {/* MENÚ CONTEXTUAL - ESTILO PHOTOSHOP CC DARK MODE          */}
      {/* ========================================================= */}
      {contextMenu.visible && (
        <div 
          className="fixed z-[99999] bg-[#252526] border border-[#3c3c3c] rounded shadow-[0_10px_25px_rgba(0,0,0,0.5)] py-1 text-[11px] text-[#cccccc] font-sans w-[185px]"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()} // Evita cerrar el menú por accidente al clicar dentro
        >
          {contextMenu.type === 'empty' && (
            <button 
              onClick={() => { setContextMenu(prev => ({ ...prev, visible: false })); handleCreateFolder(); }}
              className="w-full text-left px-3 py-1.5 hover:bg-[#1473e6] hover:text-white flex items-center gap-2 cursor-default"
            >
              <FolderPlus size={11} className="text-[var(--ps-accent)]" />
              <span>Nuevo Tópico (Carpeta)</span>
            </button>
          )}

          {contextMenu.type === 'topic' && (
            <>
              <button 
                onClick={() => { setContextMenu(prev => ({ ...prev, visible: false })); handleCreateFile(); }}
                className="w-full text-left px-3 py-1.5 hover:bg-[#1473e6] hover:text-white flex items-center gap-2 cursor-default"
              >
                <FilePlus size={11} className="text-green-500" />
                <span>Nuevo Plan (Archivo .md)</span>
              </button>
              <div className="h-[1px] bg-[#3c3c3c] my-1" />
              <button 
                onClick={() => { setContextMenu(prev => ({ ...prev, visible: false })); handleDeleteFolder(); }}
                className="w-full text-left px-3 py-1.5 hover:bg-[#d93838] hover:text-white flex items-center gap-2 cursor-default"
              >
                <Trash2 size={11} className="text-red-400" />
                <span className="text-red-300 hover:text-white">Eliminar Carpeta</span>
              </button>
            </>
          )}

          {contextMenu.type === 'version' && (
            <button 
              onClick={() => { setContextMenu(prev => ({ ...prev, visible: false })); handleDeleteFile(); }}
              className="w-full text-left px-3 py-1.5 hover:bg-[#d93838] hover:text-white flex items-center gap-2 cursor-default"
            >
              <Trash2 size={11} className="text-red-400" />
              <span className="text-red-300 hover:text-white">Eliminar Archivo</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
