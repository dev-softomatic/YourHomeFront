import React, {useEffect, useState} from 'react'
import fb from './icons/fb-icon.png'
import twitter from './icons/twitter.png'
import linkedIn from './icons/linkedin.png'
import copy from './icons/copy.jpg'
import axios from 'axios'



const borderStyle = {
    borderRadius: 3
}

function getAbout(){
    return axios.get('/api/about')
}


const Share = () => {
    const [about, setAbout] = useState(null)
    useEffect(()=> {
        getAbout().then(res => setAbout(res.data)).catch(err => console.log(err))
    }, [])

    const onClick = (link)=> {
     window.location = link
    }

    const copyURL = () => navigator.clipboard.writeText(window.location.href)

    return (
        <div className='d-flex justify-content-center share'>
          
            <div className='mr-2 box-social'>
                <button onClick={e => onClick(about.facebook)} className='btn facebook'>Facebook</button>
                <img src={fb} alt="" />
            </div>
            <div className='mr-2 box-social'>
                <button className='btn twitter' onClick={e => onClick(about.twitter)}>Twitter</button>
                <img style={borderStyle} src={twitter} alt="" />
            </div>
            <div className='mr-2 box-social'>
                <button className='btn linkedin' onClick={e => onClick(about.linkedin)}>LinkedIn</button>
                <img style={borderStyle} src={linkedIn} alt="" />
            </div>
            <div className='mr-2 box-social'>
                <button onClick={()=> copyURL()} className='btn btn-dark copylink'>Copy Link</button>
                <img src={copy} alt="" style={borderStyle} />
            </div>
        </div>
    )
}

export default Share
