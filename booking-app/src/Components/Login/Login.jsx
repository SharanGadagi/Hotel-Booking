import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {


const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
    // auth context
  const { user,loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
console.log(user)


  return (
    <>
<div className="login">
    <div className="l-container">
        <input type="text" placeholder='Enter Your UserName' id='userName' className='l-input' onChange={handleChange}/>
        <input type="password" placeholder='Enter Your Password' className='l-input' id='password'  onChange={handleChange}/>
        <button className="login-btn" onClick={handleClick}>LOGIN</button>
        {error && <span className='err-msg'>{error.message} </span> }
    </div>
</div>
    </>
  )
}

export default Login