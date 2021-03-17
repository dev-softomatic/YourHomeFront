import React from 'react'
import { Link } from 'react-router-dom'
import right_effect from './icons/right-effect-white.svg'
import left_effect from './icons/left-effect-white.svg'
import skin from './icons/bg-contact2.jpg'
import {getStr} from '../../actions/language'


const style = {
  background: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url(${skin})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
}



const Contact2 = () => {
    return (
      <section id="contact2" style={style}>
          <img src={right_effect} style={{color: '#f7f7f7', marginTop: -1, width: '100%'}} alt="" />
        <div className="row justify-content-center row-section-contact d-block mt-5">
          <p className="text-white text-center" style={{fontSize:"20px"}}><strong> {getStr('heading-contact')} </strong></p>
          <h1 className="text-white text-center m-0">
            {eval(JSON.stringify(getStr('desc-contact2')))}
          </h1>
        </div>
        <div className="box-btn-contat d-flex mb-5">
          <button className="btn btn-warning btn-lg d-block btn-contact" style={{fontSize:"18px", fontWeight:"500", background:"#FFCF0A", margin:"0 10px 80px auto"}}>
            <Link to="/contact"> {getStr('contactUs')} </Link>
          </button>
          <button className="btn btn-white btn-lg d-block btn-contact" style={{fontSize:"18px", fontWeight:"500", background:"#fff", margin:"0 auto 80px 0"}}>
            <Link to="/properties"> {getStr('contact-property')} </Link>
          </button>
        </div>
        <img src={left_effect} style={{color: '#fff', marginBottom: -1, width: '100%'}} alt="" />
      </section>
    );
}

export default Contact2
