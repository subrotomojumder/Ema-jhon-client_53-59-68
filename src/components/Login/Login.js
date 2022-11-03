import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';
import './Login.css'

const Login = () => {
    const { signIn } = useContext(AuthContext)
    const [passError, setPassError] = useState(null);
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    // console.log(location)
    // console.log(from)

    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        setPassError(null)
        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password, confirm)

        if (!/[a-zA-Z0-9]{6,}/.test(password)) {
            setPassError('Your password will be 6 digitS !')
        }

        signIn(email, password)
            .then((results) => {
                // const user = results.user;
                // console.log(user);
                form.reset();
                // alert("success");
                navigate(from, {replace: true})
            })                        
            .catch(error => {
                console.error(error)
            })
    }
    return (
        <div className='form-container'>
            <h3 className='form-title'>Login</h3>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input name='email' type="email" placeholder='Enter the email..' required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input name='password' type="password" placeholder='Enter the password..' required />
                </div>
                <input className='btn-submit' type="submit" value="Login" />
            </form>
            <small className='text-error'>{passError}</small>
            <p>New to Ema-john <Link to='/signup'>Create a new account</Link></p>
        </div>
    );
};

export default Login;