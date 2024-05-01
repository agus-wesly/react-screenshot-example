import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { domToBlob } from "modern-screenshot";

function App() {
  const [url, setUrl] = useState("");

  const onScreenshot = async () => {
    const blobResult = await domToBlob(document.querySelector("body"));
    const croppedDataURL = URL.createObjectURL(blobResult);
    setUrl(croppedDataURL);
  };

  return (
    <>
      <div id="target">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={onScreenshot}>SS</button>
      </div>

      {url ? (
        <>
          <p style={{ fontSize: " 50px" }}>Ini buktinya : </p>
          <div style={{ border: "2px solid red" }}>
            <img
              style={{
                width: "600px",
                aspectRatio: "16/9",
                objectFit: "cover",
              }}
              src={url}
            />
          </div>
        </>
      ) : null}
    </>
  );
}

export default App;
