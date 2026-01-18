export interface HealthStatus {
  status: 'Healthy' | 'Unhealthy';
  message: string;
  uptime: number;
  error?: string;
}
