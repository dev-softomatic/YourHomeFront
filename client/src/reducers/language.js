import {LANGUAGE_CHANGED, CURRENCY_CHANGED} from '../actions/types'

const initialState = {
    lang: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en',
    locale: localStorage.getItem('locale') ? localStorage.getItem('locale') : 'en-GB',
    currency: localStorage.getItem('currency') ? localStorage.getItem('currency') : '₺',
    rate: localStorage.getItem('rate') ? localStorage.getItem('rate') : 1,
    currencyIcon: localStorage.getItem('currencyIcon') ? localStorage.getItem('currencyIcon') : ''
}


export default function language(state = initialState, action){
    const {payload, type} = action

    switch(type){
        case LANGUAGE_CHANGED:
            return {
                ...state,
                lang: payload.lang,
                locale: payload.locale
            }
        case CURRENCY_CHANGED:
            return {
                ...state,
                rate: payload.rate,
                currency: payload.currency,
                currencyIcon: payload.icon
            }
        default:
            return state;
    }
}