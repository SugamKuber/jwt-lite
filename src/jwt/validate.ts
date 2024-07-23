import { JWTDecoder } from './decode';

export class JWTValidator {
    private decoder: JWTDecoder;

    constructor(secret: string) {
        this.decoder = new JWTDecoder(secret);
    }

    validate(token: string): boolean {
        try {
            return this.decoder.decode(token).expires_at.getTime() >= Date.now();
        } catch {
            return false;
        }
    }
}