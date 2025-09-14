'use client';

import { useState } from 'react';
import FilterPanel from './FilterPanel';
import { BarChartData, PieChartData } from '@/utils/sampleData';

interface ChartWithFiltersProps {
  initialData: BarChartData | PieChartData;
  type: 'bar' | 'pie';
  children: ({ data }: { data: BarChartData | PieChartData }) => React.ReactNode;
}

export default function ChartWithFilters({
  initialData,
  type,
  children
}: ChartWithFiltersProps) {
  const [filteredData, setFilteredData] = useState(initialData);

  const handleFilter = (newData: BarChartData | PieChartData) => {
    setFilteredData(newData);
  };

  const onReset = () => {
    setFilteredData(initialData);
  }

  return (
    <div className="space-y-4">
      <FilterPanel
        data={initialData}
        onFilter={handleFilter}
        type={type}
        onReset={onReset}
      />
      {children({ data: filteredData })}
    </div>
  );
}