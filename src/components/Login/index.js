import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onSubmitForm = async e => {
    e.preventDefault()

    const {username, password} = this.state

    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  onLoginSuccess = token => {
    const {history} = this.props
    history.replace('/')
    Cookies.set('jwt_token', token, {expires: 30})
  }

  onLoginFailure = error => {
    this.setState({errorMsg: error})
  }

  changeUsername = e => {
    this.setState({username: e.target.value})
  }

  changePassword = e => {
    this.setState({password: e.target.value})
  }

  renderLoginPage = () => {
    const {username, password, errorMsg} = this.state

    return (
      <div className="login-main-bg">
        <img
          className="login-image-lg"
          src="https://res.cloudinary.com/goldy-ccbp-tech/image/upload/v1674558960/login_mrrng1.png"
          alt="website login"
        />
        <img
          className="login-image-sm"
          src="https://res.cloudinary.com/goldy-ccbp-tech/image/upload/v1674584681/loginpage_sm_c37kaf.png"
          alt="website login"
        />

        <form className="login-form-container" onSubmit={this.onSubmitForm}>
          <div className="logo-container">
            <img
              src="https://res.cloudinary.com/goldy-ccbp-tech/image/upload/v1674582989/logo_r2en2h.svg"
              alt="login website logo"
            />
            <p className="logo-text">ooks Hub</p>
          </div>
          <div className="input-container">
            <label htmlFor="username">Username*</label>
            <br />
            <input
              onChange={this.changeUsername}
              value={username}
              className="input-bar"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password*</label>
            <br />
            <input
              onChange={this.changePassword}
              value={password}
              className="input-bar"
              id="password"
              type="text"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          <p className="error-msg">{errorMsg}</p>
        </form>
      </div>
    )
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return this.renderLoginPage()
  }
}

export default Login
