'use client'
import React, { useEffect, useState } from 'react';
import { X, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export type ToastType = 'error' | 'success' | 'info' | 'warning';

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  onClose: (id: string) => void;
  index: number;
}

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

const toastStyles = {
  error: 'bg-red-500 text-black border-red-600',
  success: 'bg-green-500 text-black border-green-600',
  info: 'bg-blue-500 text-black border-blue-600',
  warning: 'bg-yellow-500 text-black border-yellow-600'
};

const toastIcons = {
  error: AlertTriangle,
  success: CheckCircle,
  info: Info,
  warning: AlertTriangle
};

// Individual Toast Component
function Toast({ id, message, type, duration = 5000, onClose, index }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const Icon = toastIcons[type];

  useEffect(() => {
    // Trigger entrance animation
    const entranceTimer = setTimeout(() => setIsVisible(true), 50);
    
    // Auto remove timer
    const removeTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(entranceTimer);
      clearTimeout(removeTimer);
    };
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300); // Wait for exit animation
  };

  return (
    <div
      className={`transform transition-all duration-300 ease-out ${
        isVisible && !isExiting
          ? 'translate-x-0 opacity-100 scale-100'
          : 'translate-x-full opacity-0 scale-95'
      }`}
      style={{
        transform: `translateY(${index * 40}px)`,
        zIndex: 1000 - index
      }}
    >
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl border-2 ${toastStyles[type]} min-w-[320px] max-w-[400px] backdrop-blur-sm`}>
        <Icon className="w-5 h-5 flex-shrink-0" />
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          onClick={handleClose}
          className="flex-shrink-0 hover:opacity-80 transition-opacity p-1 rounded-full hover:bg-white/20 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Toast Container to manage multiple toasts
interface ToastContainerProps {
  toasts: ToastItem[];
  onRemoveToast: (id: string) => void;
}

export function ToastContainer({ toasts, onRemoveToast }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-1">
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={onRemoveToast}
          index={index}
        />
      ))}
    </div>
  );
}

// Legacy single toast component for backward compatibility
export default function SingleToast({ message, type, duration = 5000, onClose }: {
  message: string;
  type: ToastType;
  duration?: number;
  onClose: () => void;
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${toastStyles[type]} min-w-[300px] max-w-[400px]`}>
        {React.createElement(toastIcons[type], { className: "w-5 h-5 flex-shrink-0" })}
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="flex-shrink-0 hover:opacity-80 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
} 