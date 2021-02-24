import axios from 'axios'

import {
    CATEGORIES_LOADED,
    CATEGORY_ERR
} from './types'

import BASE_URL from './tempBaseURL'

export const getCategories = () => async dispatch => {
    try {
        const res = await axios.get(BASE_URL+'/api/categories');

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