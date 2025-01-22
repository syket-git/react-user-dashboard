import { Badge, Heading, HStack, Input } from "@chakra-ui/react";
import { FC } from "react";
import { ColorModeButton } from "../../components/ui/color-mode";

interface UsersHeaderProps {
  total: number;
  searchTerm: string;
  onSearch: (value: string) => void;
}

const UsersHeader: FC<UsersHeaderProps> = ({ total, searchTerm, onSearch }) => (
  <HStack justify="space-between" align="center" py="5">
    <HStack gap={6} align="center">
      <Heading size="xl">
        Users <Badge variant="outline">{total}</Badge>
      </Heading>
      <Input
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        width="250px"
      />
    </HStack>
    <ColorModeButton />
  </HStack>
);
export default UsersHeader;
