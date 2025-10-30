import React from 'react';
import { useAuth } from '../Hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loader} = useAuth()

    if(loader){
        return <p className='text-center text-pink-400'>Loading.........</p>
    }

    if(user){
        return children
    }

    return <Navigate to={'/login'}></Navigate>;
};

export default PrivateRoute;