import axios from 'axios'

import {
    CATEGORIES_LOADED,
    CATEGORY_ERR
} from './types'


export const getCategories = () => async dispatch => {
    try {
        const res = await axios.get('/api/categories');

        dispatch({
            type: CATEGORIES_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: CATEGORY_ERR
        })
    }
}