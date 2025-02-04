"use client";
import { useState } from "react";
import { foods } from "../food";

export default function Admin() {
  const [search, setSearch] = useState("");

  function renderFoods() {
    return foods.map((food) => (
      <li key={food.id}>
        <h2 className="text-lg font-bold pt-4">{food.name}</h2>
        <p>{food.description}</p>
      </li>
    ));
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Admin</h1>

      <label className="block mt-4" htmlFor="search">
        Search
      </label>
      <input
        type="text"
        className="border"
        id="search"
        onChange={(event) => setSearch(event.target.value)}
        value={search}
      />
      <ul>{renderFoods()}</ul>
    </>
  );
}
