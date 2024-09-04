import React from "react";
import "../App.css";
function About() {
  return (
    <>
      <h1 className="text-6xl text-center m-4">About WOORF</h1>
      <div className="w-[600px] shadow-md center rounded-xl p-8">
        {" "}
        <p className="text-center text-xl">
          Our goal is to make it easy and simple to download free or free and open source software,
          nowadays companies are getting more and more greedy, and with prices skyrocketing, 
          follow subscription fee's which "solve" the problem, but in reality only make it worse
          Cancellation fee's, vendor lock-in, last minute discounts, auto-renewal and many more
          tricks are part of the arsenal of digital weapons used against customers by companies(i'm looking at you Adobe.)
          But there is a solution, simply put, dont give them your money, there are free alternatives that dont just provide you with
          an alternative, but rather a truly productive workflow, you dont worry about your subscriptions, the price, the license,
          or anything among the lines of that.
        </p>
      </div>
      <h1 className="text-6xl text-center m-4">Why download from us?</h1>
      <div className="w-[600px] shadow-md center rounded-xl p-8">
        {" "}
        <p className="text-center text-xl mb-12 ">
            FOSS software can be found everywhere, but our main advantage is the user experience.
            We have absoloutely zero ads, and never will have any.
            We provide several downloads, including portable versions, so you can pick the one tailored for your needs.
            We serve our files on high speed cloud providers, mostly on Filen.
            Filen is a very sleek, simple, and modern looking design, it gives you all the info you need, and 
            all it takes is a single click to download your file, with a simple UI.

            We also provide several tools such as Alternative Search and (coming soon) Game Finder to find all the software
            that you don't know about.
        </p>
      </div>
      <h1 className="m-12"></h1>
    </>
  );
}

export default About;
