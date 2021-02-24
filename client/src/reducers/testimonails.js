import {
    TESTIMONAIL_LOADED,
    TESTIMONAILS_LOADED,
    TESTIMONAIL_ERR
} from '../actions/types'


const initialState = {
    loading: true,
    testimonails: [],
    testimonail: null,
    documentsCount: 0
}

export default function testimonail(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case TESTIMONAIL_LOADED:
            return {
                ...state, 
                testimonail: payload,
                loading: false
            };
        case TESTIMONAILS_LOADED:
            return {
                ...state,
                testimonails: payload.testimonails,
                documentsCount: payload.documentsCount,
                loading: false
            }
        case TESTIMONAIL_ERR:
            return {
                ...state, 
                loading: false
            };
        default:
            return state;
    }
}