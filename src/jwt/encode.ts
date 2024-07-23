import { createHmac } from 'crypto';
import { base64UrlEncode } from '../utils/base64';
import { JwtPayload, JwtHeader, JwtEncodingOptions } from '../types';

export class JWTEncoder {
  constructor(private secret: string) { }

  encode(id: string | number, payload: Omit<JwtPayload, 'id'>, options: JwtEncodingOptions = {}): string {
    const currentTime: number = Math.floor(Date.now() / 1000);
    const { ttl = 3600, aud, iat, iss } = options;

    const jwtPayload: JwtPayload = { id, exp: ttl > 0 ? currentTime + ttl : undefined, aud, iat: iat || currentTime, iss, ...payload };

    if (Object.keys(payload).length === 0) { delete jwtPayload.exp; delete jwtPayload.aud; delete jwtPayload.iat; delete jwtPayload.iss; }

    const header: JwtHeader = { alg: 'HS256', typ: 'JWT' };
    const headerEncoded: string = base64UrlEncode(JSON.stringify(header));
    const payloadEncoded: string = base64UrlEncode(JSON.stringify(jwtPayload));
    const signature = this.createSignature(headerEncoded, payloadEncoded);

    return `${headerEncoded}.${payloadEncoded}.${signature}`;
  }

  private createSignature(header: string, payload: string): string {
    return base64UrlEncode(createHmac('sha256', this.secret).update(`${header}.${payload}`).digest('base64'));
  }
}