import React, {useState, useEffect} from "react";
import passport from "./icons/natio.png";
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getStr} from '../../actions/language'

async function getData(){
  return axios.get('/api/citizenship/id')
}


const Citzinship = ({language}) => {
  const [data, setData] = useState(null)

  useEffect(()=> {
    getData().then(res => setData(res.data))
    .catch(err => console.log(err.msg))
  }, [])


  let lang = document.documentElement.lang;
  return (
    <div id="citizenship" className="jumbotron p-0 pl-5 pr-5" >
      <div className="row justify-content-center mt-auto">
        <span className="span-title">{getStr('citizenship')}</span>
        <h2 className="mb-5 title-section">{getStr('turkish_citizenship')}</h2>
      </div>
      {data && 
      <div className="content">
        <div className="row">
          <div className="col-md-6 col-imgCitizenship">
            <div className="img-passport" >
              <img src={passport} alt="passport" className={`wow ${lang === 'ar' ? "bounceInRight" : "bounceInLeft"}`} data-wow-duration="1s"/>
            </div>
          </div>
          <div className="col-md-6">
            <div 
              className={`text mt-5 wow ${lang === 'ar' ? "bounceInLeft" : "bounceInRight"}`}
              data-wow-duration="4s"
            >
                
              <p>
                {language === 'en' ? data.section1_en : data.section1_ar}
              </p>
              <p className="paragBorder" style={{padding: lang === "ar" ? '10px 10px 20px 5px' : '10px 10px 20px 5px', lineHeight: 1.7, margin: lang === "ar" ? "0px 8px 0px 0px" : "0px 0px 0px 8px", border: '5px #ccc', borderStyle: lang === "ar" ? "none solid none none" : "none none none solid" , backgroundColor: '#fff'}}> read
                {language === 'en' ? data.section2_en : data.section2_ar}
              </p>
              <Link to="/citizenship" className={`btn btn-outline-dark btn-read btn-lg ${lang === 'ar' ? "ml-1 mr-1" : "mr-1 ml-1"} mt-3`}>{getStr('read_more')}</Link>
              <button className={`btn btn-outline-light border-dark btn-dark btn-lg btn-book ${lang === 'ar' ? "ml-3 mr-2" : "mr-1 ml-1"} mt-3`} type="button" data-toggle="modal" data-target="#modal">{getStr('book_free_consultation')}</button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};

Citzinship.propTypes = {
  language: PropTypes.string.isRequired,
};

const mapState = state => {
  return {
    language: state.language.lang
  }
}

export default connect(mapState, {})(Citzinship);
