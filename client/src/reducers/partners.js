import {
    PARTNERS_LOADED,
    PARTNER_ERR
} from '../actions/types'

const initialState = {
    partners: [],
    loading: true
}


export default function partner(state = initialState, action){
    const {payload, type} = action

    switch(type){
        case PARTNERS_LOADED:
            return {
                ...state,
                partners: payload,
                loading: false
            }
        case PARTNER_ERR:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}