import {
    FILTER_SETTINGS_ERR,
    FILTER_SETTINGS_LOADED,
    CITIES_LOADED
} from './types'

import axios from 'axios'



export const getFilterSettings = () => async dispatch => {
    try {
        const res = await axios.get('/api/filter-settings')
    
        dispatch({
            type: FILTER_SETTINGS_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: FILTER_SETTINGS_ERR
        })
    }
}


export const getCities = () => async dispatch => {
    try {
        const res = await axios.get('/api/cities')
    
        dispatch({
            type: CITIES_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: FILTER_SETTINGS_ERR
        })
    }
}

