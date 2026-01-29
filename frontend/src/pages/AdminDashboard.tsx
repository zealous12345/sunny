import { useEffect, useState } from 'react';
import api from '@/api/axios';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

import { Plus, Trash2, Edit, DollarSign, Package, Clock } from 'lucide-react';
import { Car } from '@/types';

// Mock Tabs component since I didn't create it in UI yet (will implement inline for now to save tool calls or create it)
// I'll stick to a simple state-based tab system for simplicity and robustness.

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('cars');
    const [cars, setCars] = useState<Car[]>([]);
    const [orders, setOrders] = useState<any[]>([]); // Type properly later
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [carsRes, ordersRes] = await Promise.all([
                api.get('/cars'),
                api.get('/orders')
            ]);
            setCars(Array.isArray(carsRes.data) ? carsRes.data : carsRes.data.cars || []);
            setOrders(ordersRes.data);
        } catch (err) {
            console.error("Failed to fetch admin data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteCar = async (id: string) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await api.delete(`/cars/${id}`);
            setCars(cars.filter(c => c._id !== id));
        } catch (err) {
            console.error(err);
            alert("Failed to delete car");
        }
    };

    const handleStatusUpdate = async (orderId: string, status: string) => {
        try {
            await api.put(`/orders/${orderId}`, { status });
            setOrders(orders.map(o => o._id === orderId ? { ...o, status } : o));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 space-y-8 animate-fade-in">
            {loading && <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div></div>}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-display font-bold text-slate-900 tracking-tight">Admin Dashboard</h1>
                    <p className="text-slate-500 mt-1">Manage your inventory and monitor customer requests.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={fetchData} className="rounded-full shadow-sm">
                        Refresh Sync
                    </Button>
                    <Button className="bg-brand-600 hover:bg-brand-700 text-white rounded-full px-6 shadow-lg shadow-brand-900/20 transition-all hover:-translate-y-0.5">
                        <Plus className="h-4 w-4 mr-2" /> Add Car
                    </Button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Cars" value={cars.length} icon={<Package className="h-5 w-5 text-blue-600" />} />
                <StatCard title="Pending Orders" value={orders.filter(o => o.status === 'pending').length} icon={<Clock className="h-5 w-5 text-amber-600" />} />
                <StatCard title="Total Orders" value={orders.length} icon={<Edit className="h-5 w-5 text-emerald-600" />} />
                <StatCard title="Revenue" value={`$${cars.reduce((acc, car) => acc + car.price, 0).toLocaleString()}`} icon={<DollarSign className="h-5 w-5 text-brand-600" />} />
            </div>


            <div className="flex space-x-1 p-1 bg-slate-100/80 backdrop-blur-sm rounded-xl w-fit">
                <button
                    className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'cars' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    onClick={() => setActiveTab('cars')}
                >
                    Inventory
                </button>
                <button
                    className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'orders' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    onClick={() => setActiveTab('orders')}
                >
                    Requests
                </button>
            </div>

            {activeTab === 'cars' && (
                <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden glass">
                    <CardHeader className="bg-white/50 border-b border-slate-100 flex flex-row items-center justify-between py-6">
                        <CardTitle className="text-xl font-display font-bold text-slate-800">Available Inventory</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Model Details</th>
                                        <th className="px-6 py-4">Price</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-100">
                                    {cars.map(car => (
                                        <tr key={car._id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">{car.brand} {car.model}</div>
                                                <div className="text-xs text-slate-400">Year: {car.year}</div>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-slate-900">${car.price.toLocaleString()}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-600">{car.category}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right flex justify-end gap-2">
                                                <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-lg hover:bg-white hover:text-blue-600 hover:border-blue-200 hover:shadow-sm border-slate-100"><Edit className="h-4 w-4" /></Button>
                                                <Button variant="destructive" size="sm" className="h-9 w-9 p-0 rounded-lg hover:shadow-md transition-all shadow-red-100" onClick={() => handleDeleteCar(car._id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            )}

            {activeTab === 'orders' && (
                <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden glass">
                    <CardHeader className="bg-white/50 border-b border-slate-100 py-6">
                        <CardTitle className="text-xl font-display font-bold text-slate-800">Recent Customer Requests</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Order Info</th>
                                        <th className="px-6 py-4">Customer</th>
                                        <th className="px-6 py-4">Vehicle</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-100">
                                    {orders.map(order => (
                                        <tr key={order._id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-mono text-[10px] font-bold text-slate-400">#{order._id.slice(-6).toUpperCase()}</div>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-slate-900">{order.user?.name || 'Guest'}</td>
                                            <td className="px-6 py-4 font-medium text-slate-700">{order.car?.brand} {order.car?.model}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${order.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                                    order.status === 'pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                                        'bg-slate-100 text-slate-500'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right flex justify-end gap-2 text-xs">
                                                {order.status === 'pending' && (
                                                    <>
                                                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 h-8 px-4 rounded-lg shadow-sm" onClick={() => handleStatusUpdate(order._id, 'approved')}>Approve</Button>
                                                        <Button size="sm" variant="destructive" className="h-8 px-4 rounded-lg shadow-sm" onClick={() => handleStatusUpdate(order._id, 'rejected')}>Reject</Button>
                                                    </>
                                                )}
                                                {order.status !== 'pending' && <span className="text-slate-300 italic">No actions</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

const StatCard = ({ title, value, icon }: { title: string, value: string | number, icon: React.ReactNode }) => (
    <Card className="border-0 shadow-sm rounded-2xl overflow-hidden glass hover:shadow-md transition-shadow">
        <CardContent className="p-6">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-white/50 rounded-xl shadow-sm">
                    {icon}
                </div>
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</p>
                    <p className="text-2xl font-display font-bold text-slate-900">{value}</p>
                </div>
            </div>
        </CardContent>
    </Card>
);

export default AdminDashboard;
