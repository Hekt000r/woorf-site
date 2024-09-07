import "./App.css";
import axios from "axios";
import { useState, useEffect} from "react";
import Logo from "./assets/woorf-logo.svg?react";
import SearchComponent from "./Components/SearchComponent";
import { Link } from "react-router-dom";
function App() {
  const [uploadsList, setUploads] = useState([]);
  const [categories, setCategories] = useState([]);

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
  useEffect(() => {
    axios.get("/api/getCategories").then(function (response) {
      setCategories(response.data);
      console.log(response.data);
    });
  }, []);


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
        <div key={index} className="flex flex-col items-center">
          {<h1 className="text-center text-6xl mt-24 mb-4">{category}</h1>}
          <div className="shadow-md rounded-xl p-4 flex justify-center w-max">
            {uploadsList.map((upload, index) =>
              upload.category.toLowerCase() === category.toLowerCase() ? (
                <>
                  <div
                    key={index}
                    className="shadow-md rounded-xl p-3 h-56 line-clamp-2 mr-6 ml-6 w-36  flex flex-col justify-center items-center"
                  >
                    <img
                      className="mx-auto my-auto h-20 max-w-full"
                      src={upload.photoURL}
                      alt=""
                    />
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
                        to={`http://localhost:5172/downloadpage/${upload._id}`}
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
