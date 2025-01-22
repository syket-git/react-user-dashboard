import axios from "axios";
import { ApiResponse } from "../interfaces/apiResponse";
import { User, UserBody } from "../interfaces/user";

const API_BASE_URL = "https://gorest.co.in/public-api";
// This Token is kept here for testing purpose (it should not be exposed in a real application)
const ACCESS_TOKEN =
  "3746afc0f57f16dbcde59bd73e39eefba27ae73d290122577d943573b2d3c5b8";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export const getUsers = async (page: number = 1, name: string = "") => {
  const response = await axios.get<ApiResponse<User[]>>(
    `${API_BASE_URL}/users`,
    {
      params: {
        page,
        name,
      },
    }
  );
  return response;
};

export const getUser = (id: number) => {
  return api.get(`/users/${id}`);
};

export const createUser = (userData: UserBody) => {
  return api.post("/users", userData);
};

export const updateUser = (id: number, userData: UserBody) => {
  return api.put(`/users/${id}`, userData);
};

export const deleteUser = (id: number) => {
  return api.delete(`/users/${id}`);
};
