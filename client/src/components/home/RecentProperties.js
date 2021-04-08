import React, {useState} from 'react'
import Slider from "react-slick";

// Import css files Carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import PropertyCard from '../properties/PropertyCard'
import SmallPager from './SmallPager'
import {getStr} from '../../actions/language'

const RecentProperties = ({properties}) => {
    
    const [page, setPage] = useState(1)

    const [visibleProps, setVisibleProps] = useState([...properties])

    const onPage = (e, p) => {
       setPage(p);
       let start = (p-1) * 3 
       let tmp = []
       for(let i = start; i< start+3 && i < properties.length; i++){
         tmp.push(properties[i])
       }
       setVisibleProps(tmp)

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
      edgeFriction: 1,
      infinite: false,
      accessibility: true,
      draggable: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      prevArrow: <SlickArrowLeft />,
      nextArrow: <SlickArrowRight />,
      responsive: [
        {
          breakpoint: 320,
          settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false }
        },
        {
          breakpoint: 600,
          settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false }
        },
        {
          breakpoint: 768,
          settings: { slidesToShow: 2, slidesToScroll: 2, infinite: false }
        },
        {
          breakpoint: 1024,
          settings: { slidesToShow: 3, slidesToScroll: 3, infinite: false }
        }
      ]
    };

    return (
      <div id="recentProperties" className="text-center container">
        <div className='row justify-content-center mb-5'>
            <span className="span-title">{getStr('recent')}</span>
            <h2 className="title-section"> {getStr("title-properties")} </h2>
        </div>
      
        <div className="row mb-5 d-lg-none d-xl-none d-md-none d-sm-block d-xs-block">
          <div className="col-md-12">
            <Slider {...settings}>
              
              {
                properties.map(p =>  (
                    <div className='pl-2' key={p._id}>
                      <PropertyCard property={p}/>
                    </div>
                ))
              }
              
            </Slider>    
          </div>
        </div>

          <div className="d-none d-lg-block d-md-block">
            <div className="row justify-content-center ">
            {
              visibleProps && 
              visibleProps.map(p =>  (
                <div className='col col-lg-4 col-10 col-md-6 mb-5' key={p._id}>
                  <PropertyCard property={p}/>
                </div>
              ))
              }        
            </div>
            <SmallPager documentsCount={16} page={page} setPage={onPage}/>
          </div>
      </div>
    );
}


export default RecentProperties