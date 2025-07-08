import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await axios.get('http://localhost:8055/items/Order?fields=order_id,ordered_at,customer_id.full_name,product_id.product_name', {
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer_id, product_id } = body;

    if (!customer_id || !product_id) {
      return NextResponse.json(
        { error: 'Customer ID and Product ID are required' },
        { status: 400 }
      );
    }

    const orderData = {
      customer_id,
      product_id,
      ordered_at: new Date().toISOString(),
    };

    const response = await axios.post('http://localhost:8055/items/Order', orderData, {
      headers: {
        Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}