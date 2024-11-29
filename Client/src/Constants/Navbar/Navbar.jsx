import React from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'

const Navbar = () => {
  return (
    <div id='navbar-main' className='flex-row'>
      <Link to={'/'}>
        <div className="logo-box flex-row, options-left"> 
          <img className='logo' src="https://user-images.githubusercontent.com/63964149/152531278-5e01909d-0c2e-412a-8acc-4a06863c244d.png" alt="logo" /> 
        </div>
      </Link>
      <div className="nav-options options-left">
        <Link to={'/'} >Explore</Link>
      </div>
      <div className="nav-options options-left">
        <Link to={'/problems'} >Problems</Link>
      </div>
      <div className="nav-options options-left, nav-last-item">
        <Link to={'/'} >Contest</Link>
      </div>  

      <div className="nav-options, options-right">
        <Link to={'/signup'} >Register</Link> 
      </div>
      <div className="nav-options, options-right">
        <Link to={'/login'} >Sign In</Link>
      </div>
    </div>
  )
}

export default Navbar