import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createProduct, createVirtualProduct } from "../../Functions/product";
import SideNav from "../Nav/SideNav";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar, Badge } from "antd";
import { ReactSVG } from "react-svg";
import { LoadingOutlined } from "@ant-design/icons";
const ProductCreate = () => {
    const [sideNav, setSideNav] = useState(true);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [Fabric, setFabric] = useState("");
    const [size, setSize] = useState("");
    const [sizePrice, setSizePrice] = useState("");
    const [sizeQuantity, setSizeQuantity] = useState("");
    const [desc, setDesc] = useState("");
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState("");
    const [sizeArr, setSizeArr] = useState([]);
    const [quantity, setQuantity] = useState("");
    const [type, setType] = useState("normal");
    const [image, setImage] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));
    const [loading, setLoading] = useState(false);
    const [virtualPrice, setVirtualPrice] = useState("");
    // Functions for normal products
    const fileUploadAndResize = (e) => {
        let files = e.target.files;
        let allUploadedFiles = [];
        setLoading(true);
        if (files) {
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(files[i], 1080, 1080, 'PNG', 100, 0,
                    (url) => {
                        axios.post(`http://127.0.0.1:5000/api/admin/upload`, { file: url }, {
                            headers: {
                                authorization: user ? user.token : "",
                            }
                        })
                            .then((res) => {
                                allUploadedFiles.push(res.data.url);
                                setImages(oldArray => [...oldArray, res.data]);
                                setLoading(false);
                            })
                            .catch((error) => {
                                setLoading(false);
                            })
                    }, "base64");

            }
        }
    }

    const handleRemove = (public_id) => {
        axios.post(`http://127.0.0.1:5000/api/admin/delete`, { public_id },
            {
                headers: {
                    authorization: user ? user.token : "",
                }
            }).then(res => {
                setImages(images.filter(item => item.public_id !== public_id))
                toast.success(res.data.message);
            }).catch(err => console.log(err));
    }

    // Functions for Virtual Products

    const uploadImage = (e) => {
        setLoading(true);
        if (e.target.files.length != 0) {
            for (let index = 0; index < e.target.files.length; index++) {
                const data = new FormData()
                data.append("file", e.target.files[index])
                data.append("upload_preset", "creareImageReactUpload")
                data.append("cloud_name", "dh2xvnaf8")
                fetch("https://api.cloudinary.com/v1_1/dh2xvnaf8/image/upload", {
                    method: "post",
                    body: data
                })
                    .then(resp => resp.json())
                    .then(data => {
                        setImage(oldArray => [...oldArray, data]);
                        setLoading(false);

                    })
                    .catch(err => {
                        console.log(err);
                        setLoading(false);
                    })
            }
        }
    }

    const handleVirtualRemove = (public_id) => {
        axios.post(`http://127.0.0.1:5000/api/admin/delete`, { public_id },
            {
                headers: {
                    authorization: user ? user.token : "",
                }
            }).then(res => {
                setImage(image.filter(item => item.public_id !== public_id))
                toast.success(res.data.message);
            }).catch(err => console.log(err));
    }
    // Common Functions
    const handleAdd = (size, price, quantity) => {
        setSizeArr(oldArray => [...oldArray, { size, price, quantity }]);
        setSize("");
        setSizePrice("");
        setSizeQuantity("");
    }

    const handleSizeRemove = (size, price) => {
        let filteredSize = sizeArr.filter((Item) => {
            return Item.size !== size;
        });

        setSizeArr(filteredSize);
    }

    const handleSubmit = () => {
        if (type == "normal") {
            if (name === "" || price === "" || category === "" || quantity === "" || images.length === 0 || sizeArr.length === 0 || desc === "" || type === "") {
                toast.warning("Please fill all the fields");
            }
            else if(isNaN(price)){
                toast.warning("please enter a valid price");
            }
            else {
                createProduct(name, price, category, quantity, images, sizeArr, desc, type, user.token)
                    .then((res) => {
                        toast.success(res.data.message);
                    })
                    .catch(err => console.log(err));
            }
        }
        if (type === "virtual") {
            if (name === "" || category === "" || image.length === 0 || sizeArr.length === 0 || desc ==="" || type === "" || virtualPrice === "") {
                toast.warning("Please fill all the fields");
            } else {
                createVirtualProduct(name, category, image, sizeArr, desc, type, virtualPrice, user.token)
                    .then((res) => toast.success(res.data.message))
                    .catch(err => console.log(err));
            }
        }
    }
    return (
        <div className='container-fluid'>
            <div className='d-flex'>

                {sideNav ? <SideNav /> : ""}
                <div className='col-md-9 ml-3'>
                    <i onClick={() => setSideNav(!sideNav)} className="fas fa-bars" style={{ cursor: 'pointer' }}></i>
                    <div>
                        <h1>Create Product</h1>
                        <select className="form-control" onChange={e => setType(e.target.value)}>
                            <option value="normal">Normal Product</option>
                            <option value="virtual">Virtual Product</option>
                        </select>
                        <br />
                        {type == "normal" ?
                            <>
                                {loading ? <LoadingOutlined className="text-danger" style={{ fontSize: '30px' }} /> :
                                    images.length ? images.map((image) => (
                                        <Badge key={image.public_id}
                                            onClick={() => handleRemove(image.public_id)}
                                            className="ml-2"
                                            count="x" style={{ cursor: 'pointer' }}>
                                            <Avatar
                                                src={image.secure_url}
                                                size={60}
                                            />
                                        </Badge>
                                    )) : ""}
                                <br />
                                <label>Choose File</label>
                                <input className="form-control" multiple type="file" accept="image/jpg, image/jpeg, image/png" onChange={fileUploadAndResize} />
                                <label>Product Name:- </label>
                                <input className="form-control" onChange={e => setName(e.target.value)} />
                                <label>Product Price:- </label>
                                <input className="form-control" onChange={e => setPrice(e.target.value)} />
                                <br />
                                <table className="color-table">
                                    <tbody>
                                        {
                                            sizeArr.map((item, index) => (
                                                <tr key={index} className="text-center">
                                                    <td>{item.size}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.quantity}</td>
                                                    <td style={{ cursor: 'pointer' }} onClick={() => handleSizeRemove(item.size, item.price)}>remove</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                <br />
                                <label>Product Size:- </label>
                                <div className="row">
                                    <div className="col-md-3">
                                        <input className="form-control" placeholder="Enter Size" value={size} onChange={e => setSize(e.target.value)} />
                                    </div>
                                    <div className="col-md-3">
                                        <input className="form-control" placeholder="Enter Price" value={sizePrice} onChange={e => setSizePrice(e.target.value)} />
                                    </div>
                                    <div className="col-md-3">
                                    <input className="form-control" placeholder="Enter Quantity" value={sizeQuantity} onChange={e => setSizeQuantity(e.target.value)} />
                                    </div>
                                    <div className="col-md-2">
                                        <button onClick={() => handleAdd(size, sizePrice,sizeQuantity)} className="btn" style={{ marginTop: '0px' }}>Add More</button>
                                    </div>
                                </div>
                                <label>Product Quantity:- </label>
                                <input className="form-control" onChange={e => setQuantity(e.target.value)} />
                                <label>Product Category:- </label>
                                <select onChange={e => setCategory(e.target.value)} className="form-control">
                                    <option value="choose an option">Choose an option</option>
                                    <option value="Mens">Men's Wear</option>
                                    <option value="Womens">Women's Wear</option>
                                    <option value="t-shirts">T-shirts</option>
                                    <option value="kaftaans">Kaftaans</option>
                                    <option value="unisex">Unisex clothing</option>
                                    <option value="Loungewear">Loungewear Wear</option>
                                    <option value="Nightwear">Nightwear Wear</option>
                                </select>
                                <label>Product Description:- </label>
                                <textarea className="form-control" rows="5" onChange={e => setDesc(e.target.value)} />
                                <button onClick={handleSubmit} className="btn btn-primary" style={{ marginLeft: '0px' }}>Create Product</button>
                            </>
                            :
                            <>
                                {loading ? <LoadingOutlined className="text-danger" style={{ fontSize: '30px' }} /> :
                                    image.length != 0 ?
                                        image.map((img, index) => (
                                            <div key={index} style={{ width: '120px' }}>
                                                <i className="fa fa-times" onClick={() => handleVirtualRemove(img.public_id)}></i>
                                                <ReactSVG src={img.secure_url} />
                                            </div>
                                        ))
                                        : ""
                                }
                                <br />
                                <label>Choose File</label>
                                <input className="form-control" multiple type="file" accept=".svg" onChange={uploadImage} />
                                <label>Product Name:- </label>
                                <input className="form-control" onChange={e => setName(e.target.value)} />
                                <label>Product Price</label>
                                <input className="form-control" onChange={e => setVirtualPrice(e.target.value)} />
                                <table className="color-table">
                                    <tbody>
                                        {
                                            sizeArr.map((item, index) => (
                                                <tr key={index} className="text-center">
                                                    <td>{item.size}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.quantity}</td>
                                                    <td style={{ cursor: 'pointer' }} onClick={() => handleSizeRemove(item.size, item.price)}>remove</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                <br />
                                <label>Product Size:- </label>
                                <div className="row">
                                    <div className="col-md-3">
                                        <input className="form-control" placeholder="Enter Size" value={size} onChange={e => setSize(e.target.value)} />
                                    </div>
                                    <div className="col-md-3">
                                        <input className="form-control" placeholder="Enter Price" value={sizePrice} onChange={e => setSizePrice(e.target.value)} />
                                    </div>
                                    <div className="col-md-3">
                                        <input className="form-control" placeholder="Enter Quantity" value={sizeQuantity} onChange={e => setSizeQuantity(e.target.value)} />
                                    </div>
                                    <div className="col-md-2">
                                        <button onClick={() => handleAdd(size, sizePrice, sizeQuantity)} className="btn" style={{ marginTop: '0px' }}>Add More</button>
                                    </div>
                                </div>
                                <label>Product Category:- </label>
                                <select onChange={e => setCategory(e.target.value)} className="form-control">
                                    <option value="choose an option">Choose an option</option>
                                    <option value="Mens">Men's Wear</option>
                                    <option value="Womens">Women's Wear</option>
                                    <option value="Unisex">Unisex Wear</option>
                                </select>
                                <label>Product Description:- </label>
                                <textarea className="form-control" rows="5" onChange={e => setDesc(e.target.value)} />
                                <button onClick={handleSubmit} className="btn btn-primary" style={{ marginLeft: '0px' }}>Create Product</button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCreate;