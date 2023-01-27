import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ReactSlick from '../ReactSlick'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  noJobs: 'NO_JOBS',
}

class Home extends Component {
  state = {topRatedBookList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  findBooks = () => {
    const {history} = this.props
    history.push('/shelf')
  }

  getTopRatedBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok) {
      const topBooks = data.books.map(each => ({
        id: each.id,
        authorName: each.author_name,
        coverPic: each.cover_pic,
        title: each.title,
      }))
      this.setState({
        topRatedBookList: topBooks,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderHomePage = () => {
    const {topRatedBookList, apiStatus} = this.state

    return (
      <>
        <h1 className="home-heading">Find Your Next Favorite Books?</h1>
        <p className="home-sub-heading">
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past, and we will give you surprisingly insightful
          recommendations.
        </p>
        <div className="main-slider-container">
          <div className="crousel-head">
            <h1 className="heading">Top Rated Books</h1>
            <button
              onClick={this.findBooks}
              className="find-books-btn"
              type="button"
            >
              Find Books
            </button>
          </div>
          {apiStatus === apiStatusConstants.loading && this.renderLoadingView()}
          {apiStatus === apiStatusConstants.failure && this.renderFailureView()}
          <ReactSlick topRatedBookList={topRatedBookList} />
        </div>
      </>
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
      <button
        type="button"
        onClick={this.getTopRatedBooks}
        className="try-again-btn"
      >
        Try Again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    return (
      <>
        <div className="home-main-bg">
          <Header />
          {this.renderHomePage()}
          {apiStatus === apiStatusConstants.initial && this.renderLoadingView()}
          <Footer />
        </div>
      </>
    )
  }
}
export default Home
