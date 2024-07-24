import { createHmac } from 'crypto';
import { base64UrlDecode, base64UrlEncode } from '../utils/base64';
import { DecodedJwt, JwtPayload } from '../types';

export class JWTDecoder {
  constructor(private secret: string) { }

  decode(token: string): DecodedJwt {
    const [header, payload, signature] = token.split('.');
    if (!header || !payload || !signature) {
      throw new Error('Invalid token format');
    }

    if (signature !== this.createSignature(header, payload)) {
      throw new Error('Invalid token signature');
    }

    const { id, exp, ...rest } = JSON.parse(base64UrlDecode(payload)) as JwtPayload;
    if (id === undefined || id === null) {
      throw new Error('Token missing required field: id');
    }

    const expNumber = typeof exp === 'number' ? exp : typeof exp === 'string' ? parseFloat(exp) : NaN;
    if (isNaN(expNumber) || Math.floor(Date.now() / 1000) >= expNumber) {
      throw new Error('Token is invalid or expired');
    }

    const payloadWithoutId: Omit<JwtPayload, 'id'> = rest as Omit<JwtPayload, 'id'>;
    return { id: id as string, payload: { id, ...payloadWithoutId }, expires_at: new Date(expNumber * 1000), };
  }

  private createSignature(header: string, payload: string): string {
    return base64UrlEncode(createHmac('sha256', this.secret).update(`${header}.${payload}`).digest('base64'));
  }
}