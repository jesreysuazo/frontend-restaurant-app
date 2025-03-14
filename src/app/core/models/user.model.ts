export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    role: 'ADMIN' | 'CUSTOMER';
    status: UserStatus;
    addedDate: string;
    deletedDate: string | null;
  }

  export enum UserStatus {
    UNVERIFIED = 0,
    ACTIVE = 1,
    DELETED = 2
  }

  interface ManageUser {
    id: number;
    name: string;
    email: string;
    role: string;
    status: UserStatus;
  }