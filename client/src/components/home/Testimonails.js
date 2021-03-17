import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getTestimonails} from '../../actions/testimonails'
import Spinner from '../layout/Spinner'
import {getStr} from '../../actions/language'
import CoverFlow from 'coverflow-react';
import Img from "../layout/home.png"

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
              <h2 className='test-title mb-2 mt-2 text-center title-section'>{getStr('client_testimonails')}</h2>
              <CoverFlow 
                imagesArr={testimonails.map((t, i) => (t.image))} 
                direction="horizontal"
                width={width}
                height={height}
                itemRatio="5:3"
                background="transparent"
                className="coverflow"
                
              />

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
