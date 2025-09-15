import { Layout } from './layout';

export interface ChartConfig {
  type: 'bar' | 'pie';
  options: {
    responsive: boolean;
    plugins: {
      legend: {
        position: 'top' | 'bottom' | 'left' | 'right';
      };
      title: {
        display: boolean;
        text: string;
      };
    };
  };
  // @ts-expect-error This is a necessary hack due to ChartData type
  data
}

export interface DashboardState {
  id: string;
  name: string;
  layout: Layout[];
  charts: {
    [key: string]: ChartConfig;
  };
  lastModified: string;
}

export interface SavedDashboard extends DashboardState {
  createdAt: string;
}