import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '', email: '', phone: '', work: '', password: '', cpassword: ''
  })
  
  
  let name,value;
  const handleInputs = (e)=> {
    name = e.target.name;
    value = e.target.value;
    setUser({...user, [name]: value})
  };
  
  const saveDetails = async (e)=> {
    e.preventDefault();
    const {name, email, phone, work, password, cpassword} = user;
    
    const res = await fetch('http://127.0.0.1:8000/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, work, password, cpassword})
    })
    // console.log(res)
    
    const data = await res.json();
    
    if(res.status === 400 || !data) {
      window.alert("Invalid Registration")
      console.log("Invalid Registration")
    } else {
      window.alert("Successfull Registration")
      console.log("Successfull Registration")
      navigate('/login')
    }
  };

  return (
    <>
    <div className="container">
        <form method='POST' className='register_container'>
            <h3>Register Here</h3>
            <input className='register_sections' type="text" onChange={handleInputs} value={user.name} name='name' placeholder='Enter Name'/>
            <input className='register_sections' type="text" onChange={handleInputs} value={user.email} name='email' placeholder='Enter Email'/>
            <input className='register_sections' type="number" onChange={handleInputs} value={user.phone} name='phone' placeholder='Enter Phone'/>
            <input className='register_sections' type="text" onChange={handleInputs} value={user.work} name='work' placeholder='Enter Work'/>
            <input className='register_sections' type="password" onChange={handleInputs} value={user.password} name='password' placeholder='Enter Password'/>
            <input className='register_sections' type="password" onChange={handleInputs} value={user.cpassword} name='cpassword' placeholder='Enter Confirm Password'/>
            <input className='register_sections submit_button' type='submit' onClick={saveDetails} value='Submit' />
            <div className='links'>
            <NavLink to='/login' style={{textDecoration: "none"}}> <p  className='register_sections colors'>Login</p> </NavLink>
            <NavLink to='/' style={{textDecoration: "none"}} > <p  className='register_sections colors'>Home</p> </NavLink>
            </div>
        </form>
    </div>
    </>
  )
}

export default Register;