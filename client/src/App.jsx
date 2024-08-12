import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

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
      `http://localhost:5172/search?term=${searchTerm}`
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
      <h1 className="text-green-600 font-semibold">test123</h1>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={performSearch}>Search</button>
        <div>
          {results.map((result, index) => (
            <div key={index}>
              {" "}
              {/* Using index as key; consider using unique IDs if available */}
              <h3>{result.title || "Title not found"}</h3>{" "}
              {/* Adding fallback for missing titles */}
            </div>
          ))}
        </div>
      </div>
      <h1 className="a text-7xl text-center">results.</h1>
      <div className="flex justify-center items-center  px-4 py-6">
        {" "}
        {/* Centering and spacing */}
        <div className="flex shadow-2xl rounded-3xl w-[80%] max-w-7xl mx-auto flex-wrap justify-center gap-4">
          {" "}
          {/* Container for items */}
          {uploadsList.map((item, index) => (
            <div
              className="flex flex-row items-start space-y-2 w-full md:w-1/3 lg:w-1/4 xl:w-1/5 rounded-lg bg-white p-4 m-4"
              key={index}
            >
              {" "}
              {/* Item container */}
              <img
                className="w-16 object-cover mr-4"
                src={item.photoURL}
                alt=""
              />{" "}
              {/* Image */}
              <div>
                <h2 className="upload-title text-left">{item.title}</h2>{" "}
                {/* Title */}
                <ul>
                  {item.tags.map((tag, tagIndex) => (
                    <li className="upload-tags" key={tagIndex}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
