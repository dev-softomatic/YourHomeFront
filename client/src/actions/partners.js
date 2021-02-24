import axios from 'axios'

import {
    PARTNERS_LOADED,
    PARTNER_ERR
} from './types'



export const getPartners = () => async dispatch => {
    try {
        const res = await axios.get('/api/partners')

        dispatch({
            type: PARTNERS_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PARTNER_ERR
        })
    }
}