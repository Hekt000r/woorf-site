import "./App.css";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import Logo from "./assets/woorf-logo.svg?react";
import SearchComponent from "./Components/SearchComponent";
import { Link } from "react-router-dom";
function App() {
  const [uploadsList, setUploads] = useState([]);
  const [categories, setCategories] = useState([]);

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
  useEffect(() => {
    axios.get("http://localhost:5172/getCategories").then(function (response) {
      setCategories(response.data);
    });
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const filteredUploadsList = useMemo(() => {
    return uploadsList.filter(
      (upload) => upload.category.toLowerCase() === "art and design"
    );
  }, [uploadsList]);
  const performSearch = async () => {
    const response = await axios.get(
      `/api/altsearch?term=${searchTerm}`
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
        All of the best free media, games, and software, including open source
        in one place! <br />
        No ads, no wait times, fast hosts, instant downloads, high compression
        ratios, and portable versions!
        <br />
        <a href="/about" className="btn btn-primary">
          Learn more
        </a>
        <br />
        <b>*Note: The site is in development*</b>
      </div>
      <SearchComponent />
      {categories.map((category, index) => (
        <div>
          {<h1 className="text-center text-6xl mt-24 mb-4">{category}</h1>}
          <div className="shadow-md rounded-xl p-4 flex justify-center">
            {uploadsList.map((upload, index) =>
              upload.category.toLowerCase() === category.toLowerCase() ? (
                <>
                  <div
                    key={index}
                    className="shadow-md rounded-xl h-32 p-1 mr-12 w-72 flex"
                  >
                    <img className="h-20 mt-6" src={upload.photoURL} alt="" />
                    <h1 className="text-xl ml-2 mt-2">
                      {upload.title} <br />
                      <div className="rating rating-xs">
                        <input
                          type="radio"
                          name="rating-5"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                        />
                        <input
                          type="radio"
                          name="rating-5"
                          className="mask mask-star-2 bg-orange-400"
                          defaultChecked
                          disabled
                        />
                        <input
                          type="radio"
                          name="rating-5"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                        />
                        <input
                          type="radio"
                          name="rating-5"
                          className="mask mask-star-2 bg-orange-400"
                          defaultChecked
                          disabled
                        />
                        <input
                          type="radio"
                          name="rating-5"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                        />
                      </div>{" "}
                      
                      <br />
                      <Link
                        className="btn btn-xs btn-primary"
                        to={`http://localhost:5173/downloadpage/${upload._id}`}
                      >
                        See more
                      </Link>
                      
                    </h1>
                  </div>
                </>
              ) : null
            )}
          </div>
        </div>
      ))}
      <div></div>
      {console.log(categories)}
      <h1 className="mt-64">test {categories[1]}</h1>
    </>
  );
}

export default App;
