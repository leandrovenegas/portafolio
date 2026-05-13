'use client';

import React, { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (!email || !email.includes('@')) {
        setMessage('Por favor, ingresa un email válido.');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || 'Hubo un error al suscribirte. Inténtalo de nuevo.');
        console.error('Newsletter API error:', result);
        setLoading(false);
        return;
      }

      setMessage(result.message || '¡Gracias por suscribirte! Te mantendremos informado.');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing:', error);
      setMessage('Error de conexión. Verifica tu conexión a internet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h3>Suscríbete a mi Newsletter</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresa tu correo electrónico"
          required
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: loading ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Suscribiendo...' : 'Suscribirse'}
        </button>
      </form>
      {message && <p style={{ marginTop: '10px', color: message.includes('error') ? 'red' : 'green' }}>{message}</p>}
    </div>
  );
};

export default NewsletterSignup;