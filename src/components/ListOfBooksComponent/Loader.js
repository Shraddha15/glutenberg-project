import React from "react";
import "./inlinestyles.scss";

export default function Loader() {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-grow text-primary custom-color" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-primary custom-color" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-primary custom-color" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
