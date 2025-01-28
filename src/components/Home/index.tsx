import Pagination from "../../components/reusable/Pagination";

import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useUsers } from "../../hooks/useUsers";
import UserFormDialog from "../reusable/UserModal";
import UsersHeader from "./UserHeader";
import { UsersTable } from "./UsersTable";

const HomePage = () => {
  const {
    data,
    error,
    isOpen,
    loading,
    setIsOpen,
    searchTerm,
    currentPage,
    handleSearch,
    createLoading,
    paginationMeta,
    handlePageChange,
    handleUserCreate,
  } = useUsers();

  return (
    <>
      <UsersHeader
        total={paginationMeta?.total}
        searchTerm={searchTerm}
        onSearch={handleSearch}
        setIsOpen={setIsOpen}
      />

      {error && (
        <Text color="red.500" mb={4}>
          {error}
        </Text>
      )}

      {loading ? (
        <Flex justify="center" align="center" minH="200px">
          <Spinner size="lg" />
        </Flex>
      ) : (
        <UsersTable data={data} />
      )}

      <Pagination
        currentPage={currentPage}
        setPage={handlePageChange}
        total={paginationMeta.total}
        limit={paginationMeta.limit}
      />

      <UserFormDialog
        onSubmit={handleUserCreate}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        loading={createLoading}
      />
    </>
  );
};

export default HomePage;
