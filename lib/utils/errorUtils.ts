import { ToastType } from '@/components/ui/Toast';

export const errorUtils = {
  // Handle API errors
  handleApiError: (error: unknown, defaultMessage: string): string => {
    const errorMessage = error instanceof Error ? error.message : defaultMessage;
    return errorMessage;
  },

  // Create toast message object
  createToastMessage: (message: string, type: ToastType): { message: string; type: ToastType } => {
    return { message, type };
  }
};