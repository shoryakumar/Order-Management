import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await axios.get('http://localhost:8055/items/Product', {
      headers: {
        Cookie: `directus_session_token=${process.env.DIRECTUS_SESSION_TOKEN}`,
      },
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}