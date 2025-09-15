import React from "react";
import ChartWithFilters from "../Filters/ChartWithFilters";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement
);

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

interface BarChartProps {
  data: ChartData<"bar", number[], string>;
  options?: ChartOptions<"bar">;
  showFilters?: boolean;
}

function BarChart({
  data,
  options = defaultOptions,
  showFilters = true,
}: BarChartProps) {
  const safeData = {
    ...data,
    labels: data.labels ?? [],
  };
  if (showFilters) {
    return (
      // @ts-expect-error This is a necessary hack due to ChartData type
      <ChartWithFilters initialData={safeData} type='bar'>
        {({ data }) => (
          <Bar
            className='drag-cancel'
            options={options}
            data={data}
            redraw
          />
        )}
      </ChartWithFilters>
    );
  } else {
    return (
      <>
        <Bar
          className='drag-cancel'
          options={options}
          redraw
          data={data}
        />
      </>
    );
  }
}

export default BarChart;
