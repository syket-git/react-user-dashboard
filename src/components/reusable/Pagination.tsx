import { HStack, Stack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination";

const Pagination = ({
  currentPage = 1,
  setPage,
  total = 1,
  limit = 10,
}: {
  currentPage: number;
  total: number;
  limit: number;
  setPage: (page: number) => void;
}) => {
  return (
    <Stack mt="5" justify="center" align="end">
      <PaginationRoot
        page={currentPage}
        count={total}
        pageSize={limit}
        defaultPage={1}
        onPageChange={(e) => setPage(e.page)}
      >
        <HStack>
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
    </Stack>
  );
};
export default Pagination;
