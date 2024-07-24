import { JWT } from 'jwt-lite-2024';

const secret = 'your_secret_key';
const jwt = new JWT(secret);

export function validateToken(token: string) {
    try {
        return jwt.validate(token);
    } catch (error) {
        throw new Error('Error validating token');
    }
}

export function decodeToken(token: string) {
    try {
        return jwt.decode(token);
    } catch (error) {
        throw new Error('Error decoding token');
    }
}

export function encodeToken(id: string, payload: any, options?: any) {
    try {
        return jwt.encode(id, payload, options);
    } catch (error) {
        throw new Error('Error encoding token');
    }
}