import axios from 'axios';
import { NextResponse } from 'next/server';

interface HourlyOrder {
  time_slot: string;
  no_of_orders: number;
}

interface DirectusResponse {
  data: HourlyOrder[];
}

export async function GET() {
  try {
    const response = await axios.get<DirectusResponse>('http://localhost:8055/items/hourly_orders_yesterday', {
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