import React from 'react'
import {Link} from 'react-router-dom'
import {getStr} from '../../actions/language'



const BlogCard = ({blog: {title_en, title_ar, createdAt, content_en, content_ar, coverImage, _id}, lang}) => {
    const content = lang === 'en' ? content_en : content_ar
    return (
        <Link to={`/blog/${_id}`} className='blog-card'>
            <img src={coverImage} alt={title_en} className="mb-3"/>
            <small className="date-card pr-3">{createdAt?.substr(0, 10)}</small>
            <h6 className="title-card pr-3">{lang === 'en' ? title_en : title_ar}</h6>
            <p className='mb-auto parag-card pr-3'>{content?.blocks[0].text.substr(0, 70) + '...'}</p>
            <Link to={`/blog/${_id}`} className="btn-card pr-3">
                <b>{getStr('read_more')}</b>
            </Link>
        </Link>
    )
}

export default BlogCard
