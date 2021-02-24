import {
    FILTER_SETTINGS_ERR,
    FILTER_SETTINGS_LOADED,
    CITIES_LOADED
} from '../actions/types'

const initialState = {
    settings: null,
    loading: true,
    cities: []
}

export default function filterSettings(state = initialState, action){
    const {payload, type} = action;
    switch(type){
        case FILTER_SETTINGS_LOADED:
            return {
                ...state,
                settings: payload,
                loading: false
            }
        case FILTER_SETTINGS_ERR:
            return {
                ...state,
                loading: false
            }
        case CITIES_LOADED:
            return {
                ...state,
                cities: payload,
                loading: false
            }
        default:
            return state;
    }
}

