'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface WeeklyOrder {
  weekday: string;
  no_of_orders: number;
}

export default function CountOrdersPreviousWeekPage() {
  const [weeklyOrders, setWeeklyOrders] = useState<WeeklyOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeeklyOrders = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/admin/weekly-orders-by-day`, {
          cache: 'no-store',
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch weekly orders');
        }
        
        const data = await response.json();
        setWeeklyOrders(data.data || []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyOrders();
  }, []);

  const totalOrders = weeklyOrders.reduce((sum, order) => sum + Number(order.no_of_orders), 0);

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
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">Weekly Orders - Previous Week</h1>
        <div className="text-center text-gray-600 mb-6">
          Total Orders: <span className="font-bold text-rose-600">{totalOrders}</span>
        </div>
      </div>

      {error ? (
        <div className="text-red-500 text-center mt-8">{error}</div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-rose-600 text-white">
              <h2 className="text-xl font-semibold">Daily Breakdown</h2>
            </div>
            
            {weeklyOrders.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No orders found for the previous week
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Day of Week
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Number of Orders
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {weeklyOrders.map((order, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.weekday}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.no_of_orders}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <a
          href="/admin"
          className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition-colors"
        >
          Back to Admin Dashboard
        </a>
      </div>
    </div>
  );
}
