import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import './style.css'
import { getStr, calculatePrice } from '../../actions/language'
import SelectorImg from '../home/icons/selection.svg'

const PropertyCard = ({property: {featuredImage, _id, title_en, title_ar, shortDescription_en, shortDescription_ar, minPrice, plans, featured}, language: {lang, currency}}) => {
    const title = lang === 'en' ? title_en : title_ar
    const desc = lang === 'en' ? shortDescription_en : shortDescription_ar
    return (
      <Link className="card-link" to={`/properties/${_id}`}>
        <div className="card shadow mb-4 animated animatedFadeInUp fadeInUp">
          <div className="card-img-top" style={{position:"relative"}}>
            <img src={featuredImage} alt="title_en" />
            <div className="overlay"></div>
            <div className="button-overlay">
              <Link to={`/properties/${_id}`} className="btn-deatils btn btn-warning btn-lg"> {getStr('view_property')} </Link>
            </div>
            {featured && <div className="box-feature">
              <div className="title-feature">
                {getStr('featured')}
                <span className="span-feature"></span>
              </div>
            </div>}
          </div>
          <div className="card-body">
            <b className="card-title title-propertyCard text-dark mb-2">
              {title.substr(0, 20) + "..."}
            </b>
            <br />
            <p className="card-text text-muted" >
              {desc.substr(0, 100) + "..."}
            </p>
            <div className="row justify-content-start mt-3">
              <div className="col">
                <small className="text-dark">{getStr('bedrooms')}</small>
                <div className="row justify-content-start">
                  <div className='col-1'>
                    <div className="bed-up"></div>
                    <div className="bed-down"></div>
                  </div>
                  <small className='col-1 text-dark'>{plans[0].bedrooms}</small>
                </div>
              </div>
              <div className="col">
                <small className="text-dark">{getStr('bathrooms')}</small>
                <div className="row justify-content-start">
                  <div className='col-1'>
                    <div className='shower-icon'></div>
                  </div>
                  <small className='col-1 text-dark'>{plans[0].bathrooms}</small>
                </div>
              </div>
              <div className="col">
                <small className="text-dark">{getStr('area')}</small>
                <div className="row justify-content-start">
                  <div className='col-1'>
                    <img src={SelectorImg} alt="" className="icon-slider icon-svg-prop" />
                  </div>
                  <small className='col text-dark'>{plans[0].area}</small>
                </div>
              </div>
            </div>
            <span className="start-form">{getStr('start-from')} </span>
            <span className='price'>{calculatePrice(minPrice).toLocaleString()} {currency}</span>
          </div>
        </div>
      </Link>
    );
}

 PropertyCard.propTypes = {
  language: PropTypes.object.isRequired,
}

const mapState = state => {
  return {
    language: state.language
  }
}

export default connect(mapState, {})(PropertyCard)