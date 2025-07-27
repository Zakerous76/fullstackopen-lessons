import React, { useRef } from "react";
import Togglable from "./Togglable";

const Parent = () => {
  const togglableRef = useRef();

  return (
    <div>
      <Togglable buttonLabel="Show Form" ref={togglableRef}>
        <div>Secret Form</div>
      </Togglable>
      <button onClick={() => togglableRef.current.toggleVisibility()}>
        Toggle from Outside
      </button>
    </div>
  );
};
