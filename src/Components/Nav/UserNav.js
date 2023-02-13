import React from 'react';
import promo1 from "../../Images/promo1.jpg";
import { Link, useHistory } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
const UserNav = () =>{
    const auth = getAuth();
    const dispatch = useDispatch();
    const history = useHistory();
    const handleLogout = () =>{
        signOut(auth).then(() => {
            dispatch({
                type: 'LOGOUT',
                payload: null
            });
            history.push("/");
        }).catch((error) => {
            console.log(error);
        });
    }
    return(
        <div className="col-md-2" style={{ borderRight: '1px solid', padding: '0px' }}>
                        <div className="d-flex justify-content-center">
                            <img src={promo1} style={{ width: '90px', borderRadius: '50%' }} alt="User Name" />
                        </div>
                        <div className="text-center">
                            <Link className="userNav">Manage Profile</Link>
                            <Link to="/design-your-own" className="userNav">Create Virtual Try On</Link>
                            <Link to="/products"className="userNav">View Products</Link>
                            <Link className="userNav">My Orders</Link>
                            <Link to="/cart" className="userNav">Manage Cart</Link>
                            <p   style={{ cursor: 'pointer', color: '#65541D', fontSize: '20px', fontWeight: '700' }} onclick={handleLogout} className="userNav">Logout</p>
                            <Link  to="/terms-and-conditions" className="userNav"><i className="fas fa-user-cog"></i> Terms And conditions</Link>
                            <Link to="/policy" className="userNav"><i className="fas fa-shield-alt"></i> Privacy Policy</Link>
                            <Link to="/contact-us" className="userNav">Contact Us</Link>
                        </div>
                    </div>
    );
}

export default UserNav;