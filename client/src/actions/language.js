import {
    LANGUAGE_CHANGED,
    CURRENCY_CHANGED
} from './types'

import langJSON from '../utils/lang.json'

import store from '../store'


export const setLanguage = (lang, locale) => dispatch =>{
    localStorage.setItem('lang', lang)
    localStorage.setItem('locale', locale)
    dispatch({
        type: LANGUAGE_CHANGED,
        payload: {lang, locale}
    })
}


export const setCurrency = (currency) => dispatch => {
    localStorage.setItem('currency', currency.currency)
    localStorage.setItem('rate', currency.rate)
    localStorage.setItem('currencyIcon', currency.icon)

    dispatch({
        type: CURRENCY_CHANGED,
        payload: currency
    })
}

export const getStr = key => {
    let lang = store.getState().language.lang;

    if(langJSON[key]){
        let keyObj = langJSON[key];

        if(keyObj[lang])
            return keyObj[lang]
    }

    return key;
}


export const calculatePrice = price => {
    let rate = store.getState().language.rate;

    return Math.ceil(price / rate)
}