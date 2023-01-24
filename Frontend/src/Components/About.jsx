import React, { useEffect, useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from "../App"

const About = () => {

    const {state, dispatch} = useContext(UserContext);

    const navigate = useNavigate();
    const [data, setData] = useState({});

    useEffect(()=> {
        getData();
    }, []);

    const getData = async ()=> {
        try {
            const res = await fetch('http://localhost:8000/about', {
                method: "GET",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Accept" : "application.json",
                    "Content-Type": "application.json"
                },
                credentials: 'include'
            });

            const data = await res.json();
            // console.log(data);
            setData(data);

            if(!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
            dispatch({type: "USER", payload: true})
            // navigate('/about')
        } catch (err) {
            console.log(err)
            navigate('/login');
        }
    };

  return (
    <>
        <div className="container">
            <div className="left_details">
                <h1 className='aboutus'>A</h1>
                <h1 className='aboutus'>b</h1>
                <h1 className='aboutus'>o</h1>
                <h1 className='aboutus'>u</h1>
                <h1 className='aboutus'>s</h1>
                <h1 className='aboutus'>U</h1>
                <h1 className='aboutus'>s</h1>
            </div>
            <div className="right_details">
                <h3>Name : <span className='aboutusdetails'> {data.name}</span></h3>
                <h3>Email : <span className='aboutusdetails'> {data.email}</span></h3>
                <h3>Phone : <span className='aboutusdetails'> {data.phone}</span></h3>
                <h3>Work : <span className='aboutusdetails'> {data.work}</span></h3>
            </div>
        </div>
    </>
  )
}

export default About;