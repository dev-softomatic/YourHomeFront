import React, { useState } from "react";
import img from "./icons/panner-bg2.jpg";
import searchIcon from "../home/icons/search.png";
import {formatPrice} from '../helpers/functions'
import {calculatePrice, getStr} from '../../actions/language'






const Panner = ({ categories, settings, formData, setFormData, onSubmit, title, cities, lang, imgPanner }) => {

  
  
  const style = {
    container: {
      background: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url(${imgPanner})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      textAlign: "center",
    },
  };

  const onChange = (ev) =>
    setFormData({ ...formData, [ev.target.name]: ev.target.value });

   
  const onChangePrice = ev => {
    if(ev.target.value < 0) {
      setFormData({...formData, price: {min: 0, max: 0}})
      return ;
    }
      let min = settings.ranges[ev.target.value].minimum;
      let max = settings.ranges[ev.target.value].maximum;
  
      setFormData({...formData, price: {min: min, max: max}})
  }

  return (
    <div className="jumbotron panner" style={style.container}>
      <h1> {title ? title : ""} </h1>
      <form onSubmit={e => onSubmit(e)} className="carousel-form row">
        <h4 className="mt-auto mb-auto" style={{fontWeight:"900", color:"#ffcf0a"}}>{getStr('istanbul-name')}</h4>
        <select name="type" onChange={onChange} value={formData.type}>
          <option value="">{getStr('type')}</option>
          {categories.length > 0 &&
            categories.map((cat) => (
              <option value={cat._id} key={cat._id}>
                {cat.name_en}
              </option>
            ))}
        </select>
        <select onChange={e => onChange(e)} name='bedrooms' value={formData.bedrooms} >
          <option value={0}>{getStr('bedrooms')}</option>
          {settings.bedrooms.map((bdr) => (
            <option value={bdr} key={bdr}>
              {bdr}
            </option>
          ))}
        </select>
        <select defaultValue={0} onChange={e => onChangePrice(e)} name='range'>
          {
            settings.ranges.map((rng, i) => (
              <option value={i} key={rng._id}>{formatPrice(calculatePrice(rng.minimum))} - {formatPrice(calculatePrice(rng.maximum))}$</option>
            ))
          }
        </select>
          <button type='submit' className="search-btn">
          <img src={searchIcon} alt="" />
        </button>
      </form>
    </div>
  );
};




export default Panner;
