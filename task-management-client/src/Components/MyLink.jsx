import React from 'react';
import { NavLink } from 'react-router';

const MyLink = ({children, to}) => {
    const defaultStyle = 'text-xl font-medium'
    return (
        <li>
            <NavLink to={to} className={({isActive}) => isActive ? `${defaultStyle} text-emerald-400` : defaultStyle}>{children}</NavLink>
        </li>
    );
};

export default MyLink;