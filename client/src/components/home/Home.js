import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Jumbotron from './Jumbotron'
import Citzinship from './Citzinship'
import RecentProperties from './RecentProperties'
import Services from './Services'
import Contact from './Contact'
import TeamMembers from './TeamMembers'
import Testimonails from './Testimonails'
import Partners from './Partners'
import {getCities, getFilterSettings} from '../../actions/filterSettings'
import Spinner from '../layout/Spinner'
import {connect} from 'react-redux'
import {getCategories} from '../../actions/categories'
import left_effect from './icons/left-effect.svg'
import right_effect from './icons/right-effect.svg'
import Contact2 from './Contact2'
import BlogRow from './BlogRow'
import {getRecentProperties} from '../../actions/properties'
import './style.css'


const Home = ({filterSettings: {settings, loading, cities}, getFilterSettings, categories, categoriesLoading, getCategories, getRecentProperties, properties, propertiesLoading, getCities}) => {
    useEffect(()=> {
        getFilterSettings()
        getCategories()
        getRecentProperties()
        getCities()
        
    }, [])
    
    return (
      <Fragment>
        {loading || !settings || !categories || categoriesLoading ? (
          <Spinner />
        ) : (
          <Jumbotron settings={settings} categories={categories} cities={cities} />
        )}
        <Citzinship/>
        <img src={right_effect} style={{color: '#f7f7f7', width: '100%'}} alt="" />
        {
          !properties || propertiesLoading  ? <Spinner /> : (
            properties.length > 3 ?
            <RecentProperties properties={properties}/>
            : <div className='text-center'><span>No Data yet</span></div>
          )
        }
        <img src={left_effect} style={{marginBottom: 0, width: '100%'}} alt="" />
          <Testimonails />
        
        <img src={right_effect} style={{color: '#f7f7f7', width: '100%'}} alt="" />
        <Services />
        <Contact />
        <TeamMembers />
        <Contact2/>
        <BlogRow/>
        <img src={left_effect} alt="" style={{width: '100%'}} />
        <Partners />
      </Fragment>
    );
}

Home.propTypes = {
    getFilterSettings: PropTypes.func.isRequired,
    filterSettings: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    categoriesLoading: PropTypes.bool.isRequired,
    properties: PropTypes.array.isRequired,
    propertiesLoading: PropTypes.bool.isRequired,
    getCities: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        filterSettings: state.filterSettings,
        categories: state.category.categories,
        categoriesLoading: state.category.loading,
        properties: state.property.properties,
        propertiesLoading: state.property.loading,
    }
}

export default connect(mapStateToProps, {getFilterSettings, getCategories, getRecentProperties, getCities})(Home)

