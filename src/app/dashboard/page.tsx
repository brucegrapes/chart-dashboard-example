"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Layout } from "@/types/layout";
import { DashboardService } from "@/services/dashboardService";
import {
  monthlySalesData,
  productPerformanceData,
  revenueDistributionData,
} from "@/utils/sampleData";
import ReactGridLayout from "react-grid-layout";
import BarChart from "@/components/Charts/BarChart";
import PieChart from "@/components/Charts/PieChart";
import { useRouter } from "next/navigation";
import { SavedDashboard } from "@/types/dashboard";

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

const defaultLayout = [
  {
    i: "chart1",
    x: 0,
    y: 0,
    w: 6,
    h: 3,
    minW: 4,
    maxW: 12,
    minH: 3,
    isResizable: true,
    isDraggable: true,
  },
  {
    i: "chart2",
    x: 6,
    y: 0,
    w: 6,
    h: 3,
    minW: 4,
    maxW: 12,
    minH: 3,
    isResizable: true,
    isDraggable: true,
  },
  {
    i: "chart3",
    x: 0,
    y: 3,
    w: 6,
    h: 6,
    minW: 4,
    maxW: 12,
    minH: 3,
    isResizable: true,
    isDraggable: true,
  },
];
const dashboardId = "default-dashboard";
const initialDashboard = {
  id: dashboardId,
  name: "My Dashboard",
  layout: defaultLayout,
  charts: {
    chart1: {
      type: "bar" as const,
      options: options,
      data: monthlySalesData,
    },
    chart2: {
      type: "bar" as const,
      options: options2,
      data: productPerformanceData,
    },
    chart3: {
      type: "pie" as const,
      options: options3,
      data: revenueDistributionData,
    },
  },
  lastModified: new Date().toISOString(),
};

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


export default function DashboardHomePage() {
  const router = useRouter();
  const [charts, setCharts] = useState<ChartData[]>([]);

  const [layout, setLayout] = useState<Layout[]>([]);

  useEffect(() => {
    const savedDashboard = DashboardService.getDashboard(dashboardId);
    const setCurrentDashboard = (dashboard:SavedDashboard)=>{
      const savedCharts = Object.entries(dashboard.charts).map(
        ([id, config]) => ({
          id,
          type: config.type,
          options: config.options,
          data: config.data,
        })
      );
      // @ts-expect-error This is a necessary hack due to ChartData type
      setCharts(savedCharts);
      setLayout(dashboard.layout);
    }
    if (savedDashboard) {
      setCurrentDashboard(savedDashboard);
    }else{
      DashboardService.saveDashboard(initialDashboard);
      setCurrentDashboard(initialDashboard);
    }
  }, []);

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
         <h1 className='text-2xl font-bold'>Home</h1>
        </div>
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
                  {chart.type === "bar" ? (
                    <BarChart options={chart.options} data={chart.data} />
                  ) : (
                    <PieChart options={chart.options} data={chart.data} />
                  )}
                </div>
              ))}
            </ReactGridLayout>
            {charts.length === 0 && (
              <div className='col-span-12 flex items-center justify-center h-48 text-gray-500'>
                Empty Dashboard
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

