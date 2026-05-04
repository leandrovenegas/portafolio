'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LivePreviewListener() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined' || !window.BroadcastChannel) return;

    const bc = new BroadcastChannel('editor-updates');
    
    const handleMessage = (event) => {
      if (event.data?.type === 'saved') {
        // Refresh the page data seamlessly
        router.refresh();
      }
    };

    bc.addEventListener('message', handleMessage);
    
    return () => {
      bc.removeEventListener('message', handleMessage);
      bc.close();
    };
  }, [router]);

  return null;
}
