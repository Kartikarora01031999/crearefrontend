import React, {useEffect, useState} from "react";
import Footer from "./Footer";
import Header from "./Nav/Header";
import axios from "axios";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {getSingleProduct} from "../Functions/product";
import {createCart} from "../Functions/cart";
import {Carousel} from "react-responsive-carousel";
import maleSize from "../Images/size1.png";
import femaleSize from "../Images/size2.png";
import ZoomImage from "./ZoomImage";
import {Skeleton} from "antd";

const SingleProduct = ({match, history}) => {
    const [tooltip, setTooltip] = useState("Click to add");
    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("");
    const [image, setImage] = useState("");
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const {user} = useSelector((state) => ({...state}));
    const paneRef = React.useRef();

    useEffect(() => {
        loadSingleProduct();
    }, [user]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const loadSingleProduct = () => {
        setLoading(true);
        getSingleProduct(match.params.Id)
            .then((res) => {
                console.log(res.data.product);
                setProduct(res.data.product);
                setImage(res.data.product.product_image[0].secure_url);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };
    const componentDidMount = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    };
    componentDidMount();

    const getTotal = (unique) => {
        return unique.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.product_price;
        }, 0);
    };
    const handleAddToCart = () => {
        // create cart array
        if (size !== "") {
            var flag = false;
            product.product_size.map((s) => {
                if (s.size === size) {
                    if (s.quantity === '0') {
                        flag = true;
                    }
                }
            });
            if (flag === true) {
                toast.warn("This Size is not available for this product");
            } else {
                let cart = [];
                if (typeof window !== "undefined") {
                    // if cart is in local storage GET it
                    if (localStorage.getItem("cart")) {
                        cart = JSON.parse(localStorage.getItem("cart"));
                    }
                    // push new product to cart
                    cart.push({
                        ...product,
                        count: quantity,
                        size,
                    });
                    // remove duplicates
                    let unique = _.uniqWith(cart, _.isEqual);
                    // save to local storage
                    localStorage.setItem("cart", JSON.stringify(unique));
                    // show tooltip
                    setTooltip("Added");

                    // add to reeux state
                    dispatch({
                        type: "ADD_TO_CART",
                        payload: unique,
                    });
                    var total = getTotal(unique);
                    console.log(total);
                    if (user !== null) {
                        createCart(unique, total, user.token)
                            .then((res) => {
                                console.log(res);
                            })
                            .catch((err) => console.log(err));
                    }
                    toast.success("product has been added to cart");
                }
            }
        } else {
            toast.warning("Please select a size");
        }
    };
    const handleBuy = () => {
        if (size === "") {
            toast.warning("Please select a size");
        } else {
            var flag = false;
            product.product_size.map((s) => {
                if (s.size === size) {
                    if (s.quantity === '0') {
                        flag = true;
                    }
                }
            });
            if (flag === true) {
                toast.warn("This Size is not available for this product");
            } else {
                history.push(
                    `/user/order-product/${product._id.$oid}-${size}-${quantity}`
                );
            }
        }
    };

    const handleImageChange = (index) => {
        setCount(index);
        setImage(product.product_image[index].secure_url);
    };

    const handleImageChangeLeft = (index) => {
        console.log(index);
        if (index >= 0) {
            setImage(product.product_image[index].secure_url);
            if (index > 0) {
                setCount(index);
            }
        }
    }
    const handleImageChangeRight = (index) => {
        console.log(index);
        if (index < product.product_image.length) {
            setImage(product.product_image[index].secure_url);
            setCount(index);
        }
    }
    const getPrice = (str) => {
        var str = str.toString();
        if (str.length <= 3) {
            return str;
        } else if (str.length === 4) {
            return str.substr(0, 1) + "," + str.substr(1);
        } else if (str.length === 5) {
            return str.substr(0, 2) + "," + str.substr(2);
        } else {
            return str.substr(0, 1) + "," + str.substr(1, 2) + "," + str.substr(3);
        }
    }

    return (
        <div>
            <Header/>
            <div className="container-fluid">
                {loading
                    ?
                    <>
                        <div className="row">
                            <div className="col-md-6">
                                <div style={{marginTop: '7%'}} className="m-left">
                                    <Skeleton.Avatar active={true} style={{width: '430px', height: '600px'}}
                                                     shape={"square"}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div style={{marginTop: '7%'}}>
                                    <Skeleton.Button active style={{display: 'block', width: '88%'}}/>
                                    <br/>
                                    <Skeleton.Button active/>
                                    <br/>
                                    <Skeleton.Button active style={{display: 'block', width: '30%'}}/>
                                    <br/>
                                    <Skeleton.Button active style={{display: 'block', width: '20%'}}/>
                                    <br/>
                                    <Skeleton.Button active style={{display: 'block', width: '80%'}}/>
                                    <br/>
                                    <Skeleton.Button active style={{display: 'block', width: '80%'}}/>
                                    <Skeleton active/>
                                    <Skeleton active/>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    product != undefined ? (
                        <div className="row">
                            <div className="col-md-6">

                                <Carousel
                                    className="mt-5 mHide"
                                    autoPlay={false}
                                    showStatus={false}
                                    renderIndicator={false}
                                    showArrows={false}
                                >
                                    {product.product_image.map((image, index) => (
                                        <div key={index} className="image-carousel">
                                            <img src={image.secure_url} height="100%" alt={image._id}/>
                                        </div>
                                    ))}
                                </Carousel>

                                <div
                                    className="dHide"
                                    style={{marginTop: "7%", marginLeft: "40%"}}
                                >
                                    <i className="fa fa-angle-left angle-left"
                                       onClick={() => handleImageChangeLeft(count - 1)}></i>
                                    <ZoomImage src={image} srcZoom={image} paneRef={paneRef}/>
                                    <i className="fa fa-angle-right angle-right"
                                       onClick={() => handleImageChangeRight(count + 1)}></i>


                                    <div className="ml-auto">
                                        {product.product_image.map((i, index) => (
                                            <img
                                                src={i.secure_url}
                                                width="90px"
                                                height="110px"
                                                style={{
                                                    cursor: 'pointer',
                                                    objectFit: 'contain',
                                                    margin: "10px",
                                                    marginLeft: '15px',
                                                    border: "1px solid #000",
                                                }}
                                                onClick={() => handleImageChange(index)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="product-content">
                                    <div ref={paneRef}/>
                                    <h1 style={{fontWeight: "300"}} className="product-name">
                                        {product.product_name}
                                    </h1>
                                    <p style={{fontSize: "24px"}}>
                                        <strike>
                                            <i className="fas fa-rupee-sign" style={{ fontWeight: '100' }}></i> {getPrice(product.product_price)}
                                        </strike>
                                        <i className="fas fa-rupee-sign ml-3" style={{ fontWeight: '100' }}></i>
                                        {getPrice(Math.floor(product.product_price - ((product.product_price * 50) / 100)))}
                                    </p>
                                    <span>Tax included. Shipping calculated at checkout</span>
                                    <br/>
                                    <br/>
                                    <span>Size</span>
                                    <br/>
                                    <select
                                        onChange={(e) => setSize(e.target.value)}
                                        style={{
                                            width: "200px",
                                            height: "45px",
                                            border: "2px solid black",
                                            padding: "0.375rem 0.75rem",
                                        }}
                                    >
                                        <option>Select Size</option>
                                        {product.product_size.map((size, index) => (
                                            <option key={index} value={size.size}>
                                                {size.size}
                                            </option>
                                        ))}
                                    </select>
                                    <span data-toggle="modal" data-target="#exampleModal1">
                    <i
                        class="fas fa-info-circle ml-3"
                        style={{fontSize: "20px", cursor: "pointer"}}
                        title="Size Table"
                    ></i>
                  </span>
                                    <div class="modal fade bd-example-modal-lg" id="exampleModal1" tabindex="-1"
                                         role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-lg" role="document">
                                            <div class="modal-content bg-image" style={{border: 'none'}}>
                                                <div class="modal-header" style={{border: 'none'}}>
                                                    <h2 style={{color: '#65541d'}}>Creare By Gauri</h2>
                                                    <button type="button" class="close" data-dismiss="modal"
                                                            aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <div className="container-fluid">
                                                        <div className="row">
                                                            <div className="col-md-6 mb-5" style={{color: '#65541d'}}>
                                                                <p style={{color: '#65541d'}}>Size Guide Males</p>
                                                                <table className="w-100"
                                                                       style={{backgroundColor: 'rgba(0,0,0,0.4)'}}>
                                                                    <thead>
                                                                    <tr>
                                                                        <th>Body Measurements</th>
                                                                        <th>XS</th>
                                                                        <th>S</th>
                                                                        <th>M</th>
                                                                        <th>L</th>
                                                                        <th>XL</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <tr>
                                                                        <td>Shoulder</td>
                                                                        <td>17</td>
                                                                        <td>17.5</td>
                                                                        <td>18</td>
                                                                        <td>18.5</td>
                                                                        <td>19</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Chest</td>
                                                                        <td>36</td>
                                                                        <td>38</td>
                                                                        <td>40</td>
                                                                        <td>42</td>
                                                                        <td>44</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Waist</td>
                                                                        <td>30</td>
                                                                        <td>32</td>
                                                                        <td>34</td>
                                                                        <td>36</td>
                                                                        <td>38</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Hip</td>
                                                                        <td>38</td>
                                                                        <td>40</td>
                                                                        <td>42</td>
                                                                        <td>44</td>
                                                                        <td>46</td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className="col-md-6" style={{color: '#65541d'}}>
                                                                <p style={{color: '#65541d'}}>Size Guide Females</p>
                                                                <table className="w-100"
                                                                       style={{backgroundColor: 'rgba(0,0,0,0.4)'}}>
                                                                    <thead>
                                                                    <tr>
                                                                        <th>Body Measurements</th>
                                                                        <th>XS</th>
                                                                        <th>S</th>
                                                                        <th>M</th>
                                                                        <th>L</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <tr>
                                                                        <td>Shoulder</td>
                                                                        <td>14.5</td>
                                                                        <td>15</td>
                                                                        <td>15.5</td>
                                                                        <td>16</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Chest</td>
                                                                        <td>32</td>
                                                                        <td>34</td>
                                                                        <td>36</td>
                                                                        <td>38</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Waist</td>
                                                                        <td>26</td>
                                                                        <td>28</td>
                                                                        <td>30</td>
                                                                        <td>32</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Hip</td>
                                                                        <td>35</td>
                                                                        <td>36</td>
                                                                        <td>38</td>
                                                                        <td>40</td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="modal fade"
                                        id="exampleModal"
                                        tabindex="-1"
                                        aria-labelledby="exampleModalLabel"
                                        aria-hidden="true"
                                    >
                                        <div class="modal-dialog modal-xl">
                                            <div
                                                class="modal-content"
                                                style={{background: "transparent", border: "none"}}
                                            >
                                                <div class="modal-header" style={{border: "none"}}>
                                                    <button
                                                        type="button"
                                                        class="close"
                                                        data-dismiss="modal"
                                                        aria-label="Close"
                                                    >
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body mBlock">
                                                    <div>
                                                        <img
                                                            src={maleSize}
                                                            className="size-Image mb-3"
                                                            alt="male size"
                                                        />
                                                    </div>
                                                    <div>
                                                        <img
                                                            src={femaleSize}
                                                            className="size-Image"
                                                            alt="female size"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-2">Quantity:- </p>
                                    <input
                                        type="number"
                                        onChange={(e) => setQuantity(e.target.value)}
                                        min="1"
                                        value={quantity}
                                        style={{
                                            width: "70px",
                                            border: "2px solid black",
                                            padding: "0.375rem 0.75rem",
                                            height: "45px",
                                            display: "block",
                                        }}
                                    />
                                    <button
                                        className="add-to-cart mt-3"
                                        onClick={handleAddToCart}
                                        style={{
                                            width: "100%",
                                            marginBottom: "0px",
                                            marginLeft: "0px",
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={handleBuy}
                                        className="buy-now mt-3 mb-3"
                                        style={{width: "100%", marginLeft: "0px"}}
                                    >
                                        Buy now
                                    </button>
                                    {product.product_description.split("\n").map((p, index) => (
                                        <pre style={{
                                            fontSize: "18px",
                                            whiteSpace: 'pre-wrap',
                                            color: 'rgba(0,0,0,0.85)'
                                        }} key={index}>
                      {p}
                    </pre>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
            </div>
            <Footer/>
        </div>
    );
};

export default SingleProduct;
