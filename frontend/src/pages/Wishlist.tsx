import { Link } from 'react-router-dom';
import { useWishlist } from '@/contexts/WishlistContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Heart, Trash2 } from 'lucide-react';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex items-center gap-4 mb-8">
                <div className="bg-red-50 p-3 rounded-full">
                    <Heart className="h-6 w-6 text-red-500 fill-red-500" />
                </div>
                <h1 className="text-3xl font-display font-bold text-slate-900">My Wishlist</h1>
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-bold">
                    {wishlist.length} Items
                </span>
            </div>

            {wishlist.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                        <Heart className="h-8 w-8 text-red-300" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Your wishlist is empty</h2>
                    <p className="text-slate-500 mb-6">Start exploring our collection and save your dream cars here.</p>
                    <Link to="/cars">
                        <Button>Browse Cars</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {wishlist.map((car) => (
                        <Card key={car._id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow group">
                            <div className="aspect-w-16 aspect-h-9 h-56 overflow-hidden relative bg-slate-100">
                                {car.images && car.images.length > 0 ? (
                                    <img
                                        src={car.images[0]}
                                        alt={`${car.brand} ${car.model}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-slate-400">
                                        No Image Available
                                    </div>
                                )}
                                <button
                                    onClick={() => removeFromWishlist(car._id)}
                                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-sm"
                                    title="Remove from wishlist"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                            <CardHeader>
                                <CardTitle className="flex justify-between items-start">
                                    <span>{car.brand} {car.model}</span>
                                    <span className="text-brand-600">${car.price.toLocaleString()}</span>
                                </CardTitle>
                                <div className="text-sm text-slate-500 flex justify-between w-full">
                                    <span>{car.year}</span>
                                    <span className="capitalize">{car.category}</span>
                                </div>
                            </CardHeader>
                            <CardFooter className="pt-0">
                                <Link to={`/cars/${car._id}`} className="w-full">
                                    <Button variant="default" className="w-full">View Details</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
