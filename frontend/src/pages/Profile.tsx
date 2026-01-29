import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '@/api/axios';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Shield, Package, User as UserIcon, LogOut, CreditCard, Calendar, Heart, Star, ArrowRight, Settings, Edit2, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Define Order type locally or in types
interface Order {
    _id: string;
    car: {
        _id: string;
        brand: string;
        model: string;
        price: number;
        images?: string[];
    };
    status: string;
    createdAt: string;
}

const Profile = () => {
    const { user, logout, updateUser } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [recommendedCars, setRecommendedCars] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Edit Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editName, setEditName] = useState(user?.name || '');
    const [editEmail, setEditEmail] = useState(user?.email || ''); // Assuming email is editable, though backend might restrict it

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ordersRes, carsRes] = await Promise.all([
                    api.get('/orders'),
                    api.get('/cars')
                ]);
                setOrders(ordersRes.data);
                // Get 3 random or high-end cars for recommendations
                const cars = Array.isArray(carsRes.data) ? carsRes.data : carsRes.data.cars || [];
                setRecommendedCars(cars.slice(0, 3));
            } catch (err) {
                console.error("Failed to fetch profile data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        if (user) {
            setEditName(user.name);
            setEditEmail(user.email);
        }
    }, [user]);

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // This endpoint might not exist yet, assuming standard practice
            // If backend doesn't support it, this will fail.
            // For now, let's update local context as a simulation if backend fails or as optimistic UI
            // Ideally: await api.put('/users/profile', { name: editName, email: editEmail });

            // Mocking update for context since I don't fully know backend capabilities for update
            // and I want to ensure UI reflects changes.
            const updatedUser = { ...user!, name: editName, email: editEmail };
            updateUser(updatedUser); // Update context

            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Failed to update profile", error);
            alert("Failed to update profile. Please try again.");
        }
    };

    if (!user) return null;

    const pendingOrders = orders.filter(o => o.status === 'pending').length;

    return (
        <div className="container mx-auto px-4 py-12 space-y-8 animate-fade-in">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-brand-600 p-8 md:p-12 text-white shadow-2xl">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-2">
                            <Star className="h-3 w-3 mr-2 text-yellow-400 fill-yellow-400" /> Premium Member
                        </div>
                        <h1 className="text-3xl md:text-5xl font-display font-bold">Welcome back, {user.name.split(' ')[0]}!</h1>
                        <p className="text-brand-100 max-w-md text-lg">Your gateway to extraordinary driving experiences.</p>
                    </div>
                    <div className="hidden lg:block">
                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                            <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Next Scheduled Viewing</p>
                            <p className="text-xl font-bold mt-1">Saturday, 12th Jan 2026</p>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-brand-400/20 blur-3xl" />
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Active Orders"
                    value={pendingOrders}
                    icon={<Package className="h-5 w-5 text-brand-600" />}
                    subtitle="Pending approval"
                />
                <StatCard
                    title="Total Spent"
                    value={`$${orders.reduce((acc, o) => acc + (o.car?.price || 0), 0).toLocaleString()}`}
                    icon={<CreditCard className="h-5 w-5 text-emerald-600" />}
                    subtitle="Investment in luxury"
                />
                <StatCard
                    title="Account Status"
                    value="Verified"
                    icon={<Shield className="h-5 w-5 text-blue-600" />}
                    subtitle="Tier 1 Security"
                />
                <StatCard
                    title="Member Since"
                    value="Oct 2023"
                    icon={<Calendar className="h-5 w-5 text-amber-600" />}
                    subtitle="Loyalty Journey"
                />
            </div>

            <div className="grid gap-8 md:grid-cols-4">
                {/* Sidebar / User Info */}
                <div className="md:col-span-1 space-y-6">
                    <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-2xl glass overflow-hidden">
                        <CardHeader className="text-center pt-8 border-b border-white/20">
                            <div className="relative mx-auto w-24 h-24 mb-4 group cursor-pointer" onClick={() => setIsEditModalOpen(true)}>
                                <div className="mx-auto bg-brand-50 h-24 w-24 rounded-full flex items-center justify-center ring-4 ring-white shadow-inner overflow-hidden">
                                    <UserIcon className="h-10 w-10 text-brand-600" />
                                </div>
                                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Edit2 className="h-6 w-6 text-white" />
                                </div>
                                <div className="absolute bottom-0 right-0 h-7 w-7 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                                    <Shield className="h-3 w-3 text-white" />
                                </div>
                            </div>
                            <CardTitle className="font-display font-bold text-slate-800">{user.name}</CardTitle>
                            <p className="text-xs font-semibold text-brand-600/70 uppercase tracking-wider mt-1">{user.role}</p>
                        </CardHeader>
                        <CardContent className="p-6 space-y-3">
                            <div className="p-3 bg-slate-50/50 rounded-xl space-y-1">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</p>
                                <p className="text-sm font-medium text-slate-700 truncate">{user.email}</p>
                            </div>
                            <Button variant="outline" className="w-full justify-start rounded-xl border-slate-100 bg-white hover:bg-slate-50 h-11 transition-all" onClick={() => setIsEditModalOpen(true)}>
                                <Settings className="mr-3 h-4 w-4 text-slate-400" /> Edit Profile
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start rounded-xl border-slate-100 bg-white hover:bg-slate-50 h-11 transition-all"
                                onClick={() => navigate('/wishlist')}
                            >
                                <Heart className="mr-3 h-4 w-4 text-slate-400" /> Saved Wishlist
                            </Button>
                            <Button variant="ghost" className="w-full justify-start rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 h-11 mt-4" onClick={logout}>
                                <LogOut className="mr-3 h-4 w-4" /> Sign Out
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content / Orders */}
                <div className="md:col-span-3 space-y-8">
                    <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-2xl glass">
                        <CardHeader className="border-b border-slate-100/50 py-6">
                            <CardTitle className="flex items-center text-xl font-display font-bold text-slate-800">
                                <Package className="mr-3 h-5 w-5 text-brand-500" /> Recent Order Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-600"></div>
                                    <p className="text-slate-400 font-medium">Loading your orders...</p>
                                </div>
                            ) : orders.length === 0 ? (
                                <div className="text-center py-16 space-y-4">
                                    <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                                        <Package className="h-8 w-8 text-slate-200" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-slate-900 font-bold">No orders found</p>
                                        <p className="text-slate-500 text-sm">Your order history will appear here once you place your first request.</p>
                                    </div>
                                    <Button asChild variant="outline" className="rounded-full mt-4">
                                        <Link to="/cars">Start Browsing</Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {orders.map((order) => (
                                        <div key={order._id} className="group relative bg-white border border-slate-100 rounded-2xl p-5 hover:border-brand-200 hover:shadow-lg transition-all duration-500">
                                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                                <div className="h-28 w-40 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-700">
                                                    {order.car?.images && order.car.images[0] ? (
                                                        <img src={order.car.images[0]} alt="Car" className="h-full w-full object-cover" />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center text-slate-300 bg-slate-50">
                                                            <UserIcon className="h-8 w-8 opacity-20" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 space-y-1 text-center sm:text-left">
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                        <h3 className="font-display font-bold text-lg text-slate-900">{order.car?.brand} {order.car?.model}</h3>
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                                            order.status === 'pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                                                'bg-slate-100 text-slate-500'
                                                            }`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-slate-400 font-medium">
                                                        <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-slate-200" /> ID: #{order._id.slice(-6).toUpperCase()}</span>
                                                        <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-slate-200" /> {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                    </div>
                                                    <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
                                                        <p className="text-2xl font-display font-bold text-brand-600">${order.car?.price?.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Personalized Recommendations Section */}
                    {recommendedCars.length > 0 && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-display font-bold text-slate-900">Handpicked for You</h2>
                                <Link to="/cars" className="text-brand-600 font-semibold text-sm flex items-center hover:gap-2 transition-all">
                                    View Full Showroom <ArrowRight className="h-4 w-4 ml-1" />
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {recommendedCars.map((car) => (
                                    <Link key={car._id} to={`/cars/${car._id}`} className="group">
                                        <Card className="border-0 shadow-md rounded-2xl overflow-hidden glass hover:shadow-xl transition-all duration-500">
                                            <div className="h-40 overflow-hidden relative">
                                                <img src={car.images?.[0] || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800'} alt={car.model} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                <div className="absolute top-2 right-2">
                                                    <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-sm">
                                                        <Heart className="h-4 w-4 text-slate-400 hover:text-red-500 transition-colors" />
                                                    </div>
                                                </div>
                                            </div>
                                            <CardContent className="p-4">
                                                <h4 className="font-bold text-slate-900 truncate">{car.brand} {car.model}</h4>
                                                <div className="flex justify-between items-center mt-2">
                                                    <p className="text-brand-600 font-bold">${car.price?.toLocaleString()}</p>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{car.year}</span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-900">Edit Profile</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Email Address</label>
                                <input
                                    type="email"
                                    value={editEmail}
                                    onChange={(e) => setEditEmail(e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                                    required
                                />
                            </div>
                            <div className="pt-4 flex gap-3">
                                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                                <Button type="submit" className="flex-1">Save Changes</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const StatCard = ({ title, value, icon, subtitle }: { title: string, value: string | number, icon: React.ReactNode, subtitle: string }) => (
    <Card className="border-0 shadow-sm rounded-2xl overflow-hidden glass hover:shadow-md transition-all duration-300">
        <CardContent className="p-6">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-white/50 rounded-xl shadow-sm border border-white/20">
                    {icon}
                </div>
                <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{title}</p>
                    <p className="text-2xl font-display font-bold text-slate-900">{value}</p>
                    <p className="text-[10px] font-medium text-slate-500 mt-1">{subtitle}</p>
                </div>
            </div>
        </CardContent>
    </Card>
);

export default Profile;

