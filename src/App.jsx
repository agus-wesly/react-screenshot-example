import { useState } from "react";
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
        <img
          style={{
            width: "200px",
            height: "200px",
          }}
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVCzMXks7S3YwWm7bkucoMA2NGAH0xU5uptlN_xEznz0ZhjK6Zv-scNMyWDtNEAQ0_FqY&usqp=CAU"
          }
          className="logo"
          alt="Vite logo"
        />
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
