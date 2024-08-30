import React from "react";
import "../App.css";
function About() {
  return (
    <>
      <h1 className="text-6xl text-center m-4">About WOORF</h1>
      <div className="w-[600px] shadow-md center rounded-xl p-8">
        {" "}
        <p className="text-center text-xl">
          WOORF's main goal is to give people an alternative from the overpriced
          software, money, data, and greed from companies including subscription
          services. Because of this, we provide truly free 
          software for users to enjoy, not just for Windows but also Linux and
          MacOS, we help promote FOSS software by being the best place to get it from.
        </p>
      </div>
      <h1 className="text-6xl text-center m-4">Why download from us?</h1>
      <div className="w-[600px] shadow-md center rounded-xl p-8">
        {" "}
        <p className="text-center text-xl mb-12 h-32">
            While free/ free and open source software usually can be found on fossHUB or other places, the difference is that
            we provide a much better user experience, we dont have any ads, no waiting for downloads, and keep the UI simple
            so you dont end up wondering which link is correct for your device.
            We also have portable versions so you can still stay on the go while using your favourite software

        </p>
      </div>
      <h1 className="m-12">the end</h1>
    </>
  );
}

export default About;
