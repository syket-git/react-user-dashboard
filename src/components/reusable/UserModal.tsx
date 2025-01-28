import {
  Box,
  Button,
  createListCollection,
  DialogBackdrop,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";

import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "../../components/ui/dialog";

import React, { useEffect, useState } from "react";
import { Field } from "../../components/ui/field";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../components/ui/select";

export interface UserBody {
  name: string;
  email: string;
  gender: string;
  status: string;
}

interface UserFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: UserBody) => void;
  isEditMode?: boolean;
  initialValues?: UserBody;
  loading: boolean;
}

const UserFormDialog: React.FC<UserFormDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isEditMode = false,
  initialValues,
  loading,
}) => {
  const [formData, setFormData] = useState<UserBody>({
    name: "",
    email: "",
    gender: "male",
    status: "active",
  });

  useEffect(() => {
    if (isEditMode && initialValues) {
      setFormData(initialValues);
    }
  }, [isEditMode, initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenderChange = (value: string) => {
    setFormData({ ...formData, gender: value });
  };

  const handleStatusChange = (value: string) => {
    setFormData({ ...formData, status: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const gender = createListCollection({
    items: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
    ],
  });

  const status = createListCollection({
    items: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  });

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} size="lg">
      <DialogBackdrop zIndex={100} />
      <DialogContent>
        <DialogHeader>
          {isEditMode ? "Update User" : "Create User"}
        </DialogHeader>

        <DialogBody>
          <Box as="form" onSubmit={handleSubmit}>
            <VStack gap={4}>
              <Field label="Name">
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                />
              </Field>

              <Field label="Email">
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter email"
                />
              </Field>

              <SelectRoot
                value={[formData.gender]}
                onValueChange={(e) => handleGenderChange(e.value[0])}
                collection={gender}
                size="sm"
              >
                <SelectLabel>Gender</SelectLabel>
                <SelectTrigger>
                  <SelectValueText placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent style={{ zIndex: 9999 }}>
                  {gender.items.map((g) => (
                    <SelectItem item={g} key={g.value}>
                      {g.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>

              <SelectRoot
                value={[formData.status]}
                onValueChange={(e) => handleStatusChange(e.value[0])}
                collection={status}
                size="sm"
              >
                <SelectLabel>Status</SelectLabel>
                <SelectTrigger>
                  <SelectValueText placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent style={{ zIndex: 9999 }}>
                  {status.items.map((item) => (
                    <SelectItem item={item} key={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </VStack>
          </Box>
        </DialogBody>

        <DialogFooter>
          <HStack width="100%" justifyContent="flex-end">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={loading}
              type="submit"
              colorScheme="blue"
              onClick={handleSubmit}
            >
              {isEditMode ? "Update User" : "Create User"}
            </Button>
          </HStack>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default UserFormDialog;
