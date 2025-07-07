interface Order {
  order_id: string;
  ordered_at: string;
  customer_id: { full_name: string };
  product_id: { product_name: string };
  [key: string]: unknown;
}

async function getOrders(): Promise<Order[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/order`, {
    cache: 'no-store',
  });
  const data = await res.json();
  if (data && data.data) {
    return data.data;
  }
  throw new Error('No orders found');
}

export default async function OrderPage() {
  let orders: Order[] = [];
  let error: string | null = null;
  try {
    orders = await getOrders();
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to fetch orders';
  }

  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Order Details</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-rose-600 text-white">
              <th className="py-3 px-6 text-left">Customer Name</th>
              <th className="py-3 px-6 text-left">Product Name</th>
              <th className="py-3 px-6 text-left">Ordered At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id} className="border-b hover:bg-rose-50 transition-colors">
                <td className="py-3 px-6 font-medium">{order.customer_id?.full_name || '-'}</td>
                <td className="py-3 px-6">{order.product_id?.product_name || '-'}</td>
                <td className="py-3 px-6 text-gray-500">{new Date(order.ordered_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
