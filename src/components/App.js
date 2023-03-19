import SearchHOC from "../HOC/SearchHOC";
import List from "./List";
import sampleData from "../sampleData.json";
import "../styles/App.css";

const SearchList = SearchHOC(List);

function App() {
  return (
    <div className="App">
      <SearchList data={sampleData.data} />
    </div>
  );
}

export default App;
