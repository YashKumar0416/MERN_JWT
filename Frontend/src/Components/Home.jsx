import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "../App.css";
import { UserContext } from '../App';
import { useContext } from 'react';

const Home = () => {

  const { state, dispatch} = useContext(UserContext);

  const [name, setName] = useState('');
  const [show, setShow] = useState(false);

  useEffect(()=> {
    getData();
  }, [])

  const getData = async ()=> {
    try {
            
      const res = await fetch('http://localhost:8000/getdata', {
          method: "GET",
          headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "applicaion.json",
              "Accept": "application.json"
          },
          credentials: "include"
      });
      
      const data = await res.json();
      // console.log(data)
      setName(data.name);
      setShow(true);
      dispatch({type: "USER", payload: true});

      if(!res.status === 200) {
          const error = new Error(res.error);
          throw error;
      }

    } catch (error) {
        console.log(error)
        // navigate('/login')
    }
  };

  return (
    <>
      <div className="container">
        <div className='container_home'>
          <h2 className='title'> <span>W</span>elcome To My <span className='extra'> MERN </span>Project</h2>
          <h1 className='user'> { show ? `Happy to see you back, ${name}`:''}</h1>
        </div>
      </div>
    </>
  )
}

export default Home;