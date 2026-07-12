'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageRenderer from './PageRenderer';

export default function LivePreviewListener({ initialComponents = [] }) {
  const router = useRouter();
  const [components, setComponents] = useState(initialComponents);

  // Sync state if initialComponents changes from server-side (e.g. page navigation)
  useEffect(() => {
    setComponents(initialComponents);
  }, [initialComponents]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.BroadcastChannel) return;

    const bc = new BroadcastChannel('editor-updates');
    
    const handleMessage = (event) => {
      if (event.data?.type === 'update' && event.data.components) {
        setComponents(event.data.components);
      } else if (event.data?.type === 'saved') {
        if (event.data.components) {
          setComponents(event.data.components);
        }
        router.refresh();
      }
    };

    bc.addEventListener('message', handleMessage);
    
    return () => {
      bc.removeEventListener('message', handleMessage);
      bc.close();
    };
  }, [router]);

  return <PageRenderer components={components} />;
}

