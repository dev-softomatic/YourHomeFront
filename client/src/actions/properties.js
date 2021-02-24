import {
    PROPERTY_ERR,
    PROPERTIES_LOADED,
    PROPERTY_LOADED
} from './types'

import axios from 'axios'
import BASE_URL from './tempBaseURL'


export const getRecentProperties = () => async dispatch =>{
    try {
        const res = await axios.get('/api/estates?page=1')
        dispatch({
            type: PROPERTIES_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({type: PROPERTY_ERR})
        console.log(err)
    }
} 


export const getProperties = (page = 1, type='', area = 0, bedrooms = 0, price_high = 0, price_low = 0) => async dispatch =>{
    try {
        let url = `/api/estates?page=${page}`

        if(type !== ''){
            url += `&type=${type}`
        }
        if(area !== ''){
            url += `&area=${area}`
        }

        if(bedrooms > 0){
            url += `&bedrooms=${bedrooms}`
        }



        if(price_high > 0 && price_low > 0){
            url += `&price_high=${price_high}&price_low=${price_low}`
        }

        console.log(url)

        const res = await axios.get(url)
        dispatch({




            type: PROPERTIES_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({type: PROPERTY_ERR})
        console.log(err)
    }
} 


export const getProperty = id => async dispatch => {
    try {
        const res = await axios.get(`/api/estates/${id}`)

        dispatch({
            type: PROPERTY_LOADED,
            payload: res.data
        })
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: PROPERTY_ERR,
        })
    }
}