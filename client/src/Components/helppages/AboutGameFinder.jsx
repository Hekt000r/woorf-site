import axios from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
function AboutGameFinder(mdname) {
  const [markdown, setMarkdown] = useState("");
  useEffect(() => {
    axios.get("/api/getMarkdown?name=GameFinder").then(function (response) {
      setMarkdown(response.data);
    });
  }, []);

  return (
    <div>
      <div className="">
        
        <div className="w-[600px] shadow-md center rounded-xl text-xl p-8 markdown">
          {" "}
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </div>

        <h1 className="mt-12">the end</h1>
      </div>
    </div>
  );
}

export default AboutGameFinder;
