export interface Checkout {
    id: number;
    userId: number;
    productIds: number[];
    totalPrice: number;
    dateCreated: string;
    dateUpdated: string;
    eta: string | null;
    status: 'APPROVED' | 'REJECTED' | 'PENDING';
    contactNumber: string;
    address: string;
    name: string;
  }