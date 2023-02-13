import React, { useEffect, useState } from "react";
import Header from "../Nav/Header";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createCart, getUserCart } from "../../Functions/cart";
import { LoadingOutlined } from "@ant-design/icons";

const Cart = ({ history }) => {
  const [val, setVal] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  useEffect(() => {
    loadUserCart();
  }, [user]);

  const loadUserCart = () => {
    if (user !== null) {
      setLoading(true);
      getUserCart(user.token)
        .then((res) => {
          console.log(res.data.carts);
          setData(res.data.carts);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      if (localStorage.getItem('cart') != null) {
        let cart = localStorage.getItem('cart');
        let p = JSON.parse(cart);
        setData(oldArr => oldArr.concat(p));
      }
    }
  };

  const handleRemove = (id) => {
    setLoading(true);
    if (data[0].cart_product !== undefined) {
      console.log(id);
      const filteredData = data[0].cart_product.filter((item) => {
        return item._id.$oid !== id;
      });
      console.log(filteredData);
      var total = getTotalde(filteredData);
      // Save in local storage
      localStorage.setItem("cart", JSON.stringify(filteredData));
      //save in redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: filteredData,
      });
      if (user !== null) {
        createCart(filteredData, total, user.token)
          .then((res) => {
            loadUserCart();
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }
    } else {
      console.log(id);
      const filteredData = data.filter((item) => {
        return item._id.$oid !== id;
      });
      console.log(filteredData);
      var total = getTotalde(filteredData);
      // Save in local storage
      localStorage.setItem("cart", JSON.stringify(filteredData));
      //save in redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: filteredData,
      });
      setLoading(false);

      setData(filteredData)
    }
  };
  const handleChange = (id, value) => {
    setVal(value);
    if (data[0].cart_product != undefined) {
      let cart = data[0].cart_product;
      cart.map((product, i) => {
        if (product._id.$oid === id) {
          cart[i].count = value;
        }
      });
      console.log(cart);
      const total = getTotal();
      // Save in local storage
      localStorage.setItem("cart", JSON.stringify(cart));
      //save in redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
      if (user !== null) {
        createCart(cart, total, user.token)
          .then((res) => {
            loadUserCart();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      let cart = data;
      cart.map((product, i) => {
        if (product._id.$oid === id) {
          cart[i].count = value;
        }
      });
      console.log(cart);
      const total = getCartTotal();
      // Save in local storage
      localStorage.setItem("cart", JSON.stringify(cart));
      //save in redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }

  };

  const getTotalde = (unique) => {
    return unique.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * (nextValue.product_price  - ((nextValue.product_price * 50) / 100));
    }, 0);
  };
  const getTotal = () => {
    return data[0].cart_product.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * Math.floor(nextValue.product_price  - ((nextValue.product_price * 50) / 100));
    }, 0);
  };

  const getCartTotal = () => {
    return data.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * Math.floor(nextValue.product_price  - ((nextValue.product_price * 50) / 100));
    }, 0);
  }
  const handleCheckOut = () => {
    history.push("/checkout");
  };
  const getPrice = (str) => {
    var str = str.toString();
    if(str.length <= 3){
      return str;
    }else if (str.length === 4) {
      return str.substr(0, 1) + "," + str.substr(1);
    } else if (str.length === 5) {
      return str.substr(0, 2) + "," + str.substr(2);
    } else {
      return str.substr(0,1)+","+str.substr(1,2)+","+str.substr(3);
    }
  }
  return (
    <div>
      <Header />
      {loading ? (
        <span
          style={{
            marginTop: "8%",
            marginBottom: "8%",
            fontSize: "28px",
            color: "#65541D",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <span>
            <LoadingOutlined />
            Loading
          </span>
        </span>
      ) : (
        <>
          {data.length !== 0 ? (
            <>
              <div className="container mt-5 dHide">
                <h2 className="text-center">Your cart</h2>
                <Link className="text-center" to="/products/products-All">
                  Continue shopping
                </Link>
                <hr />
                <div className="row">
                  <div className="col-md-6">
                    <span>Product</span>
                  </div>
                  <div className="col-md-2">
                    <span>Price</span>
                  </div>
                  <div className="col-md-2"><span>Quantity
                    </span></div>
                  <div className="col-md-2"><span>Total</span></div>
                </div>
                <hr />
                {data[0].cart_product !== undefined
                  ?
                  data[0].cart_product.map((p, index) => (
                    <div className="row mt-3" key={index}>
                      <div className="col-md-6">
                        <div className="card review-card ">
                          <img
                            className="post card-img-top"
                            style={{ width: "35%", height: "200px" }}
                            src={p.product_image[0].secure_url}
                            alt="..."
                          />
                          <div
                            className="card-body"
                            style={{ paddingBottom: "0px" }}
                          >
                            <h5 className="card-title">{p.product_name} </h5>
                            <p>Size: {p.size}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2 mt-auto mb-auto">
                        {/*{getPrice(p.product_price)} &#8377;*/}
                        {getPrice(Math.floor(p.product_price - ((p.product_price * 50) / 100)))} &#8377;
                      </div>
                      <div className="col-md-2 mt-auto mb-auto">
                        <span
                          className="rounded-circle"
                          onClick={() => {
                            p.count == 1
                              ? toast.warning("qauntity can not be let than one")
                              : handleChange(p._id.$oid, p.count - 1);
                          }}
                          style={{
                            marginRight: "10px",
                            border: "1px solid gray",
                            padding: "6px 13px",
                            cursor: "pointer",
                          }}
                        >
                          -
                        </span>
                        {p.count}
                        <span
                          className="rounded-circle"
                          onClick={() => handleChange(p._id.$oid, p.count + 1)}
                          style={{
                            marginLeft: "10px",
                            border: "1px solid gray",
                            padding: "5px 11px",
                            cursor: "pointer",
                          }}
                        >
                          +
                        </span>
                        {loading ? (
                          <p>Loading</p>
                        ) : (
                          <p
                            onClick={() => handleRemove(p._id.$oid)}
                            className="ml-3 mt-2"
                            style={{ cursor: "pointer" }}
                          >
                            x Remove
                          </p>
                        )}
                      </div>
                      <div className="col-md-2 mt-auto mb-auto">
                        {/*{getPrice(p.product_price * p.count)} &#8377;*/}
                        {getPrice(Math.floor(p.product_price - ((p.product_price * 50) / 100)))} &#8377;
                      </div>
                    </div>
                  ))
                  :
                  data.map((p, index) => (
                    <div className="row mt-3" key={index}>
                      <div className="col-md-6">
                        <div className="card review-card ">
                          <img
                            className="post card-img-top"
                            style={{ width: "35%", height: "200px" }}
                            src={p.product_image[0].secure_url}
                            alt="..."
                          />
                          <div
                            className="card-body"
                            style={{ paddingBottom: "0px" }}
                          >
                            <h5 className="card-title">{p.product_name} </h5>
                            <p>Size: {p.size}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2 mt-auto mb-auto">
                        {/*{getPrice(p.product_price)} &#8377;*/}
                        {getPrice(Math.floor(p.product_price - ((p.product_price * 50) / 100)))} &#8377;
                      </div>
                      <div className="col-md-2 mt-auto mb-auto">
                        <span
                          className="rounded-circle"
                          onClick={() => {
                            p.count == 1
                              ? toast.warning("qauntity can not be let than one")
                              : handleChange(p._id.$oid, p.count - 1);
                          }}
                          style={{
                            marginRight: "10px",
                            border: "1px solid gray",
                            padding: "6px 13px",
                            cursor: "pointer",
                          }}
                        >
                          -
                        </span>
                        {p.count}
                        <span
                          className="rounded-circle"
                          onClick={() => handleChange(p._id.$oid, p.count + 1)}
                          style={{
                            marginLeft: "10px",
                            border: "1px solid gray",
                            padding: "5px 11px",
                            cursor: "pointer",
                          }}
                        >
                          +
                        </span>
                        {loading ? (
                          <p>Loading</p>
                        ) : (
                          <p
                            onClick={() => handleRemove(p._id.$oid)}
                            className="ml-3 mt-2"
                            style={{ cursor: "pointer" }}
                          >
                            x Remove
                          </p>
                        )}
                      </div>
                      <div className="col-md-2 mt-auto mb-auto">
                        {getPrice(Math.floor(p.product_price - ((p.product_price * 50) / 100)))} &#8377;
                        {/*{getPrice(p.product_price * p.count)} &#8377;*/}
                      </div>
                    </div>
                  ))
                }
                <hr />
                <div className="row">
                  <div className="col-md-6">
                    <span>
                    Tax included and shipping calculated at checkout
                    </span>
                    <br />
                    <br />
                    {/* <a style={{ fontWeight: 400 }} href="/">
                      Get shipping Estimates
                    </a>
                    <br />
                    <a style={{ fontWeight: 400 }} href="/">
                      Add instructions for seller
                    </a> */}
                  </div>
                  <div className="col-md-2"></div>
                  <div className="col-md-3">
                    <h4 style={{ marginRight: "20px", float: "right" }}>
                      SubTotal: {data[0].cart_product != undefined ? getPrice(getTotal()) : getPrice(getCartTotal())} &#8377;
                    </h4>
                    <br />
                    <br />
                    <br />
                    <br />
                    <button
                      onClick={handleCheckOut}
                      className="btn btn-secondry"
                      style={{ width: "350px", marginLeft: "0px" }}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
              {/* Mobile View */}
              <div className="container mt-5 mHide">
                <div className="row">
                  <div className="col-6">
                    <span>Product</span>
                  </div>
                  <div className="col-6">
                    <span style={{ float: "right" }}>Price</span>
                  </div>
                </div>
                <hr />
                <div className="row">
                  {data[0].cart_product !== undefined
                    ?
                    data[0].cart_product.map((p, index) => (
                      <>
                        <div className="col-6" key={index}>
                          <div className="card review-card mb-4">
                            <img
                              className="post"
                              style={{ width: "80px", height: "100px" }}
                              src={p.product_image[0].secure_url}
                              alt="..."
                            />
                            <div
                              className="card-body"
                              style={{ paddingTop: "0px" }}
                            >
                              <h6 className="card-title">{p.product_name} </h6>
                              <p style={{ marginBottom: "0px" }}>
                                Size: {p.size}
                              </p>
                              <p
                                onClick={() => handleRemove(p._id.$oid)}
                                style={{
                                  cursor: "pointer",
                                  color: "#65541D",
                                  borderBottom: "1px solid #65541D",
                                }}
                              >
                                Remove
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div style={{ float: "right" }}>
                            <span style={{ float: "right", marginRight: "25px" }}>
                              <i className="fa fa-rupee-sign"></i>{" "}
                              {/*{p.product_price}*/}
                              {Math.floor(p.product_price - ((p.product_price * 50) / 100))} &#8377;
                            </span>
                            <br />
                            <br />
                            <span
                              className="rounded-circle"
                              onClick={() => {
                                p.count == 1
                                  ? toast.warning(
                                    "qauntity can not be let than one"
                                  )
                                  : handleChange(p._id.$oid, p.count - 1);
                              }}
                              style={{
                                marginRight: "10px",
                                border: "1px solid gray",
                                padding: "6px 13px",
                                cursor: "pointer",
                              }}
                            >
                              -
                            </span>
                            {p.count}
                            <span
                              className="rounded-circle"
                              onClick={() =>
                                handleChange(p._id.$oid, p.count + 1)
                              }
                              style={{
                                marginLeft: "10px",
                                border: "1px solid gray",
                                padding: "5px 11px",
                                cursor: "pointer",
                              }}
                            >
                              +
                            </span>
                          </div>
                        </div>
                      </>
                    ))
                    :
                    data.map((p, index) => (
                      <>
                        <div className="col-6" key={index}>
                          <div className="card review-card mb-4">
                            <img
                              className="post"
                              style={{ width: "80px", height: "100px" }}
                              src={p.product_image[0].secure_url}
                              alt="..."
                            />
                            <div
                              className="card-body"
                              style={{ paddingTop: "0px" }}
                            >
                              <h6 className="card-title">{p.product_name} </h6>
                              <p style={{ marginBottom: "0px" }}>
                                Size: {p.size}
                              </p>
                              <p
                                onClick={() => handleRemove(p._id.$oid)}
                                style={{
                                  cursor: "pointer",
                                  color: "#65541D",
                                  borderBottom: "1px solid #65541D",
                                }}
                              >
                                Remove
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div style={{ float: "right" }}>
                            <span style={{ float: "right", marginRight: "25px" }}>
                              <i className="fa fa-rupee-sign"></i>{" "}
                              {/*{p.product_price}*/}
                              {Math.floor(p.product_price - ((p.product_price * 50) / 100))}
                              {/*&#8377;*/}
                            </span>
                            <br />
                            <br />
                            <span
                              className="rounded-circle"
                              onClick={() => {
                                p.count == 1
                                  ? toast.warning(
                                    "qauntity can not be let than one"
                                  )
                                  : handleChange(p._id.$oid, p.count - 1);
                              }}
                              style={{
                                marginRight: "10px",
                                border: "1px solid gray",
                                padding: "6px 13px",
                                cursor: "pointer",
                              }}
                            >
                              -
                            </span>
                            {p.count}
                            <span
                              className="rounded-circle"
                              onClick={() =>
                                handleChange(p._id.$oid, p.count + 1)
                              }
                              style={{
                                marginLeft: "10px",
                                border: "1px solid gray",
                                padding: "5px 11px",
                                cursor: "pointer",
                              }}
                            >
                              +
                            </span>
                          </div>
                        </div>
                      </>
                    ))
                  }
                </div>
                <hr style={{ marginTop: "0px" }} />
                <div className="row mb-3">
                  <div className="col-12 d-flex justify-content-center">
                    <span style={{ fontSize: "20px" }}>
                      SubTotal{" "}
                      <span>
                        <i className="fa fa-rupee-sign ml-5"></i>
                        {data[0].cart_product != undefined ? getPrice(getTotal()) : getPrice(getCartTotal())} 
                      </span>
                    </span>
                  </div>
                </div>
                <p className="text-center">
                  <span>Tax included and shipping calculated at checkout</span>
                </p>
                <div className="d-flex justify-content-center">
                  <button
                    onClick={handleCheckOut}
                    className="btn btn-secondry"
                    style={{
                      width: "350px",
                      marginLeft: "0px",
                      marginRight: "0px",
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center mt-5 mb-5 pt-5 pb-5">
              <h4>Your cart</h4>
              <p>Your cart is currently empty</p>
              <Link to="/products/products-All" className="btn">
                Continue Shopping{" "}
                <i
                  className="fa fa-long-arrow-right ml-3"
                  aria-hidden="true"
                ></i>
              </Link>
            </div>
          )}
        </>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
