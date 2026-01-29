import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Car } from '@/types';

interface CartContextType {
    cart: Car[];
    addToCart: (car: Car) => void;
    removeFromCart: (carId: string) => void;
    clearCart: () => void;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Car[]>(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (car: Car) => {
        // Avoid duplicates if needed, or allow multiples. For cars, maybe duplicates are weird unless buying fleet.
        // Let's prevent duplicates for simplicity.
        if (!cart.find(c => c._id === car._id)) {
            setCart([...cart, car]);
        }
    };

    const removeFromCart = (carId: string) => {
        setCart(cart.filter(c => c._id !== carId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((total, car) => total + car.price, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
