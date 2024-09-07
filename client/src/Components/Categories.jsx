import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Categories() {
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
    axios
      .get("/api/getCategories")
      .then(function (response) {
        setCategories(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
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
    </div>
  );
}

export default Categories;
