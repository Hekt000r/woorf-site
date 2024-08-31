import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaLinux } from "react-icons/fa";
import DownloadPageContent from "./DownloadPageContent";
import { useParams } from "react-router-dom";

function DownloadPage() {
  const params = useParams();
  const [program, setProgram] = useState(null);
  let id = params.id; // Keep it as a string initially
  console.log(params.id);

  useEffect(() => {
    const fullId = typeof id === "string" ? id : id.toString();

    // Add a loading state
    setProgram({ loading: true });

    axios
      .get(`http://localhost:5172/document/${fullId}`)
      .then(function (response) {
        setProgram(response.data);
      })
      .catch(function (error) {
        console.error("Error fetching program:", error);
        setProgram({ error: "Failed to load program" });
      });
  }, []);

  if (program === null || program.loading || program.error) {
    return (
      <div className="mt-24 shadow-md m-12 rounded-3xl p-8">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-24 shadow-md m-12 rounded-3xl p-8">
        <div className="flex">
          <div className="flex flex-col justify-center">
            <div className="flex">
              <img
                className="w-32 h-32 shadow-md rounded-3xl mr-6"
                src={program.photoURL}
                alt={program.title}
              />
              <div className="flex flex-col justify-center">
                <h1 className="text-4xl text-gray-700">{program.title}</h1>
                <div className="rating">
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                    defaultChecked
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                    defaultChecked
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                    defaultChecked
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                    defaultChecked
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                    disabled
                  />
                </div>
                <div className="mt-2 text-gray-400 text-xl program-tags">
                  {program.tags && Array.isArray(program.tags) ? (
                    program.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-200 px-2 py-1 rounded-full mr-2"
                      >
                        #{tag}
                      </span>
                    ))
                  ) : (
                    <p>No tags available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="btn mt-6 hover:bg-gray-200  flex items-center  rounded-lg shadow-md w-[32rem] ">
          <a className="text-gray-400 text-xl" href={program.downloadURL}>
            Download • Windows • filen.io 374mb
          </a>
          <img
            className="w-8 h-8 ml-2"
            src="https://icones.pro/wp-content/uploads/2021/06/icone-windows-gris.png"
            alt="WindowsIcon"
          />
        </div>
        <div className="btn mt-6 hover:bg-gray-200  flex items-center  rounded-lg shadow-md w-[32rem] ">
          <a className="text-gray-400 text-xl" href={program.downloadURL}>
            Download • Linux • filen.io 528mb
          </a>
          <FaLinux className="w-8 h-8" />
        </div>
      </div>
    </>
  );
}

export default DownloadPage;
