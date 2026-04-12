import { RESPONSE_STATUSES } from '@repo/utils';

export type TResponseStatus = keyof typeof RESPONSE_STATUSES;

export interface IResponseSchema<Data> {
  status: TResponseStatus;
  message: string;
  timestamp: string;
  uptime: number;
  data?: Data;
}
