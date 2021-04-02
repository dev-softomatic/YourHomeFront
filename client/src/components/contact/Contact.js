import React, {useEffect, useState} from 'react'
import './style.css'
import addressIcon from './icons/home.svg'
import phoneIcon from './icons/phone-call.svg'
import emailIcon from './icons/email.svg'
import {getStr} from '../../actions/language'
import axios from 'axios'
import GoogleMap from './GoogleMap';

function getAbout(){
    return axios.get('/api/about')
}



const Contact = () => {
    const [aboutData, setData] = useState(null)
    const [formData, setForm] = useState({
        name: '',
        country: '',
        phone: '',
        email: '',
        message: ''
    })

    const [alert, setAlert] = useState({msg: '', type: ''})

    const onChange = e => setForm({...formData, [e.target.name]: e.target.value})

    useEffect(()=> {
        getAbout().then(res => setData(res.data))
    }, [])

    const onSend = e => {
        e.preventDefault();

        axios.post('/api/contacts', formData, {
            headers: {'Content-Type': 'application/json'}
        }).then(() => {
            setAlert({msg: getStr('sent_successfully'), type: 'success'})
            setTimeout(() => setAlert({msg: '', alert: ''}), 3000)
        })
        .catch(err => {
            setAlert({msg: err.response.data.errors[0].msg, type: 'danger'})
            setTimeout(() => setAlert({msg: '', alert: ''}), 3000)
        })
    }

    return (
        <section id="contactPage">
            <div className="container">
                {aboutData && 
                <div className="contact-box">
                    <div className='row justify-content-center' style={{marginBottom: '4%'}}>
                        <h1 className="title-section">{getStr('contact')}</h1>
                    </div>
                     
                    <div className='row'>
                        <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                            <form className="form-contact" onSubmit={onSend}>
                            {alert.msg !== '' && <div className={`alert alert-${alert.type}`}>{alert.msg}</div>}
                                <div class="form-group">
                                    <label for="name">{getStr('name')}</label>
                                    <input type="text" name='name' value={formData.name}  onChange={onChange} className='form-control mb-2' placeholder={getStr('name')} required/>
                                </div>
                                <div class="form-group">
                                    <label for="email">{getStr('email')}</label>
                                    <input type="email" name='email' value={formData.email}  onChange={onChange} className='form-control mb-2' placeholder={getStr('email')} required/>
                                </div>
                                <div class="form-group">
                                    <label for="country">{getStr('country')}</label>
                                    <input type="text" name='country' value={formData.country}  onChange={onChange} className="form-control mb-2" placeholder={getStr('country')} required/>
                                </div>
                                <div class="form-group">
                                    <label for="phone">{getStr('phone')}</label>
                                    <input type="text" name='phone' value={formData.phone}  onChange={onChange} className='form-control mb-2' placeholder={getStr('phone')} required/>
                                </div>
                                <div class="form-group">
                                    <label for="phone">{getStr('message')}</label>
                                    <textarea cols="30" rows="4" name='message' value={formData.message}  onChange={onChange} placeholder={getStr('message')} className="form-control mb-2" required></textarea>
                                </div>
                                <button type='submit' className='btn btn-small btn-dark d-block btn-contact'>{getStr('send_msg')}</button>
                            </form>
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-1'>
                            <div className='row justify-content-center address mt-5 pl-3 mb-3'>
                                <div className='col-1 mr-1'><img src={addressIcon} alt="" /></div>
                                <div className='col-8'><a target="_blank" className="text-dark d-block mt-2" href="https://www.google.com.tr/maps/place/Your+Home+Istanbul/@41.0083627,28.6232059,17z/data=!3m1!4b1!4m5!3m4!1s0x14b55f0d609422c3:0x9613a91de3358a3e!8m2!3d41.0083627!4d28.6253946?hl=en&authuser=0">{aboutData.address}</a></div>
                            </div>
                            <div className='row justify-content-center phone pl-3 mb-4'>
                                <div className='col-1 mr-1'><img src={phoneIcon} alt="" /></div>
                                <div className='col-8' style={{direction:'ltr'}}><a className="text-dark" href={`tel:${aboutData.phone}`}>{aboutData.phone}</a></div>
                            </div>
                            {/* <div className='row justify-content-center phone pl-3 mb-4'>
                                <div className='col-1 mr-1'><img src={phoneIcon} alt="" /></div>
                                <div className='col-8'><p>+9 (555) 555-5555</p></div>
                            </div> */}
                            <div className='row  justify-content-center address pl-3'>
                                <div className='col-1 mr-1'><img src={emailIcon} alt="" /></div>
                                <div className='col-8'><a className="text-dark d-block mt-2" href={`mailto:${aboutData.support_email}`}>{aboutData.support_email}</a></div>
                            </div>
                        </div>
                    </div>
                    <div className="google-map mb-3" style={{height: "500px", position:"relative", marginTop: "50px"}}>
                        {/*<GoogleMap location={aboutData.location}/>*/}
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.772028832759!2d28.623205915684665!3d41.008362679300724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b55f0d609422c3%3A0x9613a91de3358a3e!2sYour%20Home%20Istanbul!5e0!3m2!1sen!2str!4v1615456838519!5m2!1sen!2str" height="450" style={{border:"0", width:"100%"}} allowfullscreen="" loading="lazy"></iframe>

                    </div>
                
                </div>
               }
            </div>
        </section>
    )
}

export default Contact
