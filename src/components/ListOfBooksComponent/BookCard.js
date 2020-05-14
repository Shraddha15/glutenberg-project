import React, { PureComponent } from "react";
import Truncate from "react-truncate";
import "./inlinestyles.scss";
import "fs";
import JSZip from "jszip";
import http from "http";

export default class BookCard extends PureComponent {
  /*
   * Open viewable format of the book
   */
  openBook = item => {
    let viewWableUrl = "";
    if (!item.formats) return viewWableUrl;
    if (item.formats["text/html; charset=utf-8"]) {
      viewWableUrl = item.formats["text/html; charset=utf-8"];
    } else if (item.formats["application/pdf"]) {
      viewWableUrl = item.formats["application/pdf"];
    } else if (item.formats["text/plain; charset=utf-8"]) {
      viewWableUrl = item.formats["text/plain; charset=utf-8"];
    } else {
      alert("No viewable format available");
      return;
    }
    if (this.checkIfZip(viewWableUrl)) {
      this.showZipFile(viewWableUrl);
    } else {
      window.open(viewWableUrl, "_blank");
    }
  };

  /*
   * check if it is a zip file
   */
  checkIfZip = url => {
    return url.substring(url.length - 4, url.length) === ".zip";
  };
  /*
   * get file path from url
   */
  getFilePath = url => {
    let array = url.split("/");
    let filePath = "";
    for (let j = 0; j < array.length; j++) {
      if (j !== 0 && array[j - 1] === "files") {
        filePath = array[j];
        return `${filePath}-h/${filePath}-h.htm`;
      }
    }
  };
  /*
   * get zip file content and show it
   */
  showZipFile = zipUrl => {
    let url = zipUrl.replace("http", "https");
    let filePath = this.getFilePath(url);
    let req = http.get(url, function(res) {
      if (res.statusCode !== 200) {
        console.log(res.statusCode);
        alert("Oops something went wrong!");
        return;
      }
      let data = [],
        dataLen = 0;
      res.on("data", function(chunk) {
        data.push(chunk);
        dataLen += chunk.length;
      });
      res.on("end", function() {
        let buf = Buffer.concat(data);
        JSZip.loadAsync(buf)
          .then(function(zip) {
            return zip.file(filePath).async("string");
          })
          .then(function(text) {
            let newWindow = window.open();
            newWindow.document.write(text);
          });
      });
    });

    req.on("error", function(err) {
      // handle error
    });
  };

  /*
   * get cover image
   */
  getCoverImage = item => {
    if (item.formats && item.formats["image/jpeg"]) {
      return item.formats["image/jpeg"];
    }
  };

  /*
   * get author name
   */
  getAuthorname = item => {
    if (!item.authors) return;
    let lisOfAuthours = [];
    for (let i = 0; i < item.authors.length; i++) {
      if (item.authors[i]) {
        let withOutComma = item.authors[i] && item.authors[i].name.split(",");
        let authorname = withOutComma.join(" ");
        lisOfAuthours.push(authorname);
      }
    }
    return lisOfAuthours.join(", ");
  };

  /*
   *
   * get title
   */
  getTitle = item => {
    if (item.title) {
      return item.title;
    } else return "No Title";
  };
  render() {
    let bookCover = this.getCoverImage(this.props.item),
      title = this.getTitle(this.props.item),
      author = this.getAuthorname(this.props.item);
    return (
      <div
        key={this.props.item.id}
        className="book-item m-1 my-3 m-md-3"
        onClick={() => this.openBook(this.props.item)}
      >
        <img className="book-cover" src={bookCover} alt="book" />
        <div className="book-title mt-2">
          <Truncate lines={1} trimWhitespace={true} ellipsis="...">
            {title}
          </Truncate>
        </div>

        <div className="book-author">
          <Truncate lines={1} trimWhitespace={true} ellipsis="...">
            {author}
          </Truncate>
        </div>
      </div>
    );
  }
}
