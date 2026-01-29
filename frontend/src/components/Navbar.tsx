import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { ShoppingCart, Menu, X, User as UserIcon, LogOut, ChevronRight } from 'lucide-react';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll effect for glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Cars', path: '/cars' },
        { name: 'Services', path: '/services' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || isMenuOpen
                ? 'glass border-b border-slate-200/50 py-2'
                : 'bg-transparent border-transparent py-4'
                }`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center flex-shrink-0">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-brand-600 rounded-lg p-1.5 transform group-hover:rotate-12 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
                                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                                    <circle cx="7" cy="17" r="2" />
                                    <path d="M9 17h6" />
                                    <circle cx="17" cy="17" r="2" />
                                </svg>
                            </div>
                            <span className="text-2xl font-display font-bold text-slate-900 tracking-tight">
                                Sunny<span className="text-brand-600">Motors</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive(link.path)
                                    ? 'bg-brand-50 text-brand-700 shadow-sm ring-1 ring-brand-200'
                                    : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center space-x-3">
                        <Link to="/cart">
                            <Button variant="ghost" size="icon" className="relative text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-full w-10 h-10">
                                <ShoppingCart className="h-5 w-5" />
                                {/* Cart badge logic would go here */}
                            </Button>
                        </Link>

                        {isAuthenticated ? (
                            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                                <Link to={user?.role === 'admin' ? '/admin' : '/profile'}>
                                    <div className="flex items-center gap-2 py-1 px-2 pr-4 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer group">
                                        <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 group-hover:bg-brand-200 transition-colors">
                                            <UserIcon className="h-4 w-4" />
                                        </div>
                                        <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{user?.name && user.name.split(' ')[0]}</span>
                                    </div>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={logout}
                                    className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full w-9 h-9"
                                    title="Log out"
                                >
                                    <LogOut className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login">
                                    <Button variant="ghost" className="text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-full px-5">Log in</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-brand-600 hover:bg-brand-700 text-white rounded-full px-5 shadow-sm shadow-brand-200">Sign up</Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu Content */}
            <div
                className={`fixed top-0 right-0 z-50 w-full max-w-xs h-full bg-white shadow-2xl transform transition-transform duration-300 ease-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b border-slate-100">
                        <span className="text-lg font-bold text-slate-900">Menu</span>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 rounded-full hover:bg-slate-100 text-slate-500"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`flex items-center justify-between p-3 rounded-xl transition-colors ${isActive(link.path)
                                    ? 'bg-brand-50 text-brand-700 font-medium'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                {link.name}
                                <ChevronRight className={`h-4 w-4 ${isActive(link.path) ? 'text-brand-500' : 'text-slate-300'}`} />
                            </Link>
                        ))}

                        <hr className="my-4 border-slate-100" />
                        <Link to="/cart" className="flex items-center justify-between p-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900">
                            <span className="flex items-center gap-3">
                                <ShoppingCart className="h-5 w-5" />
                                Cart
                            </span>
                        </Link>
                    </div>

                    <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                        {isAuthenticated ? (
                            <div className="space-y-3">
                                <Link to={user?.role === 'admin' ? '/admin' : '/profile'}>
                                    <div className="flex items-center gap-3 p-2 rounded-lg bg-white border border-slate-200 shadow-sm">
                                        <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700">
                                            <UserIcon className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-slate-900 truncate">{user?.name}</p>
                                            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                                        </div>
                                    </div>
                                </Link>
                                <Button
                                    variant="outline"
                                    onClick={logout}
                                    className="w-full justify-center text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100"
                                >
                                    Log out
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">
                                <Link to="/login">
                                    <Button variant="outline" className="w-full justify-center">Log in</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="w-full justify-center bg-brand-600 hover:bg-brand-700 text-white">Sign up</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
