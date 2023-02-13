import React from 'react';
import {Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import LoadinToRedirect from './LoadingToRedirect';
const UserRoute = ({children,...rest}) =>{
const {user} = useSelector((state) => ({...state}));
    return user && user.token ? (
    <Route {...rest} render={() => children}></Route>
    ): (
    <LoadinToRedirect/>
    );
};

export default UserRoute;