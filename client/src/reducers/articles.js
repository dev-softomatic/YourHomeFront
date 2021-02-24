import {
    ARTICLES_LOADED,
    ARTICLE_ERR,
    ARTICLE_LOADED,
} from '../actions/types'

const initialState = {
    article: null,
    articles: [],
    documentsCount: 0,
    loading: true
}


export default function article(state = initialState, action){
    const {payload, type} = action;

    switch(type){
        case ARTICLES_LOADED:
            return {
                ...state,
                articles: payload.articles,
                documentsCount: payload.documentsCount,
                loading: false
            }
   
        case ARTICLE_LOADED:
            return {
                ...state,
                loading: false,
                article: payload
            }
        case ARTICLE_ERR:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}