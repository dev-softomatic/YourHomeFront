import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getServices} from '../../actions/services'
import Spinner from '../layout/Spinner'
import {getStr} from '../../actions/language'
import { Link } from 'react-router-dom'


const Services = ({service: {loading, services}, getServices, language: {lang}}) => {
    useEffect(()=> {
        getServices()
    }, [getServices])
    return (
        <section id="services">
            <span className="span-title">{getStr('service')}</span>
            <h1 className="title-section">{getStr('company_services')}</h1>
            <div className='row justify-content-center'>
            {
                !services || loading ? <Spinner/> : (
                    services.slice(0, 4).map((s, i) => (
                        <Link style={{textDecoration:"none", color:"#343a40"}} to="/company" className={`service-card col-sm-12 col-lg-4 col-md-6 col-xl-3 animated animatedFadeInUp fadeInUp`} key={s._id}>
                            <span className='number'>{i < 9 ? `0${i+1}` : i+1}</span>
                            <h4>{lang === 'en' ? s.name_en : s.name_ar}</h4>
                            <p>{lang === 'en' ? s.description_en : s.description_ar}</p>
                        </Link>
                    ))
                )
            }
            </div>
        </section>
    )
}

Services.propTypes = {
    service: PropTypes.object.isRequired,
    getServices: PropTypes.func.isRequired,
    language: PropTypes.object.isRequired,

}

const mapStateToProps = state => {
    return {
        service: state.service,
        language: state.language
    }
}

export default connect(mapStateToProps, {getServices})(Services)
