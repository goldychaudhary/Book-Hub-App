import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="navbar">
      <Link className="link" to="/">
        <div className="nav-logo-container">
          <img
            src="https://res.cloudinary.com/goldy-ccbp-tech/image/upload/v1674582989/logo_r2en2h.svg"
            alt="website logo"
          />
          <p className="logo-text">ooks Hub</p>
        </div>
      </Link>

      <ul className="nav-links">
        <Link className="link" to="/">
          <li>Home</li>
        </Link>
        <Link className="link" to="/shelf">
          <li>Bookshelves</li>
        </Link>
      </ul>
      <button onClick={logout} className="logout-btn-lg" type="button">
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
