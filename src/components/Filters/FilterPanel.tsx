'use client';

import { useState } from 'react';
import { BarChartData, PieChartData } from '@/utils/sampleData';
import {
  filterByDateRange,
  filterByLabels,
  filterByThreshold,
  sortByValue,
  takeTop,
  searchByLabel,
} from '@/utils/dataFilters';

interface FilterPanelProps {
  data: BarChartData | PieChartData;
  onFilter: (filteredData: BarChartData | PieChartData) => void;
  type: 'bar' | 'pie';
}

export default function FilterPanel({ data, onFilter, type }: FilterPanelProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [threshold, setThreshold] = useState<number>(0);
  const [thresholdComparison, setThresholdComparison] = useState<'greater' | 'less' | 'equal'>('greater');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [topN, setTopN] = useState<number>(5);
  const [isExpanded, setIsExpanded] = useState(false);

  const [dateRange, setDateRange] = useState({
    start: type === 'bar' ? data.labels[0] : '',
    end: type === 'bar' ? data.labels[data.labels.length - 1] : ''
  });

  const applyFilters = () => {
    try {
      let filteredData = { ...data };

      // 1. Apply search filter if text is entered
      if (searchText.trim()) {
        filteredData = searchByLabel(filteredData, searchText);
      }

      // 2. Apply label selection if any labels are selected
      if (selectedLabels.length > 0) {
        filteredData = filterByLabels(filteredData, selectedLabels);
      }

      // 3. Apply threshold filter if threshold is not 0
      if (threshold !== 0) {
        filteredData = filterByThreshold(filteredData, threshold, thresholdComparison);
      }

      // 4. Apply date range filter for bar charts
      if (type === 'bar' && dateRange.start && dateRange.end) {
        filteredData = filterByDateRange(filteredData as BarChartData, dateRange.start, dateRange.end);
      }

      // 5. Apply sorting
      filteredData = sortByValue(filteredData, sortOrder);

      // 6. Apply top N filter if it's less than total items
      if (topN > 0 && topN < data.labels.length) {
        filteredData = takeTop(filteredData, topN);
      }

      // Send filtered data to parent component
      onFilter(filteredData);
    } catch (error) {
      console.error('Error applying filters:', error);
      // In case of error, return original data
      onFilter(data);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4 drag-cancel">
      <div className="flex justify-between items-center mb-4">
        {/* <h3 className="text-lg font-semibold text-gray-900">Filter Options</h3> */}
        <button
          onClick={(e) => {  
            e.preventDefault();
            e.stopPropagation();
            setIsExpanded(!isExpanded)
         }}
          className="text-gray-500 hover:text-gray-700"
        >
            Filter Options {' '}
          {isExpanded ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {/* Search Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Labels
            </label>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Label Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Labels
            </label>
            <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
              {data.labels.map((label) => (
                <label key={label} className="flex items-center space-x-2 p-1 hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={selectedLabels.includes(label)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedLabels([...selectedLabels, label]);
                      } else {
                        setSelectedLabels(selectedLabels.filter((l) => l !== label));
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Threshold Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Value Threshold
            </label>
            <div className="flex space-x-2">
              <select
                value={thresholdComparison}
                onChange={(e) => setThresholdComparison(e.target.value as 'greater' | 'less' | 'equal')}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                aria-label="Comparison operator"
                title="Select comparison operator"
              >
                <option value="greater">&gt;</option>
                <option value="less">&lt;</option>
                <option value="equal">=</option>
              </select>
              <input
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                aria-label="Threshold value"
                title="Enter threshold value"
                placeholder="Enter threshold value"
              />
            </div>
          </div>

          {/* Date Range Filter (for bar charts only) */}
          {type === 'bar' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  aria-label="Start date"
                  title="Select start date"
                >
                  {data.labels.map((label) => (
                    <option key={label} value={label}>
                      {label}
                    </option>
                  ))}
                </select>
                <select
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  aria-label="End date"
                  title="Select end date"
                >
                  {data.labels.map((label) => (
                    <option key={label} value={label}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Sort Order */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort Order
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              aria-label="Sort order"
              title="Select sort order"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          {/* Top N Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Show Top N
            </label>
            <input
              type="number"
              min="1"
              max={data.labels.length}
              value={topN}
              onChange={(e) => setTopN(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              aria-label="Number of items to show"
              title="Enter number of items to show"
              placeholder="Enter number of items"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4">
            <button
              onClick={applyFilters}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>
            <button
              onClick={() => {
                // Reset all filters
                setSearchText('');
                setSelectedLabels([]);
                setThreshold(0);
                setThresholdComparison('greater');
                setSortOrder('desc');
                setTopN(5);
                if (type === 'bar') {
                  setDateRange({
                    start: data.labels[0],
                    end: data.labels[data.labels.length - 1]
                  });
                }
                onFilter(data);
              }}
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}