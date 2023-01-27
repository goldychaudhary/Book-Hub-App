import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-main-bg">
    <div className="footer">
      <button className="footer-btn" type="button">
        <FaGoogle className="footer-icons" />
      </button>
      <button className="footer-btn" type="button">
        <FaTwitter className="footer-icons" />
      </button>
      <button className="footer-btn" type="button">
        <FaInstagram className="footer-icons" />
      </button>
      <button className="footer-btn" type="button">
        <FaYoutube className="footer-icons" />
      </button>
    </div>

    <p className="footer contact">Contact Us</p>
  </div>
)

export default Footer
