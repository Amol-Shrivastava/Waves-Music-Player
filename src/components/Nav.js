import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  return (
    <div className="nav">
      <h1 className="nav_heading">Waves</h1>
      <button
        onClick={() => setLibraryStatus(!libraryStatus)}
        className={`cancel ${libraryStatus ? "clicked" : ""}`}
      >
        <FontAwesomeIcon className="cancelBtn" icon={faMusic} />
        <span className="lib">Library</span>
      </button>
    </div>
  );
};

export default Nav;
