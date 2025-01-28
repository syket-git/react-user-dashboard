import {
  Badge,
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { ColorModeButton } from "../../components/ui/color-mode";
import useUserDetails from "../../hooks/useUserDetails";
import AlertDialog from "../reusable/DeleteConfirmation";
import UserFormDialog from "../reusable/UserModal";

const UserDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    user,
    error,
    isOpen,
    loading,
    setIsOpen,
    handleBack,
    handleConfirm,
    handleUpdate,
    confirmationDialog,
    setConfirmationDialog,
    updateLoading,
  } = useUserDetails(Number(id));

  return (
    <>
      <Container p="5">
        <HStack justify="space-between" align="center" py="5">
          <IconButton
            size="sm"
            onClick={handleBack}
            aria-label="Search database"
          >
            <FaArrowLeft />
          </IconButton>
          <ColorModeButton />
        </HStack>

        {loading ? (
          <Box textAlign="center" py="20">
            <Spinner size="xl" />
          </Box>
        ) : error ? (
          <Box p="5" shadow="md" borderWidth="1px" borderRadius="md" mt="5">
            <Text textAlign="center" color="red.500">
              {error || "An error occurred while fetching data"}
            </Text>
          </Box>
        ) : user ? (
          <Box
            p="5"
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            mt="5"
            bg="gray.50"
            _dark={{ bg: "gray.800" }}
          >
            <Flex justifyContent="space-between" align="center">
              <Heading size="lg" mb="4">
                {user.name} <Badge>{user.gender}</Badge>
              </Heading>

              <Box display="flex" gap="2">
                <IconButton
                  onClick={() => setIsOpen(true)}
                  size="sm"
                  aria-label="Search database"
                >
                  <MdEdit />
                </IconButton>
                <IconButton
                  onClick={() => setConfirmationDialog(true)}
                  size="sm"
                  aria-label="Search database"
                >
                  <RiDeleteBin6Line />
                </IconButton>
              </Box>
            </Flex>

            <Text>
              <strong>Email:</strong> {user.email || "N/A"}
            </Text>
            <Text>
              <strong>Status:</strong> <Badge>{user.status || "Unknown"}</Badge>
            </Text>
            <Text mt="4">
              <strong>ID:</strong> {user.id}
            </Text>
          </Box>
        ) : (
          <Box p="5" shadow="md" borderWidth="1px" borderRadius="md" mt="5">
            <Text textAlign="center" color="gray.500">
              No user details available
            </Text>
          </Box>
        )}
      </Container>

      <UserFormDialog
        onSubmit={handleUpdate}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isEditMode
        initialValues={user || undefined}
        loading={updateLoading}
      />
      <AlertDialog
        isOpen={confirmationDialog}
        onClose={() => setConfirmationDialog(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default UserDetailsPage;
