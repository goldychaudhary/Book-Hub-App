import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class ReactSlick extends Component {
  renderSlider = () => {
    const {topRatedBookList} = this.props
    return (
      <Slider {...settings}>
        {topRatedBookList.map(item => {
          const {id, coverPic, title, authorName} = item

          return (
            <Link className="link" to={`/books/${id}`}>
              <div className="slick-item" key={id}>
                <img className="logo-image" src={coverPic} alt="company logo" />
                <h1 className="slider-book-title">{title}</h1>
                <p className="slider-book-author">{authorName}</p>
              </div>
            </Link>
          )
        })}
      </Slider>
    )
  }

  render() {
    return (
      <div className="main-container">
        <div className="slick-container">{this.renderSlider()}</div>
      </div>
    )
  }
}

export default ReactSlick
