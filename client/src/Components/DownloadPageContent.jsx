import { useEffect } from "react";
import axios from "axios";


function DownloadPageContent(id) {
    console.log(id)
    useEffect(() => {
      axios
        .get(`http://localhost:5172/document/${id}`)
        .then(function (response) {
          console.table(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);
    return (
      <div></div>
    )
  }
  
  export default DownloadPageContent