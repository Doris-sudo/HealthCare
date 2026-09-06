import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast = () => {
  const { toastMessage, setToastMessage } = useCart();

  if (!toastMessage) return null;

  const getIcon = () => {
    switch (toastMessage.type) {
      case 'error':
        return <AlertCircle size={18} style={{ color: 'var(--error-red)' }} />;
      case 'info':
        return <Info size={18} style={{ color: 'var(--primary-blue)' }} />;
      default:
        return <CheckCircle2 size={18} style={{ color: 'var(--success-green)' }} />;
    }
  };

  return (
    <div className="toast-container">
      <div className={`toast-item ${toastMessage.type || 'success'}`}>
        {getIcon()}
        <span>{toastMessage.message}</span>
        <button 
          onClick={() => setToastMessage(null)}
          style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', display: 'flex', marginLeft: '8px' }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
