import { JWT } from '../';
import { JwtEncodingOptions } from '../types';

const secret = 'check_github.com/intelliLog';
const jwt = new JWT(secret);

test('should encode and decode JWT with optional parameters', () => {
    const id = '123';
    const payload = { foo: 'bar' };
    const options: JwtEncodingOptions = {
        ttl: 3600,
        aud: 'my-audience',
        iat: Math.floor(Date.now() / 1000),
        iss: 'my-issuer'
    };

    const token = jwt.encode(id, payload, options);
    const decoded = jwt.decode(token);

    expect(decoded.id).toBe(id);
    expect(decoded.payload.foo).toBe('bar');
    expect(decoded.payload.aud).toBe(options.aud);
    expect(decoded.payload.iat).toBe(options.iat);
    expect(decoded.payload.iss).toBe(options.iss);
    expect(decoded.expires_at).toBeInstanceOf(Date);
});

test('should handle default TTL', () => {
    const id = '123';
    const payload = { foo: 'bar' };

    const token = jwt.encode(id, payload);
    const decoded = jwt.decode(token);

    expect(decoded.id).toBe(id);
    expect(decoded.payload.foo).toBe('bar');
    expect(decoded.expires_at).toBeInstanceOf(Date);
});

test('should invalidate JWT with incorrect signature', () => {
    const id = '123';
    const payload = { foo: 'bar' };
    const options: JwtEncodingOptions = { ttl: 3600 };

    const token = jwt.encode(id, payload, options);
    const invalidToken = token.replace(/.$/, 'a');

    expect(() => jwt.decode(invalidToken)).toThrow('Invalid token signature');
    expect(jwt.validate(invalidToken)).toBe(false);
});

test('should validate JWT correctly', () => {
    const id = '123';
    const payload = { foo: 'bar' };
    const options: JwtEncodingOptions = { ttl: 3600 };

    const token = jwt.encode(id, payload, options);
    expect(jwt.validate(token)).toBe(true);
});

test('should invalidate an expired JWT', () => {
    const id = '123';
    const payload = { foo: 'bar' };
    const options: JwtEncodingOptions = { ttl: -3600 };

    const token = jwt.encode(id, payload, options);
    expect(jwt.validate(token)).toBe(false);
});

test('should throw error for token with no expiration', () => {
    const id = '123';
    const payload = { foo: 'bar' };
    const options: JwtEncodingOptions = { ttl: 0 };

    const token = jwt.encode(id, payload, options);
    expect(() => jwt.decode(token)).toThrow('Token is invalid or expired');
});