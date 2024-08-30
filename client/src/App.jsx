import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Logo from "./assets/woorf-logo.svg?react";
import SearchComponent from "./Components/searchComponent";
function App() {
  const [uploadsList, setUploads] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5172/getDocs")
      .then(function (response) {
        setUploads(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const performSearch = async () => {
    const response = await axios.get(
      `http://localhost:5172/altsearch?term=${searchTerm}`
    );
    // Check if response.data is an array before setting it to state
    if (Array.isArray(response.data)) {
      setResults(response.data);
      console.log(response.data);
    } else {
      console.error("Expected an array, received:", response.data);
      setResults([]); // Fallback to empty array if data is not as expected
    }
  };

  return (
    <>
      <div className="rounded-lg shadow-lg w-[50%] text-center center mb-12 mt-4">
        <h1 className="a text-5xl m-1 flex justify-center">
          <Logo></Logo>
        </h1>
        All of the best free media, games, and software, including open source in one place! <br />
        
        No ads, no wait times, fast hosts, instant downloads,
        
        high compression ratios, and portable versions!
        <br />
        <a href="" className="btn btn-primary">Learn more</a>
        <br />
        <b>*Note: The site is in development*</b>
      </div>
      <SearchComponent/>
    </>
  );
}

export default App;
