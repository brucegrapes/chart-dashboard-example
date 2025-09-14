"use client";

import React from "react";
import { useState } from 'react';
import { Layout } from "@/types/layout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { monthlySalesData, productPerformanceData, revenueDistributionData } from "@/utils/sampleData";
import ReactGridLayout from "react-grid-layout";
import ChartWithFilters from "@/components/Filters/ChartWithFilters";
//import RGL, { WidthProvider } from "react-grid-layout";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Monthly Sales & Profit",
    },
  },
};

const options2 = {
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

const options3 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Revenue distribution",
    },
  },
};

//const ReactGridLayout = WidthProvider(RGL);


export default function Home() {
  const [layout, setLayout] = useState<Layout[]>([
    { i: "chart1", x: 0, y: 0, w: 6, h: 3, minW: 4, maxW: 12, minH: 3, isResizable: true, isDraggable: true },
    { i: "chart2", x: 6, y: 0, w: 6, h: 3, minW: 4, maxW: 12, minH: 3, isResizable: true, isDraggable: true },
    { i: "chart3", x: 6, y: 0, w: 6, h: 6, minW: 4, maxW: 12, minH: 3, isResizable: true, isDraggable: true },
  ]);

  const onLayoutChange = (newLayout: Layout[]) => {
    console.log('Layout changed:', newLayout);
    setLayout(newLayout);
  };

  return (
    <div className="p-4">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => {
            console.log('Saving layout:', layout);
          }}
        >
          Save Layout
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <ReactGridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={100}
          width={1200}
          isDraggable={true}
          isResizable={true}
          //onLayoutChange={onLayoutChange}
          margin={[16, 16]}
          compactType={null}
          preventCollision={true}
          resizeHandles={['se']}
          draggableCancel=".drag-cancel"
        >
          <div key="chart1" className="bg-white rounded-lg shadow">
            <Bar options={options} data={monthlySalesData}/>
          </div>
          <div key="chart2" className="bg-white rounded-lg shadow">
            <ChartWithFilters initialData={productPerformanceData} type="bar">
              {({ data }) => (
                <Bar options={options2} data={data}/>
              )}
            </ChartWithFilters>
          </div>
          <div key="chart3" className="bg-white rounded-lg shadow">
            <ChartWithFilters initialData={revenueDistributionData} type="pie">
               {({ data }) => (
                <Pie data={data} options={options3} />
              )}
            </ChartWithFilters>
          </div>
        </ReactGridLayout>
      </div>
    </div>
  );
}

type CustomGridItemComponentProps = React.PropsWithChildren<{
  className?: string;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
  onMouseUp?: React.MouseEventHandler<HTMLDivElement>;
  onTouchEnd?: React.TouchEventHandler<HTMLDivElement>;
}>;

const CustomGridItemComponent = React.forwardRef<HTMLDivElement, CustomGridItemComponentProps>(
  ({ className, onMouseDown, onMouseUp, onTouchEnd, children }, ref) => {
    return (
      <div
        className={`w-full h-full min-h-[400px] border border-gray-200 bg-white rounded-lg shadow-sm p-4 ${className}`}
        ref={ref}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
      >
        {children}
      </div>
    );
  }
);

CustomGridItemComponent.displayName = "CustomGridItemComponent";