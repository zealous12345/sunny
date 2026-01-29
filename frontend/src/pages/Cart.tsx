import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

const Cart = () => {
    const { cart, removeFromCart, cartTotal } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="bg-slate-100 p-6 rounded-full mb-6">
                    <ShoppingBag className="h-12 w-12 text-slate-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
                <p className="text-slate-500 mb-8">Looks like you haven't added any vehicles yet.</p>
                <Button onClick={() => navigate('/cars')}>Browse Cars</Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart ({cart.length})</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((car) => (
                        <Card key={car._id} className="flex flex-col sm:flex-row overflow-hidden">
                            <div className="sm:w-48 h-32 sm:h-auto bg-slate-100 relative">
                                {car.images && car.images[0] ? (
                                    <img src={car.images[0]} alt={car.model} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-slate-400 text-sm">No Image</div>
                                )}
                            </div>
                            <CardContent className="flex-1 p-6 flex flex-col sm:flex-row justify-between sm:items-center">
                                <div className="space-y-1">
                                    <h3 className="font-semibold text-lg">{car.brand} {car.model}</h3>
                                    <p className="text-slate-500 text-sm">{car.year} • {car.category}</p>
                                </div>
                                <div className="flex sm:flex-col items-center sm:items-end justify-between mt-4 sm:mt-0 gap-4 sm:gap-2">
                                    <span className="font-bold text-lg">${car.price.toLocaleString()}</span>
                                    <Button variant="ghost" size="sm" onClick={() => removeFromCart(car._id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                        <Trash2 className="h-4 w-4 mr-2" /> Remove
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <Card>
                        <CardContent className="p-6 space-y-6">
                            <h3 className="text-xl font-bold">Order Summary</h3>
                            <div className="space-y-3 pt-4 border-t border-slate-100">
                                <div className="flex justify-between text-slate-600">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Taxes & Fees</span>
                                    <span>Calculated at checkout</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-4 border-t border-slate-100">
                                    <span>Total</span>
                                    <span>${cartTotal.toLocaleString()}</span>
                                </div>
                            </div>
                            <Button className="w-full" size="lg" onClick={() => navigate('/checkout')}>
                                Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Cart;
