import {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import axios from 'axios'
import {setCurrency} from '../../actions/language'
import turkeyFlag from './turkey.png'

function getCurrencies(){
    return axios.get('/api/currency-rates')
}
  

function Currency({setCurrency, language: {currencyIcon, currency}}) {
    const [currencies, setCurrencies] = useState([])


    const onChangeCurrency = (id) => {
      console.log(id)
        let cur = currencies.find(cu => cu._id === id);
        //console.log(cur)
        if(cur){
        setCurrency(cur)
        }
    }

    useEffect(() => {    
        getCurrencies()
        .then(res => setCurrencies([...res.data]))
        .catch(err => console.log(err))
    }, [])

    return (
      <div className="dropdown currency">
        <div className="btn btn-secondary dropdown-toggle select-currency" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src={currencyIcon} alt="yourHome" />
          <span className="currency-name">{currency}</span>
        </div>

        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{transform:"translate3d(0px, 44px, 0px) !important"}}>
          {/* <div className="dropdown-item select-currency">
            <img src={ar_flag} alt="yourHome" />
            <span className="currency-name">USD</span>
          </div>
          <div className="dropdown-item select-currency">
            <img src={ar_flag} alt="yourHome" />
            <span className="currency-name">EURO</span>
          </div>
          <div className="dropdown-item select-currency">
            <img src={ar_flag} alt="yourHome" />
            <span className="currency-name">TRK</span>
          </div> */}
          {
            currencies.map(cur => (
              <div onClick={()=> onChangeCurrency(cur._id)} key={cur._id} className="dropdown-item select-currency">
                <img src={cur.icon} style={{height: 30, width: 30}} alt="yourHome" />
                <span className="currency-name">{cur.currency}</span>
              </div>
            ))
          }
        </div>
      </div>
    )
}

Currency.propTypes = {
    setCurrency: PropTypes.func.isRequired,
    language: PropTypes.object.isRequired,
    
}

const mapStateToProps = (state, ownProps) => {
  return {
    language: state.language
  }
}

export default connect(mapStateToProps, {setCurrency})(Currency);
