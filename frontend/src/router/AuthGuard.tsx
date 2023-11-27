import {Outlet, useNavigate} from "react-router-dom";
import React from "react";

const AuthGuard = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            navigate('/login');
        }
    }, [window.location.pathname]);

    return <Outlet />
}

export default AuthGuard;
