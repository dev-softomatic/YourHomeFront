import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getTestimonails} from '../../actions/testimonails'
import Spinner from '../layout/Spinner'
import {getStr} from '../../actions/language'
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
const Testimonails = ({testimonail: {loading, testimonails}, getTestimonails, language: {lang}}) => {

  const [current, setCurrent] = useState(0);
  const [width, setWidth] = useState(document.body.offsetWidth);
  const [height, setHeight] = useState(500);
    useEffect(()=> {
        getTestimonails()        
    }, [getTestimonails])

    /* useEffect(() => {
      window.addEventListener('resize', ()=>{
        setWidth(document.body.offsetWidth)
        if(width === 500) {
          setHeight(400)
        }
      });

      
    }, []) */

    return (
      <section id="testimonails" className="">
        {!testimonails || loading ? (
          <Spinner />
        ) : (
          <div
            id=""
            className="testimonail"
          >
            <div>
              <span className="span-title">{getStr('spanTestimonial')}</span>
              <h2 className='test-title mb-5 mt-2 text-center title-section'>{getStr('client_testimonails')}</h2>
              {/* <CoverFlow 
                imagesArr={testimonails.map((t, i) => (t.image))} 
                direction="horizontal"
                width={width}
                height={height}
                itemRatio="5:3"
                background="transparent"
                className="coverflow"
                
              /> */}


              <Carousel 
                slidesPerPage={5}
                slidesPerScroll={1}
                animationSpeed={800}
                autoPlay={2000}
                stopAutoPlayOnHover
                offset={30}
                itemWidth={500}
                itemHeight={400}
                infinite
                centered
              >
                {testimonails.map((t,i) => 
                  <img src={t.image} alt="" key={i} className="w-100 h-100"/>
                )}
              </Carousel>
            </div>
          </div>
        )}
      </section>
    );
}

Testimonails.propTypes = {
    getTestimonails: PropTypes.func.isRequired,
    testimonail: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
    return {
        testimonail: state.testimonail,
        language: state.language
    }
}

export default connect(mapStateToProps, {getTestimonails})(Testimonails)
