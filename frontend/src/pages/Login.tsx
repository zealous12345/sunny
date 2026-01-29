import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/api/axios';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { AlertCircle } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await api.post('/auth/login', { email, password });
            const { token, user } = res.data;
            login(token, user);
            // login function in provider handles redirect
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to log in. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-slate-50 px-4">
            <Card className="w-full max-w-md shadow-lg border-0 bg-white">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-3xl font-bold text-slate-900">Welcome Back</CardTitle>
                    <p className="text-sm text-slate-500">Sign in to your SunnyMotors account</p>
                </CardHeader>
                <CardContent>
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-center gap-2 text-sm mb-4">
                            <AlertCircle className="h-4 w-4" />
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none text-slate-700">Email</label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-medium leading-none text-slate-700">Password</label>
                                <Link to="#" className="text-sm text-brand-600 hover:text-brand-500">Forgot password?</Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-slate-100 p-6">
                    <p className="text-sm text-slate-500">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-brand-600 hover:text-brand-500 font-medium">
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
