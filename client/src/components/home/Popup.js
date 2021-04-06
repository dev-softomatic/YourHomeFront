import React, {useState, useRef, useEffect} from 'react'
import passport from '../citizenship/icons/passport.png'
import './pop.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import {getStr} from '../../actions/language'
import axios from 'axios'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'



const Popup = ({lang}) => {
  useEffect(()=> {}, [lang])
  const submitRef = useRef(null)
  const closeRef = useRef(null)

  const [formData, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''  
   })

   const [date, setDate] = useState(new Date())

   const [alert, setAlert] = useState({msg: '', type: ''})

   const onChange = e => setForm({...formData, [e.target.name]: e.target.value})

   const onSend = e => {
     e.preventDefault()
     formData.date = date
     axios.post('/api/appointments', formData, {headers: {'Content-Type': 'application/json'}})
     .then(res => {
       setAlert({msg: getStr('booked_successfully'), type: 'success'})
       closeRef.current.click()
       setTimeout(()=> setAlert({msg: '', type: ''}), 2000)
     }).catch(err => {
       setAlert({msg: err.response.data.errors[0].msg, type: 'danger'})
       setTimeout(()=> setAlert({msg: '', type: ''}), 3000)
     })
     
   }

    return (
      <div 
        className="modal fade mt-4"
        id="modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="citizenship"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-body" >
              <img src={passport} alt=""/>
              {alert.msg && <div className={`alert alert-${alert.type}`}>{alert.msg}</div>}
              <form className="container" onSubmit={onSend}>
                <div className='mb-2 row justify-content-center'>
                  <input type="text" placeholder={getStr('firstname')} className='form-control col-5' name='firstName' value={formData.firstName} onChange={onChange} required/>
                  <input type="text" placeholder={getStr('lastname')} className='form-control col-5' name='lastName' value={formData.lastName} onChange={onChange} />
                </div>
                <div className='row justify-content-center mb-2'>
                    <input type="email" className='form-control col-10 mb-2' placeholder={getStr('email_popup')} name='email' value={formData.email} onChange={onChange} required/>
                    <input className='form-control col-10' type="text" placeholder={getStr('phone_popup')} name='phone' value={formData.phone} onChange={onChange} required/>
                </div>
                <div className='row justify-content-center mt-3'>
                  <Calendar value={date} onChange={setDate} tileDisabled={({date}) => date.getDay() === 0 || date.getDay() === 6} required/>
                </div>
                <input type="submit" ref={submitRef} className='d-none'/>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                ref={closeRef}
              >
                {getStr('close')}
              </button>
              <button onClick={e => submitRef.current.click()} type='submit' className="btn" style={{backgroundColor: '#074252', color: '#fff'}}>
                {getStr('send_popup')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

Popup.propTypes = {
  lang: PropTypes.string.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    lang: state.language.lang
  }
}

export default connect(mapStateToProps, {})(Popup)
