import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-main-bg">
    <img
      src="https://res.cloudinary.com/goldy-ccbp-tech/image/upload/v1674843764/notfound_ijs7qq.png"
      alt="not found"
    />
    <h1 className="notf-heading">Page Not Found</h1>
    <p className="not-found-description">
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button className="go-home-btn" type="button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
