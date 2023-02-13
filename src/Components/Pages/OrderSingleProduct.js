import { Avatar, Badge } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Footer from "../Footer";
import Header from "../Nav/Header";
import uuid from "react-uuid";
import { createOrder, createOrderWithoutAuth, getCouponByName } from "../../Functions/orders";
import { getSingleProduct } from "../../Functions/product";
import { Country, State, City } from 'country-state-city';

const OrderSingleProduct = ({ match, history }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [product, setProduct] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [city, setCity] = useState("");
  const [email, setEmail] = useState(user !== null ? user.email: "");
  const [cities, setCities] = useState([]);
  const [state, setState] = useState("");
  const [states, setStates] = useState([]);
  const [pincode, setPinCode] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");

  useEffect(() => {
    loadSingleProduct();
    setCountries(Country.getAllCountries());
  }, [user]);
  // for fetching states
  useEffect(() => {
    if (country !== "") {
      var data = JSON.parse(country);
      setStates(State.getStatesOfCountry(data.isoCode));
    }
  }, [country]);

  // for fetching cities
  useEffect(() => {
    if (state !== "") {
      var data = JSON.parse(country);
      var data1 = JSON.parse(state);
      setCities(City.getCitiesOfState(data.isoCode, data1.isoCode));
    }
  }, [state]);

  // const loadCityState = (value) => {
  //   setPinCode(value);
  //   if (value != "") {
  //     axios.get(`https://api.postalpincode.in/pincode/${value}`).then((res) => {
  //       if (res.data[0].Status !== "Error") {
  //         setCity(res.data[0].PostOffice[0].District);
  //         setState(res.data[0].PostOffice[0].State);
  //       } else {
  //         setCity("");
  //         setState("");
  //       }
  //     });
  //   } else {
  //     setCity("");
  //     setState("");
  //   }
  // };
  const id = match.params.id.split("-");
  const componentDidMount = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };
  componentDidMount();
  const openPayModal = (amt) => {
    if (
      firstName === "" ||
      phone === "" ||
      address === "" ||
      pincode === "" ||
      city === "" ||
      state === "" ||
      country === ""
      || email === ""
    ) {
      toast.warning("All fields are required");
    } else {
      var data = JSON.parse(country);
      var data1 = JSON.parse(state);
      console.log(address + "," + city + "," + data1.name + "," + data.name + "," + pincode);
      var amount = amt;
      var options = {
        key: "rzp_live_y5CByNwfnZ4oHq",
        amount: "",
        name: firstName + " " + lastName,
        description: "",
        order_id: "",
        notes:{
          Address:address + "," + city + "," + data1.name + "," + data.name + "," + pincode,
          product: product._id.$oid,
        },
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
              if (user != null) {
                createOrder(
                  [product],
                  options,
                  "normal",
                  product.product_price * id[2],
                  address + "," + city + "," + data1.name + "," + data.name + "," + pincode,
                  phone,
                  "",
                  "",
                  user.token,
                  id[1],
                  id[2]
                )
                  .then((res) => {
                    toast.success(res.data.message);
                    history.push("/");
                  })
                  .catch((err) => console.log(err));
              } else {
                createOrderWithoutAuth(
                  [product],
                  options,
                  "normal",
                  product.product_price * id[2],
                  address + "," + city + "," + data1.name + "," + data.name + "," + pincode,
                  phone,
                  "",
                  "",
                  id[1],
                  id[2],
                  email
                )
                  .then((res) => {
                    toast.success(res.data.message);
                    history.push("/");
                  })
                  .catch((err) => console.log(err));
              }
            })
            .catch((e) => console.log(e));
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
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
  const loadSingleProduct = () => {
    getSingleProduct(id[0])
      .then((res) => setProduct(res.data.product))
      .catch((e) => console.log(e));
  };

  const couponApply = () => {
    if (coupon === "") {
      toast.warn("please enter a valid coupon");
    } else {
      console.log(coupon);
      getCouponByName(coupon).then((res) => {
        console.log(res);
        var date = new Date();
        if (date < new Date(res.data.discount.valid_date)) {
          toast.warn("This coupon has been expired");
        } else {
          setDiscountPrice(res.data.discount.price);
          console.log(true);
          toast.success("Coupon has been applied");
        }
      }).catch(err => console.log(err));
    }
  }

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
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6" style={{ borderRight: "1px solid" }}>
            <h1 className="mt-3">CREARE</h1>
            <h4 className="pt-5">Contact Information</h4>
            <input className="form-control" onChange={e => setPhone(e.target.value)} placeholder="Enter contact number" />
            {user === null
            ?
            <>
            <br/>
            <input className="form-control" onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
            </>
          :
          ""}
            <h4 className="mt-3">Apply Coupon</h4>
            <input className="form-control" onChange={e => setCoupon(e.target.value)} placeholder="Enter coupon" />
            <button
              style={{ marginRight: "0px", marginLeft: 'auto', display: 'block' }}
              onClick={couponApply}
              className="btn"
            >
              Apply Coupon
            </button>
            <h4 className="mt-3">Shipping address</h4>
            <div className="row">
              <div className="col-md-6">
                <input className="form-control mb-3" placeholder="First name" onChange={e => setFirstName(e.target.value)} />
              </div>
              <div className="col-md-6">
                <input className="form-control" placeholder="Last name" onChange={e => setLastName(e.target.value)} />
              </div>
            </div>
            <br />
            <input className="form-control" placeholder="Address" onChange={e => setAddress(e.target.value)} />
            <br />
            <div className="row">
              <div className="col-md-6 mb-3">
                {countries.length !== 0
                  ?
                  <select onChange={e => setCountry(e.target.value)} className="form-control">
                    <option>Choose your country</option>
                    {countries.map((c, index) => (
                      <option value={JSON.stringify(c)} key={index}>{c.name}</option>
                    ))}
                  </select>
                  :
                  ""}
              </div>
              <div className="col-md-6 mb-3">
                {states.length !== 0
                  ?
                  <select onChange={e => setState(e.target.value)} className="form-control">
                    <option>State</option>
                    {states.map((c, index) => (
                      <option value={JSON.stringify(c)} key={index}>{c.name}</option>
                    ))}
                  </select>
                  :
                  <select disabled={country === ""} className="form-control">
                    <option>State</option>
                  </select>}
              </div>
              <div className="col-md-6 mb-3">
                {cities.length !== 0
                  ?
                  <select onChange={e => setCity(e.target.value)} className="form-control">
                    <option>City</option>
                    {cities.map((c, index) => (
                      <option value={c.name} key={index}>{c.name}</option>
                    ))}
                  </select>
                  :
                  <input className="form-control" value={city} disabled={state === ""} onChange={e => { setCity(e.target.value) }} placeholder="City" />}

              </div>
              <div className="col-md-6 mb-3">
                <input className="form-control mb-3" onChange={e => setPinCode(e.target.value)} placeholder="PIN Code" />
              </div>
            </div>
            {product !== undefined ? (
              <button
                style={{ marginRight: "0px" }}
                onClick={() => {
                  if (discountPrice === "") {
                    openPayModal(Math.floor(product.product_price - ((product.product_price * 50) / 100)) * id[2]);
                  } else {
                    const price = product.product_price - product.product_price * parseInt(discountPrice) / 100;
                    openPayModal(price)
                  }
                }}
                className="btn float-right"
              >
                Place Order
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="col-md-6 mt-5 pt-5 pl-4">
            {product !== undefined ? (
              <>
                <div className="row">
                  <div className="col-md-2 col-3">
                    <Badge count={id[2]} color="#000">
                      <Avatar
                        shape="square"
                        size={80}
                        src={product.product_image[0].url}
                      />
                    </Badge>
                  </div>
                  <div className="col-md-6 col-6">
                    <span className="mt-3 d-block">{product.product_name}</span>
                    <span>{id[1]}</span>
                  </div>
                  <div className="col-md-1 dHide"></div>
                  <div className="col-md-3 col-3">
                    <span className="float-right">
                      <i className="fas fa-rupee-sign" style={{ fontWeight: '100' }}></i>
                      {getPrice(Math.floor(product.product_price - ((product.product_price * 50) / 100)) * id[2])}
                    </span>
                  </div>
                </div>
                <hr style={{ border: "1px solid" }} />
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div>
                      <span>Price:{" "}</span>
                      <span className="float-right">
                        <i className="fas fa-rupee-sign" style={{ fontWeight: '100' }}></i>
                        {getPrice(Math.floor(product.product_price - ((product.product_price * 50) / 100)) * id[2])}
                      </span>
                    </div>
                  </div>
                  {discountPrice !== ""
                    ?
                    <div className="col-md-12 mt-3">
                      <div>
                        <span>Discount{`(${discountPrice}%)`}:</span>
                        <span className="float-right">
                          <i className="fas fa-rupee-sign" style={{ fontWeight: '100' }}></i>
                          {/*{getPrice((product.product_price * id[2] * parseInt(discountPrice)/100))}*/}
                          {getPrice(Math.floor(product.product_price - ((product.product_price * 50) / 100)) * id[2])}
                        </span>
                      </div>
                    </div>
                    :
                    ""}
                  <div className="col-md-12 mt-3">
                    <div>
                      <span>Shipping:</span> <span className="float-right">Free</span>
                    </div>
                  </div>
                </div>
                <hr style={{ border: "1px solid" }} />
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div>
                      <span>Total:{" "}</span>
                      <span className="float-right">
                        INR <i className="fas fa-rupee-sign ml-2" style={{ fontWeight: '100' }}></i>
                        {discountPrice === "" ? getPrice(Math.floor(product.product_price - ((product.product_price * 50) / 100)) * id[2]) : getPrice(product.product_price * id[2] - product.product_price * id[2] * parseInt(discountPrice) / 100)}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderSingleProduct;
