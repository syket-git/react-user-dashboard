import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { User, UserBody } from "../interfaces/user";
import { deleteUser, getUser, updateUser } from "../services/user";

import { toaster } from "../components/ui/toaster";

const useUserDetails = (id: number) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!id || isNaN(Number(id))) {
        setError("Invalid User ID");
        setLoading(false);
        return;
      }

      try {
        if (!isUpdated) setLoading(true);

        const response = await getUser(Number(id));
        const data = response?.data?.data as User;

        if (!data) {
          throw new Error("User not found");
        }

        setUser(data);
      } catch (err: any) {
        setError(err?.message || "Failed to fetch user details");
      } finally {
        setLoading(false);
        setIsUpdated(false);
      }
    };

    fetchUserDetails();
  }, [id, isUpdated]);

  const handleBack = () => {
    navigate("/");
  };

  const handleUpdate = async (userData: UserBody) => {
    try {
      if (!userData.name || !userData.email) {
        throw new Error("Name and email are required to update a user.");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        throw new Error("Invalid email format. Please enter a valid email.");
      }

      setUpdateLoading(true);
      const res = await updateUser(Number(id), userData);

      if (res?.data?.data?.id) {
        toaster.create({
          title: "User updated successfully",
          type: "success",
        });

        setIsUpdated(true);
        setIsOpen(false);
      } else {
        const message = `${res?.data?.data[0]?.field} ${res?.data?.data[0]?.message}`;
        throw new Error(message || "Something went wrong");
      }
    } catch (err: any) {
      toaster.create({
        title: "Failed to update user",
        description: err?.message || "Unknown error occurred",
        type: "error",
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await deleteUser(Number(id));

      if (res?.data?.code === 204) {
        toaster.create({
          title: "User deleted successfully",
          type: "success",
        });

        navigate("/");
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (err: any) {
      toaster.create({
        title: "Failed to delete user",
        description: err?.message || "Unknown error occurred",
        type: "error",
      });
    }
  };

  const handleConfirm = () => {
    handleDelete();
    setConfirmationDialog(false);
  };

  return {
    isOpen,
    setIsOpen,
    confirmationDialog,
    setConfirmationDialog,
    user,
    loading,
    error,
    handleBack,
    handleConfirm,
    handleUpdate,
    updateLoading,
  };
};
export default useUserDetails;
