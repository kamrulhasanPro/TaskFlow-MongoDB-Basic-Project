import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthContext';

const useAuth = () => {
    return useContext(AuthContext);
};

export {useAuth};