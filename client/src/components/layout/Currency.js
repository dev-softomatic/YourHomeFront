import {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import axios from 'axios'
import {setCurrency} from '../../actions/language'
import ar_flag from './ar-flag.jpg'

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
      <div class="dropdown currency">
        <div class="btn btn-secondary dropdown-toggle select-currency" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src={ar_flag} alt="yourHome" />
          <span className="currency-name">TRK</span>
        </div>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{transform:"translate3d(0px, 44px, 0px) !important"}}>
          <div class="dropdown-item select-currency">
            <img src={ar_flag} alt="yourHome" />
            <span className="currency-name">USD</span>
          </div>
          <div class="dropdown-item select-currency">
            <img src={ar_flag} alt="yourHome" />
            <span className="currency-name">EURO</span>
          </div>
          <div class="dropdown-item select-currency">
            <img src={ar_flag} alt="yourHome" />
            <span className="currency-name">TRK</span>
          </div>
        </div>
      </div>
    )
}

Currency.propTypes = {
    setCurrency: PropTypes.func.isRequired,
}

export default connect(null, {setCurrency})(Currency);
