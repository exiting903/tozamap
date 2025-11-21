import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-1/2 z-[1300] animate-slide-down w-max max-w-[90%]">
      <div className="bg-slate-800 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3">
        <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-xs">
          <i className="fa-solid fa-check"></i>
        </div>
        <span className="font-medium text-sm">{message}</span>
      </div>
    </div>
  );
};