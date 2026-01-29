import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Car } from '@/types';

interface WishlistContextType {
    wishlist: Car[];
    addToWishlist: (car: Car) => void;
    removeFromWishlist: (carId: string) => void;
    isInWishlist: (carId: string) => boolean;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [wishlist, setWishlist] = useState<Car[]>(() => {
        const saved = localStorage.getItem('wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (car: Car) => {
        if (!wishlist.find(c => c._id === car._id)) {
            setWishlist([...wishlist, car]);
        }
    };

    const removeFromWishlist = (carId: string) => {
        setWishlist(wishlist.filter(c => c._id !== carId));
    };

    const isInWishlist = (carId: string) => {
        return wishlist.some(c => c._id === carId);
    };

    const clearWishlist = () => {
        setWishlist([]);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
