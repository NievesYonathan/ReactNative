export interface User {
    id: number;
    name: string;
    lastname: string;
    phone: string;
    email: string;
    image: string;
    password: string;
    confirmPassword: string;
    session_token?: string;
}