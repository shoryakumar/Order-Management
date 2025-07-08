import axios from 'axios';
import { NextResponse } from 'next/server';

interface WeeklyOrder {
  weekday: string;
  no_of_orders: number;
}

interface DirectusResponse {
  data: WeeklyOrder[];
}

export async function GET() {
  try {
    const response = await axios.get<DirectusResponse>('http://localhost:8055/items/weekly_orders_by_day', {
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