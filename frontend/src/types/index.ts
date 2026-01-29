export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
}

export interface Car {
    _id: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    description: string;
    images: string[];
    category: string;
    availability: boolean;
}
