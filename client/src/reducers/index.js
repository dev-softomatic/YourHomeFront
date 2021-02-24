import {combineReducers} from 'redux'

import property from './properties'
import testimonail from './testimonails'
import service from './services'
import member from './members'
import partner from './partners'
import category from './categories'
import filterSettings from './filterSettings'
import language from './language'
import article from './articles'

export default combineReducers({language, property, testimonail, service, member, partner, category, filterSettings, article})