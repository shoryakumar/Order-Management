'use client';

import React, { useState, useEffect } from "react";
import { isLoggedIn, getUserInfo, logout } from "../../utils/auth";

interface Product {
  product_id: string;
  product_name: string;
  [key: string]: unknown;
}

const DashboardPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userInfo: null as { email: string | null; name: string | null } | null,
  });

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const loggedIn = isLoggedIn();
      const userInfo = getUserInfo();
      setAuthState({ isLoggedIn: loggedIn, userInfo });
    };

    checkAuth();
    // Listen for storage changes (when login/logout happens)
    window.addEventListener('storage', checkAuth);
    
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/product`, {
          cache: 'no-store',
        });
        const data = await res.json();
        if (data && data.data) {
          setProducts(data.data);
        } else {
          setError('No products found');
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-rose-600 border-opacity-50"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-4xl font-bold text-center sm:text-left">Products</h1>
          
          {/* Header Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="/admin"
              className="px-4 py-2 bg-rose-600 text-white rounded-lg shadow hover:bg-rose-700 transition-colors text-center"
            >
              Admin Dashboard
            </a>
            
            {authState.isLoggedIn ? (
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <span className="text-gray-700 text-center sm:text-left">
                  Welcome back, {authState.userInfo?.name || 'User'}!
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition-colors w-full sm:w-auto"
                >
                  Logout
                </button>
              </div>
            ) : (
              <a
                href="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors text-center"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Products Table */}
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
                    <button className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 transition-colors">
                      Buy
                    </button>
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