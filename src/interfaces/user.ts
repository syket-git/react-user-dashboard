export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export interface UserBody {
  name: string;
  email: string;
  gender: string;
  status: string;
}

export interface PaginationMeta {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export interface UsersState {
  data: User[];
  loading: boolean;
  error: string | null;
  paginationMeta: PaginationMeta;
  searchTerm: string;
}

export interface UseUsersReturn extends UsersState {
  handleSearch: (value: string) => void;
  handlePageChange: (page: number) => void;
}
