import React, { PureComponent } from "react";
import { ReactComponent as IconBack } from "../../assets/images/utility/Next.svg";
import "./styles.scss";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory
} from "react-router-dom";

export default class CardComponent extends PureComponent {
  render() {
    return (
      <Link
        to={"/" + this.props.value}
        data-value={this.props.value}
        className="section-card my-3 d-flex align-items-center justify-content-between jCardElement"
      >
        <div>
          {this.props.Icon}
          <span className="pl-3 genre">{this.props.genre}</span>
        </div>
        <IconBack width="20px" height="20px" />
      </Link>
    );
  }
}
