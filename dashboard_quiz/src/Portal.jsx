import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

const Portal = ({ children }) => {
  const mountElementRef = useRef(null);
  const mountElement = document.getElementById("portal-root");
  const elementDiv = document.createElement("div");

  useEffect(() => {
    if (!mountElement) {
      // console.error("Mount element with id 'portal-root' not found.");
      return;
    }
    mountElementRef.current = mountElement;
    mountElement.appendChild(elementDiv);

    return () => {
      if (mountElementRef.current && elementDiv.parentNode) {
        mountElementRef.current.removeChild(elementDiv);
      }
    };
  }, []);

  return createPortal(children, elementDiv);
};

export default Portal;
