import React, {useState} from 'react'
import agent from './icons/about-us-2.png'
import {getStr} from '../../actions/language'
import axios from 'axios'

const BeAgent = () => {

    const [formData, setForm] = useState({
        name: '',
        country: '',
        message: '',
        email: ''  
       })
   
       const [alert, setAlert] = useState({msg: '', type: ''})
   
       const onChange = e => setForm({...formData, [e.target.name]: e.target.value})
   
       const onSend = e => {
         e.preventDefault()  
         axios.post('/api/be-agent', formData, {headers: {'Content-Type': 'application/json'}})
         .then(() => {
           setAlert({msg: 'sent_successfully', type: 'success'})
           setTimeout(()=> setAlert({msg: '', type: ''}), 2000)
         }).catch(err => {
           setAlert({msg: err.response.data.errors[0].msg, type: 'danger'})
           setTimeout(()=> setAlert({msg: '', type: ''}), 3000)
         })
         
       }

    return (
        <div className='be-agent'>
            <div className='row justify-content-center'>
                <h3 className='col title-company text-uppercase'>{getStr('be_agent')}</h3>
            </div>
            <div className='row justify-content-center'>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <div className="be-agent-content">
                        <img src={agent} alt="" />
                        <p>{getStr('be_agent_text')}</p>
                    </div>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <form onSubmit={onSend}>
                        {alert.msg !== '' && <div className={`alert alert-${alert.type}`}>{getStr(alert.msg)}</div>}
                        <input type="text" className='form-control mb-2' placeholder={getStr('name')} value={formData.name} onChange={onChange} name='name' required/>
                        <input type="text" className='form-control mb-2' placeholder={getStr('country')} value={formData.country} onChange={onChange} name='country' required/>
                        <input type="email" className='form-control mb-2' placeholder={getStr('email')}  value={formData.email} onChange={onChange} name='email' required/>
                        <textarea className='form-control mb-2' cols="30" rows="4" placeholder={getStr('message')}  value={formData.message} onChange={onChange} name='message' required></textarea>
                        <button type='submit' className='btn btn-light btn-small d-block btn-agent'>{getStr('send')}</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default BeAgent
