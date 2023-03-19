import { useMemo, useState } from "react";
import debounce from "../utils/debounce";
import "../styles/SearchHOC.css";

export default function SearchHOC(ListCompo) {
  // eslint-disable-next-line react/prop-types
  return function SerachList({ data = [] }) {
    const [query, setQuery] = useState("");
    console.log(query);

    const debouncedSetQuery = useMemo(() => {
      return debounce((value) => {
        setQuery(value);
      }, 300);
    }, []);

    const filteredData = useMemo(() => {
      if (query === "") return data;
      return data.filter((item) => {
        return item.search(new RegExp(query, "i")) > -1;
      });
    }, [query, data]);

    return (
      <div className="search-list-container">
        <div className="input-container">
          <input
            className="input-search"
            onChange={(e) => {
              debouncedSetQuery(e.target.value);
            }}
            placeholder="Search..."
          />
        </div>
        <ListCompo data={filteredData} />
      </div>
    );
  };
}
