import React, { useState, useEffect } from 'react';

import Portal from '../portal';

import './offline.css';

export default function OfflineNotifier() {

  let [ status, setStatus ] = useState('online');

  useEffect(() => {
    const onOnline = () => {
      setStatus('online');
    }
    window.addEventListener('online', onOnline);
    return () => document.body.removeEventListener('online', onOnline);
  }, []);

  useEffect(() => {
    const onOffline = () => {
      setStatus('offline');
    }
    window.addEventListener('offline', onOffline);
    return () => document.body.removeEventListener('offline', onOffline);
  }, []);

  return status === 'offline' ? (
    <Portal className="portalBox">
      Seems you are offline
    </Portal>
  ) : null;
}