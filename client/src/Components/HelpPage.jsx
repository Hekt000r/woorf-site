import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DownloadLinks from "../assets/DownloadLinks";

function HelpPage() {
  const params = useParams()
  const [pageID, setPageID] = useState(0)
  let id = params.id
  const fullId = typeof id === "string" ? id : id.toString();
  return (
    <div>
      <h1>Help page</h1>
      {fullId && 1 ?<DownloadLinks/>: (<></>) }
    </div>
  );
}

export default HelpPage;
