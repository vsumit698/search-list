import { useState } from "react";
import SearchHOC from "../HOC/SearchHOC";
import List from "./List";
import sampleData from "../sampleData.json";
import "../styles/App.css";

const SearchList = SearchHOC(List);
const lightTheme = "light";
const darkTheme = "dark";
function App() {
  const [theme, setTheme] = useState(lightTheme);
  return (
    <div className={theme === lightTheme ? "App light" : "App dark"}>
      <button
        type="button"
        aria-label={
          theme === lightTheme
            ? "Switch to dark theme"
            : "Switch to light theme"
        }
        onClick={() => {
          setTheme(theme === lightTheme ? darkTheme : lightTheme);
        }}
      >
        {theme === lightTheme ? "Apply Dark" : "Apply Light"}
      </button>
      <SearchList data={sampleData.data} />
    </div>
  );
}

export default App;
