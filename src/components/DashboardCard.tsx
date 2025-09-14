'use client';

import React from 'react';
import { Dashboard } from '@/utils/sampleData';

interface DashboardCardProps {
  dashboard: Dashboard;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function DashboardCard({
  dashboard,
  onEdit,
  onDelete,
}: DashboardCardProps) {
  const createdDate = new Date(dashboard.createdAt).toLocaleDateString();
  
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {dashboard.name}
          </h3>
          <p className="text-sm text-gray-500">
            Created on {createdDate}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(dashboard.id)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit dashboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(dashboard.id)}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete dashboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      <div className="pt-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Charts: </span>
            <span className="text-gray-900 font-medium">{dashboard.layout.length}</span>
          </div>
          <div>
            <span className="text-gray-500">Types: </span>
            <span className="text-gray-900 font-medium">
              {dashboard.layout.map(l => l.chartType).join(', ')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}