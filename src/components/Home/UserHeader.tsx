import { Badge, Heading, HStack, Input } from "@chakra-ui/react";
import { FC } from "react";
import { ColorModeButton } from "../../components/ui/color-mode";
import { Button } from "../ui/button";

interface UsersHeaderProps {
  total: number;
  searchTerm: string;
  onSearch: (value: string) => void;
  setIsOpen: (value: boolean) => void;
}

const UsersHeader: FC<UsersHeaderProps> = ({
  total,
  searchTerm,
  onSearch,
  setIsOpen,
}) => (
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
    <HStack>
      <Button onClick={() => setIsOpen(true)}>Add new user</Button>
      <ColorModeButton />
    </HStack>
  </HStack>
);
export default UsersHeader;
