"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { DashboardService } from "@/services/dashboardService";
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
import ReactGridLayout from "react-grid-layout";
import BarChart from "@/components/Charts/BarChart";
import PieChart from "@/components/Charts/PieChart";
import {
  monthlySalesData,
  productPerformanceData,
  revenueDistributionData,
} from "@/utils/sampleData";
import ChartSelector, {
  AvailableChart,
} from "@/components/ChartSelector/ChartSelector";


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

export default function EditDashboard({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [dashboardName, setDashboardName] = useState("");
  const { id } = use(params);
  interface ChartData {
    id: string;
    type: "bar" | "pie";
    options: {
      responsive: boolean;
      plugins: {
        legend: {
          position: "top";
        };
        title: {
          display: boolean;
          text: string;
        };
      };
    };
    data:
      | typeof monthlySalesData
      | typeof productPerformanceData
      | typeof revenueDistributionData;
  }

  const [charts, setCharts] = useState<ChartData[]>([]);

  const [layout, setLayout] = useState<Layout[]>([]);

  useEffect(() => {
    const savedDashboard = DashboardService.getDashboard(id);
    if (savedDashboard) {
      const savedCharts = Object.entries(savedDashboard.charts).map(
        ([id, config]) => ({
          id,
          type: config.type,
          options: config.options,
          data: config.data,
        })
      );
      setCharts(savedCharts);
      setLayout(savedDashboard.layout);
      setDashboardName(savedDashboard.name);
    }
  }, [id]);

  const handleDeleteChart = (chartId: string) => {
    setCharts((prev) => prev.filter((c) => c.id !== chartId));
    setLayout((prev) => prev.filter((l) => l.i !== chartId));
  };

  const handleAddChart = (chart: AvailableChart) => {
    const chartId = `${chart.id}-${Date.now()}`;
    const chartOptions = {
      monthlySales: options,
      productPerformance: options2,
      revenueDistribution: options3,
    };

    const chartData = {
      monthlySales: monthlySalesData,
      productPerformance: productPerformanceData,
      revenueDistribution: revenueDistributionData,
    };

    const newChart: ChartData = {
      id: chartId,
      type: chart.type,
      options: chartOptions[chart.dataKey],
      data: chartData[chart.dataKey],
    };

    const newLayout: Layout = {
      i: chartId,
      x: (layout.length * 2) % 12, // Position new charts in a grid
      y: Infinity, // Put new charts at the bottom
      w: 6,
      h: 3,
      minW: 4,
      maxW: 12,
      minH: 3,
      isResizable: true,
      isDraggable: true,
    };

    setCharts((prev) => [...prev, newChart]);
    setLayout((prev) => [...prev, newLayout]);
  };

  const handleSave = () => {
    const chartConfigs = charts.reduce(
      (acc, chart) => ({
        ...acc,
        [chart.id]: {
          type: chart.type as const,
          options: chart.options,
          data: chart.data,
        },
      }),
      {}
    );

    const currentDashboard = {
      id,
      name: dashboardName,
      layout: layout,
      charts: chartConfigs,
      lastModified: new Date().toISOString(),
    };
    DashboardService.saveDashboard(currentDashboard);
    setIsEditing(false);
  };

  return (
    <div className='p-4'>
      <div className='mb-6 flex justify-between items-center'>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => router.push("/")}
            className='text-blue-600 hover:text-blue-800'
          >
            ← Back to Dashboards
          </button>
          {isEditing ? (
            <input
              type='text'
              value={dashboardName}
              onChange={(e) => setDashboardName(e.target.value)}
              className='px-2 py-1 border rounded'
              autoFocus
              aria-label='Dashboard name'
              placeholder='Enter dashboard name'
            />
          ) : (
            <h1 className='text-2xl font-bold'>{dashboardName}</h1>
          )}
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className='text-gray-600 hover:text-gray-800'
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
        <button
          className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          onClick={handleSave}
        >
          Save Layout
        </button>
      </div>

      <div className='flex gap-4'>
        <div className='flex-1'>
          <div className='bg-gray-50 p-4 rounded-lg'>
            <ReactGridLayout
              className='layout'
              layout={layout}
              cols={12}
              rowHeight={100}
              width={1200}
              isDraggable={true}
              isResizable={true}
              onLayoutChange={(newLayout) => {
                setLayout(newLayout);
                handleSave();
              }}
              margin={[16, 16]}
              compactType={null}
              preventCollision={true}
              resizeHandles={["se"]}
              draggableCancel='.drag-cancel'
            >
              {charts.map((chart) => (
                <div
                  key={chart.id}
                  className='bg-white rounded-lg shadow relative'
                >
                  <button
                    onClick={() => handleDeleteChart(chart.id)}
                    className='drag-cancel absolute top-2 right-2 z-10 p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500'
                    title='Delete chart'
                  >
                    <svg
                      className='w-4 h-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                  {chart.type === "bar" ? (
                    <BarChart options={chart.options} data={chart.data} showFilters={false}/>
                  ) : (
                    <PieChart options={chart.options} data={chart.data} showFilters={false} />
                  )}
                  <button
                    className='absolute bottom-2 right-2 p-1 z-10 text-red-600'
                    title='Move Chart'
                    style={{ cursor: "move", width: 30 }}
                  >
                    <svg
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                      <g
                        id='SVGRepo_tracerCarrier'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      ></g>
                      <g id='SVGRepo_iconCarrier'>
                        {" "}
                        <path
                          d='M12 3V9M12 3L9 6M12 3L15 6M12 15V21M12 21L15 18M12 21L9 18M3 12H9M3 12L6 15M3 12L6 9M15 12H21M21 12L18 9M21 12L18 15'
                          stroke='#000000'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        ></path>{" "}
                      </g>
                    </svg>
                  </button>
                </div>
              ))}
            </ReactGridLayout>
            {charts.length === 0 && (
              <div className='col-span-12 flex items-center justify-center h-48 text-gray-500'>
                No charts added. Use the selector to add charts.
              </div>
            )}
          </div>
        </div>
        <ChartSelector onAddChart={handleAddChart} />
      </div>
    </div>
  );
}
