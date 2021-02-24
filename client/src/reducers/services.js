import {
    SERVICE_ERR,
    SERVICES_LOADED
} from '../actions/types'

const initialState = {
    services: [],
    loading: true
}


export default function service(state =initialState, action){
    const {type, payload} = action

    switch(type){
        case SERVICES_LOADED:
            return {
                ...state,
                services: payload,
                loading: false
            }
        case SERVICE_ERR:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}