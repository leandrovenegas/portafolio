import { useState, useRef } from 'react';

export function useDraggable(initialPosition = { x: window.innerWidth - 300, y: 100 }) {
  const [pos, setPos] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, startPosX: 0, startPosY: 0 });

  const onPointerDown = (e) => {
    // Only drag if left click
    if (e.button !== 0) return;
    
    e.target.setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: pos.x,
      startPosY: pos.y
    };
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPos({
      x: dragRef.current.startPosX + dx,
      y: dragRef.current.startPosY + dy
    });
  };

  const onPointerUp = (e) => {
    if (isDragging) {
      e.target.releasePointerCapture(e.pointerId);
      setIsDragging(false);
    }
  };

  return { pos, dragProps: { onPointerDown, onPointerMove, onPointerUp } };
}
