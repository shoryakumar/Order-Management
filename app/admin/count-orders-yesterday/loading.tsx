export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <div className="h-10 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-6 w-48 mx-auto"></div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-rose-600">
            <div className="h-6 bg-white bg-opacity-20 rounded animate-pulse"></div>
          </div>
          
          <div className="p-8">
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex space-x-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse flex-1"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <div className="h-10 bg-gray-200 rounded animate-pulse w-48 mx-auto"></div>
      </div>
    </div>
  );
}