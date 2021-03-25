import React from 'react'
import {Link} from 'react-router-dom'
import {getStr} from '../../actions/language'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'




const BlogCard = ({blog: {title_en, title_ar, content_en, content_ar, coverImage, _id}, language: {lang}}) => {
    const content = lang === 'en' ? content_en : content_ar
    return (
        <Link to={`/blog/${_id}`} className='blog-card'>
            <img src={coverImage} alt={title_en} className="mb-3"/>
            <h6 className="title-card pr-3">{lang === 'en' ? title_en : title_ar}</h6>
            <p className='mb-auto parag-card pr-3'>{content?.blocks[0].text.substr(0, 70) + '...'}</p>
            <Link to={`/blog/${_id}`} className="btn-card pr-3">
                <b>{getStr('read_more')}</b>
            </Link>
        </Link>
    )
}

BlogCard.propTypes = {
    language: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    return {
        language: state.language
    }
}


export default connect(mapStateToProps, {})(BlogCard)
