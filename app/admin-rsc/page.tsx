import { FoodItem } from "@/app/admin-rsc/food-item";
import { Food } from "@/app/food";
import { Spinner } from "@/components/spinner";
import { Suspense } from "react";

async function FoodList() {
  const resp = await fetch("http://localhost:3001/foods");

  if (!resp.ok) {
    throw new Error("Failed to fetch foods");
  }

  const foods = await resp.json();

  return (
    <div className="flex flex-wrap gap-6">
      {foods.map((food: Food) => (
        <FoodItem key={food.id} food={food} />
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <>
      <h1>Admin</h1>
      <Suspense fallback={<Spinner />}>
        <FoodList />
      </Suspense>
    </>
  );
}
