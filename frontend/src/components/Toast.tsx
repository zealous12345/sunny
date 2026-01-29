import { useToast } from '../contexts/ToastContext';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

const Toast = () => {
    const { toast, hideToast } = useToast();
    const [isVisible, setIsVisible] = useState(false);

    // Handle animation state
    useEffect(() => {
        if (toast.visible) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300); // match transition duration
            return () => clearTimeout(timer);
        }
    }, [toast.visible]);

    if (!isVisible && !toast.visible) return null;

    const bgColors = {
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    };

    const icons = {
        success: <CheckCircle className="h-5 w-5 text-green-500" />,
        error: <AlertCircle className="h-5 w-5 text-red-500" />,
        info: <Info className="h-5 w-5 text-blue-500" />,
        warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    };

    return (
        <div className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ease-in-out ${toast.visible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
            <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${bgColors[toast.type]} min-w-[300px]`}>
                {icons[toast.type]}
                <p className="flex-1 text-sm font-medium">{toast.message}</p>
                <button
                    onClick={hideToast}
                    className="p-1 hover:bg-black/5 rounded-full transition-colors"
                >
                    <X className="h-4 w-4 opacity-60" />
                </button>
            </div>
        </div>
    );
};

export default Toast;
