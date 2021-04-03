import React, {useEffect, useState} from "react";
import logo from "./logo yhfor motion-01.svg";
import {Link, useHistory, useLocation} from 'react-router-dom'
import "./style.css";
import en_flag from './en-flag.png'
import ar_flag from './ar-flag.jpg'
import {setLanguage, setCurrency} from '../../actions/language'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {getStr} from '../../actions/language'
import {getCategories} from '../../actions/categories'


const flagStyle = {
    height: 20,
    width: 30,
    marginRight: 5
}


const Navbar = ({aboutData, language: {lang, locale}, setLanguage, getCategories, category: {categories, loading}}) => {

  const [active, setActive] = useState('/')
  const history = useHistory();
  let location = useLocation();
  const pathname = window.location.pathname;
  
  const onChangeLanguge = val => {
    if(val === 'ar'){
      setLanguage(val, 'ar-EG');
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = "ar";
    }else {
      setLanguage('en', 'en-GB')
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = "en";
    }
    
    history.push(pathname);
    
  }

 
  useEffect(() => {
    getCategories()
    if(lang === "ar") {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = "ar";
    }else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = "en";
    }

  }, [getCategories])

  let path = location.pathname;
  console.log("active = " + active);
  console.log("path = " + window.location.hash);
  const scrollTop = () => {
    window.scrollTo(0, 0);
  }
 
  return (
  <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#fff'}}>
  <Link className="logo" to="/" onClick={e => setActive('/')}>
      <img src={logo} alt="Logo" className='ml-5 logo' onClick={() => scrollTop()}/>
  </Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav mx-auto">
      <li className={`nav-item nav-item-menu p-1 ml-2 ${active === '/' && path === "/" && window.location.hash !== "#testimonails" ? 'activeLink' : ''}`} onClick={() => scrollTop()}>
        <Link className="nav-link text-dark" to='/' data-toggle="collapse" data-target=".navbar-collapse.show"  onClick={e => setActive('/')}>{getStr('home')}</Link>
      </li>
      <li className={`nav-item nav-item-menu ml-2 ${active === '/company' || path === "/company" ? 'activeLink' : ''}`}>
        <Link className="nav-link text-dark" data-toggle="collapse" data-target=".navbar-collapse.show"  to="/company" onClick={e => setActive('/company')}>{getStr('our_company')}</Link>
      </li>
  
      <li className={`nav-item dropdown nav-item-menu  ml-2 ${active === '/properties' || path === "/properties" ? 'activeLink' : ''}`}> 
        <Link className="nav-link link-drop-hover text-dark" data-toggle="collapse" data-target=".navbar-collapse.show" to="/properties" onClick={e => setActive('/properties')}  role="button" >
          {getStr('properties')}
        </Link>
        <div className="dropdown-menu menu-prop" aria-labelledby="categories">
           {
             categories && !loading && categories.map(cat => (
               <Link className='dropdown-item' data-toggle="collapse" data-target=".navbar-collapse.show"  key={cat._id} to={`/properties?type=${cat._id}`}>{lang === 'en' ? cat.name_en : cat.name_ar}</Link>
             ))
           }
        </div>
      </li>
      <li className={`nav-item nav-item-menu ml-2 ${active === '/#testimonails' || window.location.hash === "#testimonails" ? 'activeLink' : ''}`}>
        <a className="nav-link text-dark" onClick={e => setActive('/#testimonails')}  href="/#testimonails">{getStr('testimonails')}</a>
      </li>
      <li className={`nav-item nav-item-menu ml-2 ${active === '/blog' || path === "/blog" ? 'activeLink' : ''}`}>
        <Link className="nav-link text-dark" to="/blog" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={e => setActive('/blog')}>{getStr('blog')}</Link>
      </li>
      <li className={`nav-item nav-item-menu ml-2 ${active === '/contact' || path === "/contact" ? 'activeLink' : ''}`}>
        <Link className="nav-link text-dark" to="/contact" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={e => setActive('/contact')}>{getStr('contact')}</Link>
      </li>
      <li className="nav-item ml-2 d-flex">
        <a href={`tel:${aboutData.phone}`} className="nav-link nav-number text-dark m-0 d-flex" dir="ltr">
          <i className="fa fa-phone"></i>
          {aboutData.phone}
        </a>
      </li>
      <li className="nav-item ml-2">
          {
            lang === 'en' ? <Link className="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" style={{fontFamily:'Cairo, sans-serif'}} to={pathname} onClick={e => onChangeLanguge('ar')}><img src={ar_flag} alt="ar"  /> العربية</Link>
            : <Link className="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to={pathname} onClick={e => onChangeLanguge('en')}><img src={en_flag} style={flagStyle} alt="en" /> English</Link>

          }
      </li>
    </ul>
  </div>
</nav>
  );
};

Navbar.propTypes = {
  language: PropTypes.object.isRequired,
  setLanguage: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
}

const mapState = state => {
  return {
    language: state.language,
    category: state.category
  }
}


export default connect(mapState, {setLanguage, getCategories})(Navbar);
