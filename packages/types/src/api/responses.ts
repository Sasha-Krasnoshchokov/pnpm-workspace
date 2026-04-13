export interface IResponseSchema<Data> {
  status: any;
  message: string;
  timestamp: string;
  uptime: number;
  data?: Data;
}
