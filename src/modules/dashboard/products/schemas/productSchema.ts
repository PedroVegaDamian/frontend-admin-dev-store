import { z } from "zod";

const CATEGORY_ENUM = ["hombre", "cojines", "mousepad"] as const;

export const ProductSchema = z.object({
  name: z.string().min(3, "Al menos 3 caracteres"),
  image: z.string().url("Ingrese una URL valida"),
  category: z.enum(CATEGORY_ENUM),
  price: z.number().min(0.01, "El precio debe ser mayor a 0"),
  stock: z.number().min(1, "El stock debe ser mayor a 0"),
});
