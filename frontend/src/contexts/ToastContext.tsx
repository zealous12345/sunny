import { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastState {
    message: string;
    type: ToastType;
    visible: boolean;
}

interface ToastContextType {
    toast: ToastState;
    showToast: (message: string, type?: ToastType, duration?: number) => void;
    hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toast, setToast] = useState<ToastState>({ message: '', type: 'success', visible: false });
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const hideToast = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setToast(prev => ({ ...prev, visible: false }));
    }, []);

    const showToast = useCallback((message: string, type: ToastType = 'success', duration = 3000) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setToast({ message, type, visible: true });
        timeoutRef.current = setTimeout(() => {
            setToast(prev => ({ ...prev, visible: false }));
            timeoutRef.current = null;
        }, duration);
    }, []);

    return (
        <ToastContext.Provider value={{ toast, showToast, hideToast }}>
            {children}
        </ToastContext.Provider>
    );
};

export default ToastContext;
