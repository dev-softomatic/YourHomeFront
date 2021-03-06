import React, {useState} from 'react'
import istanbulNight from './icons/nationality-photo.jpg'
import Passport from './icons//natio.png'
import passport_vertical from './icons/natio-final.png'
import map from './icons/map.png'
import './style.css'
import {getStr} from '../../actions/language'
import axios from 'axios'


const style = {
    backgroundImage: `url(${istanbulNight})`
}

const Citizenship = props => {
   
  const [formData, setForm] = useState({
     name: '',
     country: '',
     phone: '',
     message: '',
     email: ''  
    })

    const [alert, setAlert] = useState({msg: '', type: ''})

    const onChange = e => setForm({...formData, [e.target.name]: e.target.value})

    const onSend = e => {
      e.preventDefault()

      axios.post('/api/citizenship-forms', formData, {headers: {'Content-Type': 'application/json'}})
      .then(res => {
        setAlert({msg: 'sent_successfully', type: 'success'})
        setTimeout(()=> setAlert({msg: '', type: ''}), 2000)
      }).catch(err => {
        setAlert({msg: err.response.data.errors[0].msg, type: 'danger'})
        setTimeout(()=> setAlert({msg: '', type: ''}), 3000)
      })
      
    }

    return (
      <section id="citizenshipPage">
        <div className="jumbotron first" style={style}>
          <div className="row justify-content-center">
            <div className="col col-lg-4 col-md-6">
              <img src={Passport} alt="" />
            </div>
            <div className="col col-lg-6 col-md-6">
              <form onSubmit={onSend}>
                {alert.msg !== '' && <div className={`alert alert-${alert.type}`}>{getStr(alert.msg)}</div>}
                <input
                  type="text"
                  placeholder={getStr('name')}
                  className="form-control mb-2"
                  name='name'
                  value={formData.name}
                  onChange={onChange}
                  required
                />
                <input
                  type="email"
                  placeholder={getStr('email')}
                  className="form-control mb-2"
                  name='email'
                  value={formData.email}
                  onChange={onChange}
                  required
                />
                <input
                  type="text"
                  placeholder={getStr('phone')}
                  className="form-control mb-2"
                  name='phone'
                  value={formData.phone}
                  onChange={onChange}
                  required
                />
                <input
                  type="text"
                  placeholder={getStr('country')}
                  className="form-control mb-2"
                  name='country'
                  value={formData.country}
                  onChange={onChange}
                  required
                />
                <textarea
                  className="form-control mb-2"
                  cols="30"
                  rows="4"
                  placeholder={getStr('message')}
                  name='message'
                  value={formData.message}
                  onChange={onChange}
                  required
                ></textarea>
                <button type="submit" className="btn btn-light btn-small">{getStr('message_send')}</button>
              </form>
            </div>
          </div>
        </div>
        <div className="">
          <div className="row justify-content-center p-3 text-center">
            <h2 className="question">
              {getStr('ways_to_obtain_turkish_citizenship')} <br/> {getStr('by_investment_route')}
            </h2>
          </div>
          <div className="row justify-content-center mt-4" id="services">
            <div className="service-card col-sm-12 col-lg-4 col-md-6 col-xl-3">
              <span className="number">01</span>
              <h4>{getStr('bank_account')}</h4>
              <p>
              {getStr('bank_account_text').slice(0, 80)}
              </p>
              <a href="https://yourhomeistanbul.com/blog/6040f721ab279b3de9bf5ebd">{getStr('read_more')}</a>
            </div>
            <div className="col-sm-12 col-lg-4 col-md-6 col-xl-3 service-card ">
              <span className="number">02</span>
              <h4>{getStr('business')}</h4>
              <p>
              {getStr('business_text').slice(0, 80)}
              </p>
              <a href="https://yourhomeistanbul.com/blog/6040f721ab279b3de9bf5ebd">{getStr('read_more')}</a>
            </div>
            <div className="service-card col-sm-12 col-lg-4 col-md-6 col-xl-3">
              <span className="number">03</span>
              <h4>{getStr('real_estate')}</h4>
              <p>
                {getStr('real_estate_text').slice(0, 80)}
              </p>
              <a href="https://yourhomeistanbul.com/blog/6040f721ab279b3de9bf5ebd">{getStr('read_more')}</a>
            </div>
          </div>
        </div>
        <div id="mapSection" className="p-4">
          <div className="row justify-content-center mb-4">
            <h2 className='title-citizenship'>{getStr('visa_free_countries')}</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-5 col-sm-12 col-md-12 col-lg-12 pt-3 pl-5">
              <p className="prg-map">
                {getStr('visa_free_countries_1')}
              </p>
              <p className="prg-map">
                {getStr('visa_free_countries_2')}
              </p>
            </div>
            <div className="col-lg-6 col-sm-12 col-md-12 col-lg-6 pr-0 pl-5">
              <img src={map} alt="" />
            </div>
          </div>
        </div>
        <div id="benefits" className="">
          <h2 className="text-center mb-5 mt-4">{getStr('turkish_citizenship')}</h2>
          <div className="row" style={{marginTop: "100px"}}>
            <div className="col-lg-6 col-md-12 col-sm-12 p-0" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
              <img src={passport_vertical} alt="" width={"490px"} />
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12" id="accordionExample">
              <h5>
                <a
                  type="button" data-toggle="collapse" data-target="#easeofprocedures" aria-expanded="false" aria-controls="easeofprocedures"
                >
                  + {getStr('ease_of_procedures')}
                </a>
              </h5>
              <div id="easeofprocedures" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                <p>
                 {getStr('ease_text')}
                </p>
              </div>
              <h5>
                <a 
                  type="button" data-toggle="collapse" data-target="#invals" aria-expanded="false" aria-controls="invals"
                >
                  + {getStr('the_investment_values')}
                  </a>
              </h5>
              <div id="invals" className='collapse' aria-labelledby="headingFour" data-parent="#accordionExample">
                  <p>
                  {getStr('values_text')}
                  </p>
              </div>
              <h5>
                <a 
                  type="button" data-toggle="collapse" data-target="#economy" aria-expanded="false" aria-controls="economy"
                >
                  + {getStr('strength')}
                </a>
              </h5>
              <div className='collapse' id="economy" aria-labelledby="headingEight" data-parent="#accordionExample">
                  <p>
                   {getStr('strength_text')}                  
                  </p>
              </div>
              <h5>
                <a
                  data-toggle="collapse" data-target="#cbenefits" aria-expanded="true" aria-controls="cbenefits" type="button"
                >
                  + {getStr('benefits_of_turkish_citizenship')}
                </a>
              </h5>
              <ul
                style={{ listStyleType: "none" }}
                id="cbenefits"
                className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample"
              >
                <li> {getStr('benefits_1')}</li>
                <li>
                   {getStr('benefits_2')}
                </li>
                <li>- {getStr('benefits_3')}</li>
                <li> {getStr('benefits_4')}</li>
                <li> {getStr('benefits_5')}</li>
                <li>
                   {getStr('benefits_6')}
                </li>
                <li>- {getStr('benefits_7')}</li>
              </ul>
              <h5>
                <a 
                  type="button" data-toggle="collapse" data-target="#facts" aria-expanded="false" aria-controls="facts"
                >
                  + {getStr('facts')}
                </a>
              </h5>
              <div id="facts" className='collapse' aria-labelledby="headingNine" data-parent="#accordionExample">
                  <ul style={{listStyleType: 'none'}}>
                      <li>  {getStr('facts_1')}</li>
                      <li>  {getStr('facts_2')}</li>
                      <li>  {getStr('facts_3')}</li>
                      <li> {getStr('facts_4')}</li>
                      <li> {getStr('facts_5')}</li>
                      <li> {getStr('facts_6')}</li>
                  </ul>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    );
}

Citizenship.propTypes = {

}

export default Citizenship
