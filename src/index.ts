import { JWTEncoder } from './jwt/encode';
import { JWTDecoder } from './jwt/decode';
import { JWTValidator } from './jwt/validate';

export class JWT {
    private encoder: JWTEncoder;
    private decoder: JWTDecoder;
    private validator: JWTValidator;

    constructor(secret: string) {
        this.encoder = new JWTEncoder(secret);
        this.decoder = new JWTDecoder(secret);
        this.validator = new JWTValidator(secret);
    }

    encode(...args: Parameters<JWTEncoder['encode']>) {
        return this.encoder.encode(...args);
    }

    decode(token: string) {
        return this.decoder.decode(token);
    }

    validate(token: string) {
        return this.validator.validate(token);
    }
}

export { JWTEncoder, JWTDecoder, JWTValidator };