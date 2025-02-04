"use client";
import { useState } from "react";
import { foods, type FoodTag } from "../food";
import { Tag } from "@/components/tag";
import { useSearchParams } from "next/navigation";
import { SearchBar } from "./search-bar";

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

  function renderFoods() {
    return filteredFoods.map((food) => (
      <li key={food.id}>
        <h2 className="text-lg font-bold pt-4">{food.name}</h2>
        <p>{food.description}</p>
        <img src={food.image} alt={food.name} className="w-80" />
        <p>
          {food.tags.map((tag) => (
            <Tag key={tag}>
              <span className="text-blue-500">{tag}</span>
            </Tag>
          ))}
        </p>
      </li>
    ));
  }

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

      <ul>{renderFoods()}</ul>
    </>
  );
}
