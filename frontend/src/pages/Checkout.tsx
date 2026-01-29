import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/api/axios';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { CheckCircle, CreditCard, ShoppingBag, ShieldCheck, ChevronRight, Lock } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';
// ... (skip unchanged lines)

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [step, setStep] = useState(1); // 1: Details, 2: Payment
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');

    // Payment State
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');

    if (cart.length === 0 && !success) {
        return (
            <div className="container mx-auto px-4 py-32 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="h-10 w-10 text-slate-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
                <p className="text-slate-500 mb-8">Looks like you haven't added any cars yet.</p>
                <Button onClick={() => navigate('/cars')} size="lg" className="rounded-full">
                    Browse Cars
                </Button>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="container mx-auto px-4 py-32 text-center">
                <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock className="h-10 w-10 text-brand-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Sign in to Checkout</h2>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">Please log in to your account to complete your purchase securely.</p>
                <div className="flex justify-center gap-4">
                    <Button variant="outline" onClick={() => navigate('/login')}>Log In</Button>
                    <Button onClick={() => navigate('/signup')}>Create Account</Button>
                </div>
            </div>
        );
    }

    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            // Simulate payment processing delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            const orderPromises = cart.map(car =>
                api.post('/orders', { carId: car._id, message: message || 'Standard Order' })
            );

            await Promise.all(orderPromises);

            clearCart();
            setSuccess(true);
            showToast('Order placed successfully!', 'success');
        } catch (err) {
            console.error("Checkout failed", err);
            showToast('Failed to process payment. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const validatePayment = () => {
        console.log("Validating payment...", { cardName, cardNumber, expiry, cvc });
        if (!cardName || !cardNumber || !expiry || !cvc) {
            showToast('Please fill in all payment details properly.', 'error');
            return false;
        }
        // Keep step at 2 so the UI doesn't disappear while loading
        handlePlaceOrder();
    };

    if (success) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
                <Card className="w-full max-w-md text-center p-8 border-none shadow-xl">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                    <CardTitle className="text-3xl mb-4">Payment Successful!</CardTitle>
                    <p className="text-slate-600 mb-8">
                        Your order has been confirmed. A receipt has been sent to your email.
                        Our sales team will be in touch shortly.
                    </p>
                    <div className="space-y-3">
                        <Button className="w-full rounded-full" onClick={() => navigate('/profile')}>View Order Status</Button>
                        <Button variant="outline" className="w-full rounded-full" onClick={() => navigate('/')}>Return Home</Button>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-20 pt-24">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="mb-10">
                    <h1 className="text-3xl font-display font-bold text-slate-900">Secure Checkout</h1>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
                        <ShieldCheck className="h-4 w-4 text-green-600" />
                        <span>SSL Encrypted Payment</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left Column: Forms */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Step 1: Customer Info */}
                        <Card className={`overflow-hidden transition-all duration-300 ${step > 1 ? 'opacity-60 grayscale' : 'ring-2 ring-brand-500 ring-offset-2'}`}>
                            <CardHeader className="bg-slate-50 border-b border-slate-100">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-500'}`}>1</div>
                                        Customer Details
                                    </CardTitle>
                                    {step > 1 && <Button variant="ghost" size="sm" onClick={() => setStep(1)}>Edit</Button>}
                                </div>
                            </CardHeader>
                            {step === 1 && (
                                <CardContent className="p-6 space-y-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Full Name</label>
                                            <Input value={user?.name || ''} disabled className="bg-slate-50" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Email Address</label>
                                            <Input value={user?.email || ''} disabled className="bg-slate-50" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-slate-700 mb-1.5 block">Delivery Instructions / Notes</label>
                                        <textarea
                                            className="w-full min-h-[100px] rounded-lg border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 transition-shadow"
                                            placeholder="Any specific requests?"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className="pt-4 flex justify-end">
                                        <Button onClick={() => setStep(2)} className="rounded-full px-8">
                                            Continue to Payment <ChevronRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            )}
                        </Card>

                        {/* Step 2: Payment */}
                        <Card className={`overflow-hidden transition-all duration-300 ${step === 2 ? 'ring-2 ring-brand-500 ring-offset-2 shadow-lg' : ''}`}>
                            <CardHeader className="bg-slate-50 border-b border-slate-100">
                                <CardTitle className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
                                    Payment Method
                                </CardTitle>
                            </CardHeader>
                            {step === 2 && (
                                <CardContent className="p-6 space-y-6">
                                    <div className="flex gap-4 mb-6">
                                        <div className="flex-1 border-2 border-brand-600 bg-brand-50/50 rounded-xl p-4 flex items-center gap-3 cursor-pointer">
                                            <CreditCard className="h-6 w-6 text-brand-600" />
                                            <div className="font-medium text-brand-900">Card Payment</div>
                                        </div>
                                        <div className="flex-1 border border-slate-200 rounded-xl p-4 flex items-center gap-3 opacity-50 cursor-not-allowed">
                                            <div className="font-bold italic text-slate-800">PayPal</div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Cardholder Name</label>
                                            <Input
                                                placeholder="e.g. John Doe"
                                                value={cardName}
                                                onChange={(e) => setCardName(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Card Number</label>
                                            <div className="relative">
                                                <Input
                                                    placeholder="0000 0000 0000 0000"
                                                    maxLength={19}
                                                    value={cardNumber}
                                                    onChange={(e) => setCardNumber(e.target.value)}
                                                    className="pl-10"
                                                />
                                                <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Expiry Date</label>
                                                <Input
                                                    placeholder="MM/YY"
                                                    maxLength={5}
                                                    value={expiry}
                                                    onChange={(e) => setExpiry(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-slate-700 mb-1.5 block">CVC</label>
                                                <Input
                                                    placeholder="123"
                                                    maxLength={3}
                                                    type="password"
                                                    value={cvc}
                                                    onChange={(e) => setCvc(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                        <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                                        <Button
                                            onClick={validatePayment}
                                            className="rounded-full px-8 bg-black hover:bg-slate-800 text-white shadow-lg shadow-slate-200"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></div>
                                                    Processing...
                                                </div>
                                            ) : (
                                                `Pay $${cartTotal.toLocaleString()}`
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            )}
                        </Card>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24">
                            <Card className="border-none shadow-xl shadow-slate-200/50 bg-white">
                                <CardHeader className="bg-slate-900 text-white rounded-t-lg pb-6">
                                    <CardTitle>Order Summary</CardTitle>
                                    <p className="text-slate-400 text-sm mt-1">{cart.length} item(s) in cart</p>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4 mb-6">
                                        {cart.map((car, idx) => (
                                            <div key={`${car._id}-${idx}`} className="flex gap-4 items-start pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                                <div className="w-16 h-12 bg-slate-100 rounded-md overflow-hidden flex-shrink-0">
                                                    <img src={car.images?.[0]} alt={car.model} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x60?text=Car')} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-medium text-slate-900 truncate">{car.brand} {car.model}</h4>
                                                    <p className="text-sm text-slate-500">{car.category} • {car.year}</p>
                                                </div>
                                                <div className="text-sm font-semibold text-slate-900">
                                                    ${car.price.toLocaleString()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-3 pt-4 border-t border-dashed border-slate-200">
                                        <div className="flex justify-between text-slate-600 text-sm">
                                            <span>Subtotal</span>
                                            <span>${cartTotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-slate-600 text-sm">
                                            <span>Processing Fee</span>
                                            <span>$0.00</span>
                                        </div>
                                        <div className="flex justify-between text-brand-600 text-sm font-medium">
                                            <span>Discount</span>
                                            <span>-$0.00</span>
                                        </div>
                                        <div className="flex justify-between text-slate-900 font-bold text-lg pt-2">
                                            <span>Total Due</span>
                                            <span>${cartTotal.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="bg-slate-50 p-4 rounded-b-lg">
                                    <div className="flex items-start gap-3 text-xs text-slate-500">
                                        <ShieldCheck className="h-4 w-4 text-slate-400 flex-shrink-0" />
                                        <p>Your payment information is encrypted and secure. We do not store your credit card details.</p>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
