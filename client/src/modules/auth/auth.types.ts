import { z } from "zod";

export const AuthDto = z.object({
  email: z.string().email({ message: "Введите корректный email" }),
  password: z
    .string()
    .min(6, "Минимум 6 символов")
    .max(20, "Не больше 20 символов"),
});
export type TAuthDto = z.infer<typeof AuthDto>;

export const UserDto = z.object({
  id: z.number(),
  email: z.string().email(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type TUserDto = z.infer<typeof UserDto>;
