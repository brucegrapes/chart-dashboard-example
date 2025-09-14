// Types for our chart data
export interface BarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

export interface PieChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

// Sample data for Bar Chart - Monthly Sales Data
export const monthlySalesData: BarChartData = {
  labels: [
    'Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024',
    'Jul 2024', 'Aug 2024', 'Sep 2024', 'Oct 2024', 'Nov 2024', 'Dec 2024',
    'Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025'
  ],
  datasets: [
    {
      label: 'Monthly Sales (in thousands $)',
      data: [
        65, 59, 80, 81, 56, 95, 88, 92, 97, 85, 110, 121,
        95, 82, 91, 88, 99, 105
      ],
      backgroundColor: Array(18).fill('rgba(54, 162, 235, 0.2)'),
      borderColor: Array(18).fill('rgba(54, 162, 235, 1)'),
      borderWidth: 1,
    },
    {
      label: 'Monthly Profit (in thousands $)',
      data: [
        32, 28, 41, 39, 26, 47, 43, 45, 48, 41, 55, 62,
        47, 40, 44, 43, 49, 52
      ],
      backgroundColor: Array(18).fill('rgba(255, 99, 132, 0.2)'),
      borderColor: Array(18).fill('rgba(255, 99, 132, 1)'),
      borderWidth: 1,
    }
  ],
};

// Sample data for Bar Chart - Product Performance
export const productPerformanceData: BarChartData = {
  labels: [
    'Smartphone X', 'Laptop Pro', 'Tablet Air', 'Smart Watch', 'Wireless Earbuds',
    'Gaming Console', 'Camera Elite', 'Smart Speaker', 'Fitness Tracker', 'VR Headset',
    'Drone Pro', 'Security Camera', 'Robot Vacuum', 'Smart TV', 'Power Bank'
  ],
  datasets: [
    {
      label: 'Units Sold (thousands)',
      data: [
        320, 150, 280, 175, 425,
        90, 110, 195, 285, 75,
        45, 130, 160, 200, 340
      ],
      backgroundColor: Array(15).fill('rgba(54, 162, 235, 0.2)'),
      borderColor: Array(15).fill('rgba(54, 162, 235, 1)'),
      borderWidth: 1,
    },
    {
      label: 'Revenue (millions $)',
      data: [
        480, 375, 336, 87.5, 127.5,
        270, 330, 97.5, 142.5, 225,
        135, 65, 240, 400, 102
      ],
      backgroundColor: Array(15).fill('rgba(255, 99, 132, 0.2)'),
      borderColor: Array(15).fill('rgba(255, 99, 132, 1)'),
      borderWidth: 1,
    },
    {
      label: 'Customer Rating (out of 5)',
      data: [
        4.5, 4.3, 4.1, 4.4, 4.7,
        4.2, 4.6, 4.0, 4.3, 4.1,
        4.4, 4.2, 4.5, 4.3, 4.6
      ],
      backgroundColor: Array(15).fill('rgba(75, 192, 192, 0.2)'),
      borderColor: Array(15).fill('rgba(75, 192, 192, 1)'),
      borderWidth: 1,
    }
  ],
};

// Sample data for Pie Chart - Market Share
export const marketShareData: PieChartData = {
  labels: [
    'Apple', 'Samsung', 'Microsoft', 'Google', 'Sony',
    'LG', 'Dell', 'HP', 'Lenovo', 'Others'
  ],
  datasets: [
    {
      data: [25.5, 21.3, 15.8, 12.4, 8.7, 5.9, 4.2, 3.1, 2.1, 1.0],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',   // Red
        'rgba(54, 162, 235, 0.2)',   // Blue
        'rgba(255, 206, 86, 0.2)',   // Yellow
        'rgba(75, 192, 192, 0.2)',   // Green
        'rgba(153, 102, 255, 0.2)',  // Purple
        'rgba(255, 159, 64, 0.2)',   // Orange
        'rgba(199, 199, 199, 0.2)',  // Gray
        'rgba(83, 102, 255, 0.2)',   // Indigo
        'rgba(255, 99, 255, 0.2)',   // Pink
        'rgba(159, 159, 159, 0.2)',  // Dark Gray
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(199, 199, 199, 1)',
        'rgba(83, 102, 255, 1)',
        'rgba(255, 99, 255, 1)',
        'rgba(159, 159, 159, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

// Sample data for Pie Chart - Revenue Distribution
export const revenueDistributionData: PieChartData = {
  labels: [
    'E-commerce', 'Retail Stores', 'Wholesale', 'B2B Sales',
    'Mobile App', 'Third-party Marketplaces', 'Direct Sales',
    'International Markets'
  ],
  datasets: [
    {
      data: [35.5, 22.3, 15.8, 10.4, 7.2, 4.5, 2.8, 1.5],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',   // Blue
        'rgba(255, 206, 86, 0.2)',   // Yellow
        'rgba(75, 192, 192, 0.2)',   // Green
        'rgba(153, 102, 255, 0.2)',  // Purple
        'rgba(255, 99, 132, 0.2)',   // Red
        'rgba(255, 159, 64, 0.2)',   // Orange
        'rgba(199, 199, 199, 0.2)',  // Gray
        'rgba(83, 102, 255, 0.2)',   // Indigo
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(199, 199, 199, 1)',
        'rgba(83, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

// Sample dashboards data
export interface Dashboard {
  id: string;
  name: string;
  createdAt: string;
  layout: {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    chartType: 'bar' | 'pie';
    dataKey: 'monthlySales' | 'productPerformance' | 'marketShare' | 'revenueDistribution';
  }[];
}

// Sample saved dashboards
export const sampleDashboards: Dashboard[] = [
  {
    id: '1',
    name: 'Sales Overview',
    createdAt: '2025-09-13',
    layout: [
      { i: 'chart1', x: 0, y: 0, w: 6, h: 4, chartType: 'bar', dataKey: 'monthlySales' },
      { i: 'chart2', x: 6, y: 0, w: 6, h: 4, chartType: 'pie', dataKey: 'revenueDistribution' }
    ]
  },
  {
    id: '2',
    name: 'Market Analysis',
    createdAt: '2025-09-13',
    layout: [
      { i: 'chart1', x: 0, y: 0, w: 6, h: 4, chartType: 'bar', dataKey: 'productPerformance' },
      { i: 'chart2', x: 6, y: 0, w: 6, h: 4, chartType: 'pie', dataKey: 'marketShare' }
    ]
  }
];