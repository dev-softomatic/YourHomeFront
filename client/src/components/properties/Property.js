import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProperty } from "../../actions/properties";
import Spinner from '../layout/Spinner'
import arrow_icon from './icons/arrow-down.png'
import ReactPlayer from 'react-player';
import SimilarProjects from './SimilarProjects'
import Share from './Share'
import {calculatePrice, getStr} from '../../actions/language'
// import GoogleMap from '../contact/GoogleMap';


const Property = ({ getProperty, property: { property, loading }, match, lang, location, currency }) => {
  useEffect(() => {
    console.log(location)
    getProperty(match.params.id);
  }, [getProperty, match.params.id]);

  return (
    <section className="p-3" style={{backgroundColor:"#e8e8e8"}}>
      {loading || !property ? (
        <Spinner />
      ) : (
        <div id="propertyPage" className="container">
          <div className="images">
            <div
              id="galleryCarousel"
              className="carousel slide"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#galleryCarousel"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li data-target="#galleryCarousel" data-slide-to="1"></li>
                <li data-target="#galleryCarousel" data-slide-to="2"></li>
              </ol>
              <div className="carousel-inner">
                {property.galleryImages.map((img, i) => (
                  <div
                    key={`gallery@${i}`}
                    className={`carousel-item ${i === 0 ? "active" : ""}`}
                  >
                    <img
                      className="d-block w-100"
                      src={img}
                      alt="First slide"
                    />
                  </div>
                ))}
              </div>
              <a
                className="carousel-control-prev"
                href="#galleryCarousel"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#galleryCarousel"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
          <div className="overview">
            <h3> {getStr('overview')}</h3>

            {new Array(property.overview_en.length / 2).fill(0).map((ov, i) => (
              <Fragment key={property.overview_en[i]._id + "area"}>
                <div className="row mb-2 marginLeftLangEng row-area">
                  <div className="col-md-2 col-sm-4 key-val key-val-parent">
                    {lang === "en"
                      ? property.overview_en[i].key
                      : property.overview_ar[i].key}
                  </div>
                  <div className="col-md-4 col-sm-4 key-val key-val-child">
                    {lang === "ar"
                      ? property.overview_en[i].value
                      : property.overview_ar[i].value}
                  </div>
                  <div className="col-md-2 col-sm-4 key-val key-val-parent">
                    {lang === "en"
                      ? property.overview_en[i].key
                      : property.overview_ar[i].key}
                  </div>
                  <div className="col-md-4 col-sm-4 key-val key-val-child">
                    {lang === "ar"
                      ? property.overview_en[i].value
                      : property.overview_ar[i].value}
                  </div>
                </div>
              </Fragment>
            ))}

            <div className="services">
              <h3>{getStr('services')}</h3>
              <ul className="marginLeftLangEng" style={{ listStyleType: "none" }}>
                {property.services.map((srv) => (
                  <li key={srv._id}>
                    <img src={srv.icon} style={{ height: 20, width: 20 }} />{" "}
                    {lang === 'en' ? srv.name_en : srv.name_ar}
                  </li>
                ))}
              </ul>
            </div>
            <div className="nearby mt-4">
              <h3>{getStr('project_nearby')}</h3>
              <div className="nearby-row marginLeftLangEng">
                {property.nearby.map((nrb) => (
                  <div className="nearby-item" key={nrb._id}>
                    {/* <img src={nrb.icon} /> */}
                    <svg fill="currentColor" width={90} height={90} >
                      <image href={nrb.icon} height={90} width={90} />
                     </svg>
                    <span>{lang === 'en' ? nrb.name_en : nrb.name_ar}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="whyThisProject">
              <h3>{getStr('why_this_project')}</h3>
              {lang === 'en' &&
              <ul className="marginLeftLangEng features-list">
                {property.whyThisProject_en.map((wtp, i) => (
                  <li key={`wtp-${i}`}>{wtp}</li>
                ))}
              </ul>}
              {lang === 'ar' &&
              <ul className="features-list">
                {property.whyThisProject_ar.map((wtp, i) => (
                  <li key={`wtp-${i}`}>{wtp}</li>
                ))}
              </ul>}
            </div>
            <div className="about">
              <h3>{getStr('about_this_project')}</h3>
              {lang === 'en' && 
              <ul className="marginLeftLangEng" style={{ listStyleType: "none" }}>
                {property.about_en.map((wtp, i) => (
                  <li style={{ marginTop: 10 }} key={`abt-${i}`}>
                    {wtp}
                  </li>
                ))}
              </ul>}
              {lang === 'ar' && 
              <ul className="marginLeftLangEng" style={{ listStyleType: "none" }}>
                {property.about_ar.map((wtp, i) => (
                  <li style={{ marginTop: 10 }} key={`abt-${i}`}>
                    {wtp}
                  </li>
                ))}
              </ul>}
            </div>
            <div className="plans">
              {property.plans.map((pln) => (
                <Fragment key={pln + "-plans*"}>
                  <button
                    className="plan-toggle mb-2"
                    type="button"
                    data-toggle="collapse"
                    data-target={`#planExp${pln._id}`}
                    aria-expanded="false"
                    aria-controls={`planExp${pln._id}`}
                  >
                    <span className="float-left">{pln.label}</span>
                    <img
                      src={arrow_icon}
                      alt=""
                      style={{
                        height: 10,
                        width: 20,
                        float: "right",
                        marginTop: 10,
                      }}
                    />
                  </button>
                  <div id={`planExp${pln._id}`} className="plan-details">
                    <img src={pln.image} alt="" />
                    <div>
                      <p style={{fontWeight: "700"}}>{lang === 'en' ? pln.description_en : pln.description_ar}</p>
                      <div className="details" style={{fontWeight: "700"}}>
                        <span>{pln.area} &#13217;</span>
                        <span>{calculatePrice(pln.price)} {currency}</span>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
            <div className="video">
                <h3>{getStr('video_for_this_project')}</h3>
                <div className='video-box' style={{width:"90%", margin: "auto"}}>
                  <ReactPlayer
                    url={property.video}
                    controls
                    playbackRate={2}
                    width="100%"
                    height="100%"
                  />
              </div>
            </div>
            <div className="map mt-3">
                <h3>{getStr('location')}</h3>
                <div className="google-map" style={{height: "500px", position:"relative", width:"90%", margin: "auto"}}>
                  {/*<GoogleMap location={{longitude: property.longitude, altitude: property.altitude}}/>*/}
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.772028832759!2d28.623205915684665!3d41.008362679300724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b55f0d609422c3%3A0x9613a91de3358a3e!2sYour%20Home%20Istanbul!5e0!3m2!1sen!2str!4v1615456838519!5m2!1sen!2str" height="450" style={{border:"0", width:"100%"}} allowfullscreen="" loading="lazy"></iframe>
                      
                </div>
            </div>
            <hr />
            <div className="row justify-content-center mb-4">
              <span>{getStr('share_via')}</span>
            </div>
            <Share />
            <hr />
            <div className="row justify-content-center mt-5">
              <h3>{getStr('similar_projects')}</h3>
            </div>
            <SimilarProjects type={property.category} />
          </div>
        </div>
      )}
    </section>
  );
};

Property.propTypes = {
  property: PropTypes.object.isRequired,
  getProperty: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    property: state.property,
    lang: state.language.lang,
    currency: state.language.currency
  };

};

export default connect(mapStateToProps, { getProperty })(Property);
