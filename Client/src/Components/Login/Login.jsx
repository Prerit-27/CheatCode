import React, { useCallback, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGooglePlus , faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import "./Login.css"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (

        <div className='login-card'>
            <img id="login-logo" src="https://img.icons8.com/?size=100&id=wDGo581Ea5Nf&format=png&color=000000" alt="Login" />
            <div className='login-form'>
                <div className='login-sub-from'>
                    <input className='login-field' onChange={(e) => {setEmail(e.target.value)}} type="text" name='email' placeholder='Username or Email'/>
                </div>
                <br />
                <br />
                <div className='login-sub-form'>  
                    <input className='login-field' onChange={(e) => {setPassword(e.target.value)}} name='password' type="text" placeholder='Password'/>
                </div>
                <br />
                <br />
                <button className='login-btn' onClick={async (e) => {
                    const response = await fetch('http://localhost:3000/login', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json', 
                        },
                        body: JSON.stringify({
                            email: email,
                            password: password, 
                        }),
                    });
                    const json = await response.json();
                    localStorage.setItem("token", json.token)

                }} type="submit">Sign In</button>
            </div>
            <div className='login-post-form'>
                <div className='post-t1'>Forgot Password?</div>
                <div className='post-t2'>Sign Up</div>
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

export default Login

