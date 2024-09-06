import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaLinux, FaWindows, FaApple } from "react-icons/fa";
import DownloadPageContent from "./DownloadPageContent";
import { useParams } from "react-router-dom";
import { GrSystem } from "react-icons/gr";
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
      .get(`/api/document/${fullId}`)
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
            <div className="breadcrumbs text-sm shadow-md rounded-lg p-2 max-w-96 mb-12 flex justify-center">
              <ul>
                <li>
                  <a>Programs</a>
                </li>
                <li>
                  <a>{program.category}</a>
                </li>
                <li>{program.title}</li>
              </ul>
            </div>
            <div className="flex">
              <img
                className=" h-32 shadow-md rounded-3xl mr-6"
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

                <div>
                  <p className="w-[600px]">{program.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {program.downloadLinks.map((download, index) => (
          <div className="btn mt-6 hover:bg-gray-200 flex-row ml-12 items-center rounded-lg shadow-md w-[34rem]">
            <a
              className="text-gray-400 text-xl"
              href={program.downloadLinks[index].downloadURL}
            >
              Download • {program.downloadLinks[index].Platform} •{" "}
              {program.downloadLinks[index].Host}{" "}
              {program.downloadLinks[index].Size}
            </a>

            {program.downloadLinks[index].Platform.toLowerCase() === "windows" ? (
              <FaWindows className="w-8 h-8 ml-2" />
            ) : program.downloadLinks[index].Platform.toLowerCase() === "linux" ? (
              <FaLinux className="w-8 h-8 ml-2" />
            ) : program.downloadLinks[index].Platform.toLowerCase() ===
              "macos" ? (
              <FaApple className="w-8 h-8 ml-2" />
            ) : (
              <GrSystem className="w-8 h-8 ml-2" />
            )}

          </div>
        ))}

        <div className="flex justify-center mt-12 pl-4 mr-[7rem]">
          <a href="/help/1" className="btn btn-primary">
            i don't know which download to choose
          </a>
        </div>

        <div className="mt-8 ml-8">
          <h1 className="text-xl font-bold">Rate this program:</h1>
          <div>
            <div className="rating mt-2">
              <input
                type="radio"
                name="rating-4"
                className="mask mask-star-2 bg-green-500"
              />
              <input
                type="radio"
                name="rating-4"
                className="mask mask-star-2 bg-green-500"
                defaultChecked
              />
              <input
                type="radio"
                name="rating-4"
                className="mask mask-star-2 bg-green-500"
              />
              <input
                type="radio"
                name="rating-4"
                className="mask mask-star-2 bg-green-500"
              />
              <input
                type="radio"
                name="rating-4"
                className="mask mask-star-2 bg-green-500"
              />
            </div>
          </div>
          <input
            type="button"
            value="Submit"
            className="btn btn-xs btn-primary"
          />
        </div>
      </div>
    </>
  );
}

export default DownloadPage;
