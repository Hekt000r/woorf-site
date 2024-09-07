import React from "react";
import Logo from "../assets/woorf-logo.svg?react";

function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-md ">
      <div className="flex-1">
        <a href="/"><Logo className="btn btn-ghost text-xl w-32" /></a>
      </div>
      <div className="flex-1 mr-12">
        <h1 className="mr-12 btn btn-ghost text-xl"><a href="/altsearch">Alternative Finder</a></h1>
        <h1 className="mr-12 btn btn-ghost text-xl"><a href="#altsearch">Software</a></h1>
        <h1 className="mr-12 btn btn-ghost text-xl"><a href="/gamefinder">Game Finder</a></h1>
        <h1 className="mr-12 btn btn-ghost text-xl"><a href="/about">About</a></h1>
      </div>
      <div className="a gap-2">
        
      </div>
    </div>
  );
}

export default Navbar;
