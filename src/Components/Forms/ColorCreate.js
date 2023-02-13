import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createColor } from "../../Functions/colors";
import SideNav from "../Nav/SideNav";

const ColorCreate = () => {
    const [sideNav, setSideNav] = useState(true);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const {user} = useSelector((state)=>({...state}));
    const handleSubmit = () => {
        if(name === "" || price === "" || description === ""){
            toast.warning("Please fill all the fields");
        }else{
            createColor(name,price, description, user.token).then((res) => {
                toast.success(res.data.message);
                setName("");
                setPrice("");
                setDescription("");
            }).catch(err => console.log(err));
        }
        
    }

    return (
        <div className="container-fluid">
            <div className="d-flex">
                {sideNav ? <SideNav /> : ""}
                <div className="col-md-9 ml-3">
                    <i onClick={() => setSideNav(!sideNav)} className="fas fa-bars" style={{ cursor: 'pointer' }}></i>
                    <div >
                        <h1>Create Color</h1>
                        <label>Color Code:</label>
                        <input className='form-control' onChange={e => setName(e.target.value)} />
                        <label>Color Price:</label>
                        <input className='form-control' onChange={e => setPrice(e.target.value)} />
                        <label>Color Description:</label>
                        <input className='form-control' onChange={e => setDescription(e.target.value)} />
                        <button className='btn' onClick={handleSubmit}>Create Color</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ColorCreate;