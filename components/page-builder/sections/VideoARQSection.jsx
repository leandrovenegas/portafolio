'use client';

import VideoARQ from '../../VideoARQ';

export default function VideoARQSection({ apiKey, model, systemPrompt }) {
  return (
    <div className="relative">
      <VideoARQ apiKey={apiKey} model={model} systemPrompt={systemPrompt} />
      
      {/* Editor Placeholder - Solo visible en el canvas del editor si el chatbot está cerrado o flotando */}
      <div className="p-8 my-4 mx-auto max-w-md border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 text-center opacity-50 hover:opacity-100 transition-opacity">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 text-gray-500">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <h3 className="text-sm font-semibold text-gray-700">Asistente AI (VideoARQ)</h3>
        <p className="text-xs text-gray-500 mt-1">El componente flotante del chat se mostrará en la esquina inferior derecha.</p>
      </div>
    </div>
  );
}
