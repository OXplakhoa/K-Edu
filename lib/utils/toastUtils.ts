import { ToastType } from '@/components/ui/Toast';

export const toastUtils = {
  generateId: () => `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  
  createToast: (message: string, type: ToastType, duration?: number) => ({
    id: toastUtils.generateId(),
    message,
    type,
    duration: duration || 5000
  })
};