import Pagination from "../../components/reusable/Pagination";

import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useUsers } from "../../hooks/useUsers";
import UsersHeader from "./UserHeader";
import { UsersTable } from "./UsersTable";

const HomePage = () => {
  const {
    data,
    loading,
    error,
    paginationMeta,
    searchTerm,
    currentPage,
    handleSearch,
    handlePageChange,
  } = useUsers();

  return (
    <>
      <UsersHeader
        total={paginationMeta?.total}
        searchTerm={searchTerm}
        onSearch={handleSearch}
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
    </>
  );
};

export default HomePage;
