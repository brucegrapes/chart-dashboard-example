"use client";

import React from "react";
import { useState, useEffect } from 'react';
import { Layout } from "@/types/layout";
import { DashboardService } from "@/services/dashboardService";
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
import { monthlySalesData, productPerformanceData, revenueDistributionData } from "@/utils/sampleData";
import ReactGridLayout from "react-grid-layout";
import BarChart from "@/components/Charts/BarChart";
import PieChart from "@/components/Charts/PieChart";

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
  const [dashboardId] = useState(() => 'default-dashboard'); // In a real app, this could come from URL params
  const defaultLayout = React.useMemo(() => [
    { i: "chart1", x: 0, y: 0, w: 6, h: 3, minW: 4, maxW: 12, minH: 3, isResizable: true, isDraggable: true },
    { i: "chart2", x: 6, y: 0, w: 6, h: 3, minW: 4, maxW: 12, minH: 3, isResizable: true, isDraggable: true },
    { i: "chart3", x: 0, y: 3, w: 6, h: 6, minW: 4, maxW: 12, minH: 3, isResizable: true, isDraggable: true },
  ], []);

  const [layout, setLayout] = useState<Layout[]>(defaultLayout);
  const [dashboardName, setDashboardName] = useState('My Dashboard');

  const saveDashboardState = React.useCallback((currentLayout: Layout[]) => {
    const currentDashboard = {
      id: dashboardId,
      name: dashboardName,
      layout: currentLayout,
      charts: {
        chart1: {
          type: 'bar' as const,
          options: options,
          data: monthlySalesData
        },
        chart2: {
          type: 'bar' as const,
          options: options2,
          data: productPerformanceData
        },
        chart3: {
          type: 'pie' as const,
          options: options3,
          data: revenueDistributionData
        }
      },
      lastModified: new Date().toISOString()
    };
    DashboardService.saveDashboard(currentDashboard);
  }, [dashboardId, dashboardName]);

  // Load saved dashboard on mount
  useEffect(() => {
    const savedDashboard = DashboardService.getDashboard(dashboardId);
    if (savedDashboard) {
      setLayout(savedDashboard.layout || defaultLayout);
      setDashboardName(savedDashboard.name);
    } else {
      // Initialize a new dashboard if none exists
      const initialDashboard = {
        id: dashboardId,
        name: 'My Dashboard',
        layout: defaultLayout,
        charts: {
          chart1: {
            type: 'bar' as const,
            options: options,
            data: monthlySalesData
          },
          chart2: {
            type: 'bar' as const,
            options: options2,
            data: productPerformanceData
          },
          chart3: {
            type: 'pie' as const,
            options: options3,
            data: revenueDistributionData
          }
        },
        lastModified: new Date().toISOString()
      };
      DashboardService.saveDashboard(initialDashboard);
    }
  }, [dashboardId, defaultLayout]);

  return (
    <div className="p-4">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => saveDashboardState(layout)}
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
          onLayoutChange={(newLayout) => {
            setLayout(newLayout);
            DashboardService.saveDashboard({
              id: dashboardId,
              name: dashboardName,
              layout: newLayout,
              charts: {
                chart1: {
                  type: 'bar' as const,
                  options: options,
                  data: monthlySalesData
                },
                chart2: {
                  type: 'bar' as const,
                  options: options2,
                  data: productPerformanceData
                },
                chart3: {
                  type: 'pie' as const,
                  options: options3,
                  data: revenueDistributionData
                }
              },
              lastModified: new Date().toISOString()
            });
          }}
          margin={[16, 16]}
          compactType={null}
          preventCollision={true}
          resizeHandles={['se']}
          draggableCancel=".drag-cancel"
        >
          <div key="chart1" className="bg-white rounded-lg shadow">
            <BarChart options={options} data={monthlySalesData}/>
          </div>
          <div key="chart2" className="bg-white rounded-lg shadow">
            <BarChart options={options2} data={productPerformanceData}/>
          </div>
          <div key="chart3" className="bg-white rounded-lg shadow">
            <PieChart options={options3} data={revenueDistributionData}/>
          </div>
        </ReactGridLayout>
      </div>
    </div>
  );
}