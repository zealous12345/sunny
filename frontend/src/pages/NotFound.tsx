import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { FileQuestion } from 'lucide-react';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <FileQuestion className="h-12 w-12 text-slate-400" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Page Not Found</h1>
            <p className="text-slate-600 text-lg mb-8 max-w-md">
                Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
            </p>
            <div className="flex gap-4">
                <Button onClick={() => navigate(-1)} variant="outline">
                    Go Back
                </Button>
                <Button onClick={() => navigate('/')}>
                    Return Home
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
