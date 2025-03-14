export interface Credentials {
    email: string;
    password: string;
}

export interface User extends Credentials {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string
}
