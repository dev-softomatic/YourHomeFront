import axios from 'axios'

import {
    TESTIMONAILS_LOADED,
    TESTIMONAIL_LOADED,
    TESTIMONAIL_ERR
} from './types'

import BASE_URL from './tempBaseURL'


export const getTestimonails = () => async dispatch =>{
    try {
        const res = await axios.get('/api/testimonails')

        dispatch({
            type: TESTIMONAILS_LOADED,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: TESTIMONAIL_ERR
        });
    }
}


export const getTestimonail = id => async dispatch =>{
    try {
        const res = await axios.get('/api/testimonails/'+id)

        dispatch({
            type: TESTIMONAIL_LOADED,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: TESTIMONAIL_ERR
        });
    }
}