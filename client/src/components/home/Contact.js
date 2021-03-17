import React from 'react'
import right_effect from './icons/right-effect-white.svg'
import left_effect from './icons/left-effect-white.svg'
import {getStr} from '../../actions/language'
import { Link } from 'react-router-dom'


const Contact = () => {
    return (
      <section id="contact" className="contact1">
        <img src={right_effect}  alt="" style={{marginTop: '0px', color: '#fff', opacity: 1, width: '100%'}} />
        <div className="row justify-content-center row-section-contact">
          <h1 className='text-white text-center'>
            {eval(JSON.stringify(getStr('desc-contact')))}
          </h1>
        </div>
        <div className="box-btn-contat d-flex">
          <button className="btn btn-warning btn-lg d-block btn-contact" style={{fontSize:"18px", fontWeight:"500", background:"#FFCF0A", margin:"0 10px 80px auto"}}>
            <Link to="/contact"> {getStr('contactUs')} </Link>
          </button>
          <button className="btn btn-white btn-lg d-block btn-contact" style={{fontSize:"18px", fontWeight:"500", background:"#fff", margin:"0 auto 80px 0"}}>
            <Link to="/properties"> {getStr('contact-property')} </Link>
          </button>
        </div>
        <img src={left_effect} alt="" style={{color: '#fff', marginBottom: '-1px', width: '100%'}} />
      </section>
    );
}

export default Contact
