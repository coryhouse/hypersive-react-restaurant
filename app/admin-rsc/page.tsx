import { Food } from "./food";
import type { Food as FoodType } from "../food";

export default async function Page() {
  const resp = await fetch("http://localhost:3001/fods");
  if (!resp.ok) throw new Error("Failed to fetch foods");
  const foods = (await resp.json()) as FoodType[];

  return (
    <>
      <h1>Admin Page</h1>
      {foods.map((food) => (
        <Food key={food.id} food={food} />
      ))}
    </>
  );
}
