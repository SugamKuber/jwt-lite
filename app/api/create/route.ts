import { NextRequest, NextResponse } from 'next/server';
import { encodeToken } from '@/app/helpers/jwt';

export async function POST(request: NextRequest) {
    try {
        const { id, payload, options } = await request.json();

        if (!id || !payload) {
            return NextResponse.json({ error: 'ID and payload are required' }, { status: 400 });
        }

        const token = encodeToken(id, payload, options);

        return NextResponse.json({ token });
    } catch (error) {
        const message = (error as Error).message || 'Internal server error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
