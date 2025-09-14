"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardService } from '@/services/dashboardService';
import DashboardPreview from '@/components/DashboardPreview/DashboardPreview';
import { SavedDashboard } from '@/types/dashboard';

export default function DashboardList() {
  const router = useRouter();
  const [dashboards, setDashboards] = useState<SavedDashboard[]>([]);
  const [dashboardToDelete, setDashboardToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadDashboards();
  }, []);

  const loadDashboards = () => {
    const savedDashboards = DashboardService.getAllDashboards();
    setDashboards(savedDashboards);
  };

  const handleDelete = (id: string) => {
    setDashboardToDelete(id);
  };

  const confirmDelete = () => {
    if (dashboardToDelete) {
      DashboardService.deleteDashboard(dashboardToDelete);
      setDashboardToDelete(null);
      loadDashboards();
    }
  };

  const createNewDashboard = () => {
    const newDashboard: SavedDashboard = {
      id: crypto.randomUUID(),
      name: 'New Dashboard',
      layout: [],
      charts: {},
      lastModified: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    DashboardService.saveDashboard(newDashboard);
    router.push(`/dashboard/${newDashboard.id}/edit`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboards</h1>
        <button
          onClick={createNewDashboard}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create New Dashboard
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dashboard</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dashboards.map((dashboard) => (
              <tr key={dashboard.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <DashboardPreview layout={dashboard.layout} className="shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{dashboard.name || 'Untitled'}</div>
                      <div className="text-sm text-gray-500">
                        {Object.keys(dashboard.charts || {}).length} charts
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(dashboard.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(dashboard.lastModified).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => router.push(`/dashboard/${dashboard.id}/edit`)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                <button
                    onClick={() => router.push(`/dashboard/${dashboard.id}`)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(dashboard.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {dashboardToDelete && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-xs shadow-lg rounded-lg p-4 drag-cancel bg-transparent bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-xl max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete this dashboard?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setDashboardToDelete(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}