import axios from 'axios';
import { NextResponse } from 'next/server';

interface Customer {
  customer_id: string;
  email: string;
  password: string;
  full_name: string;
  created_at: string;
  [key: string]: unknown;
}

interface DirectusResponse {
  data: Customer[];
}

export async function GET() {
  try {
    const response = await axios.get('http://localhost:8055/items/Customer', {
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
    
    // Check if this is a login request (only email provided) or registration request
    if (body.email && !body.full_name && !body.password) {
      // Login request - get customer by email
      const { email } = body;

      if (!email) {
        return NextResponse.json(
          { error: 'Email is required' },
          { status: 400 }
        );
      }

      const response = await axios.get<DirectusResponse>(`http://localhost:8055/items/Customer?filter[email][_eq]=${email}`, {
        headers: {
          Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
        },
      });

      if (response.data.data && response.data.data.length > 0) {
        return NextResponse.json(response.data.data[0], { status: 200 });
      } else {
        return NextResponse.json(
          { error: 'Customer not found' },
          { status: 404 }
        );
      }
    } else {
      // Registration request - create new customer
      const { full_name, email, password } = body;

      if (!full_name || !email || !password) {
        return NextResponse.json(
          { error: 'Full name, email, and password are required' },
          { status: 400 }
        );
      }

      // Check if email already exists
      const existingCustomerResponse = await axios.get<DirectusResponse>(`http://localhost:8055/items/Customer?filter[email][_eq]=${email}`, {
        headers: {
          Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
        },
      });

      if (existingCustomerResponse.data.data && existingCustomerResponse.data.data.length > 0) {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 409 }
        );
      }

      // Create new customer
      const customerData = {
        full_name,
        email,
        password,
        created_at: new Date().toISOString(),
      };

      const response = await axios.post('http://localhost:8055/items/Customer', customerData, {
        headers: {
          Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      return NextResponse.json(response.data, { status: 201 });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}