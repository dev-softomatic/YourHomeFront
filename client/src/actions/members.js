import axios from 'axios'
import {
    MEMBERS_LOADED,
    MEMBER_ERR
 } from './types'


 export const getMembers = () => async dispatch => {
     try {
         const res = await axios.get('/api/members')

         dispatch({
             type: MEMBERS_LOADED,
             payload: res.data
         })
     } catch (err) {
         dispatch({type: MEMBER_ERR})
     }
 }