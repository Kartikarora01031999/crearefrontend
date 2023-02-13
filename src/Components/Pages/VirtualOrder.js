import { Avatar, Badge } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getSingleColorById } from "../../Functions/colors";
import { getSingleFabric } from "../../Functions/fabric";
import { getSingleVirtualProduct } from "../../Functions/product";
import Footer from "../Footer";
import Header from "../Nav/Header";
import uuid from "react-uuid";
import { createOrder, createOrderWithoutAuth, getCouponByName } from "../../Functions/orders";
import maleSize from "../../Images/size1.png";
import femaleSize from "../../Images/size2.png";
import { Country, State, City } from 'country-state-city';

const VirtualProduct = ({ match, history }) => {
  const [fabric, setFabric] = useState();
  const [product, setProduct] = useState();
  const [color, setColor] = useState({});
  const [size, setSize] = useState("");
  const [sizePrice, setSizePrice] = useState("");
  const [price, setPrice] = useState("Please Select A Size");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [state, setState] = useState("");
  const [states, setStates] = useState([]);
  const [pincode, setPinCode] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  const [email, setEmail] = useState(user !== null ? user.email : "");

  useEffect(() => {
    loadSingleVirtualProduct();
    loadSingleFabric();
    loadSingleColor();
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

  const id = match.params.id.split("-");

  const loadSingleVirtualProduct = () => {
    getSingleVirtualProduct(id[0])
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((err) => console.log(err));
  };

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
  const loadSingleFabric = () => {
    getSingleFabric(id[1])
      .then((res) => {
        setFabric(res.data.fabric);
      })
      .catch((err) => console.log(err));
  };
  const loadSingleColor = () => {
    getSingleColorById(id[2])
      .then((res) => setColor(res.data.color))
      .catch((err) => console.log(err));
  };
  const handleChange = (size) => {
    const sizeArray = size.split(",");
    if (size !== "") {
      var flag = false;
      product.product_size.map((s) => {
        if (s.size === sizeArray[1]) {
          if (s.quantity === '0') {
            flag = true;
          }
        }
      });
      console.log(flag);
      if (flag === true) {
        setSize("");
        setSizePrice("");
        toast.warn("This Size is not available for this product");
      } else {
        setSize(sizeArray[1]);
        const selectedSize = parseFloat(sizeArray[0]);
        setSizePrice(selectedSize);

        setPrice(
          product.product_price +
          fabric.fabric_price * selectedSize +
          color.color_price * selectedSize
        );
      }
    } else {
      setSize("");
      setSizePrice("");
      setPrice("Please Select A Size");
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
    if (firstName === "" || lastName === "" || pincode === "" || address === "" || country === "") {
      toast.warning("Please fill all the fields");
    } else {
      var data = JSON.parse(country);
      var data1 = JSON.parse(state);
      console.log(address + "," + city + "," + data1.name + "," + data.name + "," + pincode);
      var amount = parseInt(amt);
      var options = {
        key: "rzp_live_y5CByNwfnZ4oHq",
        amount: "",
        name: firstName + " " + lastName,
        description: "",
        order_id: "",
        notes: {
          Address: address + "," + city + "," + data1.name + "," + data.name + "," + pincode,
          product: product._id.$oid,
          fabric: fabric._id.$oid,
          color: color._id.$oid,
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
                  "virtual",
                  price,
                  address + "," + city + "," + data1.name + "," + data.name + "," + pincode,
                  phone,
                  fabric.fabric_name,
                  color.color_name,
                  user.token,
                  size
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
                  "virtual",
                  price,
                  address + "," + city + "," + data1.name + "," + data.name + "," + pincode,
                  phone,
                  fabric.fabric_name,
                  color.color_name,
                  size,
                  1,
                  email
                )
                  .then((res) => {
                    toast.success(res.data.message);
                    history.push("/");
                  })
                  .catch((err) => console.log(err));
              }
            })
            .catch((err) => console.log(err));

        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        }
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

  const couponApply = () => {
    if (size === "") {
      toast.warn("Please select a size");
    } else {
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
  }

  const getPrice = (str) => {
    if (!isNaN(str)) {
      if (str !== undefined) {
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
    } else {
      return str;
    }
  }

  return (
    <>
      <Header />
      {fabric !== undefined && color !== undefined && product !== undefined ? (
        <div className="container">
          <div className="row">
            <div className="col-md-6" style={{ borderRight: "1px solid" }}>
              <h1 className="mt-3">CREARE</h1>
              <h4>
                Select a Size{" "}
                <span data-toggle="modal" data-target="#exampleModal1">
                  <i
                    class="fas fa-info-circle ml-3"
                    style={{
                      fontSize: "20px",
                      cursor: "pointer",
                      verticalAlign: "middle",
                    }}
                    title="Size Table"
                  ></i>
                </span>
              </h4>
              <select
                className="form-control"
                onChange={(e) => handleChange(e.target.value)}
              >
                <option value="">Choose an option</option>
                {product != undefined
                  ? product.product_size.map((p, index) => (
                    <option key={index} value={[p.price, p.size]}>
                      {p.size}
                    </option>
                  ))
                  : ""}
              </select>
              <h4 className="pt-5">Contact Information</h4>
              <input
                className="form-control"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter contact number"
              />
              <h4 className="mt-3">Apply Coupon</h4>
              <input className="form-control" onChange={e => setCoupon(e.target.value)} placeholder="Enter coupon" />
              {user === null
                ?
                <>
                  <br />
                  <input className="form-control" onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
                </>
                :
                ""}
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
                  <input
                    className="form-control mb-3"
                    placeholder="First name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    placeholder="Last name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <br />
              <input
                className="form-control"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
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
                      openPayModal(Math.floor(price - ((price * 50) / 100)));
                    } else {
                      const discount = (price - ((price * parseInt(discountPrice)) / 100));
                      console.log(discount);
                      openPayModal(discount);
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
                      <Badge count={1} color="#000">
                        <Avatar
                          shape="square"
                          size={80}
                          src={fabric.fabric_image[0].url}
                        />
                      </Badge>
                    </div>
                    <div className="col-md-7 col-5">
                      <span className="mt-3 d-block">{fabric.fabric_name}</span>
                    </div>
                    <div className="col-md-3 col-4">
                      <span className="float-right">
                        <i className="fas fa-rupee-sign mt-3 mr-1" style={{ fontWeight: '100' }}></i>
                        {getPrice(Math.floor(fabric.fabric_price - ((fabric.fabric_price * 50) / 100)))} {sizePrice !== "" ?
                          <span> <i className="fa fa-times" aria-hidden="true"
                            style={{ fontSize: '10px', fontWeight: '200' }}></i> {sizePrice}m</span> : ''}
                      </span>

                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-2 col-3">
                      <Badge count={1} color="#000">
                        <Avatar
                          shape="square"
                          size={80}
                          src={product.product_image[0].url}
                        />
                      </Badge>
                    </div>
                    <div className="col-md-7 col-6">
                      <span className="mt-3 d-block">
                        {product.product_name}
                      </span>
                      <span><b>Size :</b>
                        {size !== "" ? size : "Not Selected"}</span>
                    </div>
                    <div className="col-md-3 col-3">
                      <span className="float-right">
                        <i className="fas fa-rupee-sign mt-3 mr-1" style={{ fontWeight: '100' }}></i>
                        {getPrice(Math.floor(product.product_price - ((product.product_price * 50) / 100)))}
                      </span>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-2 col-3">
                      {color != undefined ? (
                        <p
                          className="ml-4"
                          style={{
                            cursor: "pointer",
                            backgroundColor: `${color.color_name}`,
                            width: "50px",
                            height: "50px",
                            borderRadius: "25px",
                            boxShadow: "2px 2px 11px #e5e5e5",
                          }}
                        ></p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-md-7 col-3"></div>
                    <div className="col-md-3 col-6">
                      <span className="float-right">
                        <i className="fas fa-rupee-sign mt-3" style={{ fontWeight: '100' }}></i>
                        {getPrice(Math.floor(color.color_price - ((color.color_price * 50) / 100)))}
                        {sizePrice !== "" ?
                          <span> <i className="fa fa-times" aria-hidden="true"
                            style={{ fontSize: '10px', fontWeight: '200' }}></i> {sizePrice}m</span> : ''}
                      </span>
                    </div>
                  </div>
                  <hr style={{ border: "1px solid" }} />
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <div>
                        <span>Price:{" "}</span>
                        {
                          isNaN(parseInt(price)) ? <span className="float-right">Please select a size to see the price</span> :
                            <span className="float-right">
                              <i className="fas fa-rupee-sign" style={{ fontWeight: '100' }}></i>
                              {getPrice(Math.floor(price - ((price * 50) / 100)))}
                            </span>
                        }
                      </div>
                    </div>
                    {discountPrice !== ""
                      ?
                      <div className="col-md-12 mt-3">
                        <div>
                          <span>Discount{`(${discountPrice}%)`}:</span>
                          <span className="float-right">
                            <i className="fas fa-rupee-sign" style={{ fontWeight: '100' }}></i>
                            {getPrice(price * parseInt(discountPrice) / 100)}
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
                        {
                          isNaN(parseInt(price)) ? <span className="float-right">Please select a size to see the price</span> :
                            <span className="float-right">
                              <i className="fas fa-rupee-sign" style={{ fontWeight: '100' }}></i>
                              {getPrice(Math.floor(price - ((price * 50) / 100)))}
                            </span>
                        }
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
      ) : (
        ""
      )}
      <div class="modal fade bd-example-modal-lg" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content bg-image" style={{ border: 'none' }}>
            <div class="modal-header" style={{ border: 'none' }}>
              <h2 style={{ color: '#65541d' }}>Creare By Gauri</h2>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-6 mb-5" style={{ color: '#65541d' }}>
                    <p style={{ color: '#65541d' }}>Size Guide Males</p>
                    <table className="w-100" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
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
                  <div className="col-md-6" style={{ color: '#65541d' }}>
                    <p style={{ color: '#65541d' }}>Size Guide Females</p>
                    <table className="w-100" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
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
            style={{ background: "transparent", border: "none" }}
          >
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
      <Footer />
    </>
  );
};

export default VirtualProduct;
