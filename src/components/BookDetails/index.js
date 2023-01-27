import {Component} from 'react'
import {BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  noJobs: 'NO_JOBS',
}

class BookDetails extends Component {
  state = {bookDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      //   console.log('data', data)
      const updatedBookDetails = {
        aboutAuthor: data.book_details.about_author,
        aboutBook: data.book_details.about_book,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        id: data.book_details.id,
        title: data.book_details.title,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
      }

      this.setState({
        bookDetails: updatedBookDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

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
        onClick={this.getBookDetails}
        className="try-again-btn"
      >
        Try Again
      </button>
    </div>
  )

  renderBookDetailCard = () => {
    const {bookDetails} = this.state
    // console.log(bookDetails)
    return (
      <div className="bookDetail-main-card">
        <div className="book-item">
          <img
            className="card-pic"
            src={bookDetails.coverPic}
            alt="cover pic"
          />
          <div className="book-content">
            <h1 className="card-title">{bookDetails.title}</h1>
            <p className="card-para">{bookDetails.authorName}</p>
            <div className="rating-container">
              <p className="avg-rating">
                Avg rating
                <BsFillStarFill className="star-pic" />
                {bookDetails.rating}
              </p>
            </div>
            <p className="status">
              Status: <span>{bookDetails.readStatus}</span>
            </p>
          </div>
        </div>
        <hr className="line" />
        <h1 className="details-heading">About Author</h1>
        <p className="description">{bookDetails.aboutAuthor}</p>
        <h1 className="details-heading">About Book</h1>
        <p className="description">{bookDetails.aboutBook}</p>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    return (
      <>
        <div className="main-container-details">
          <Header />
          {apiStatus === apiStatusConstants.loading && this.renderLoadingView()}
          {apiStatus === apiStatusConstants.failure && this.renderFailureView()}
          {apiStatus === apiStatusConstants.success &&
            this.renderBookDetailCard()}
          <Footer />
        </div>
      </>
    )
  }
}
export default BookDetails
