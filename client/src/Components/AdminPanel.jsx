import axios from "axios";
import React, { useState } from "react";

function AdminPanel() {
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);

  // Data for creating new download links
  const [appName, setAppName] = useState("");
  const [platform, setPlatform] = useState("");
  const [host, setHost] = useState("");
  const [size, setSize] = useState("");
  const [downloadURL, setDownloadURL] = useState("");
  const [debugData, setDebugData] = useState([]);
  const authenticate = async (psswrd) => {
    const response = await axios.get(
      `http://localhost:5172/login?password=${psswrd}`
    );
    if (response.status == 200) {
      setAuth(true);
    }
  };
  return (
    <div>
      {auth ? (
        <>
          {" "}
          <h1>Admin Panel</h1>
          <h1>add download links</h1>
          <h1 className="text-xl">
            Program name:
            <input
              onChange={(e) => {
                setAppName(e.target.value);
              }}
              type="text"
              className="input input-bordered w-full max-w-xs"
            />{" "}
          </h1>
          <h1 className="text-xl">
            Platform:
            <input
              type="text"
              onChange={(e) => {
                setPlatform(e.target.value);
              }}
              className="input input-bordered w-full max-w-xs"
            />{" "}
          </h1>
          <h1 className="text-xl">
            Host:
            <input
              type="text"
              onChange={(e) => {
                setHost(e.target.value);
              }}
              className="input input-bordered w-full max-w-xs"
            />
          </h1>
          <h1 className="text-xl">
            Size:
            <input
              type="text"
              onChange={(e) => {
                setSize(e.target.value);
              }}
              className="input input-bordered w-full max-w-xs"
            />
          </h1>
          <h1 className="text-xl">
            downloadURL:{" "}
            <input
              type="text"
              onChange={(e) => {
                setDownloadURL(e.target.value);
              }}
              className="input input-bordered w-full max-w-xs"
            />
          </h1>
          <button
            onClick={(e) => {
              setDebugData([appName, host, downloadURL, size, platform ]);
              console.log(debugData)
            }}
            className="btn btn-primary"
          >
            Create
          </button>
        </>
      ) : (
        <>
          {" "}
          <p>
            In order to access the admin panel, you must first authenticate
            using the password.
          </p>
          <input
            type="text"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter password"
            className="input input-bordered w-full max-w-xs"
          />
          <button
            type="submit"
            onClick={() => {
              authenticate(password);
            }}
            className="btn btn-primary"
          >
            Button
          </button>
        </>
      )}
    </div>
  );
}

export default AdminPanel;
