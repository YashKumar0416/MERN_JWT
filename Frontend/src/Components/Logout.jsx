import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Logout = () => {

    const {state, dispatch} = useContext(UserContext)

    const navigate = useNavigate();

    useEffect(()=> {
        fetch('http://localhost:8000/logout', {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            credentials: 'include'
        }).then((res)=> {
            dispatch({type: "USER", payload: false})
            navigate('/');
            if(res.status != 200) {
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err)=> {
            console.log(err);
        })
    });

  return (
    <div className="container">
    <div className='logout'><h1>Logout Successfull</h1></div>
    </div>
  )
}

export default Logout;