import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DownloadPage from "./DownloadPage";
function AltSearchComponent() {
  const [uploadsList, setUploads] = useState([]);

  useEffect(() => {
    axios
      .get("/api/getDocs")
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
      `/api/altsearch?term=${searchTerm}`
      
    );
    // Check if response.data is an array before setting it to state
    if (Array.isArray(response.data)) {
      setResults(response.data);
      console.log(response.data);
      
    } else {
      console.error("Expected an array, received:", response.data);
      setResults([]); // Fallback to empty array if data is not as expected
      alert("Death")
    }
  };
  return (
    <>
      <div className="a text-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        
          className="input w-64  input-ghost input-bordered max-w-xs bg-white text-black"
        />
        <button className="btn btn-ghost border mb-1" onClick={performSearch}>
          Search
        </button>

        <div className="shadow-md w-80 h-auto rounded-md pb-4 center">
          {results.map((result, index) => (
            <div key={index}>
              {" "}
              {/* Using index as key; consider using unique IDs if available */}
              <div className="a inline flex p-1 m-2 shadow-sm rounded-lg">
                <img className=" h-8" src={result.photoURL} alt="" />
                <h3>
                <Link to={`/downloadpage/${result._id}`} >
              
                {result.title || "Title not found"}
                </Link>
                  
                </h3>{" "}
                {console.log(result.downloadURL)}
              </div>
              {console.log(result.photoURL)}
              {/* Adding fallback for missing titles */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AltSearchComponent;
