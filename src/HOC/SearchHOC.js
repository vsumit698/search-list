import { useEffect, useState, useRef, useCallback } from "react";
import { debouncedSetQuery, filterResults } from "./utility";
import "../styles/SearchHOC.css";

export default function SearchHOC(ListCompo) {
  // eslint-disable-next-line react/prop-types
  return function SerachList({ data = [] }) {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const prevQueryRef = useRef(query);
    const lastVisitedRef = useRef(-1);

    useEffect(() => {
      filterResults(
        filteredData,
        setFilteredData,
        data,
        query,
        prevQueryRef,
        lastVisitedRef,
        setLoading,
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, data]);

    const loadNextResults = useCallback(() => {
      filterResults(
        filteredData,
        setFilteredData,
        data,
        query,
        prevQueryRef,
        lastVisitedRef,
        setLoading,
      );
    }, [query, data, filteredData]);
    const dataStatus =
      lastVisitedRef.current === data.length - 1
        ? "All results displayed"
        : "Scroll to load more...";

    return (
      <div className="search-list-container">
        <div className="input-container">
          <input
            className="input-search"
            onChange={(e) => {
              if (!loading) setLoading(true);
              debouncedSetQuery(setQuery, e.target.value);
            }}
            placeholder="Search..."
          />
          {loading ? <span>Loading ...</span> : null}
        </div>
        <b>{filteredData.length === 0 ? "No results found" : dataStatus}</b>
        {filteredData.length > 0 ? (
          <ListCompo data={filteredData} loadNextResults={loadNextResults} />
        ) : null}
      </div>
    );
  };
}
