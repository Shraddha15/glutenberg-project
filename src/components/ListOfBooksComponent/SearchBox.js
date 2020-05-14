import React from "react";
import "./inlinestyles.scss";
import { ReactComponent as BackIcon } from "../../assets/images/utility/Back.svg";
import { ReactComponent as SearchIcon } from "../../assets/images/utility/Search.svg";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory
} from "react-router-dom";

/*
 * get genre
 */
function getGenre(genre) {
  return genre.replace(/^./, genre[0].toUpperCase()); //Capitalize first Letter
}
export default function SearchBox(props) {
  return (
    <div className="search-section">
      <div className="container mt-3 mt-md-5 pt-md-5">
        <div className="row">
          <div className="col-12 col-md-10 mx-auto header mb-4">
            <div className="d-flex justify-content-start align-items-center mb-3">
              <Link to="/">
                <BackIcon />
              </Link>
              <h2 className="ml-2 mb-0">{getGenre(props.genre)}</h2>
            </div>
            <SearchIcon className="search-icon" />
            <input
              type="search"
              className="input-box"
              placeholder="Search"
              onChange={props.onChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
