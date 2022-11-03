import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';
import './SignUp.css';

const SignUp = () => {
    const [passError, setPassError] = useState(null);
    const {createUser} = useContext(AuthContext);

    const handleSubmit = e => {
        e.preventDefault();
        setPassError(null)
        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        // console.log(email, password, confirm)
        if (password !== confirm) {
            setPassError('Your password did not match !')
        }
        if (!/[a-zA-Z0-9]{6,}/.test(password || confirm)) {
            setPassError('Your password will be 6 digitS !')
        }

        createUser(email, password)
        .then((results) => {
            const user = results.user;
            console.log(user);
            alert("success");
            form.reset();
        })
        .catch((error) => {
            console.error(error)
        })
    }
    return (
        <div className='form-container'>
            <h3 className='form-title'>SignUp</h3>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input name='email' type="email" placeholder='Enter the email..' required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input name='password' type="password" placeholder='Enter the password..' required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Confirm</label>
                    <input name='confirm' type="Password" placeholder='Enter confirm password..' required />
                </div>
                <small className='text-error'>{passError}</small>
                <input className='btn-submit' type="submit" value="SignUp" />
            </form>
            <p>Already have an account <Link to='/login'>Login</Link></p>
        </div>
    );
};

export default SignUp;