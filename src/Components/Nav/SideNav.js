import React from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const SideNav = () => {
    const auth = getAuth();
    const dispatch = useDispatch();
    let history = useHistory();
    const handleSignOut = () => {
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
    return (
        <div>
            <div className=''>
                <ul style={{ listStyleType: 'none', padding: '0px', width: '350px' }}>
                    <li style={{ fontSize: '24px', fontWeight: '600', textAlign: 'center' }}>Admin Panel</li>
                    <li style={{ fontSize: '18px', fontWeight: '400', paddingBottom: '10px 10px', border: '1px solid #977867', textAlign: 'center' }}>
                        <Link to="/orders">User Orders</Link>
                    </li>
                    <li style={{ fontSize: '18px', fontWeight: '400', paddingBottom: '10px 10px', border: '1px solid #977867', textAlign: 'center' }}>
                        <Link to="/admin/all-products">Products</Link>
                    </li>
                    <li style={{ fontSize: '18px', fontWeight: '400', paddingBottom: '10px 10px', border: '1px solid #977867', textAlign: 'center' }}>
                        <Link to="/admin/create-product">Create Product</Link>
                    </li>
                    <li style={{ fontSize: '18px', fontWeight: '400', paddingBottom: '10px 10px', border: '1px solid #977867', textAlign: 'center' }}>
                        <Link to="/admin/all-fabric">Fabrics</Link>
                    </li>
                    <li style={{ fontSize: '18px', fontWeight: '400', paddingBottom: '10px 10px', border: '1px solid #977867', textAlign: 'center' }}>
                        <Link to="/admin/create-fabric">Create Fabric</Link>
                    </li>
                    <li style={{ fontSize: '18px', fontWeight: '400', paddingBottom: '10px 10px', border: '1px solid #977867', textAlign: 'center' }}>
                        <Link to="/admin/colors">Colors</Link>
                    </li>
                    <li style={{ fontSize: '18px', fontWeight: '400', paddingBottom: '10px 10px', border: '1px solid #977867', textAlign: 'center' }}>
                        <Link to="/admin/create-color">Create Color</Link>
                    </li>
                    <li style={{ fontSize: '18px', fontWeight: '400', paddingBottom: '10px 10px', border: '1px solid #977867', textAlign: 'center' }}>
                        <span style={{ cursor: 'pointer', color: '#65541D', fontSize: '20px', fontWeight: '700' }} onClick={handleSignOut}>Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SideNav;