import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import api from '@/api/axios';
import { Car } from '@/types';

const carouselSlides = [
    {
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070",
        title: "Experience Perfection",
        subtitle: "Premium Automotive Experience",
        description: "Discover the pinnacle of luxury and performance. Our curated collection represents the finest engineering and design in the world.",
        cta: "Browse Inventory",
        link: "/cars"
    },
    {
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2083",
        title: "Unrivaled Elegance",
        subtitle: "Luxury Redefined",
        description: "From classic collectors' items to modern supercars, find the vehicle that speaks to your soul.",
        cta: "New Arrivals",
        link: "/cars"
    },
    {
        image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=2070",
        title: "Pure Performance",
        subtitle: "Master the Road",
        description: "Engineered for those who demand excellence in every curve and acceleration.",
        cta: "View Collections",
        link: "/cars"
    }
];

const Home = () => {
    const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await api.get('/cars');
                const cars = Array.isArray(res.data) ? res.data : res.data.cars || [];
                setFeaturedCars(cars.slice(0, 3)); // Show top 3
            } catch (err) {
                console.error("Failed to fetch cars", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Carousel Section */}
            <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-950">
                {/* Carousel Slides */}
                {carouselSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className={`w-full h-full object-cover transition-transform duration-[5000ms] ${index === currentSlide ? 'scale-110' : 'scale-100'
                                }`}
                        />
                        {/* Premium Overlays */}
                        <div className="absolute inset-0 bg-slate-950/40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-transparent" />
                    </div>
                ))}

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    {carouselSlides.map((slide, index) => (
                        <div
                            key={index}
                            className={`max-w-3xl space-y-10 transition-all duration-1000 ${index === currentSlide ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 translate-y-10'
                                }`}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                                </span>
                                <span className="text-white font-semibold text-xs tracking-widest uppercase">{slide.subtitle}</span>
                            </div>

                            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tight text-white leading-[1.1]">
                                {slide.title.split(' ')[0]} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-500 to-brand-400">
                                    {slide.title.split(' ').slice(1).join(' ')}
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-slate-200 leading-relaxed max-w-2xl font-light">
                                {slide.description}
                            </p>

                            <div className="flex flex-wrap gap-6 pt-6">
                                <Link to={slide.link}>
                                    <Button size="lg" className="bg-brand-600 hover:bg-brand-500 text-white border-0 h-16 px-10 rounded-full text-xl shadow-2xl shadow-brand-600/30 transition-all hover:scale-105 active:scale-95 font-semibold">
                                        {slide.cta}
                                    </Button>
                                </Link>
                                <Link to="/contact">
                                    <Button size="lg" variant="outline" className="text-white border-white/30 bg-white/5 hover:bg-white/10 hover:text-white hover:border-white/60 h-16 px-10 rounded-full text-xl backdrop-blur-md transition-all font-medium">
                                        Learn More
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Controls */}
                <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center items-center gap-4">
                    {carouselSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-1 transition-all duration-500 rounded-full ${index === currentSlide ? 'w-12 bg-brand-500' : 'w-6 bg-white/30 hover:bg-white/50'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 right-10 z-20 hidden md:block animate-bounce opacity-50">
                    <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">Why Choose SunnyMotors?</h2>
                        <p className="text-lg text-slate-600">Experience the difference of premium service and uncompromising quality in every interaction.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Star className="h-8 w-8 text-brand-600" />}
                            title="Premium Selection"
                            description="Only the highest quality vehicles meet our rigorous standards for performance and luxury."
                        />
                        <FeatureCard
                            icon={<Shield className="h-8 w-8 text-brand-600" />}
                            title="Verified Reliability"
                            description="Every car undergoes a comprehensive 150-point technical inspection for your complete peace of mind."
                        />
                        <FeatureCard
                            icon={<Zap className="h-8 w-8 text-brand-600" />}
                            title="Instant Processing"
                            description="Streamlined digital buying process designed to get you on the road faster than ever before."
                        />
                    </div>
                </div>
            </section>

            {/* Featured Cars Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">Featured Vehicles</h2>
                            <p className="text-slate-600 max-w-xl">Explore our hand-picked selection of the week's most exclusive arrivals.</p>
                        </div>
                        <Link to="/cars" className="hidden sm:flex items-center text-brand-600 font-semibold hover:text-brand-700 group bg-brand-50 px-4 py-2 rounded-full transition-colors">
                            View all cars <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {featuredCars.map((car) => (
                                <Card key={car._id} className="overflow-hidden border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 group bg-white rounded-2xl">
                                    <div className="aspect-w-16 aspect-h-10 relative h-56 overflow-hidden">
                                        {car.images && car.images.length > 0 ? (
                                            <img
                                                src={car.images[0]}
                                                alt={`${car.brand} ${car.model}`}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full bg-slate-100 text-slate-400">
                                                <span className="text-sm font-medium">No Image Available</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold text-slate-900 shadow-sm z-10">
                                            ${car.price.toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-4">
                                            <h3 className="text-xl font-display font-bold text-slate-900 mb-1 group-hover:text-brand-600 transition-colors">
                                                {car.brand} {car.model}
                                            </h3>
                                            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                                                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">{car.year}</span>
                                                <span>•</span>
                                                <span>{car.category}</span>
                                            </div>
                                        </div>
                                        <p className="text-slate-600 text-sm line-clamp-2 mb-6 h-10 leading-relaxed">
                                            {car.description}
                                        </p>
                                        <Link to={`/cars/${car._id}`} className="block">
                                            <Button className="w-full bg-slate-900 hover:bg-brand-600 text-white rounded-xl h-11 transition-colors">
                                                View Details
                                            </Button>
                                        </Link>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}

                    <div className="mt-12 text-center sm:hidden">
                        <Link to="/cars">
                            <Button variant="outline" className="w-full rounded-xl h-12 border-slate-300 text-slate-700">View All Cars</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
        <div className="p-4 bg-brand-50 rounded-2xl mb-6 group-hover:bg-brand-600 transition-colors duration-300">
            <div className="group-hover:text-white transition-colors duration-300 child-svg-white">
                {icon}
            </div>
        </div>
        <h3 className="text-xl font-display font-bold mb-3 text-slate-900">{title}</h3>
        <p className="text-slate-500 leading-relaxed">{description}</p>
    </div>
);

export default Home;
