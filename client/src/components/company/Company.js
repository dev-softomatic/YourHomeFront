import React from 'react'
import PropTypes from 'prop-types'
import Features from './Features'
import About from './About'
import './style.css'
import BeAgent from './BeAgent'
import right_effect from '../home/icons/right-effect.svg'
import left_effect from '../home/icons/left-effect.svg'


const Company = props => {
    return (
        <section id="company">
            <Features/>
            <img src={right_effect} alt="" style={{width: '100%'}} />
            <About />
            <img src={left_effect} alt="" style={{width: '100%'}} />
            <BeAgent/>
        </section>
    )
}

Company.propTypes = {

}

export default Company
