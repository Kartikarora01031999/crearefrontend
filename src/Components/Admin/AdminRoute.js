import React,{useEffect, useState} from 'react';
import {Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import LoadinToRedirect from './LoadingToRedirect';
import {currentAdmin} from '../../Functions/Auth';
const AdminRoute = ({children,...rest}) =>{
const {user} = useSelector((state) => ({...state}));
const [ok,setOk] = useState(false);

useEffect(() =>{
if( user && user.token){
currentAdmin(user.token)
.then((res)=>{
    setOk(true);
}).catch((err)=>{
    setOk(false);
});
}
},[user]);
    return ok ?  (
    <Route {...rest} render={() => children}></Route>
    ) 
    : (
        <LoadinToRedirect/>
        );
};

export default AdminRoute;