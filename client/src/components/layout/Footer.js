import React, {useEffect, useState} from 'react'
import logo from './logo-footer.svg'
import youtube from './youtube-symbol.png'
import home from './home.png'
import phone from './phone.png'
import {Link, useHistory} from 'react-router-dom'
import {setLanguage} from '../../actions/language'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { getStr } from '../../actions/language'
import axios from 'axios'


const Footer = ({aboutData, language: {lang, locale}, setLanguage}) => {

    const [formData, setForm] = useState({
        name: '',
        country: '',
        message: '',
        phone: '',
        email: ''  
       })
   
       const [alert, setAlert] = useState({msg: '', type: ''})

       const history = useHistory();
        const pathname = window.location.pathname;
        
        const onChangeLanguge = val => {
            if(val === 'ar'){
            setLanguage(val, 'ar-EG');
            document.documentElement.dir = 'rtl';
            document.documentElement.lang = "ar";
            }else {
            setLanguage('en', 'en-GB')
            document.documentElement.dir = 'ltr';
            document.documentElement.lang = "en";
            }
            history.push(pathname);
            
        }

        useEffect(() => {
            if(lang === "ar") {
            document.documentElement.dir = 'rtl';
            document.documentElement.lang = "ar";
            }else {
            document.documentElement.dir = 'ltr';
            document.documentElement.lang = "en";
            }

        }, [onChangeLanguge])
   
       const onChange = e => setForm({...formData, [e.target.name]: e.target.value})
   
       const onSend = e => {
         e.preventDefault()  
         axios.post('/api/contacts', formData, {headers: {'Content-Type': 'application/json'}})
         .then(() => {
           setAlert({msg: 'sent_successfully', type: 'success'})
           setTimeout(()=> setAlert({msg: '', type: ''}), 2000)
         }).catch(err => {
           setAlert({msg: err.response.data.errors[0].msg, type: 'danger'})
           setTimeout(()=> setAlert({msg: '', type: ''}), 3000)
         })
         
       }

    return (
        <footer>
            <div className='row pt-5 pb-4 justify-content-center'>
                <div className='col-lg-2 col' style={{margin: "auto 0 auto auto"}}>
                    <img className='logo' src={logo} alt="" />
                    <ul className="list-social">
                        <li>
                            <a href="https://www.facebook.com/YourHomeIstanbul" target="_blank" title="YourHome">
                                <i className="fa fa-facebook"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com/YourHomeIstanbu" target="_blank" title="YourHome">
                                <i className="fa fa-twitter"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/yourhomeistanbul" target="_blank" title="YourHome">
                                <i className="fa fa-instagram"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com/channel/UCcTWeWXYY6yNVLDN3n4KxmQ" target="_blank" title="YourHome">
                                
                                <img src={youtube} alt=""  className="icon-youtube"/>
                                
                            </a>
                        </li>
                        <li>
                            <a href="https://t.me/yourhomeistanbul" target="_blank" title="YourHome">
                                <i className="fa fa-telegram"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='col-lg-2 m-auto col'>
                    <small>{getStr('about_your_home')}</small>
                    <hr/>
                    <small className="d-block mb-1">
                     {getStr('footer_text_1')} 
                    </small>
                    <span className='d-flex'>
                        <img src={home} alt="" style={{height: 15, width: 15, marginTop: 5}} />
                        <small className='m-2'><a target="_blank" className="text-white d-block mt-2" href="https://www.google.com.tr/maps/place/Your+Home+Istanbul/@41.0083627,28.6232059,17z/data=!3m1!4b1!4m5!3m4!1s0x14b55f0d609422c3:0x9613a91de3358a3e!8m2!3d41.0083627!4d28.6253946?hl=en&authuser=0">{aboutData.address}</a></small>
                    </span>
                    <span className='d-flex'>
                        <img src={phone} alt="" style={{height: 15, width: 15, marginTop: 5}} />
                        <small className='m-2'><a className='footer-link' href={`tel:${aboutData.phone}`}>{aboutData.phone}</a></small>
                    </span>
                </div>
                <div className='col-lg-2 m-auto col'>
                    <small>Your Home Istanbul</small>
                    <hr/>
                    <Link className='footer-link' to="/">
                        {getStr('home')}
                    </Link>
                    <br/>
                    <Link className='footer-link' to="/company">
                        {getStr('our_company')}
                    </Link>
                    <br/>
                    <Link className='footer-link' to="/properties">
                        {getStr('properties')}
                    </Link>
                    <br/>
                    <Link className='footer-link' to="/#testimonails">
                        {getStr('testimonails')}
                    </Link>
                    <br/>
                    <Link className='footer-link' to="/blog">
                        {getStr('blog')}
                    </Link>
                    <br/>
                    <Link className='footer-link' to="/contact">
                        {getStr('contact')}
                    </Link> 
                </div>
                <div className='col-lg-3 mr-auto col mr-3'>
                    <form onSubmit={onSend}>
                        {alert.msg !== '' && <div className={`alert alert-${alert.type}`}>{getStr(alert.msg)}</div>}
                        <input type="text" className='form-control mb-1' placeholder={getStr('name')}name='name' value={formData.name} onChange={onChange} required/>
                        <input type="email" className='form-control mb-1' placeholder={getStr('email')} name='email' value={formData.email} onChange={onChange} required/>
                        <input type="text" className='form-control mb-1' placeholder={getStr('phone')} name='phone' value={formData.phone} onChange={onChange} required/>
                        <input type="text" className='form-control mb-1' placeholder={getStr('country')} name='country' value={formData.country} onChange={onChange} required/>

                        <textarea placeholder={getStr('message')}  rows="3" className='form-control mb-1' name='message' value={formData.message} onChange={onChange} required></textarea>
                        <button className='btn btn-light' type='submit'>{getStr('send')}</button>
                    </form>
                </div>
            </div>
        </footer>
    )
}


Footer.propTypes = {
    language: PropTypes.object.isRequired,
    setLanguage: PropTypes.func.isRequired,
}

const mapState = state => {
    return {
        language: state.language
    }
}


export default connect(mapState, {setLanguage})(Footer);