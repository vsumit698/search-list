import debounce from "../utils/debounce";

export const debouncedSetQuery = debounce((setValue, value) => {
  setValue(value);
}, 300);

const pageSize = 10;

export const filterResults = (
  filteredData,
  setFilteredData,
  data,
  query,
  prevQueryRef,
  lastVisitedRef,
  setLoading,
) => {
  let newFilteredData;
  let startId = 0;
  let pushedCount = 0;
  if (prevQueryRef.current === query) {
    newFilteredData = [...filteredData];
    startId = lastVisitedRef.current + 1;
  } else {
    prevQueryRef.current = query;
    lastVisitedRef.current = -1;
    newFilteredData = [];
  }
  if (lastVisitedRef.current === data.length - 1) {
    setLoading(false);
    return;
  }
  for (let id = startId; data.length > id; id++) {
    if (pushedCount === pageSize) break;
    if (data[id] && data[id].search(new RegExp(query, "i")) > -1) {
      newFilteredData.push(data[id]);
      pushedCount++;
    }
    lastVisitedRef.current = id;
  }
  setLoading(false);
  console.log(newFilteredData);
  setFilteredData(newFilteredData);
};
