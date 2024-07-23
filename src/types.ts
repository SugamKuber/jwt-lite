export interface DecodedJwt {
  id: string | number;
  payload: JwtPayload;
  expires_at: Date;
}

export interface JwtHeader {
  alg: 'HS256';
  typ: 'JWT';
}

export interface JwtEncodingOptions {
  ttl?: number;
  aud?: string;
  iat?: number;
  iss?: string;
}

export interface JwtPayload extends JwtEncodingOptions {
  id: string | number;
  exp?: number;
  [key: string]: any;
}