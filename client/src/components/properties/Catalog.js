import React, {useEffect, useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import Panner from './Panner'
import {connect} from 'react-redux'
import {getCategories} from '../../actions/categories'
import Spinner from '../layout/Spinner'
import {getFilterSettings, getCities} from '../../actions/filterSettings'
import {getProperties} from '../../actions/properties'
import PropertiesGrid from './PropertiesGrid'
import Pagination from '../layout/Pagination'
import {getStr} from '../../actions/language'
import BgPanner from "./icons/prop.jpg";

const getQueryParams = (search) => 
    search.replace('?', '').split('&').reduce((r,e) => (r[e.split('=')[0]] = decodeURIComponent(e.split('=')[1]), r), {});


const Catalog = ({category: {categories, loading}, getCategories, filterSettings, getFilterSettings, getProperties, property, location, language: {lang}, getCities }) => {


    const [page, setPage] = useState(1)

    const [formData, setFormData] = useState({
        price: { min: 0, max: 0 },
        area: '',
        type: "",
        bedrooms: 0,
    });
      
    useEffect(()=> {
        window.scrollTo({left: 0, top: 0})

        getCategories()
        getFilterSettings()
        getCities()
        let query = getQueryParams(location.search)
        if(query.page){
            setPage(query.page)
        }

        let type = query.type ? query.type : formData.type;
        let area = query.area ? query.area : formData.area;
        let bedrooms = query.bedrooms ? query.bedrooms : formData.bedrooms;
        let price_high = query.price_high ? query.price_high : formData.price.max;
        let price_low = query.price_low ? query.price_low : formData.price.min;

        let price = {
            min: price_low,
            max: price_high
        }

        setFormData({type, price, area, bedrooms})

        getProperties(query.page, type, area, bedrooms, price_high, price_low)
        
    }, [getCategories, getFilterSettings, getProperties, location.search])


    const setURL = (p = page)=>{
        let url = `/properties?page=${p}`
        for(let prop in formData){
            if(formData[prop] !== 0 && formData[prop] !== ''){
                if(prop === 'price'){
                    if(formData.price.min !== 0 && formData.price.max !== 0){
                        url += `&price_high=${formData.price.max}&price_low=${formData.price.min}`
                    }
                }else{
                    if(formData[prop] !== '' && formData[prop] !== 0){
                        url += `&${prop}=${formData[prop]}`
                    }   
                }
            }
        }
        window.location = url
    }

    const onPage = (p) => {
        setPage(p)
        setURL(p)
    }

    const onSubmit = ev => {
        ev.preventDefault();

        console.log(formData)
        setPage(1);
        setURL(1)
        // let url = '/properties?'
        // for(let prop in formData){
        //     if(formData[prop] !== 0 && formData[prop] !== ''){
        //         if(prop === 'price'){
        //             if(formData.price.min !== 0 && formData.price.max !== 0){
        //                 url += `price_high=${formData.price.max}&price_low=${formData.price.min}&`
        //             }
        //         }else{
        //            url += `${prop}=${formData[prop]}&`
        //         }
        //     }
        // }
        // console.log(url.charAt(url.length -1))
        // if(url.charAt(url.length - 1) === '&')
        //     url.substr(0, url.length - 2);
        // window.location = url
    }

    return (
        <div>
            {
                loading || !categories || !filterSettings.settings || filterSettings.loading ? (<Spinner/>) : (
                    <Panner imgPanner={BgPanner} title={getStr('link-properties')} onSubmit={onSubmit} categories={categories} settings={filterSettings.settings} formData={formData} setFormData={setFormData} cities={filterSettings.cities} lang={lang}/>
                )
            }

            {
                property.loading || !property.properties ? <Spinner/> : (
                   
                    <Fragment>
                        <PropertiesGrid properties={property.properties}/>
                        <Pagination page={page} onPage={onPage} documentsCount={property.documentsCount}/>
                     </Fragment>
                    
                )
            }
        </div>
    )
}

Catalog.propTypes = {
    getCategories: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
    filterSettings: PropTypes.object.isRequired,
    getProperties: PropTypes.func.isRequired,
    property: PropTypes.object.isRequired,
    getCities: PropTypes.func.isRequired,
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        category: state.category,
        filterSettings: state.filterSettings,
        property: state.property,
        language: state.language
    }
}

export default connect(mapStateToProps, {getCategories, getFilterSettings, getProperties, getCities})(Catalog)
