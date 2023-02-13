import { setTwoToneColor } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getSingleColorById, updateColor } from "../../Functions/colors";
import SideNav from "../Nav/SideNav";

const EditColor = ({ match }) => {
    const [sideNav, setSideNav] = useState(true);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [color, setColor] = useState({});
    const [description, setDescription] = useState("");

    const {user} = useSelector((state)=> ({...state}));
    useEffect(()=>{
        loadSingleColor();
    },[user]);
    const loadSingleColor = () =>{
        getSingleColorById(match.params.id).then((res)=>{
            setColor(res.data.color);
            setName(res.data.color.color_name);
            setPrice(res.data.color.color_price);
            setDescription(res.data.color.color_description);
        })
        .catch(err=> console.log(err));
    }
    const handleSubmit = () => {
        updateColor(color._id.$oid, name, price, description, user.token)
        .then(res => {
            toast.success(res.data.message);
            setName("");
            setPrice("");
            setDescription("");
        })
        .catch(err => console.log(err));
    }
    return (
        <div className="conatainer-fluid">
            <div className="d-flex">
                {sideNav ? <SideNav /> : ""}
                <div className="col-md-9 ml-3">
                    <i className="fa fa-bars" onClick={() => setSideNav(!sideNav)} style={{ cursor: 'pointer' }}></i>
                    <div>
                        <h1>Edit Color</h1>
                        <label>Color Code:</label>
                        <input value={name} className='form-control' onChange={e => setName(e.target.value)} />
                        <label>Color Price:</label>
                        <input value={price} className='form-control' onChange={e => setPrice(e.target.value)} />
                        <label>Color Description:</label>
                        <input value={description} className='form-control' onChange={e => setDescription(e.target.value)} />
                        <button className='btn' onClick={handleSubmit}>Create Color</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditColor;