import { PaginationMeta, UsersState } from "../interfaces/user";
import { getUsers } from "../services/user";

import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";

const initialPaginationMeta: PaginationMeta = {
  total: 0,
  pages: 0,
  page: 1,
  limit: 10,
};

export const useUsers = () => {
  const initialState: UsersState = {
    data: [],
    loading: false,
    error: null,
    paginationMeta: initialPaginationMeta,
    searchTerm: "",
  };

  const [state, setState] = useState<UsersState>(initialState);
  const [pageIndex, setPageIndex] = useState(1);

  const debouncedFetch = useMemo(
    () =>
      debounce(async (searchValue: string, page: number) => {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        try {
          const response = await getUsers(page, searchValue);

          setState((prev) => ({
            ...prev,
            data: response.data.data,
            paginationMeta:
              response.data?.meta?.pagination || initialPaginationMeta,
            loading: false,
          }));
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to fetch users";

          setState((prev) => ({
            ...prev,
            error: errorMessage,
            data: [],
            paginationMeta: initialPaginationMeta,
            loading: false,
          }));
        }
      }, 300),
    []
  );

  useEffect(() => {
    debouncedFetch(state.searchTerm, pageIndex);

    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch, state.searchTerm, pageIndex]);

  const handleSearch = useCallback((value: string) => {
    setState((prev) => ({ ...prev, searchTerm: value }));
    setPageIndex(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setPageIndex(page);
  }, []);

  return {
    ...state,
    handleSearch,
    handlePageChange,
    currentPage: pageIndex,
  };
};
