import React, {useState, useRef} from 'react'
import passport from '../citizenship/icons/passport.png'
import './pop.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import axios from 'axios'


const Popup = () => {

  const submitRef = useRef(null)

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
       setAlert({msg: 'sent_successfully', type: 'success'})
       setTimeout(()=> setAlert({msg: '', type: ''}), 2000)
     }).catch(err => {
       setAlert({msg: err.response.data.errors[0].msg, type: 'danger'})
       setTimeout(()=> setAlert({msg: '', type: ''}), 3000)
     })
     
   }

    return (
      <div
        className="modal fade"
        id="modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="citizenship"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <img src={passport} alt=""/>
              <form className="container" onSubmit={onSend}>
                <div className='mb-2 row justify-content-center'>
                  <input type="text" placeholder="First Name" className='form-control col-5' name='firstName' value={formData.firstName} onChange={onChange} required="required"/>
                  <input type="text" placeholder="Last Name" className='form-control col-5' name='lastName' value={formData.lastName} onChange={onChange} required/>
                </div>
                <div className='row justify-content-center mb-2'>
                    <input type="email" className='form-control col-10 mb-2' placeholder="Email" name='email' value={formData.email} onChange={onChange} required/>
                    <input className='form-control col-10' type="text" placeholder="Phone" name='phone' value={formData.phone} onChange={onChange} required/>
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
              >
                Close
              </button>
              <button onClick={e => submitRef.current.click()} type="button" className="btn" style={{backgroundColor: '#074252', color: '#fff'}}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Popup
