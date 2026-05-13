"use client";
import { useCart } from './CartContext';

export default function AddToCartButton({ product, children, className }) {
  const { addItem, items } = useCart();
  if (!product) return null;

  const isAdded = items.some(i => i.id === product.id);

  const base = isAdded
    ? 'inline-flex items-center gap-2 px-6 py-3 rounded-full bg-s2 text-mid font-mono text-sm font-semibold cursor-default'
    : 'inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-bg font-mono text-sm font-semibold hover:bg-accent2 transition-colors';

  return (
    <button
      onClick={() => !isAdded && addItem(product)}
      disabled={isAdded}
      className={className || base}
    >
      {isAdded ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Agregado al pedido
        </>
      ) : (
        children || 'Agregar al pedido'
      )}
    </button>
  );
}
