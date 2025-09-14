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
  chartTitle?: string;
  showFilters?: boolean;
}

function BarChart({
  data,
  options = defaultOptions,
  chartTitle = "Bar Chart",
  showFilters = true,
}: BarChartProps) {
  if (showFilters) {
    return (
      <ChartWithFilters initialData={data} type='bar'>
        {({ data }) => (
          <Bar
            className='drag-cancel'
            options={{
              ...options,
              title: {
                display: true,
                text: chartTitle,
              },
            }}
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
          options={{
            ...options,
            title: {
              display: true,
              text: chartTitle,
            },
          }}
          redraw
          data={data}
        />
      </>
    );
  }
}

export default BarChart;
