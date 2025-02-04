"use client";
import { useState } from "react";
import { foods, type FoodTag } from "../food";
import { useSearchParams } from "next/navigation";
import { SearchBar } from "./search-bar";
import { Food } from "./food";

export default function Admin() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

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

      <div className="flex flex-wrap">
        {filteredFoods.map((food) => (
          <Food key={food.id} food={food} />
        ))}
      </div>
    </>
  );
}
