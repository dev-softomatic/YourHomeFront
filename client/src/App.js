import {useEffect, useState} from 'react'
import './App.css'
import ReactDOM from "react-dom";
import {BrowserRouter as Router , Switch, useLocation, Route, Link} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'
import axios from 'axios'


//layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Currency from "./components/layout/Currency"

//components
import Home from './components/home/Home'
import Catalog from './components/properties/Catalog'
import Property from './components/properties/Property'
import Company from './components/company/Company'
import Citizenship from './components/citizenship/Citizenship'
import BlogGrid from './components/blogs/BlogGrid'
import Popup from './components/home/Popup'
import Contact from './components/contact/Contact'
import Blog from './components/blogs/Blog'

function getAboutData() {
  return axios.get('/api/about')
}


function App() {

  const [aboutData, setAboutData] = useState(null)
  
  document.documentElement.lang = store.getState().language.lang;

  useEffect(() => {
    //History.scrollRestoration = 'manual'
    document.documentElement.lang = store.getState().language.lang;
    getAboutData().then(res => setAboutData(res.data))
    
  }, [])

  

 
  

  return (
    <Provider store={store}>
      <Popup/>
      <div className="App" style={{overflow: 'hidden'}}>
        <Currency />
        <Router>
          <a href="https://wa.me/905324301470" target="_blank" title="whatsapp-yourhome" className="icon-whatsapp">
            <i className="fa fa-whatsapp fa-lg"></i>
          </a>
          {aboutData && <Navbar aboutData={aboutData}/>}
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/properties' component={Catalog}/>
            <Route path='/properties/:id' component={Property}/>
            <Route path='/company' component={Company}/>
            <Route path='/citizenship' render={(props)=> <Citizenship {...props} />}/>
            <Route exact path='/blog' component={BlogGrid}/>
            <Route path='/blog/:id' component={Blog}/>
            <Route path='/contact' component={Contact}/>
          </Switch>
          {aboutData && <Footer aboutData={aboutData}/>}
        </Router>
      </div>
    </Provider>
  );
}

export default App;
