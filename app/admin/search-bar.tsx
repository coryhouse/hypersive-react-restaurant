import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { foodTags } from "../food";

type Props = {
  filteredTag: string | null;
  search: string;
  setSearch: (search: string) => void;
};

export function SearchBar(props: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      <label className="block" htmlFor="tag">
        Filter by Tag
      </label>
      <select
        id="tag"
        onChange={(event) => {
          router.push(
            pathname + "?" + createQueryString("tag", event.target.value)
          );
        }}
        value={props.filteredTag || ""}
      >
        <option value="">All</option>
        {foodTags.map((tag) => (
          <option value={tag} key={tag}>
            {tag}
          </option>
        ))}
      </select>

      <label className="block mt-4" htmlFor="search">
        Search
      </label>

      <input
        type="text"
        className="border"
        id="search"
        onChange={(event) => props.setSearch(event.target.value)}
        value={props.search}
      />
    </>
  );
}
