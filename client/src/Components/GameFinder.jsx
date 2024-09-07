import axios from "axios";
import React, { useState } from "react";
import Markdown from 'react-markdown'
function GameFinder() {
    const [userPrompt, setUserPrompt] = useState("");
    const [res, setRes] = useState("");
  const promptAI = async (prompt) => {
    const response = await axios.get(
        `/api/aiprompt?prompt=${prompt}`
    )
    setRes(response.data)
  };
  return (
    <div className="flex justify-center">
      <div className="shadow-md p-12 rounded-xl w-max flex flex-col items-center">
        <h1 className="text-5xl text-center mt-6 font-bold mb-2 ">
          Find games using AI
        </h1>
        <p className="text-center text-xl">
          Ask anything about games, eg. "10 Games like Forza Horizion 4"
        </p>
        <label htmlFor="">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-success w-96 mt-4"
            onChange={(e) => {
                setUserPrompt(e.target.value)
                console.log(userPrompt)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                promptAI(userPrompt)
              }
            }}
          />
          <div>
            Press <kbd className="kbd kbd-xs bg-gray-600">Enter</kbd> to prompt <a href="/About/gamefinder" className="text-blue-800">Please read before prompting</a>
          </div>
        </label>
        <div className="w-[40rem] text-xl"><h1 className=""></h1><Markdown>{res}</Markdown></div>
      </div>
    </div>
  );
}

export default GameFinder;
