import React, { useState } from "react";
import SideNav from "../Nav/SideNav";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
const VirtualProductCreate = () => {
    const [sideNav, setSideNav] = useState(true);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [Fabric, setFabric] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [desc, setDesc] = useState("");
    const { user } = useSelector((state) => ({ ...state }));

    const handleSubmit = () => {
    }

    const fileUploadAndResize = (e) => {

        //resize 
        let files = e.target.files;
        let allUploadedFiles = [];
        if (files) {
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0,
                    (url) => {
                        axios.post(`http://127.0.0.1:5000/api/uploadimages`, { image: url }, {
                            headers: {
                                authtoken: user ? user.token : "",
                            }
                        })
                            .then((res) => {
                                allUploadedFiles.push(res.data);
                            })
                            .catch((error) => {
                                console.log(error);
                            })

                    }, "base64");

            }
        }
        //send ack to server to upload to cloudinary

        //set url to images arraay in the parent components i.e productCreate
    }
    return (
        <div className='container-fluid'>
            <div className='d-flex'>
                {sideNav ? <SideNav /> : ""}
                <div className='col-md-9 ml-3'>
                    <i onClick={() => setSideNav(!sideNav)} className="fas fa-bars" style={{ cursor: 'pointer' }}></i>
                    <h1>Create Virtual Product</h1>
                    <input className="form-control" multiple type="file" accept="image/*" onChange={fileUploadAndResize} />
                    <label>Product Name:- </label>
                    <input className="form-control" onChange={e => setName(e.target.value)} />
                    <label>Product Price:- </label>
                    <input className="form-control" onChange={e => setPrice(e.target.value)} />
                    <label>Product Fabric:- </label>
                    <input className="form-control" onChange={e => setFabric(e.target.value)} />
                    <label>Fabric Price:- </label>
                    <input className="form-control" />
                    <label>Product Color:- </label>
                    <input className="form-control" onChange={e => setColor(e.target.value)} />
                    <label>Product Size:- </label>
                    <input className="form-control" onChange={e => setSize(e.target.value)} />
                    <label>Product Description:- </label>
                    <textarea className="form-control" rows="5" onChange={e => setDesc(e.target.value)} />
                    <button onClick={handleSubmit} className="btn btn-primary" style={{ marginLeft: '0px' }}>Create Product</button>
                </div>
            </div>
        </div>
    );
}

export default VirtualProductCreate;