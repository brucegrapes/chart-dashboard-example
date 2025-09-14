'use client';

import { useParams } from 'next/navigation';
import { sampleDashboards } from '@/utils/sampleData';
import dynamic from 'next/dynamic';

export default function EditDashboard() {
  const params = useParams();
  const dashboard = sampleDashboards.find(d => d.id === params.id);

  if (!dashboard) {
    return <div>Dashboard not found</div>;
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Edit Dashboard: {dashboard.name}</h1>
          <div className="space-x-4">
            <button
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              onClick={() => window.location.href = '/'}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => {/* Save changes logic */}}
            >
              Save Changes
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 min-h-[600px]">
          {/* Grid layout will be implemented here */}
        </div>
      </div>
    </main>
  );
}
