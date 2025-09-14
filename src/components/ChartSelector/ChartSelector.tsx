import React from 'react';

export interface AvailableChart {
  id: string;
  name: string;
  type: 'bar' | 'pie';
  dataKey: 'monthlySales' | 'productPerformance' | 'revenueDistribution';
}

interface ChartSelectorProps {
  onAddChart: (chart: AvailableChart) => void;
}

const AVAILABLE_CHARTS: AvailableChart[] = [
  {
    id: 'monthly-sales',
    name: 'Monthly Sales & Profit',
    type: 'bar',
    dataKey: 'monthlySales'
  },
  {
    id: 'product-performance',
    name: 'Product Performance',
    type: 'bar',
    dataKey: 'productPerformance'
  },
  {
    id: 'revenue-distribution',
    name: 'Revenue Distribution',
    type: 'pie',
    dataKey: 'revenueDistribution'
  }
];

export default function ChartSelector({ onAddChart }: ChartSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-64">
      <h2 className="text-lg font-semibold mb-4">Available Charts</h2>
      <div className="space-y-2">
        {AVAILABLE_CHARTS.map((chart) => (
          <button
            key={chart.id}
            onClick={() => onAddChart(chart)}
            className="w-full text-left px-4 py-2 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center justify-between group"
          >
            <span>{chart.name}</span>
            <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
              + Add
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}