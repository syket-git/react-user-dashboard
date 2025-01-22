export interface ApiResponse<T> {
  data: T;
  meta: {
    pagination: {
      total: number;
      pages: number;
      page: number;
      limit: number;
    };
  };
}
