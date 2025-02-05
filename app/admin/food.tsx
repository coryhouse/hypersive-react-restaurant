import { Tag } from "@/components/tag";
import type { Food } from "../food";
import { useState } from "react";

type Props = {
  food: Food;
  deleteFood: (id: number) => void;
};

export function Food({ food, deleteFood }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-md max-w-80 mr-4 mb-4">
      <h2 className="text-lg font-bold pt-4">{food.name}</h2>
      <button
        onClick={async () => {
          if (isDeleting) return; // Prevent double clicking
          setIsDeleting(true);
          await fetch(`http://localhost:3001/foods/${food.id}`, {
            method: "DELETE",
          });
          deleteFood(food.id);
          setIsDeleting(false);
        }}
        aria-disabled={isDeleting}
        className={
          "border p-2 rounded-lg text-white" +
          (isDeleting ? " bg-gray-500" : " bg-red-700")
        }
      >
        {isDeleting ? "Deleting" : "Delete"}
      </button>
      <p className="font-bold text-gray-600">${food.price}</p>
      <p>{food.description}</p>
      <img src={food.image} alt={food.name} className="h-60" />
      <p>
        {food.tags.map((tag) => (
          <Tag key={tag}>
            <span className="text-blue-500">{tag}</span>
          </Tag>
        ))}
      </p>
    </div>
  );
}
