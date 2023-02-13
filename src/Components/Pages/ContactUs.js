import React, { useEffect, useState } from "react";
import Header from '../Nav/Header';
import Footer from '../Footer';
import { sendQuery } from "../../Functions/user";
import { toast } from "react-toastify";

const ContactUs = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const ValidateEmail = (mail) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }

    const phonenumber = (inputtxt) => {
        var phoneno = /^\d{10}$/;
        if ((inputtxt.match(phoneno))) {
            return true;
        }
        else {
            return false;
        }
    }

    const handleSubmit = () => {
        if (name === "" || email === "" || phone === "" || message === "") {
            toast.warning("Please fill all the fields");
        } else if (!ValidateEmail(email)) {
            toast.warning("Please enter valid email");
        } else if (!phonenumber(phone)) {
            toast.warning("Please enter a valid phone number");
        } else {
            sendQuery(name, email, phone, message).then((res) => {
                toast.success(res.data.success);
                setPhone("");
                setName("");
                setEmail("");
                setMessage("");
            }).catch(err => console.log(err));
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Header />
            <div className="container-fluid">
                <div className="row mb-3 mt-3">
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-4">
                        <h5 className="text-center">Please get in touch</h5>
                        <p className="text-center">We'd love to hear from you!</p>
                        <input value={name} className="form-control" onChange={e => setName(e.target.value)} required placeholder="Name" />
                        <br />
                        <input value={email} className="form-control" onChange={e => setEmail(e.target.value)} required placeholder="Email" />
                        <br />
                        <input value={phone} className="form-control" onChange={e => setPhone(e.target.value)} required placeholder="Phone" />
                        <br />
                        <textarea value={message} className="form-control" onChange={e => setMessage(e.target.value)} style={{ resize: 'none' }} rows="7" required placeholder="Message" />
                        <br />
                        <button onClick={handleSubmit} className="btn btn-secondry">Send</button>
                    </div>
                    <div className="col-md-4">
                    </div>
                </div>
                <h4 className="text-center mt-5" style={{textDecoration:'underline'}}>Office Address</h4>
                <p className="text-center"><b>Address: </b>15, Lord krishna Residency, teg bahadur Road</p>
                <p className="text-center"><b>Contact number: </b>9997066555</p>
            </div>
            <Footer />
        </div>
    );
}

export default ContactUs;