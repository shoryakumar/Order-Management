export default function AdminPage() {
  const options = [
    {
      title: 'Customer Details',
      href: '/admin/customer',
      description: 'View and manage all customer details.'
    },
    {
      title: 'Order Details',
      href: '/admin/order',
      description: 'Check all order information.'
    },
    {
      title: 'Repeated Customers',
      href: '/admin/repeated-customers',
      description: 'See customers who have ordered more than once.'
    },
    {
      title: 'Number of Orders (Yesterday)',
      href: '/admin/count-orders',
      description: 'View the total number of orders placed yesterday.'
    },
  ];

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-10 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {options.map((option) => (
          <a
            key={option.title}
            href={option.href}
            className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-8 text-center border border-gray-200 hover:bg-rose-50 group"
          >
            <div className="text-2xl font-semibold mb-2 text-rose-600 group-hover:no-underlineunderline">{option.title}</div>
            <div className="text-gray-600">{option.description}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
