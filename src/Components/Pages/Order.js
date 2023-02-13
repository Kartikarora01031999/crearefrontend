import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Footer from "../Footer";
import Header from "../Nav/Header";
import uuid from "react-uuid";
import { createOrder } from "../../Functions/orders";

const Order = ({ match, history }) => {
  const [fabric, setFabric] = useState();
  const [product, setProduct] = useState();
  const [color, setColor] = useState({});
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("Please Select A Size");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPinCode] = useState("");
  const { user, cart } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCityState();
  });
  const loadCityState = () => {
    if (pincode != "") {
      axios
        .get(`https://api.postalpincode.in/pincode/${pincode}`)
        .then((res) => {
          if (res.data[0].Status !== "Error") {
            setCity(res.data[0].PostOffice[0].District);
            setState(res.data[0].PostOffice[0].State);
          } else {
            setCity("");
            setState("");
          }
        });
    } else {
      setCity("");
      setState("");
    }
  };
  const componentDidMount = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };
  componentDidMount();
  const openPayModal = (amt) => {
    if (user === null) {
      toast.warning("Please login to continue");
      window.$("#loginModal").modal("show");
    } else {
      var amount = parseInt(amt); //Razorpay consider the amount in paise
      var options = {
        key: "rzp_live_slLtG07H0kZn8S",
        amount: "", // 2000 paise = INR 20, amount in paisa
        name: "",
        description: "",
        order_id: "",
        handler: function (response) {
          var values = {
            razorpay_signature: response.razorpay_signature,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
          };
          axios
            .post(
              "http://127.0.0.1:5000/api/razorpay-payment",
              values
            )
            .then((res) => {
              createOrder(
                [product],
                options,
                "virtual",
                price,
                address + "," + city + "," + state + "," + pincode,
                phone,
                fabric.fabric_name,
                color.color_name,
                user.token
              )
                .then((res) => {
                  toast.success(res.data.message);
                  history.push("/");
                })
                .catch((err) => console.log(err));
            })
            .catch((e) => console.log(e));
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: phone,
        },
        // "notes": {
        //     "address": "Hello World"
        // },
        // "theme": {
        //     "color": "#528ff0"
        // }
      };
      axios
        .post("http://127.0.0.1:5000/api/razorpay-order", {
          amount: amount,
          currency: "INR",
          receipt: `${uuid()}`,
        })
        .then((res) => {
          options.order_id = res.data.order.id;
          options.amount = res.data.order.amount;
          var rzp1 = new window.Razorpay(options);
          rzp1.open();
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <>
      <Header />
      <div className="container-fluid mt-5 mb-5">
        <div className="row">
          <div className="col-md-8">
            <h4>Confirm Order</h4>
            <div className="row mt-3">
              <div className="col-md-3">
                <p className="text-right">
                  <b>Name</b>
                </p>
              </div>
              <div className="col-md-7">
                <input
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Please Enter your name"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-3">
                <p className="text-right">
                  <b>Contact</b>
                </p>
              </div>
              <div className="col-md-7">
                <input
                  className="form-control"
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Please Enter your contact number"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-3">
                <p className="text-right">
                  <b>Address</b>
                </p>
              </div>
              <div className="col-md-7">
                <input
                  className="form-control"
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Flat No, House No, Landmark..."
                />
                <input
                  className="form-control mt-3"
                  placeholder="Enter pincode"
                  onChange={(e) => setPinCode(e.target.value)}
                />
                <div className="row mt-3">
                  <div className="col-md-6 mb-3">
                    <input
                      disabled
                      className="form-control"
                      value={city}
                      placeholder="city"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      disabled
                      className="form-control"
                      value={state}
                      placeholder="state"
                    />
                  </div>
                </div>
                <button
                  onClick={() => openPayModal(2000)}
                  className="btn float-right"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <p>Order Details</p>
            <br />
            {cart != null
              ? cart.map((p, i) => (
                  <div>
                    <img
                      src={p.product_image[0].secure_url}
                      alt={p.product_image[0].public_id}
                      width="50%"
                      height="150px"
                    />
                    <p>Size: {p.size}</p>
                    <p>Quantity: {p.count}</p>
                  </div>
                ))
              : ""}
            <div className="mt-5">
              <h3>
                <b>Price Details</b>
              </h3>
              <span>
                Price:{" "}
                <span className="float-right">
                  <i className="fas fa-rupee-sign" style={{fontWeight:'100'}}>{price}</i>
                </span>
              </span>
              <p>
                Delivery Charges: <span className="float-right">Free</span>
              </p>
              <hr />
              <p>
                <b>
                  Total Amount:{" "}
                  <span className="float-right">
                    <i className="fas fa-rupee-sign" style={{fontWeight:'100'}}></i>
                    {price}
                  </span>
                </b>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Order;
