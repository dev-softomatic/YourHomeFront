import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import panner_skin from './icons/panner-skin.png'
import './style.css'
import BlogCard from './BlogCard'
import Panner from '../properties/Panner'
import {getCategories} from '../../actions/categories'
import {getFilterSettings, getCities} from '../../actions/filterSettings'
import {getProperties} from '../../actions/properties'
import Pagination from '../layout/Pagination'
import {list} from '../../actions/blog'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import {getStr} from '../../actions/language'
import BgPanner from "./icons/blogs.jpg";


const style = {
    background: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url(${panner_skin})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover'
}

const getQueryParams = (search) => 
    search.replace('?', '').split('&').reduce((r,e) => (r[e.split('=')[0]] = decodeURIComponent(e.split('=')[1]), r), {});


const BlogGrid = ({category: {categories},list, article: {articles, loading, documentsCount}, language: {lang}, getCategories, filterSettings, getFilterSettings, getProperties, property, location, getCities}) => {
    
    const [page, setPage] = useState(1)
    
    const [formData, setFormData] = useState({
        price: { min: 0, max: 0 },
        area: 0,
        type: "",
        bedrooms: 0,
    });
    
    useEffect(()=> {
        getCategories()
        getFilterSettings()
        getCities()
        let query = getQueryParams(location.search)
        if(query.page){
            setPage(query.page)
        }
    
        // let type = query.type ? query.type : formData.type;
        // let area = query.area ? query.area : formData.area;
        // let bedrooms = query.bedrooms ? query.bedrooms : formData.bedrooms;
        // let price_high = query.price_high ? query.price_high : formData.price.max;
        // let price_low = query.price_low ? query.price_low : formData.price.min;
    
        // getProperties(page, type, area, bedrooms, price_high, price_low)
        list('', +query.page)
    }, [list,getCategories, getFilterSettings, getProperties, location.search])

    const onSubmit = ev => {
        ev.preventDefault();
    
        console.log(formData)
        setPage(1);
        let url = '/properties?'
        for(let prop in formData){
            if(formData[prop] !== 0 && formData[prop] !== ''){
                if(prop === 'price'){
                    if(formData.price.min !== 0 && formData.price.max !== 0){
                        url += `price_high=${formData.price.max}&price_low=${formData.price.min}&`
                    }
                }else{
                   url += `${prop}=${formData[prop]}&`
                }
            }
        }
        console.log(url.charAt(url.length -1))
        if(url.charAt(url.length - 1) === '&')
            url.substr(0, url.length - 2);
        window.location = url
       // getProperties(1, formData.type, formData.area, formData.bedrooms, formData.price.max, formData.price.min)
    }

    const onPage = p => {
        setPage(p)
        window.location = `/blog?page=${p}`
    }

    return (
        <section id="blogGrid">

            {
               !categories || !filterSettings.settings || filterSettings.loading ? (<Spinner/>) : (
                    <Panner title={getStr('link-blog')} onSubmit={onSubmit} categories={categories} settings={filterSettings.settings} formData={formData} setFormData={setFormData} cities={filterSettings.cities} imgPanner={BgPanner}/>
                )
            }
            <div className="container">
                {!articles || loading ? <Spinner/> : 
                <div className='row justify-content-center  justify-content-sm-center mt-5 blog-grid'>
                    {
                        articles.map(el => (
                        <div  key={el._id} className='col-xl-4 col-lg-4 col-md-6 col-sm-8'>
                            <div className="container">
                                <BlogCard blog={el} lang={lang}/>
                            </div>
                            </div>
                        ))
                    }
                </div>}
            </div>
            <Pagination page={page} onPage={onPage} documentsCount={documentsCount} />
        </section>
    )
}

BlogGrid.propTypes = {
    article: PropTypes.object.isRequired,
    list: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
    filterSettings: PropTypes.object.isRequired,
    getProperties: PropTypes.func.isRequired,
    property: PropTypes.object.isRequired,
    getCities: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        article: state.article,
        language: state.language,
        category: state.category,
        filterSettings: state.filterSettings,
    }
}

export default connect(mapStateToProps, {getCategories, getFilterSettings, getProperties,list, getCities})(BlogGrid)
