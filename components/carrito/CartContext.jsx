"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem('lv_cart');
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try { localStorage.setItem('lv_cart', JSON.stringify(items)); } catch {}
  }, [items, mounted]);

  const addItem = (product) => {
    setItems(prev => {
      if (prev.find(i => i.id === product.id)) return prev;
      return [...prev, {
        id: product.id, slug: product.slug, name: product.name,
        price_clp: product.price_clp, price_usd: product.price_usd, type: product.type,
      }];
    });
  };

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));

  const replaceWithPack = (pack) => setItems([{
    id: pack.id, slug: pack.slug, name: pack.name,
    price_clp: pack.price_clp, price_usd: pack.price_usd, type: pack.type,
  }]);

  const clearCart = () => setItems([]);

  const itemCount = items.length;
  const hasPack = items.some(i => i.type === 'pack');
  const videoCount = items.filter(i => i.type === 'video').length;
  const totalCLP = items.reduce((s, i) => s + (i.price_clp || 0), 0);
  const totalUSD = items.reduce((s, i) => s + (Number(i.price_usd) || 0), 0);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, replaceWithPack, clearCart,
      itemCount, hasPack, videoCount, totalCLP, totalUSD, mounted,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
