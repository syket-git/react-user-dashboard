import {
  Badge,
  Box,
  Container,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { ColorModeButton } from "../../components/ui/color-mode";
import { User } from "../../interfaces/user";
import { getUser } from "../../services/user";

const UserDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await getUser(Number(id));

        const data = (await response.data?.data) as User;
        setUser(data);
      } catch (err: any) {
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Container p="5">
      <HStack justify="space-between" align="center" py="5">
        <IconButton size="sm" onClick={handleBack} aria-label="Search database">
          <FaArrowLeft />
        </IconButton>
        <ColorModeButton />
      </HStack>

      {loading && (
        <Box textAlign="center" py="20">
          <Spinner size="xl" />
        </Box>
      )}

      {error && (
        <Box p="5" shadow="md" borderWidth="1px" borderRadius="md" mt="5">
          <Text textAlign="center" color="red.500">
            {error || "Something went wrong while fetching data"}
          </Text>
        </Box>
      )}

      {!loading && !error && user && (
        <Box
          p="5"
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
          mt="5"
          bg="gray.50"
          _dark={{ bg: "gray.800" }}
        >
          <Heading size="lg" mb="4">
            {user.name} <Badge>{user.gender}</Badge>
          </Heading>
          <Text>
            <strong>Email:</strong> {user.email}
          </Text>
          <Text>
            <strong>Status:</strong> <Badge>{user.status}</Badge>
          </Text>
          <Text mt="4">
            <strong>ID:</strong> {user.id}
          </Text>
        </Box>
      )}
    </Container>
  );
};

export default UserDetailsPage;
