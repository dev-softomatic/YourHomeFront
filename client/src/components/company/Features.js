import React from 'react'
import magicbox from './icons/icon-01.svg'
import hasslefree from './icons/icon-02.svg'
import headache from './icons/icon-03.svg'
import alarm from './icons/icon-04.svg'
import {getStr} from '../../actions/language'


const Features = () => {
    return (
        <div className='features'>
            <div className='row justify-content-center mb-4'>
                <h2 className="title-company wow fadeInDown">{getStr('about_us')}</h2>
            </div>
            <div className='row justify-content-center'>
                <div className='col-lg-3 col-md-3 col-sm-6 col-6 feature-card'>
                    <img src={alarm} alt=""  />
                    <h6>{getStr('time_saving_for_investor')}</h6>
                </div> 
                <div className='col-lg-3 col-md-3 col-sm-6 col-6  feature-card'>
                    <img src={headache} alt="" />
                    <h6>{getStr('avoid_worries')}</h6>
                </div>
                <div className='col-lg-3 col-md-3 col-sm-6 col-6  feature-card'>
                    <img src={magicbox} alt="" style={{opacity: "1"}}/>
                    <h6>{getStr('finding_the_best_options')}</h6>
                </div>
                <div className='col-lg-3 col-md-3 col-sm-6 col-6  feature-card'>
                    <img src={hasslefree} alt=""  />
                    <h6>{getStr('hassle_free_products_for_buyers')}</h6>
                </div>
            </div>
        </div>
    )
}

export default Features
