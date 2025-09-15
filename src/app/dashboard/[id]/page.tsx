"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardService } from "@/services/dashboardService";
import { Layout } from "@/types/layout";
import ReactGridLayout from "react-grid-layout";
import BarChart from "@/components/Charts/BarChart";
import PieChart from "@/components/Charts/PieChart";
import {
  monthlySalesData,
  productPerformanceData,
  revenueDistributionData,
} from "@/utils/sampleData";
import { useParams } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [dashboardName, setDashboardName] = useState("");
  const { id } = useParams() as { id: string };
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
      // @ts-expect-error This is a necessary hack due to ChartData type
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
            onClick={() => router.push("/")}
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
