import { useMemo } from "react";
import { User } from "../interfaces/user";

interface Column {
  field: keyof User;
  label: string;
  align?: "start" | "end";
}

export const useTableHeader = () => {
  const columns: Column[] = useMemo(
    () => [
      { field: "id", label: "ID" },
      { field: "name", label: "Name" },
      { field: "email", label: "Email" },
      { field: "gender", label: "Gender" },
      { field: "status", label: "Status", align: "end" },
    ],
    []
  );

  return { columns };
};
