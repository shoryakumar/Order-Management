export default function LoadingCustomers() {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-rose-600 border-opacity-50 mb-4"></div>
        <div className="text-lg text-rose-600 font-semibold">Loading customers...</div>
      </div>
    );
  }