import React, {useEffect, useState} from 'react'
import copy from './icons/copy-icon.png'
import {FacebookShareButton, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon, FacebookIcon} from 'react-share'
import axios from 'axios'



const borderStyle = {
    borderRadius: 3,
    width: 20,
    height: 20
}

function getAbout(){
    return axios.get('/api/about')
}


const Share = () => {
    const [about, setAbout] = useState(null)
    useEffect(()=> {
        getAbout().then(res => setAbout(res.data)).catch(err => console.log(err))
        console.log(window.location.href)
    }, [])


    const copyURL = () => navigator.clipboard.writeText(window.location.href)

    return (
        <div className='d-flex justify-content-center share'>
            <div className='mx-2 box-social'>
                <FacebookShareButton url={window.location.href}>
                    <span className='btn facebook'>facebook <FacebookIcon size={20}/></span>
                </FacebookShareButton>
            </div>
            <div className='mx-2 box-social'>
                <LinkedinShareButton url={window.location.href}>
                    <span className='btn linkedin'>linkedin <LinkedinIcon size={20}/></span>
                </LinkedinShareButton>
            </div>
           
             <div className='mx-2 box-social'>
                <TwitterShareButton url={window.location.href}>
                    <span className='btn twitter'>twitter <TwitterIcon size={20}/></span>
                </TwitterShareButton>
            </div>
           
            <div className='mx-2 box-social'>
                <button onClick={copyURL} type='button' className='btn btn-dark'>
                    Copy <img src={copy} alt="" style={borderStyle} />
                </button>
            </div>
        </div>
    )
}

export default Share
