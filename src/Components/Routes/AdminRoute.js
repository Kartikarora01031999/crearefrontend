import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
const AdminRoute = ({ children, ...rest }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if (user && user.token) {
            if (user.role === "admin") {
                setOk(true);
            }
            else {
                setOk(false);
            }
        }
    }, [user]);
    return ok ? (
        <Route {...rest} render={() => children}></Route>
    )
        : (
            <LoadingToRedirect />
        );
};

export default AdminRoute;