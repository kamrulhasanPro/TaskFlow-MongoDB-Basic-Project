import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../Hooks/useAuth';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';

const Register = () => {
    const {registerUser, logoutUser} = useAuth()
      const navigate = useNavigate()
    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(name, email, password);
        registerUser(email, password)
        .then(res => {
            // console.log(res.user);
            updateProfile(res.user, {displayName: name})
            .then(() => {
                logoutUser()
                .then()
                .catch(err => toast.error(err.code))
            })
            .catch()
            toast.success('Register success please login')
            e.target.reset()
            navigate('/login')
        })
        .catch(err => {
            toast.error(err.code)
        })
    }
        return (
        <div className='bg-success/30 backdrop-blur-md rounded-xl p-7 text-black w-4-/12 sm:w-7/12  mx-auto'>
            <p className='text-3xl text-center text-white mb-8'>Register user</p>
            <form onSubmit={handleRegister} className='flex flex-col gap-4'>
                <input type="text" placeholder='Enter Your Name' name='name' className='my-input'/>
                <input type="email" name='email' placeholder='Enter Your email' className='my-input'/>
                <input type="password" name='password' placeholder='Enter New Password' className='my-input'/>
                <button className='btn mt-4 text-xl'>Register</button>
            </form>

            <p className='text-center mt-4 text-white'>Already have an account. <Link to={'/login'} className='text-black underline'>Login</Link></p>
        </div>
    );
};

export default Register;