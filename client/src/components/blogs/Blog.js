import React, {useEffect} from 'react'
import './style.css'
import BlogContent from './BlogContent'
import {get} from '../../actions/blog'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'
import Share from '../properties/Share'



const Blog = ({get, article: {article, loading}, match, language: {lang}}) => {
    useEffect(()=>{
        get(match.params.id)
    }, [match.params.id, get])
    return (
        <section className='p-3'>
            {!article || loading ? <Spinner/> : 
            <div id="blogPage" className='container'>
               <img className='cover' src={article.coverImage} alt="" style={{height: 500}} />
               <div className='blog-content'>
                   <h1 className='mb-5'>{lang === 'en' ? article.title_en : article.title_ar}</h1>
                  <BlogContent content={lang === 'en' ? article.content_en : article.content_ar}/>
               </div>
            </div>
            }
        </section>
    )
}

Blog.propTypes = {
    article: PropTypes.object.isRequired,
    get: PropTypes.func.isRequired,
    language: PropTypes.object.isRequired,
}

const mapState = state => {
    return {
        article: state.article,
        language: state.language
    }
}

export default connect(mapState, {get})(Blog)
