import { domToJpeg } from "modern-screenshot";
import { useEffect, useRef } from "react";

const createDiv = () => {
  console.log("called");
  const divElement = document.createElement("div");
  divElement.style.border = "2px dashed black";
  divElement.style.position = "absolute";
  divElement.hidden = 1;
  divElement.style.backgroundColor = "rgba(255, 255, 255, 0.5)";

  return divElement;
};

const root = document.querySelector("body");

export default function ImagePreview({ onEnd }) {
  const divRef = useRef();

  useEffect(() => {
    divRef.current = createDiv();
    const div = divRef.current;

    let x1 = 0,
      y1 = 0,
      x2 = 0,
      y2 = 0,
      x3 = 0,
      y3 = 0,
      x4 = 0,
      y4 = 0;

    function reCalc() {
      x3 = Math.min(x1, x2);
      x4 = Math.max(x1, x2);
      y3 = Math.min(y1, y2);
      y4 = Math.max(y1, y2);

      divRef.current.style.left = x3 + "px";
      divRef.current.style.top = y3 + "px";
      divRef.current.style.width = x4 - x3 + "px";
      divRef.current.style.height = y4 - y3 + "px";
    }

    function onMouseDown(e) {
      divRef.current.hidden = 0;
      x1 = e.clientX;
      y1 = e.clientY;
      reCalc();
    }

    function onMouseMove(e) {
      x2 = e.clientX;
      y2 = e.clientY;
      reCalc();
    }

    async function onMouseUp() {
      let width = div.offsetWidth + 10;
      let height = div.offsetHeight + 10;

      document.body.removeChild(div);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);

      // Process image
      const jpg = await domToJpeg(root);
      const img = new Image();

      img.src = jpg;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = width;
      canvas.height = height;

      img.onload = function () {
        ctx.drawImage(img, x3, y3, width, height, 0, 0, width, height);

        canvas.toBlob((blobResult) => {
          const croppedDataURL = URL.createObjectURL(blobResult);
          onEnd({
            url: croppedDataURL,
            width: width + 5,
            height: height + 5,
          });
        });
      };
    }

    document.body.appendChild(div);
    document.body.style.opacity = 0.65;
    document.body.style.userSelect = "none";
    document.body.style.cursor = "crosshair";

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      x1 = 0;
      y1 = 0;
      x2 = 0;
      y2 = 0;
      x3 = 0;
      y3 = 0;
      x4 = 0;
      y4 = 0;

      document.removeEventListener("mouseup", onMouseUp);

      document.body.style.opacity = 1;
      document.body.style.userSelect = "auto";
      document.body.style.cursor = "auto";
    };
  }, []);

  return null;
}
