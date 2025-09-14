import { DashboardState, SavedDashboard } from '@/types/dashboard';

const DASHBOARD_STORAGE_KEY = 'dashboards';

export class DashboardService {
  static saveDashboard(dashboard: DashboardState): void {
    try {
      const dashboards = this.getAllDashboards();
      const existingIndex = dashboards.findIndex(d => d.id === dashboard.id);
      
      const savedDashboard: SavedDashboard = {
        ...dashboard,
        lastModified: new Date().toISOString(),
        createdAt: existingIndex >= 0 
          ? dashboards[existingIndex].createdAt 
          : new Date().toISOString()
      };

      if (existingIndex >= 0) {
        dashboards[existingIndex] = savedDashboard;
      } else {
        dashboards.push(savedDashboard);
      }

      localStorage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify(dashboards));
    } catch (error) {
      console.error('Error saving dashboard:', error);
      throw new Error('Failed to save dashboard');
    }
  }

  static getDashboard(id: string): SavedDashboard | null {
    try {
      const dashboards = this.getAllDashboards();
      return dashboards.find(d => d.id === id) || null;
    } catch (error) {
      console.error('Error getting dashboard:', error);
      return null;
    }
  }

  static getAllDashboards(): SavedDashboard[] {
    try {
      const dashboardsJson = localStorage.getItem(DASHBOARD_STORAGE_KEY);
      return dashboardsJson ? JSON.parse(dashboardsJson) : [];
    } catch (error) {
      console.error('Error getting all dashboards:', error);
      return [];
    }
  }

  static deleteDashboard(id: string): void {
    try {
      const dashboards = this.getAllDashboards();
      const filteredDashboards = dashboards.filter(d => d.id !== id);
      localStorage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify(filteredDashboards));
    } catch (error) {
      console.error('Error deleting dashboard:', error);
      throw new Error('Failed to delete dashboard');
    }
  }
}