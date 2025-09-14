'use client';

import { useState } from 'react';
import { Dashboard } from '@/utils/sampleData';
import dynamic from 'next/dynamic';

// Dynamically import react-grid-layout to avoid SSR issues
const GridLayout = dynamic(() => import('react-grid-layout'), { ssr: false });

export default function NewDashboard() {
  const [layouts, setLayouts] = useState([]);
  
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Create New Dashboard</h1>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => {/* Save dashboard logic */}}
          >
            Save Dashboard
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 min-h-[600px]">
          {/* Grid layout will be implemented here */}
        </div>
      </div>
    </main>
  );
}
