import React, { useContext } from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'

const Navbar = () => {
  const {user}=useContext(AuthContext)
  return (
  <>
  <div className="navbar">
    <div className="navContainer">
    <Link to="/" style={{color:"inherit", textDecoration:"none", cursor:"pointer"}} >
<span className="nav-logo">Shaan Booking</span>
</Link>
{user ? user.userName:
  <div className="navItems">
    <button className="nav-btns">Register </button>
       
        <button className="nav-btns">Login</button>
</div>}
    </div>
  </div>
  </>
  )
}

export default Navbar

