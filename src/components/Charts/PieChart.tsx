import React from "react";
import ChartWithFilters from "../Filters/ChartWithFilters";
import { Pie } from "react-chartjs-2";
import {  Chart as ChartJS, ArcElement, CategoryScale, ChartData, ChartOptions, Legend, LinearScale, Title, Tooltip } from 'chart.js';

const defaultOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Product Performance",
    },
  },
};

interface PieChartProps {
  data: ChartData<'pie', number[], string>;
  options?: ChartOptions<'pie'>;
  showFilters?: boolean;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function PieChart({
    data,
    options = defaultOptions,
    showFilters = true,
}: PieChartProps) {
  // Ensure labels is always defined
  const safeData = {
    ...data,
    labels: data.labels ?? [],
  };
  if(showFilters){
  return (
    // @ts-expect-error This is a necessary hack due to ChartData type
    <ChartWithFilters initialData={safeData} type='pie'>
      {({ data }) => (
        <Pie
          className="drag-cancel"
          data={data}
          options={options}
          redraw
        />
      )}
    </ChartWithFilters>
  );
}else{
    return (
        <Pie
          className="drag-cancel"
          data={safeData}
            options={options}
          redraw
        />
    );
}
}

export default PieChart;
