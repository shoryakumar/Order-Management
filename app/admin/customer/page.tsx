interface Customer {
  customer_id: string;
  email: string;
  password?: string;
  full_name: string;
  created_at: string;
  [key: string]: unknown;
}

async function getCustomers(): Promise<Customer[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/directus`, {
    cache: 'no-store',
  });
  const data = await res.json();
  if (data && data.data) {
    return data.data;
  }
  throw new Error('No customers found');
}

export default async function CustomerPage() {
  let customers: Customer[] = [];
  let error: string | null = null;
  try {
    customers = await getCustomers();
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to fetch customers';
  }

  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Customers</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-rose-600 text-white">
              <th className="py-3 px-6 text-left">Full Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.customer_id} className="border-b hover:bg-rose-50 transition-colors">
                <td className="py-3 px-6 font-medium">{customer.full_name}</td>
                <td className="py-3 px-6">{customer.email}</td>
                <td className="py-3 px-6 text-gray-500">{new Date(customer.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}