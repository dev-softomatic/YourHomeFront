import {
    ARTICLES_LOADED,
    ARTICLE_ERR,
    ARTICLE_LOADED,
} from './types'

import axios from 'axios'

//const baseURL = 'http://localhost:5000'

export const list = (keyword = '', page = 1) => async dispatch => {
    try {
        let url = `/api/articles?page=${page}`;
        if(keyword !== ''){
            url += `&keyword=${keyword}`
        }
        const res = await axios.get(url)
        console.log(res.data)
        dispatch({
            type: ARTICLES_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: ARTICLE_ERR
        })
    }
}



export const get = (id) => async dispatch => {
    try {
    
        const res = await axios.get('/api/articles/'+id)

        dispatch({
            type: ARTICLE_LOADED,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: ARTICLE_ERR
        })
    }
}