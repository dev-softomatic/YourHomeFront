import axios from 'axios'
import React, {useEffect, useState} from 'react'
import Slider from "react-slick";

// Import css files Carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import BlogCard from '../blogs/BlogCard'
import {getStr} from '../../actions/language'




function getArticles(){
    return axios.get('/api/articles')
}

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-prev slick-arrow" +
        (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
    >
      Previous
    </button>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-next slick-arrow" +
        (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      type="button"
    >
      Next
    </button>
  );

  const settings = {
    arrows: true,
    infinite: true,
    className: "center",
    leftMode: true,
    centerPadding: "60px",
    lazyLoad: true,
    swipeToSlide: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 320,
        settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 2, infinite: true }
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true }
      }
    ]
  };

const BlogRow = () => {
    const [articles, setArticles] = useState([])
    useEffect(()=> {
        getArticles().then(res => setArticles(res.data.articles))
        .catch(err => console.log(err.msg))
    }, [])

    return (
        <section id="blog-row" style={{backgroundColor: '#fff'}}>
            <div className='row justify-content-center'>
              <span className="span-title">{getStr('blogSpan')}</span>
              <h1 className="title-blogRow title-section">{getStr('latest_blog')}</h1>
            </div>
            <div className="container">

                    <Slider {...settings}>
                        {
                            articles.slice(0, 6).map(el => (
                                <div className='pl-2' key={el._id}><BlogCard blog={el}/></div>
                            ))
                        }
                    </Slider>
                    </div>
        </section>
    )
}

export default BlogRow
