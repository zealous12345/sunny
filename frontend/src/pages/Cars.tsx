import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@/api/axios';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Car } from '@/types';

const Cars = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await api.get('/cars');
                setCars(Array.isArray(res.data) ? res.data : res.data.cars || []);
            } catch (err) {
                console.error("Failed to fetch cars", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Collection</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Explore our extensive inventory of premium vehicles. Find the perfect match for your lifestyle.
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cars.map((car) => (
                        <Card key={car._id} className="overflow-hidden hover:shadow-lg transition-shadow border-0 shadow">
                            <div className="aspect-w-16 aspect-h-9 h-64 overflow-hidden relative bg-slate-100">
                                {car.images && car.images.length > 0 ? (
                                    <img
                                        src={car.images[0]}
                                        alt={`${car.brand} ${car.model}`}
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-slate-400">
                                        No Image Available
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold text-slate-900 shadow-sm">
                                    ${car.price.toLocaleString()}
                                </div>
                            </div>
                            <CardHeader>
                                <CardTitle className="flex justify-between items-start">
                                    <span>{car.brand} {car.model}</span>
                                </CardTitle>
                                <div className="text-sm text-slate-500 flex justify-between w-full">
                                    <span>{car.year}</span>
                                    <span className="capitalize">{car.category}</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600 line-clamp-2 text-sm">{car.description}</p>
                            </CardContent>
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

export default Cars;
