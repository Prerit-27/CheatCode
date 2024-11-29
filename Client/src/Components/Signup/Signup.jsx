import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGooglePlus , faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import "./Signup.css"

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); 
    const [email, setEmail] = useState("");

    return (
        <div className='signup-card'>
            <img id="login-logo" src="https://img.icons8.com/?size=100&id=wDGo581Ea5Nf&format=png&color=000000" alt="Login" />
            <div className='login-form'>
                <div className='login-sub-from'>
                    <input onChange={(e) => {setUsername(e.target.value)}} className='login-field' name='username' type="text" placeholder='Username'/>
                </div>
                <br />
                <div className='login-sub-form'>  
                    <input onChange={(e) => {setPassword(e.target.value)}} className='login-field' name='password' type="text" placeholder='Password'/>
                </div>
                <br />
                <div className='login-sub-form'>  
                    <input onChange={(e) => {setEmail(e.target.value)}} className='login-field' name='email' type="text" placeholder='E-mail address'/>
                </div>
                <br />
                <button className='login-btn' onClick={async (e) => {
                    const response = await fetch('http://localhost:3000/signup', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: username,
                            password: password,
                            email: email,
                        }),
                    });

                    const json = await response.json();
                    console.log(json);
                }} type="submit">Sign Up</button>
            </div>
            <br />
            <div className='signup-post-form, post-t1'>
                Have an account? Sign In
            </div>
            <div className='alt-login'>
                <div className='alt-login-text'>or you can sign in with</div>
                <br />
                <div className='alt-login-icons'>
                    <div className='licon'><FontAwesomeIcon icon={faGooglePlus}  size="2x" color='grey'/></div>
                    <div className='licon'><FontAwesomeIcon icon={faGithub} size="2x" color='grey'/></div>
                    <div className='licon'><FontAwesomeIcon icon={faFacebook} size="2x" color='grey'/></div>
                    <div className='licon'><FontAwesomeIcon icon={faLinkedin} size="2x" color='grey'/></div>
                    

                </div>
            </div>
        </div>
    )
}

export default Signup