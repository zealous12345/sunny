import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/api/axios';
import { Button } from '@/components/ui/Button';

import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext'; // Add this import
import { Car } from '@/types';
import { ArrowLeft, Check, ShoppingCart, Heart } from 'lucide-react';

const CarDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [car, setCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState<string>('');
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist(); // Destructure hook
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await api.get(`/cars/${id}`);
                setCar(res.data);
                if (res.data.images && res.data.images.length > 0) {
                    setMainImage(res.data.images[0]);
                }
            } catch (err) {
                console.error("Failed to fetch car", err);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchCar();
    }, [id]);

    const handleAddToCart = () => {
        if (car) {
            addToCart(car);
            // Optional: Show toast
            alert("Added to cart!");
        }
    };

    const toggleWishlist = () => {
        if (!car) return;
        if (isInWishlist(car._id)) {
            removeFromWishlist(car._id);
        } else {
            addToWishlist(car);
        }
    };

    if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div></div>;
    if (!car) return <div className="text-center py-20">Car not found</div>;

    const isWishlisted = isInWishlist(car._id);

    return (
        <div className="container mx-auto px-4 py-8">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 pl-0 hover:bg-transparent hover:text-brand-600">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cars
            </Button>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden bg-slate-100 shadow-md relative">
                        {/* Wishlist Button Overlay */}
                        <button
                            onClick={toggleWishlist}
                            className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-sm hover:scale-110 transition-transform"
                        >
                            <Heart className={`h-6 w-6 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-slate-400'}`} />
                        </button>

                        {mainImage ? (
                            <img src={mainImage} alt={car.model} className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-400">No Image</div>
                        )}
                    </div>
                    {car.images && car.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-4">
                            {car.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setMainImage(img)}
                                    className={`relative rounded-lg overflow-hidden border-2 ${mainImage === img ? 'border-brand-600' : 'border-transparent'}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover aspect-video" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">{car.brand} {car.model}</h1>
                        <p className="text-xl text-slate-500 mt-2">{car.year} • {car.category}</p>
                    </div>

                    <div className="text-4xl font-bold text-brand-600">
                        ${car.price.toLocaleString()}
                    </div>

                    <div className="prose prose-slate max-w-none">
                        <h3 className="text-lg font-semibold mb-2">Description</h3>
                        <p className="text-slate-600 leading-relaxed">{car.description}</p>
                    </div>

                    <div className="border-t border-b border-slate-200 py-6 space-y-3">
                        <div className="flex items-center text-slate-700">
                            <Check className="h-5 w-5 text-green-500 mr-3" />
                            <span>Verified Inspection</span>
                        </div>
                        <div className="flex items-center text-slate-700">
                            <Check className="h-5 w-5 text-green-500 mr-3" />
                            <span>Instant Booking Available</span>
                        </div>
                        <div className="flex items-center text-slate-700">
                            <Check className="h-5 w-5 text-green-500 mr-3" />
                            <span>Premium Warranty Included</span>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button size="lg" className="w-full flex-1" onClick={handleAddToCart}>
                            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                        </Button>
                        <Button size="lg" variant="secondary" className="w-full flex-1">
                            Contact Dealer
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetail;
