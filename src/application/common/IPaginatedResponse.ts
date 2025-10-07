export interface IPageParameters {
  sortBy: string | null;
  page: number;
  pageSize: number;
  sortDescending: boolean;
  filters?: Record<string, string[]>
}

export interface IPaginatedResponse<T> {
  data: T[];
  count: number;
  parameters: IPageParameters;
}