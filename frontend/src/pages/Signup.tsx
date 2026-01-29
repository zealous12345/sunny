import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '@/api/axios';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { AlertCircle } from 'lucide-react';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            return setError("Passwords don't match");
        }

        setLoading(true);

        try {
            await api.post('/auth/register', { name, email, password });
            // On success, redirect to login with a message (or auto-login if API returned token)
            // The current backend registers but doesn't auto-login/return token usually on register based on my quick look (returns {message: 'User registered'})
            // So we redirect to login.
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || err.response?.data?.error || 'Failed to create account.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-slate-50 px-4">
            <Card className="w-full max-w-md shadow-lg border-0 bg-white">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-3xl font-bold text-slate-900">Create Account</CardTitle>
                    <p className="text-sm text-slate-500">Join SunnyMotors today</p>
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
                            <label htmlFor="name" className="text-sm font-medium leading-none text-slate-700">Full Name</label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none text-slate-700">Email</label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="m@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium leading-none text-slate-700">Password</label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Create a password"
                                minLength={6}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="text-sm font-medium leading-none text-slate-700">Confirm Password</label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="Confirm your password"
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-slate-100 p-6">
                    <p className="text-sm text-slate-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-brand-600 hover:text-brand-500 font-medium">
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Signup;
