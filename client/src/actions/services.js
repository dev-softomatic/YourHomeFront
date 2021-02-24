import axios from 'axios'

import {
    SERVICES_LOADED,
    SERVICE_ERR
} from './types'

import BASE_URL from './tempBaseURL'


export const getServices = () =>async dispatch => {
    try {
        const res = await axios.get('/api/services')
        dispatch({
            type: SERVICES_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: SERVICE_ERR
        })
    }
}