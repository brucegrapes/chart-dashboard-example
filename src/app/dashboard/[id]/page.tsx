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

export default function DashboardPage({ params }: { params: { id: string } }) {
  const router = useRouter();
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

  return (
    <div className='p-4'>
      <div className='mb-6 flex justify-between items-center'>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => router.push("/dashboards")}
            className='text-blue-600 hover:text-blue-800'
          >
            ← Back to Dashboards
          </button>
         
         <h1 className='text-2xl font-bold'>{dashboardName}</h1>
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
