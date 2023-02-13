import React, { useEffect, useState } from 'react';
import Header from '../Nav/Header';
import Footer from '../Footer';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
const ForgotPassword = ({history}) => {
    const [email, setEmail] = useState();
    const {user} = useSelector((state) => ({ ...state }));
    useEffect(() => {
        if(user != null){
            history.push("/");
        }
    },[user]);
    const config = {
        url: 'http://localhost:3000', 
        handleCodeInApp: true
    }
    const auth = getAuth();

    const handleSubmit = () => {
        console.log(email);
        sendPasswordResetEmail(auth, email, config)
            .then(() => {
                toast.success("password reset sent successfully");
                setEmail("");
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage);
            });
    }

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row mt-5 mb-5">
                    <div className="col-md-4 mt-5 mb-5"></div>
                    <div className="col-md-4 mt-5 mb-5">
                        <h4 className="text-center">Forgot Password</h4>
                        <br/>
                        <input className="form-control" placeholder="email" onChange={e => setEmail(e.target.value)} />
                        <button className="btn" onClick={handleSubmit}>Send Reset Link</button>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ForgotPassword;