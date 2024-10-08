import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Logo from "./assets/woorf-logo.svg?react";
import SearchComponent from "./Components/SearchComponent";
import { Link } from "react-router-dom";
import { MdOutlineArrowCircleRight } from "react-icons/md";
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
      <div className="rounded-lg shadow-lg w-[50%] text-center center mb-12 mt-4 pb-8">
        <h1 className="a text-5xl m-1 flex justify-center">
          <Logo></Logo>
        </h1>
        <h1 className="text-5xl mt-4 mb-4 font-bold">Welcome to WOORF</h1>
        <h3 className="text-2xl font-bold">
          The free and open source software hub, with absoloutely <br /> zero
          ads, lightning fast downloads, and AI powered search
        </h3>
        <div className="flex">
          <div className=" flex items-center w-64 h-16 text-xl rounded-lg justify-center">
            <MdOutlineArrowCircleRight className="w-12 h-12" />{" "}
            <a className="relative inline-block group" href="/gamefinder">
              AI game finder
              <span class="absolute bottom-0 left-0 w-0 h-1 bg-current transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
          <div className=" flex items-center w-72 h-16 text-xl rounded-lg justify-center">
            <MdOutlineArrowCircleRight className="w-12 h-12" />{" "}
            <a className="relative inline-block group" href="/altsearch">
              Alternative Finder
              <span class="absolute bottom-0 left-0 w-0 h-1 bg-current transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
          <div className=" flex items-center w-64 h-16 text-xl rounded-lg justify-center">
            <MdOutlineArrowCircleRight className="w-12 h-12" />{" "}
            <a className="relative inline-block group" href="#categories">
              Browse categories
              <span class="absolute bottom-0 left-0 w-0 h-1 bg-current transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </div>
      </div>
      <SearchComponent />
      {categories.map((category, index) => (
        <div key={index} className="flex flex-col items-center">
          {<h1 id="categories" className="text-center text-6xl mt-24 mb-4">{category}</h1>}
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
