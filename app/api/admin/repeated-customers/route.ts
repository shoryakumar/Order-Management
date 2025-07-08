import axios from 'axios';
import { NextResponse } from 'next/server';

interface RepeatedCustomer {
  customer_id: string;
  full_name: string;
  order_count: number;
}

interface DirectusResponse {
  data: RepeatedCustomer[];
}

export async function GET() {
  try {
    const response = await axios.get<DirectusResponse>('http://localhost:8055/items/repeated_customer', {
      headers: {
        Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
      },
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
} 