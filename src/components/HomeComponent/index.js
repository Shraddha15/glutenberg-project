import React, { PureComponent } from "react";
import CardComponent from "../CardComponent/index";
import { ReactComponent as FictionIcon } from "../../assets/images/categories/Fiction.svg";
import { ReactComponent as Drama } from "../../assets/images/categories/Drama.svg";
import { ReactComponent as Humour } from "../../assets/images/categories/Humour.svg";
import { ReactComponent as Politics } from "../../assets/images/categories/Politics.svg";
import { ReactComponent as Philosophy } from "../../assets/images/categories/Philosophy.svg";
import { ReactComponent as History } from "../../assets/images/categories/History.svg";
import { ReactComponent as Adventure } from "../../assets/images/categories/Adventure.svg";
import { ReactComponent as Pattern } from "../../assets/images/utility/Pattern.svg";

import "./styles.scss";

// import "./styles.scss";
const CATEGORIES = [
  {
    name: "Fiction",
    value: "fiction",
    icon: <FictionIcon width="25px" height="25px" />
  },
  { name: "Drama", value: "drama", icon: <Drama width="25px" height="25px" /> },
  {
    name: "Humour",
    value: "humour",
    icon: <Humour width="25px" height="25px" />
  },
  {
    name: "Politics",
    value: "politics",
    icon: <Politics width="25px" height="25px" />
  },
  {
    name: "Philosophy",
    value: "philosophy",
    icon: <Philosophy width="25px" height="25px" />
  },
  {
    name: "History",
    value: "history",
    icon: <History width="25px" height="25px" />
  },
  {
    name: "Adventure",
    value: "adventure",
    icon: <Adventure width="25px" height="25px" />
  }
];
export default class HomeComponent extends PureComponent {
  render() {
    return (
      <div className="section-home">
        <Pattern className="background-pattern w-100" />
        <div className="w-100">
          <div className="container pt-5 ">
            <div className="row pt-5">
              <div className="col-10 mx-auto">
                <h1>Gutenberg Project</h1>
                <p>
                  A social cataloging website that allows you to freely search
                  its database of books, annotations, and reviews.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="categories-section">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <CardComponent
                      genre={CATEGORIES[0].name}
                      value={CATEGORIES[0].value}
                      Icon={CATEGORIES[0].icon}
                    />
                    <CardComponent
                      genre={CATEGORIES[1].name}
                      value={CATEGORIES[1].value}
                      Icon={CATEGORIES[1].icon}
                    />
                    <CardComponent
                      genre={CATEGORIES[2].name}
                      value={CATEGORIES[2].value}
                      Icon={CATEGORIES[2].icon}
                    />
                    <CardComponent
                      genre={CATEGORIES[3].name}
                      value={CATEGORIES[3].value}
                      Icon={CATEGORIES[3].icon}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <CardComponent
                      genre={CATEGORIES[4].name}
                      value={CATEGORIES[4].value}
                      Icon={CATEGORIES[4].icon}
                    />
                    <CardComponent
                      genre={CATEGORIES[5].name}
                      value={CATEGORIES[5].value}
                      Icon={CATEGORIES[5].icon}
                    />
                    <CardComponent
                      genre={CATEGORIES[6].name}
                      value={CATEGORIES[6].value}
                      Icon={CATEGORIES[6].icon}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
