import { Tag } from "@/components/tag";
import type { Food } from "../food";

type Props = {
  food: Food;
};

export function Food({ food }: Props) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-md max-w-80 mr-4 mb-4">
      <h2 className="text-lg font-bold pt-4">{food.name}</h2>
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
