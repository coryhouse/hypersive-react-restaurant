import { z } from "zod";

export const foodTags = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Drink",
  "Appetizer",
  "Spicy",
  "Vegetarian",
  "Alcoholic",
] as const;

const foodTagSchema = z.enum(foodTags);

export const foodSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
  description: z.string(),
  tags: z.array(foodTagSchema),
});

export type Food = z.infer<typeof foodSchema>;
export type FoodTag = z.infer<typeof foodTagSchema>;
