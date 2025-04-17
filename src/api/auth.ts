import axios from "axios";
import { AuthResponse } from "../types";

const API_URL =
  "https://assettone-rental-management-production.up.railway.app/super/api/v1";

export const login = async (
  username: string,
  password: string,
): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/login/`, {
    username,
    password,
  });
  return response.data;
};

export const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

