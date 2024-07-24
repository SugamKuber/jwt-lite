import { NextRequest, NextResponse } from 'next/server';
import { validateToken, decodeToken } from '@/app/helpers/jwt';

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader) {
            return NextResponse.json({ error: 'Authorization header is missing' }, { status: 401 });
        }
        const token = authHeader.replace('Bearer ', '');
        if (!token) {
            return NextResponse.json({ error: 'Bearer token is missing' }, { status: 401 });
        }
        if (!validateToken(token)) {
            return NextResponse.json({ error: 'Token Invalid or Expired' }, { status: 401 });
        }
        const data = decodeToken(token);

        if (!data) {
            return NextResponse.json({ error: 'Decoded data is Invalid' }, { status: 400 });
        }

        return NextResponse.json(data);

    } catch (error) {
        const message = (error as Error).message || 'Internal server error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
