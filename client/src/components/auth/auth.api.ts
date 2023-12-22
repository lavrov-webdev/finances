import { appAxios } from "@/config";
import { TUserDto, TAuthDto } from ".";

export const getUserInformation = async () => {
  const { data } = await appAxios.get<TUserDto>("/users/me");
  return data;
};
export const signUp = async (credentials: TAuthDto) => {
  await appAxios.post("/auth/create", credentials);
  return getUserInformation();
};

export const signIn = async (credentials: TAuthDto) => {
  await appAxios.post("/auth/login", credentials);
  return getUserInformation();
};

export const logout = async () => {
  return appAxios.post("/auth/logout");
};
