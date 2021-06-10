import React, {useState, useEffect} from 'react'
import searchIcon from './icons/search.png'
import {formatPrice} from '../helpers/functions'
import {getStr, calculatePrice} from '../../actions/language'
import axios from 'axios'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import SelectorImg from './icons/selection.svg'
import Slider from "react-slick";


const itemStyle = {
   filter: 'brightness(70%)'
}

function getOffers(){
  return axios.get('/api/offers')
}


const Jumbotron = ({ categories, settings, cities, language: {currency}}) => {
    const [offers, setOffers] = useState([])
    
    useEffect(()=> {
        getOffers().then(res => setOffers(res.data))
        .catch(err => console.log(err.msg))
    }, [])

    const [formData, setFormData] = useState({
        price_high: 0,
        price_low: 0,
        type: '',
        area: 0,
        bedrooms: 0
    })

    const onSubmit = e => {
        e.preventDefault()
        let url = '/properties?'
        for(let prop in formData){
        if(formData[prop] !== 0 && formData[prop] !== ''){
            url += `${prop}=${formData[prop]}&`
        }
        }
        window.location = url;
    }

    let lang = document.documentElement.lang;

    const onChange= e => setFormData({...formData, [e.target.name]: e.target.value})
    const setting = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 5000,
        cssEase: "linear"
    };

    return (<div className="search-box">
        <Slider {...setting}>
          {
          offers.map((item, i) =>
            <div  key={item._id} className="slick-slide">
                <a href={item.link} >
                <img className="d-block w-100 slick-slide-image" src={item.image} alt="First slide" style={itemStyle}/>
                </a>
                <div className='carousel-text'>
                    <h3 className="title-slider wow fadeInUp">{lang === 'en' ? item.title_en : item.title_ar}</h3> 
                    <h1 className="wow fadeInUp">{lang === 'en' ? item.description_en :  item.description_ar}</h1>
                    <div className='wow fadeInUp info-project' style={{opacity:"1"}}>
                    {item.bedroom !== null ? 
                        <div className="box-icon">
                            <div className='row-icon'>
                                <div className='icon'>
                                    <div style={{left: 3, right: 3}} className='bed-upper-white'></div>
                                    <div className='bed-down-white'></div>
                                </div>
                                <small className='info-icon'>{item.bedrooms}</small>
                            </div>
                        </div>
                    : ""}
                    {item.bathrooms !== null ? 
                        <div className="box-icon">
                            <div className='row-icon'>
                                <div className='icon'>
                                    <i className="fa fa-map-marker fa-lg icon-slider"></i>
                                </div>
                                <small className='icon-info'>{lang === 'en' ? item.area_name_en : item.area_name_ar}</small>
                            </div>
                        </div>
                    : ""}
                    {item.area !== null ?
                        <div className="box-icon">
                            <div className='row-icon'>
                                <div className='icon column-icon-svg'>
                                <img src={SelectorImg} alt="" className="icon-slider icon-svg" />
                                </div>
                                <small className='icon-info'>{item.area}</small>
                            </div>
                        </div>
                    : "" }
                    </div>
                    <h2 className='mt-3 price-slider wow fadeInUp'>{calculatePrice(item.price).toLocaleString('de-DE')} {currency}</h2>
                    
                </div>
                
            </div>
            )}

          
        
        </Slider>
        <div className='carousel-form mt-2'>
            <form className='row' onSubmit={e => onSubmit(e)}>
                <h4 className="m-auto" style={{fontWeight:"900", color:"#ffcf0a"}}>{getStr('istanbul-name')}</h4>
                <select className='col-md-3 col-sm-6' name='type' onChange={e => onChange(e)}>
                <option value="" key="type">{getStr('type')}</option>
                {
                    categories.map(cat => (
                    <option value={cat._id} key={cat._id}>{lang === 'en' ? cat.name_en : cat.name_ar}</option>
                    ))
                }
                </select>
                <select className='col-md-3 col-sm-6' name='bedrooms' onChange={e => onChange(e)}>
                <option value="" key="bedrooms">{getStr('bedrooms')}</option>
                {
                    settings.bedrooms.map(br => (
                    <option value={br} key={br}>{br}</option>
                    ))
                }
                </select>
                <select className='col-md-2 col-sm-6' onChange={e => setFormData({...formData, price_high: settings.ranges[e.target.value].maximum, price_low: settings.ranges[e.target.value].minimum})}>
                {
                    settings.ranges.map((rng, index) => (
                    <option value={index} key={rng._id}>{formatPrice(calculatePrice(rng.minimum))} - {formatPrice(calculatePrice(rng.maximum))}</option>
                    ))
                }
                </select>
                <button className='search-btn col-md-1 col-sm-6' type='submit'>
                <img src={searchIcon} alt="" />
                </button>
            </form>
        </div>
    </div>
    )
}

Jumbotron.propTypes = {
  language: PropTypes.object.isRequired
}

const mapState = state => {
  return {
    language: state.language
  }
}



export default connect(mapState, {})(Jumbotron)
