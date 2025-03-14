export interface Product {
    id: number;
    name: string;
    category: 
    | 'BEST_SELLER'
    | 'VALUE_MEALS'
    | 'BIBING_MAMON'
    | 'FAMILY_FAVORITES'
    | 'PARTY_PACK'
    | 'RICE_BOWL'
    | 'BEVERAGES';
    description: string;
    imageUrl: string;
    price: number;
  }

  export interface ProductPayload {
    name: string;
    category: 
    | 'BEST_SELLER'
    | 'VALUE_MEALS'
    | 'BIBING_MAMON'
    | 'FAMILY_FAVORITES'
    | 'PARTY_PACK'
    | 'RICE_BOWL'
    | 'BEVERAGES';
    description: string;
    imageUrl: string;
    price: number;
    status: 1 | 2;
  }

export interface Order {
  name: string;
  contactNumber: string;
  address: string;
  totalPrice: number;
  productNames: string;
  dateCreated: string;
  status: string;
}