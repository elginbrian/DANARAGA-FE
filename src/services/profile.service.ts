import api from "./api";
import { IUser } from "../types";

export const getUserProfile = async (): Promise<IUser> => {
  const response = await api.get<{ user: IUser }>("/users/profile");
  return response.data.user;
};

export const updateUserProfile = async (profileData: Partial<IUser>): Promise<IUser> => {
  const response = await api.patch<{ user: IUser }>("/users/profile", profileData);
  return response.data.user;
};
