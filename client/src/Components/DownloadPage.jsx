import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

// Download page is the page shown to the user when they click on a software
// TODO
// Use appid or _ID to make sure every route is unique
// Fetch fastest download link from mongodb
// Display information and multiple downloads from mongodb

import DownloadPageContent from "./DownloadPageContent";
import { useParams } from "react-router-dom";

function DownloadPage() {
  const params = useParams();
  const [program, setProgram] = useState([])
  let id = params.id; // Keep it as a string initially
  console.log(params.id);
  useEffect(() => {
    const fullId = typeof id === "string" ? id : id.toString();
    axios
      .get(`http://localhost:5172/document/${id}`)
      .then(function (response) {
        setProgram(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="mt-24">
        <h1>{program.title} {console.table(program) }</h1>
        <p>{program.description}</p>
        <img src={program.photoURL} alt={program.title} />
        <a href={program.downloadURL}>Download</a>
      </div>
    </>
  );
}

export default DownloadPage;
