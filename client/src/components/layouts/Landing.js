import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";

const Landing = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    if (isAuthenticated) {
        return <Redirect to="/tests"></Redirect>
    }

    return (
        <div className='display-4 text-center'>
            F Indian Education Sytem
        </div>
    )
}

export default Landing;
