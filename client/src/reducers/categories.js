import {
    CATEGORIES_LOADED,
    CATEGORY_ERR
} from '../actions/types'

const initialState = {
    loading: true,
    categories: []
}


export default function category(state = initialState, action){
    const {type, payload} = action

    switch(type){
        case CATEGORIES_LOADED:
            return {
                ...state,
                categories: payload,
                loading: false
            }
        case CATEGORY_ERR:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}