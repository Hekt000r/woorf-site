import React from "react";
import "../App.css"
import AltSearchComponent from "./AltSearchComponent";
function Altsearch() {
  return (
    <>
      <h1 className="text-center text-6xl mt-12 mb-4">Alternative Search</h1>

      <div className="w-[600px] shadow-md center rounded-xl p-8 mb-12">
        {" "}
        <p className="text-center  text-xl">
          Enter the name of a paid software eg. Photoshop and search will return
          a free alternative.
        </p>
      </div>
      <AltSearchComponent/>
      
    </>
  );
}

export default Altsearch;
