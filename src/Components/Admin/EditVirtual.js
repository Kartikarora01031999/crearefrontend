import axios from "axios";
import React, { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
import { toast } from "react-toastify";
import { getSingleVirtualProduct, updateSingleVirtualProduct } from "../../Functions/product";
import SideNav from "../Nav/SideNav";

const EditVirtual = ({ match }) => {
    const [sideNav, setSideNav] = useState(true);
    const [name, setName] = useState("");
    const [size, setSize] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState([]);
    const [sizePrice, setSizePrice] = useState("");
    const [sizeQuantity, setSizeQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [sizeArr, setSizeArr] = useState([]);
    const [product, setProduct] = useState({});
    const [virtualPrice, setVirtualPrice] = useState("");
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadSingleProduct();
    }, [user]);

    const loadSingleProduct = () => {
        if (user != null) {
            getSingleVirtualProduct(match.params.id).
                then(res => {
                    setProduct(res.data.product);
                    setName(res.data.product.product_name);
                    setSizeArr(res.data.product.product_size);
                    setDesc(res.data.product.product_description);
                    setImage(res.data.product.product_image);
                    setCategory(res.data.product.product_category);
                    setVirtualPrice(res.data.product.product_price);
                }).catch(err => console.log(err));
        }
    }


    const uploadImage = (e) => {
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
                    })
                    .catch(err => console.log(err))
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
                setImage(image.filter(item => item.public_id !== public_id))
                toast.success(res.data.message);
            }).catch(err => console.log(err));
    }
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
        updateSingleVirtualProduct(product._id.$oid, name, category, image, sizeArr, desc, virtualPrice, user.token).then(res => toast.success(res.data.message)).catch(err => console.log(err));
    }
    return (
        <div className='container-fluid'>
            <div className='d-flex'>
                {sideNav ? <SideNav /> : ""}
                <div className='col-md-9 ml-3'>
                    <i onClick={() => setSideNav(!sideNav)} className="fas fa-bars" style={{ cursor: 'pointer' }}></i>
                    <h1>Update Virtual Product</h1>
                    {image.length != 0 ?
                        image.map((img, index) => (
                            <div key={index} className="mb-3" style={{ width: '120px' }}>
                                <i className="fa fa-times" style={{cursor:'pointer'}} onClick={() => handleRemove(img.public_id)}></i>
                                <img src={img.url}  width="120px"/>
                            </div>
                        ))
                        : ""}
                    <input className="form-control" multiple type="file" accept=".svg" onChange={uploadImage} />
                    <label>Product Name:- </label>
                    <input value={name} className="form-control" onChange={e => setName(e.target.value)} />
                    <label>Product Price</label>
                    <input className="form-control" value={virtualPrice} onChange={e => setVirtualPrice(e.target.value)} />
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
                            <button onClick={() => handleAdd(size, sizePrice, sizeQuantity)} className="btn" style={{ marginTop: '0px' }}>Add More</button>
                        </div>
                    </div>
                    <label>Product Category:- </label>
                    <select onChange={e => setCategory(e.target.value)} className="form-control">
                        <option value="choose an option">Choose an option</option>
                        <option selected={category === "Mens"} value="Mens">Men's Wear</option>
                        <option selected={category === "Womens"} value="Womens">Women's Wear</option>
                        <option selected={category === "Unisex"} value="Unisex">Unisex Wear</option>
                    </select>
                    <label>Product Description:- </label>
                    <textarea value={desc} className="form-control" rows="5" onChange={e => setDesc(e.target.value)} />
                    <button onClick={handleSubmit} className="btn btn-primary" style={{ marginLeft: '0px' }}>Update Product</button>
                </div>
            </div>
        </div>
    );
}

export default EditVirtual;