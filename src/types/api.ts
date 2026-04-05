export interface HealthResponse {
  status: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
}

export interface TimeSeriesPoint {
  timestamp: string;
  value: number;
}

export interface OHLCPoint {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
