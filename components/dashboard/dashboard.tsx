import React from "react";

interface Product {
  product_id: string;
  product_name: string;
  [key: string]: unknown;
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/product`, {
    cache: 'no-store',
  });
  const data = await res.json();
  if (data && data.data) {
    return data.data;
  }
  throw new Error('No products found');
}

const DashboardPage = async () => {
  let products: Product[] = [];
  let error: string | null = null;
  try {
    products = await getProducts();
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to fetch products';
  }

  return (
    <div className="container mx-auto py-8 relative">
      {/* Admin Dashboard Button */}
      <a
        href="/admin"
        className="absolute top-4 right-4 px-4 py-2 bg-rose-600 text-white rounded-lg shadow hover:bg-rose-700 transition-colors"
      >
        Admin Dashboard
      </a>
      <h1 className="text-4xl font-bold mb-8 text-center">Products</h1>
      {error ? (
        <div className="text-red-500 text-center mt-8">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-rose-600 text-white">
                <th className="py-3 px-6 text-left">Product Name</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.product_id} className="border-b hover:bg-rose-50 transition-colors">
                  <td className="py-3 px-6 font-medium">{product.product_name}</td>
                  <td className="py-3 px-6">
                    <button className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 transition-colors">Buy</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;