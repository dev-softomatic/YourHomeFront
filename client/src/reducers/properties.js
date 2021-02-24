import {
    PROPERTY_ERR,
    PROPERTIES_LOADED,
    PROPERTY_LOADED
} from '../actions/types'


const initialState = {
    properties: [],
    property: null,
    loading: true,
    documentsCount: 0
}


export default function(state = initialState, action){
    const {payload, type} = action

    switch(type){
        case PROPERTIES_LOADED:
            return {
                ...state,
                properties: payload.estates,
                documentsCount: payload.documentsCount,
                loading: false
            }
        case PROPERTY_LOADED:
            return {
                ...state,
                property: payload,
                loading: false
            }
        case PROPERTY_ERR:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}