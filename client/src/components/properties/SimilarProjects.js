import React, { useEffect} from 'react'
import PropTypes from 'prop-types'
import {getProperties} from '../../actions/properties'
import {calculatePrice} from '../../actions/language'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import {Link} from 'react-router-dom'

const SimilarProjects = ({property: {properties, loading}, type, getProperties, language: {currency, lang}}) => {
    useEffect(()=> {
        getProperties(1, type)
    }, [getProperties, type])
    return (
      <div className="row justify-content-center mt-3"> 
        {loading || !properties ? (
          <Spinner />
        ) : (
          properties.slice(0, 3).map((p) => (
            <Link
              onClick={e => window.location = `/properties/${p._id}`}
              to={`/properties/${p._id}`}
              className="similar col-lg-4 col-sm-12  mb-3 col-md-4"
              key={p._id + "-similar"}
            >
              <img
                src={p.featuredImage}
                alt=""
              />

              <div className="similar-text">
                <span className="title">{lang === 'en' ? p.title_en : p.title_ar}</span>
                <span className='price'>{calculatePrice(p.minPrice).toLocaleString()} {currency}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    );
}

SimilarProjects.propTypes = {
    getProperties: PropTypes.func.isRequired,
    property: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired,
}

const mapState = state => {
    return {
        property: state.property,
        language: state.language
    }
}

export default connect(mapState, {getProperties})(SimilarProjects)
