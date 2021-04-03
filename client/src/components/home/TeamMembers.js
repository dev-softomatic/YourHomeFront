import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {getMembers} from '../../actions/members'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import {getStr} from '../../actions/language'


const TeamMembers = ({getMembers, member: {members, loading}, language: {lang}}) => {
    useEffect(()=> {
        getMembers()
    }, [getMembers])

    
    return (
      <section id="members">
        <div className="row justify-content-center mb-5">
            <span className="span-title">{getStr('team')}</span>
            <h1 className="title-section">{getStr('team_members')}</h1>
        </div>
        <div className='row justify-content-center mt-5 text-center'>
            {
                !members || loading ? (<Spinner/>) : (
                    members.map(m => (
                        <div key={m._id} className='col-lg-3 col-sm-12 width-team text-center'>

                            <img src={m.image} alt={m.name_en}/>
                            <h4 className="name-team">{lang === 'en' ? m.name_en : m.name_ar}</h4>
                            <p className="title-job">{lang === 'en' ? m.position_en : m.position_ar}</p>
                            <p className="email-team">{m.email}</p>
                            <a href={`tel:${m.phone}`} className="phone-team">{m.phone}</a>
                        </div>
                    ))
                )
            }
        </div>
      </section>
    );
}

TeamMembers.propTypes = {
    getMembers: PropTypes.func.isRequired,
    member: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
    return {
        member: state.member,
        language: state.language
    }
}

export default connect(mapStateToProps, {getMembers})(TeamMembers)
