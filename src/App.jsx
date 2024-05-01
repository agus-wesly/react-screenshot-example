import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import ImagePreview from "./ImagePreview";

function App() {
  const [isScreenshoting, setIsScreenshoting] = useState(false);
  const [urlList, setUrlList] = useState([]);

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
        <button
          disabled={isScreenshoting}
          onClick={async () => {
            setIsScreenshoting(true);
          }}
        >
          SS
        </button>
        {isScreenshoting ? (
          <ImagePreview
            onEnd={(newImageURL) => {
              setIsScreenshoting(false);
              setUrlList((prev) => [...prev, newImageURL]);
            }}
          />
        ) : null}
      </div>

      <p>List</p>

      <ol>
        {urlList.map((itm, idx) => (
          <li key={idx}>
            <p>Image 1</p>
            <img
              style={{
                width: itm.width,
                height: itm.height,
                objectFit: "cover",
              }}
              src={itm.url}
            />
          </li>
        ))}
      </ol>
    </>
  );
}

export default App;
