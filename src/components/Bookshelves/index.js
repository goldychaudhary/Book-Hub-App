import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsSearch, BsFillStarFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  noJobs: 'NO_JOBS',
}

class Bookshelves extends Component {
  state = {
    bookshelfName: bookshelvesList[0].value,
    searchText: '',
    bookList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {bookshelfName, searchText} = this.state
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (data.books.length === 0) {
      this.setState({apiStatus: apiStatusConstants.noJobs})
    } else if (response.ok) {
      const updatedBookList = data.books.map(each => ({
        authorName: each.author_name,
        coverPic: each.cover_pic,
        id: each.id,
        title: each.title,
        rating: each.rating,
        readStatus: each.read_status,
      }))

      this.setState({
        bookList: updatedBookList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeShelve = e => {
    this.setState({bookshelfName: e.target.value}, this.getBooks)
  }

  renderTabs = () => (
    <div className="shelveName-container">
      <h1 className="shelveName-heading">Bookshelves</h1>
      <ul className="shelveName-ul">
        {bookshelvesList.map(each => (
          <li className="shelveName-btn" key={each.id}>
            <button
              className="tab-btn"
              onClick={this.changeShelve}
              type="button"
              value={each.value}
            >
              {each.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )

  onUserSearch = e => {
    this.setState({searchText: e.target.value})
  }

  renderSearchContainer = () => {
    const {searchText, bookshelfName} = this.state

    const str1 = bookshelfName.split('_').join(' ').toLowerCase()

    return (
      <div className="booklist-head">
        <h1 className="books-main-heading">{`${str1} books`}</h1>
        <div className="search-bar">
          <input
            placeholder="Search"
            className="input-element"
            type="search"
            value={searchText}
            onChange={this.onUserSearch}
          />
          <button
            testid="searchButton"
            className="search-btn"
            onClick={this.getBooks}
            type="button"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderBookList = () => {
    const {bookList} = this.state

    return (
      <>
        <ul className="booklist-container">
          {bookList.map(each => (
            <Link
              className="link-shelve"
              to={`/books/${each.id}`}
              key={each.id}
            >
              <li className="booklist-item">
                <img
                  className="card-pic"
                  src={each.coverPic}
                  alt={each.title}
                />
                <div className="book-card-content">
                  <h1 className="card-title">{each.title}</h1>
                  <p className="card-para">{each.authorName}</p>
                  <div className="rating-container">
                    <p className="avg-rating">
                      Avg rating
                      <BsFillStarFill className="star-pic" />
                      {each.rating}
                    </p>
                  </div>
                  <p className="status">
                    Status: <span>{each.readStatus}</span>
                  </p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </>
    )
  }

  renderNoJobs = () => {
    const {searchText} = this.state
    return (
      <div className="no-jobs-bg">
        <img
          src="https://res.cloudinary.com/goldy-ccbp-tech/image/upload/v1674839586/no_booksView_pvn9ez.png"
          alt="no books"
        />
        <p className="no-jobs-para">{`Your search for ${searchText} did not find any matches.`}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-main-bg">
      <img
        className="fail-pic"
        src="https://res.cloudinary.com/goldy-ccbp-tech/image/upload/v1674836277/failure_img_bt1muy.png"
        alt="failure view"
      />
      <h1 className="fail-heading">Something went wrong. Please try again</h1>
      <button type="button" onClick={this.getBooks} className="try-again-btn">
        Try Again
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    return (
      <>
        <Header />
        <div className="main-bg">
          {this.renderTabs()}
          {this.renderSearchContainer()}
          {apiStatus === apiStatusConstants.loading && this.renderLoadingView()}
          {apiStatus === apiStatusConstants.failure && this.renderFailureView()}
          {apiStatus === apiStatusConstants.noJobs && this.renderNoJobs()}

          <div className="books-list-container">
            {apiStatus === apiStatusConstants.success && this.renderBookList()}
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default Bookshelves
