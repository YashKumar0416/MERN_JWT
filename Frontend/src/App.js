import React, { createContext, useReducer } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './Components/Home'
import About from './Components/About'
import Login from './Components/Login'
import Logout from './Components/Logout'
import Register from './Components/Register';
import Contact from './Components/Contact';
import Error from './Components/Error';
import { initialState, reducer } from './Reducer/UseReducer';

export const UserContext = createContext();

const App = () => {
  
  const [state, dispatch] = useReducer(reducer, initialState);

  const Navbar = ()=> {
    if(state) {      
      return (
      <div className="navbar">
      <h1 className='navbarTitle'>MERN Stack</h1>
      <ul>

        <NavLink to='/' style={{textDecoration: "none"}}>
        <li><h4>Home</h4></li>
        </NavLink>
        <NavLink to='/about' style={{textDecoration: "none"}}>
        <li><h4>About</h4></li>
        </NavLink>
        <NavLink to='/contact' style={{textDecoration: "none"}}>
        <li><h4>Contact Us</h4></li>
        </NavLink>
        <NavLink to='/logout' style={{textDecoration: "none"}}>
        <li><h4>Logout</h4></li>
        </NavLink>
      </ul>
    </div>)
    } else {
      return (
      <div className="navbar">
      <h1 className='navbarTitle'>MERN Stack</h1>
      <ul>

        <NavLink to='/' style={{textDecoration: "none"}}>
        <li><h4>Home</h4></li>
        </NavLink>
        <NavLink to='/about' style={{textDecoration: "none"}}>
        <li><h4>About</h4></li>
        </NavLink>
        <NavLink to='/contact' style={{textDecoration: "none"}}>
        <li><h4>Contact Us</h4></li>
        </NavLink>
        <NavLink to='/register' style={{textDecoration: "none"}}>
        <li><h4>Register</h4></li>
        </NavLink>
        <NavLink to='/login' style={{textDecoration: "none"}}>
        <li><h4>Login</h4></li>
        </NavLink>
      </ul>
    </div>
      )
    }

  };
  
  return (
    <>

    <Navbar />

    <UserContext.Provider value={{state, dispatch}}>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/logout' element={<Logout />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='*' element={<Error />}></Route>
      </Routes>
    </UserContext.Provider>
    </>
  )
}

export default App