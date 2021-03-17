import React, {useEffect} from 'react'
import Slider from "react-slick";

// Import css files Carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import PropTypes from 'prop-types'
import {getPartners} from '../../actions/partners'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import {getStr} from '../../actions/language'



const Partners = ({getPartners, partner:{loading, partners}}) => {
    useEffect(()=> {
        getPartners()
    }, [getPartners])

    const settings = {
        arrows: false,
        infinite: true,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 10,
        responsive: [
            {
              breakpoint: 320,
              settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false }
            },
            {
              breakpoint: 600,
              settings: { slidesToShow: 2, slidesToScroll: 1, infinite: false }
            },
            {
              breakpoint: 768,
              settings: { slidesToShow: 2, slidesToScroll: 3, infinite: false }
            },
            {
              breakpoint: 1024,
              settings: { slidesToShow: 3, slidesToScroll: 3, infinite: false }
            }
        ]
      };
    
    return (
        <section id="partners" style={{backgroundColor: "#f7f7f7", marginTop: "-1px"}}>
            <span className="span-title">{getStr('partners')}</span>
            <h2 className='test-title mb-3 text-center title-section'>{getStr('our_partners')}</h2>
            <p className="desc text-center"> {getStr('desc-partner')} </p>
            <div className="container">
                <div className='row m-auto pl-5' style={{overflowX: 'hidden'}}>
                    <div className="col-12 pr-0">
                        <Slider {...settings}>
                        {
                            !partners || loading ? <Spinner/> : (
                                
                                partners.map(p => (
                                    <div className='pt-5 pb-5 text-center' key={p._id}>
                                        <img 
                                            src={p.logo}
                                            alt={p.name_en} 
                                            style={{height: 90, width: 130}}
                                        />
                                    </div>
                                ))
                            )
                        }
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    )
}

Partners.propTypes = {

}

const mapStateToProps = state => {
    return {
        partner: state.partner
    }
}

export default connect(mapStateToProps, {getPartners})(Partners)
