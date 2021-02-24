import {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import axios from 'axios'
import {setCurrency} from '../../actions/language'


function getCurrencies(){
    return axios.get('/api/currency-rates')
}
  

function Currency({setCurrency}) {
    const [currencies, setCurrencies] = useState([])

    const onChangeCurrency = (e) => {
        let cur = currencies.find(el => el.currency === e.target.value);
        console.log(cur)
        if(cur){
        setCurrency(cur)
        }
    }

    useEffect(() => {    
        getCurrencies()
        .then(res => setCurrencies([{currency: '₺', rate: 1, _id: 1},...res.data]))
        .catch(err => console.log(err))
    }, [])

    return (
        <div className="currency">
          <select className='border-0 select-currency' onChange={onChangeCurrency}>
            {
              currencies.map(cur => (
                <option value={cur.currency} key={cur._id}>{cur.currency}</option>
              ))
            }
          </select>
        </div>
    )
}

Currency.propTypes = {
    setCurrency: PropTypes.func.isRequired,
}

export default connect(null, {setCurrency})(Currency);
