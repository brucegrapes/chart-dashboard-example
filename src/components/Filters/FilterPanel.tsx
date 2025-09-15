"use client";

import { useEffect, useState } from "react";
import { BarChartData, PieChartData } from "@/utils/sampleData";
import {
  filterByDateRange,
  filterByLabels,
  sortByValue,
  takeTop,
  searchByLabel,
} from "@/utils/dataFilters";
import { debounce } from "chart.js/helpers";


interface FilterPanelProps {
  data: BarChartData | PieChartData;
  onFilter: (filteredData: BarChartData | PieChartData) => void;
  type: "bar" | "pie";
  onReset: () => void;
}

export default function FilterPanel({
  data,
  onFilter,
  type,
  onReset
}: FilterPanelProps) {
  const [searchText, setSearchText] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");
  const [topN, setTopN] = useState<number>(data.labels.length);
  const [isExpanded, setIsExpanded] = useState(false);
  const filteredData = { ...data };

    const applyFilters = () => {
    try {
      let filteredData = { ...data };
      if(searchText.trim() !== ""){
        filteredData = searchByLabel(filteredData, searchText.trim());
      }
      if (selectedLabels.length > 0) {
        filteredData = filterByLabels(filteredData, selectedLabels);
      }
      if (sortOrder !== "none") {
        filteredData = sortByValue(filteredData, sortOrder);
      }
      if (topN > 0 && topN < data.labels.length) {
        filteredData = takeTop(filteredData, topN);
      }
      onFilter(filteredData);
    } catch (error) {
      console.error("Error applying filters:", error);
      // In case of error, return original data
      onFilter(data);
    }
  };

  useEffect(applyFilters, [
    searchText,
    selectedLabels,
    sortOrder,
    topN,
    data
  ])


  function searchLabels(text: string) {
    onFilter(searchByLabel({...filteredData}, text))
  }


  return (
    <div 
      className={`max-h-[100%] overflow-auto absolute bg-white/30 backdrop-blur-sm ${isExpanded ? 'shadow-lg' : ''} rounded-lg p-4 drag-cancel bg-transparent`}
      style={{ backgroundColor: 'transparent'}}
      >
      <div className='flex justify-between items-center'>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className='text-gray-500 hover:text-gray-700'
        >
          <div className='flex items-center'>
            <svg viewBox='0 0 512 512' height='1em'>
              <path d='M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z'></path>
            </svg>
          </div>
        </button>
      </div>

      {isExpanded && (
        <div className='space-y-4 mt-4'>
          {/* Search Filter */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Search Labels
            </label>
            <input
              type='text'
              value={searchText}
              onChange={(e) => { 
                setSearchText(e.target.value)
              }}
              placeholder='Search...'
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          {/* Label Selection */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Select Labels
            </label>
            <div className='max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2'>
              {data.labels.map((label) => (
                <label
                  key={label}
                  className='flex items-center space-x-2 p-1 hover:bg-gray-50'
                >
                  <input
                    type='checkbox'
                    checked={selectedLabels.includes(label)}
                    onChange={(e) => {
                      let selection;
                      if (e.target.checked) {
                        selection = [...selectedLabels, label];
                        setSelectedLabels(selection);
                      } else {
                        selection = selectedLabels.filter((l) => l !== label);
                        setSelectedLabels(
                          selection
                        );
                      }
                    }}
                    className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                  />
                  <span className='text-sm text-gray-700'>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sort Order */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Sort Order
            </label>
            <select
              value={sortOrder}
              onChange={(e) => { 
                const selectedValue = e.target.value as "asc" | "desc"
                setSortOrder(selectedValue)
              }}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
              aria-label='Sort order'
              title='Select sort order'
            >
              <option value='asc'>Ascending</option>
              <option value='desc'>Descending</option>
              <option value='none'>None</option>
            </select>
          </div>

          {/* Top N Filter */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Show Top N
            </label>
            <input
              type='number'
              min='1'
              max={data.labels.length}
              value={topN}
              onChange={(e) => { 
                const currentTopN = Number(e.target.value)
                setTopN(currentTopN)
              }}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
              aria-label='Number of items to show'
              title='Enter number of items to show'
              placeholder='Enter number of items'
            />
          </div>

          {/* Action Buttons */}
          <div className='flex space-x-2 pt-4'>
            <button
              onClick={() => {
                // Reset all filters
                setSearchText("");
                setSelectedLabels([]);
                setSortOrder("none");
                setTopN(data.labels.length);
                onReset();
              }}
              className='flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors'
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
