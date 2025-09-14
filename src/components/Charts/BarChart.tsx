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
  BarElement,
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
  chartTitle?: string;
}

function BarChart({
  data,
  options = defaultOptions,
  chartTitle = "Bar Chart"
}: BarChartProps) {
  return (
    <ChartWithFilters initialData={data} type='bar'>
      {({ data }) => (
        <Bar
          className="drag-cancel"
          options={{
            ...options,
            title: {
              display: true,
              text: chartTitle,
            },
          }}
          data={data}
        />
      )}
    </ChartWithFilters>
  );
}

export default BarChart;
