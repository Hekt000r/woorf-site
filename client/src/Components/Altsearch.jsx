import React from "react";
import "../App.css"
import AltSearchComponent from "./AltSearchComponent";
function Altsearch() {
  return (
    <>
    

      <div className="w-[600px] shadow-md center rounded-xl p-8 mb-12">

        {" "}
        <h1 className="text-center text-6xl mt-12 mb-4 font-bold">Alternative Search</h1>
        <p className="text-center  text-xl font-bold">
          Enter the name of a paid software eg. Photoshop and search will return
          a free alternative. <br />
        
        </p>
       
        <AltSearchComponent/>
      </div>
      
      
    </>
  );
}

export default Altsearch;
