import {Outlet, useNavigate} from "react-router-dom";
import React from "react";

const GuestGuard = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            navigate('/');
        }
    }, [window.location.pathname]);

    return <Outlet />
}

export default GuestGuard;
