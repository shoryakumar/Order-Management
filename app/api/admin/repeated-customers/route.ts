// import axios from 'axios';
// import { NextResponse } from 'next/server';

// interface RepeatedCustomer {
//   customer_id: string;
//   full_name: string;
//   order_count: number;
// }

// interface DirectusResponse {
//   data: RepeatedCustomer[];
// }

// export async function GET() {
//   try {
//     const response = await axios.get<DirectusResponse>('http://localhost:8055/items/repeated_customer', {
//       headers: {
//         Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
//       },
//     });
//     return NextResponse.json(response.data, { status: 200 });
//   } catch (error) {
//     const message = error instanceof Error ? error.message : 'Unknown error';
//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// }



// import { NextResponse } from 'next/server';

// export async function GET() {
//   try {
//     const response = await fetch('http://localhost:8055/query', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${process.env.DIRECTUS_TOKEN}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         query: `
//           SELECT 
//             c.customer_id, 
//             c.full_name, 
//             COUNT(o.order_id) AS order_count
//           FROM "Customer" c
//           JOIN "Order" o ON o.customer_id = c.customer_id
//           GROUP BY c.customer_id, c.full_name
//           HAVING COUNT(o.order_id) >= 2;
//         `,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch repeated customers');
//     }

//     const data = await response.json();
//     return NextResponse.json({ data: data.data }, { status: 200 });
//   } catch (error) {
//     const message = error instanceof Error ? error.message : 'Unknown error';
//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';


export async function GET() {
  try {
    const sql = await getDbConnection();
    const result = await sql`
      SELECT 
        c.customer_id, 
        c.full_name, 
        COUNT(o.order_id) AS order_count
      FROM "Customer" c
      JOIN "Order" o ON o.customer_id = c.customer_id
      GROUP BY c.customer_id, c.full_name
      HAVING COUNT(o.order_id) >= 2;
    `;

    return NextResponse.json({ data: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}