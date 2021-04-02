import React from 'react'
import istanbul from './icons/about-us-1.png'
import {getStr} from '../../actions/language'


const About = () => {
    
    let lang = document.documentElement.lang;
    return (
        <div className='about-company' style={{paddingBottom: 20}}>
            <div className="container">
                <div className='row pt-4 ml-2 mr-2'>
                    <div className={`col-lg-6 col-md-6 col-sm-12 column  wow ${lang === 'ar' ? "bounceInRight" : "bounceInLeft"}`} data-wow-duration="3s">
                        <div className='square'></div>
                        <img src={istanbul} alt="" />
                    </div>
                    <div className={`col-lg-6 col-md-6 col-sm-12 wow ${lang === 'ar' ? "bounceInLeft" : "bounceInRight"}`} data-wow-duration="3s">
                        <p style={{lineHeight: "2.3"}}>
                           {getStr('about_us_text')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
