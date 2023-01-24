import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Login = () => {

  const { state, dispatch } = useContext(UserContext); 

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const saveDetails = async (e)=> {
    e.preventDefault();

    const res = await fetch('http://localhost:8000/login', {
      method:"POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    })
    
    const data = res.json();
    console.log(res)
    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials")
    } else {
      dispatch({type: "USER", payload: true})
      window.alert("Login Successfull")
      navigate('/')
    }
  };

  return (
    <>
      <div className="container">
        <form method='POST' className="login_container">
          <h3>Login Here</h3>
          <input className='login_sections' type="text" onChange={(event)=> {setEmail(event.target.value)}} value={email} placeholder='Enter Email'/>
          <input className='login_sections' type="password" onChange={(event)=> {setPassword(event.target.value)}} value={password} placeholder='Enter Password'/>
          <input className='login_sections submit_button' type='submit' onClick={saveDetails} value='Submit' />
          <div className="links">
          <NavLink style={{textDecoration: "none"}} to='/register'> <p className='login_sections colors'>Register</p> </NavLink>
          <NavLink style={{textDecoration: "none"}} to='/'> <p className='login_sections colors'>Home</p> </NavLink>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login;