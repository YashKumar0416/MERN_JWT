import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import emailpic from "../email.png";
import { UserContext } from "../App";
import { useContext } from 'react';

const Contact = () => {

    const { state, dispatch} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(()=> {
        getData();
    }, []);

    const [userdata, setUserData] = useState({
        name: '', email: '', phone: '', message: ''
    })

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
            setUserData({...userdata, name: data.name, email: data.email, phone: data.phone});
            dispatch({type: "USER", payload: true})

            if(!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error)
            navigate('/login')
        }
    };
        
    const saveData = async (e)=> {
        e.preventDefault();

        const { name, email, phone, message} = userdata;

        const res = await fetch('http://localhost:8000/contact', {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
                name, email, phone, message
            })
        });

        const data = await res.json();
        // console.log(data)
        if(!data) {
            console.log("Message not send")
        }else {
            alert('Message send')
            setUserData({...userdata, message:''})
        }
    };

    const handleInputs = (e)=> {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({...userdata, [name]: value})
    };

  return (
    <>
        <div className="container">
            <div className="contact_container">
            <div className="upper">
                <h1>Having Any Issues, Contact Us</h1>
            </div>
            <div className="lower">
                <div className="left_container">
                    <img src={emailpic} alt="email pic" className="imgsrc" />
                </div>
                <div className="right_container">
                        <form method='POST' className="contact_form">
                            <input className='contact_sections' onChange={handleInputs} type="text" readOnly='true' value={userdata.name} name='name'/>
                            <input className='contact_sections' onChange={handleInputs} type="text" readOnly='true'  value={userdata.email} name='email'/>
                            <input className='contact_sections' onChange={handleInputs} type="text" readOnly='true'  value={userdata.phone} name='phone'/>
                            <textarea className='contact_sections' onChange={handleInputs} type="textarea" rows={4} value={userdata.message} placeholder='Type your message here' name='message' />
                            <input className='contact_sections submit_button' onClick={saveData} type="submit" placeholder='Send Message' />
                        </form>
                    
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default Contact;