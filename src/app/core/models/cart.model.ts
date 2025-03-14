export interface Order {
    id: number;
    user: User;
    products: Product[];
    totalPrice: number;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
  }
  
  export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
  }
  