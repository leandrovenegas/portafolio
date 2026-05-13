"use client";

import { useState, useRef, useEffect } from 'react';

export default function VideoARQ({ apiKey, model, systemPrompt }) {

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isLoading]);

  useEffect(() => {
    if (isOpen && !hasStarted) {
      setHasStarted(true);
      setMessages([
        { role: 'assistant', content: 'Hola 👋 ¿Qué vendes y a quién va dirigido?' }
      ]);
    }
  }, [isOpen, hasStarted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/videoarq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          apiKey: apiKey || undefined,
          model: model || undefined,
          systemPrompt: systemPrompt || undefined
        }),
      });

      const data = await response.json();
      if (data.text) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.text }]);
      } else if (data.error) {
        console.error('[VideoARQ] Error del servidor:', data.error);
        setMessages((prev) => [...prev, { role: 'assistant', content: 'Lo siento, no pude procesar tu mensaje en este momento. Inténtalo de nuevo más tarde.' }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: 'Lo siento, hubo un problema al procesar tu respuesta.' }]);
      }
    } catch (error) {
      console.error('[VideoARQ] Error de conexión:', error);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'No pude conectarme. Verifica tu conexión e inténtalo de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageContent = (content) => {
    const waRegex = /(https:\/\/wa\.me\/[^\s)]+)/g;
    if (waRegex.test(content)) {
      const parts = content.split(waRegex);
      return parts.map((part, i) => {
        if (waRegex.test(part)) {
          return (
            <div key={i} className="mt-3">
              <a
                href={part.replace(/\]$/, '')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#25D366] text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors"
              >
                Enviar a WhatsApp
              </a>
            </div>
          );
        }
        return <span key={i}>{part}</span>;
      });
    }
    return <span>{content}</span>;
  };

  // ── Chat expandido: flota en la esquina inferior derecha ─────────────────
  if (isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] h-[550px] max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-black text-white p-4 flex justify-between items-center">
          <h3 className="font-bold text-lg">Asistente Virtual</h3>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.role === 'user'
                  ? 'bg-black text-white rounded-tr-none'
                  : 'bg-gray-200 text-black rounded-tl-none whitespace-pre-wrap'
                }`}>
                {renderMessageContent(m.content)}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[85%] p-3 rounded-2xl text-sm bg-gray-200 text-black rounded-tl-none flex gap-1 items-center">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu respuesta..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-black text-black bg-white"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-50 transition-opacity"
          >
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
          </button>
        </form>
      </div>
    );
  }

  // ── Estado cerrado: bloque estático en el pie del Home ───────────────────
  return (
    <div className="w-full flex justify-center py-16 px-4">
      <button
        onClick={() => setIsOpen(true)}
        className="group flex flex-col items-center gap-4 text-center"
        aria-label="Abrir asistente virtual"
      >
        {/* Avatar / ícono */}
        <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>

        {/* Texto */}
        <div>
          <p className="text-white/50 text-xs tracking-widest uppercase mb-1">Asistente Virtual</p>
          <p className="text-white text-lg font-light">
            Hola, soy el Asistente virtual de Leandro.
          </p>
          <p className="text-white/40 text-sm mt-1 group-hover:text-white/60 transition-colors duration-300">
            Toca para hablar →
          </p>
        </div>
      </button>
    </div>
  );
}
