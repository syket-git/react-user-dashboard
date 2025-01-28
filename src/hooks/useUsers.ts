import { useNavigate } from "react-router-dom";
import { toaster } from "../components/ui/toaster";
import { PaginationMeta, UserBody, UsersState } from "../interfaces/user";
import { createUser, getUsers } from "../services/user";

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
  const [isOpen, setIsOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const navigate = useNavigate();
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

  const handleUserCreate = async (user: UserBody) => {
    setCreateLoading(true);

    try {
      if (!user.name || !user.email) {
        throw new Error("Name and email are required to create a user.");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(user.email)) {
        throw new Error("Invalid email format. Please enter a valid email.");
      }

      const res = await createUser(user);

      if (res?.data?.data?.id) {
        toaster.create({
          title: "User created successfully",
          type: "success",
        });
        navigate(`/user/${res.data.data.id}`);
      } else {
        const message = `${res?.data?.data[0]?.field} ${res?.data?.data[0]?.message}`;
        throw new Error(message || "Something went wrong");
      }
    } catch (error: any) {
      console.error("Error creating user:", error);

      toaster.create({
        title: "Failed to create user",
        type: "error",
        description:
          error?.message || "An unknown error occurred. Please try again.",
      });
    } finally {
      setCreateLoading(false);
    }
  };

  return {
    ...state,
    handleSearch,
    handlePageChange,
    currentPage: pageIndex,
    handleUserCreate,
    isOpen,
    setIsOpen,
    createLoading,
  };
};
