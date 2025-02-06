"use client";
import { useEffect, useState } from "react";
import { foodSchema, type FoodTag, type Food as FoodType } from "../food";
import { useSearchParams } from "next/navigation";
import { SearchBar } from "./search-bar";
import { Food } from "./food";
import { Spinner } from "@/components/spinner";

export default function Admin() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function deleteFood(id: number) {
    setFoods((foods) => foods.filter((food) => food.id !== id));
  }

  // Run some code after render
  useEffect(() => {
    async function getFoods() {
      try {
        const resp = await fetch("http://localhost:3001/foods");
        if (!resp.ok) {
          throw new Error("Failed to fetch foods");
        }
        const data = await resp.json();
        const parsedFoods = foodSchema.array().parse(data); // Validate data
        setFoods(parsedFoods);
      } finally {
        setIsLoading(false);
      }
    }
    getFoods();
  }, []);

  // TODO: Use Zod to validate
  const filteredTag = searchParams.get("tag");

  // Derived state
  const filteredFoods = foods.filter(
    (food) =>
      food.name.toLowerCase().includes(search.toLowerCase()) &&
      (!filteredTag || food.tags.includes(filteredTag as FoodTag))
  );

  return (
    <>
      <h1 className="text-2xl font-bold">Admin</h1>

      <SearchBar
        filteredTag={filteredTag}
        search={search}
        setSearch={setSearch}
      />

      {filteredFoods.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <p>{filteredFoods.length} results found.</p>
      )}

      {isLoading && <Spinner />}

      <div className="flex flex-wrap">
        {filteredFoods.map((food) => (
          <Food key={food.id} food={food} deleteFood={deleteFood} />
        ))}
      </div>
    </>
  );
}
