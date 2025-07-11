"use client";

import { AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { ToastType } from "../common/types";
import { useEffect, useState } from "react";

interface ErrorToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose: () => void;
}

const toastStyles = {
  error: "bg-red-500 text-white border-red-600",
  success: "bg-green-500 text-white border-green-600",
  info: "bg-blue-500 text-white border-blue-600",
  warning: "bg-yellow-500 text-white border-yellow-600",
};

const toastIcons = {
  error: AlertTriangle,
  success: CheckCircle,
  info: Info,
  warning: AlertTriangle,
};

export default function ErrorToast({
  message,
  type,
  duration = 5000,
  onClose,
}: ErrorToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const Icon = toastIcons[type];

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
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${toastStyles[type]} min-w-[300px] max-w-[400px]`}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="flex-shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
