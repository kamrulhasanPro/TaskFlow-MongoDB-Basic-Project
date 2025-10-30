import React from 'react';
import { Link } from 'react-router';

const Home = () => {
    return (
        <div className='grow flex flex-col items-center justify-center md:w-[50vw] mx-auto text-center gap-3'>
            <h1 className='text-2xl font-medium'>This is TaskFlow management application.</h1>
            <p className='text-lg '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore accusantium beatae qui quo. Deserunt exercitationem similique, culpa temporibus voluptas rem.</p>
            <Link to={'/task-flow'}  className='btn btn-success text-white text-xl'>Dashboard</Link>
        </div>
    );
};

export default Home;