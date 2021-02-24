import {
    MEMBER_ERR,
    MEMBERS_LOADED
} from '../actions/types'

const initialState = {
    members: [],
    loading: true
}

export default function member(state = initialState, action){
    const {payload, type} = action

    switch(type){
        case MEMBERS_LOADED:
            return {
                ...state,
                members: payload,
                loading: false
            }

        case MEMBER_ERR:
            return {
                ...state,
                loading: false
            }
        default: 
           return state;
    }
}