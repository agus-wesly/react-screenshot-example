import { useEffect, useRef } from "react";

const divElement = document.createElement("div");
divElement.style.border = "2px dotted red";
divElement.style.position = "absolute";
divElement.hidden = 1;
document.body.appendChild(divElement);

export function useSelectArea() {
  const divRef = useRef(divElement);

  useEffect(() => {
    let x1 = 0,
      y1 = 0,
      x2 = 0,
      y2 = 0;

    function reCalc() {
      var x3 = Math.min(x1, x2);
      var x4 = Math.max(x1, x2);
      var y3 = Math.min(y1, y2);
      var y4 = Math.max(y1, y2);

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
      console.log("called");
      x2 = e.clientX;
      y2 = e.clientY;
      reCalc();
    }

    function onMouseUp() {
      divElement.hidden = 1;
    }

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return null;
}
