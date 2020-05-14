import React, { PureComponent } from "react";
import SearchBox from "./SearchBox";
import BookCard from "./BookCard";
import Loader from "./Loader";
import "./inlinestyles.scss";

export default class ListOfBooksComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.genre = this.props.match.params.category;
    this.timeOut = 0;
    this.searchedValue = [];
    this.apiUrl = `https://gutendex.com/books/?topic=${
      this.genre
    }&mime_type=image`;
    this.state = {
      data: [],
      next: "",
      isFetching: false
    };
  }

  componentDidMount() {
    this.getBooks();
    this.scrollListener = window.addEventListener("scroll", e => {
      this.handleScroll(e);
    });
  }

  /*
   * get list of books falling in selected category
   */
  getBooks = () => {
    this.setFetching();
    fetch(this.apiUrl)
      .then(res => res.json())
      .then(results => {
        this.setState(previousState => ({
          data: [...previousState.data, ...results.results],
          next: results.next,
          isFetching: false
        }));
      })
      .catch(err => {
        this.unSetFetching();
        alert("OOPS, Something went wrong!");
      });
  };
  /*
   * determine pageOffset and last Book offset
   * determine if pageOffset is last Book offset
   */
  handleScroll = e => {
    let lastBook = document.querySelector(".book-item:last-child"),
      lastBookOffset = lastBook
        ? lastBook.offsetTop + lastBook.clientHeight
        : 0,
      pageOffset = window.pageYOffset + window.innerHeight;
    if (pageOffset > lastBookOffset) {
      this.loadMore();
    }
  };

  /*
   *Load next page
   */
  loadMore = () => {
    if (!this.state.next) return;
    if (this.apiUrl === this.state.next) return;
    this.apiUrl = this.state.next;
    this.getBooks();
  };

  /*
   * onChange handler for search input
   */
  handleSearchBoxChange = event => {
    this.searchedValue.push(event.target.value);
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    this.timeout = setTimeout(() => {
      if (this.searchedValue.length > 0) {
        this.getSearchResults(this.searchedValue.pop());
        this.searchedValue = [];
      }
    }, 3000);
  };

  /*
   * api call to get searched books
   */
  getSearchResults = value => {
    this.setFetching();
    fetch(
      `https://gutendex.com/books/?topic=${
        this.genre
      }&search=${value}&mime_type=image`
    )
      .then(res => res.json())
      .then(results => {
        this.setState({
          data: results.results,
          next: results.next,
          isFetching: false
        });
      })
      .catch(err => {
        this.unSetFetching();
        alert("OOPS, Something went wrong!");
      });
  };

  /*
   * get single book markup
   */
  createBookMarkup = item => {
    if (!item) return;
    return <BookCard key={item.id} item={item} />;
  };

  /*
   * displays list of books
   */
  showBooks = () => {
    if (!this.state.isFetching && !this.state.data.length)
      return "No Matches Found !";
    let booksResponse = this.state.data;
    let displayBooks = booksResponse.map((value, index) => {
      return this.createBookMarkup(value);
    });
    return displayBooks;
  };

  /*
   * set isFetching flag to true
   */
  setFetching = () => {
    this.setState({
      isFetching: true
    });
  };

  /*
   * set isFetching flag to false
   */
  unSetFetching = () => {
    this.setState({
      isFetching: false
    });
  };

  render() {
    return (
      <div className="container-fluid px-0">
        <SearchBox onChange={this.handleSearchBoxChange} genre={this.genre} />
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-10 mx-auto mt-3">
              <div className="list-wrapper">{this.showBooks()}</div>
              {this.state.isFetching ? <Loader /> : <div />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
