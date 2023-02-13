import React, { useEffect, useState } from "react";

import Logo from "../../Images/Asset2.png";
import Logo1 from "../../Images/Asset1.png";
import User from "../../Images/Asset4.png";
import Cart from "../../Images/Asset5.png";
import { Link } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createOrUpdateUser, currentUser } from "../../Functions/user";
import $ from "jquery";
import { useHistory } from "react-router-dom";
import { Input, Badge, Avatar } from "antd";
import { searchProduct } from "../../Functions/product";
const Header = () => {
  const [dropdown, setDropdown] = useState(2);
  const [shop, setShop] = useState(2);
  const [section, setSections] = useState(2);
  const [filer, setFilter] = useState(2);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const auth = getAuth();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("cart") != null) {
      var cart = JSON.parse(localStorage.getItem("cart"));
      setCount(cart.length);
    }
  });

  const handleSignIn = (e) => {
    e.preventDefault();
    if (email === "" || pwd === "") {
      toast.warning("Please enter a valid email and password");
    } else {
      signInWithEmailAndPassword(auth, email, pwd)
        .then(async (res) => {
          const { user } = res;
          const idTokenResult = await user.getIdTokenResult();
          currentUser(idTokenResult.token)
            .then((res) => {
              dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                  name: res.data.data.name,
                  email: res.data.data.email,
                  token: idTokenResult.token,
                  role: res.data.data.role,
                },
              });
              window.$("#loginModal").modal("hide");
              setEmail("");
              setPwd("");
              if (res.data.data.role === "admin") {
                history.push("/orders");
              }
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => toast.error(err.code));
    }
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || pwd === "" || lastName === "") {
      toast.warning("Please enter all the fields");
    } else {
      createUserWithEmailAndPassword(auth, email, pwd)
        .then(async (res) => {
          const { user } = res;
          const idTokenResult = await user.getIdTokenResult();
          createOrUpdateUser(name + " " + lastName, email, idTokenResult.token)
            .then((res) => {
              dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                  name: res.data.data.name,
                  email: res.data.data.email,
                  token: idTokenResult.token,
                  role: res.data.data.role,
                },
              });
              window.$("#createAccountModal").modal("hide");
              setName("");
              setLastName("");
              setEmail("");
              setPwd("");
              if (res.data.data.role === "admin") {
                history.push("/orders");
              }
            })
            .catch((err) => console.log(err));
          toast.success("User registration has been completed");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              toast.error(`Email address ${email} already in use.`);
              break;
            case "auth/invalid-email":
              toast.error(`Email address ${email} is invalid.`);
              break;
            case "auth/operation-not-allowed":
              toast.error(`Error during sign up.`);
              break;
            case "auth/weak-password":
              toast.error(
                "Password is not strong enough. Add additional characters including special characters and numbers."
              );
              break;
            default:
              toast.error(error.message);
              break;
          }
        });
    }
  };

  const handleSignInWithGmail = async (e) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (res) => {
        const { user } = res;
        const idTokenResult = await user.getIdTokenResult();
        window.$("#loginModal").modal("hide");
        createOrUpdateUser(
          res.user.displayName,
          res.user,
          idTokenResult.token
        ).then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
            },
          });
          if (res.data.data.role === "admin") {
            history.push("/orders");
          }
        });
      })
      .catch((err) => console.log(err));
  };
  const onDropDownChange = () => {
    if (dropdown === 1) {
      setDropdown(2);
    }
    if (dropdown === 2) {
      setDropdown(1);
    }
  };
  const onShopChange = () => {
    if (shop === 1) {
      setShop(2);
    }
    if (shop === 2) {
      setShop(1);
    }
  };
  const onSectionChange = () => {
    if (section === 1) {
      setSections(2);
    }
    if (section === 2) {
      setSections(1);
    }
  };
  const onFilterChange = () => {
    if (filer === 1) {
      setFilter(2);
    }
    if (filer === 2) {
      setFilter(1);
    }
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch({
          type: "LOGOUT",
          payload: null,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(value);
    history.push(`/search-products/${value}`);
  };

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      handleSubmit();
    }
  };
  const handleForgotPassword = () => {
    window.$("#loginModal").modal("hide");
    history.push("/user/forgot-password");
  };
  const handleSignUpOpen = () => {
    window.$("#loginModal").modal("hide");
    $("body").css("overflow", "hidden");
    window.$("#createAccountModal").modal("show");
  };

  const [windowWidth, setWindowWidth] = useState(1400);
  useEffect(() => {
    window.scrollTo(0, 0);
    getwidth();
  }, []);
  function getwidth() {
    const width = document.body.clientWidth;
    setWindowWidth(width);
  }
  $(window).on("load", getwidth);
  $(window).on("resize", getwidth);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand ml-0" to="/">
          {
            windowWidth > 800 && windowWidth < 900 ? 2 : windowWidth < 800 ? <img src={Logo} width="40%" alt="CREARE" /> :
              <img src={Logo1} width="60%" alt="CREARE" style={{ marginLeft: '25px' }} />
          }
        </Link>
        <ul className="navbar-nav mr-auto dAuto">
          <li className="nav-item active dHide"></li>
          <li className="nav-item active dHide"></li>
          <li className="nav-item active dHide"></li>
          <li className="nav-item active dHide"></li>
          <li className="nav-item active dHide"></li>
          <li className="nav-item active dHide"></li>
          <li className="nav-item active dHide"></li>
          <li className="nav-item active dHide"></li>
          <li className="nav-item active dHide"></li>
          <li className="nav-item active dHide"></li>
          <li className="nav-item active dHide"></li>
          <li className="nav-item active dHide"></li>
          <li className="nav-item active dHide"></li>
          <li className="nav-item active ">
            {/* <div style={{ paddingLeft: "60px" }}>
              <form>
                <Input
                  className="search-input-field"
                  onKeyPress={handleKeypress}
                  onChange={handleChange}
                  placeholder="Search your favourite products here"
                  prefix={<i className="fa fa-search" style={{ fontWeight: '300' }}></i>}
                />
                <button
                  style={{ display: "none" }}
                  onClick={handleSubmit}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div> */}
          </li>
        </ul>
        <ul className="navbar-nav ml-auto list-unstyled">
          <li className="nav-item drop">
            {user !== null ? (
              <>
                <div className="dropdown">
                  <span
                    style={{ color: "#fff" }}
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {user.name} <i className="fas fa-angle-down"></i>
                  </span>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                    style={user.role === "admin" ? { left: "-55px" } : { left: '0px' }}
                  >
                    {user.role === "admin" ? (
                      <>
                        <Link className="dropdown-item" to="/orders">
                          <i
                            className="far fa-user"
                            style={{
                              color: "#65541D",
                              marginRight: "10px",
                              cursor: "pointer",
                            }}
                          />
                          Admin Dashboard
                        </Link>
                        <Link className="dropdown-item" to="/my-orders">
                          <i
                            className="fas fa-shopping-bag"
                            style={{
                              color: "#65541D",
                              cursor: "pointer",
                              marginRight: "10px",
                            }}
                          ></i>
                          My Orders
                        </Link>
                        <div className="dropdown-divider"></div>
                        <p
                          className="dropdown-item"
                          style={{ cursor: "pointer" }}
                          href="#"
                          onClick={handleSignOut}
                        >
                          <i
                            className="fas fa-power-off"
                            style={{ color: "#65541D", marginRight: "10px" }}
                          ></i>
                          Logout
                        </p>
                      </>
                    ) : (
                      <>
                        <Link className="dropdown-item" to="/my-orders">
                          <i
                            className="fas fa-shopping-bag"
                            style={{
                              color: "#65541D",
                              cursor: "pointer",
                              marginRight: "10px",
                            }}
                          ></i>
                          My Orders
                        </Link>
                        <div className="dropdown-divider"></div>
                        <p
                          className="dropdown-item"
                          href="#"
                          onClick={handleSignOut}
                        >
                          <i
                            className="fas fa-power-off"
                            style={{
                              color: "#65541D",
                              cursor: "pointer",
                              marginRight: "10px",
                            }}
                          ></i>
                          Logout
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              // <i
              //   className="far fa-user dHide"
              //   style={{ color: "#65541D", cursor: "pointer" }}
              //   data-toggle="modal"
              //   data-target="#loginModal"
              // />
              <img src={User} style={{cursor:'pointer'}} className="dHide" alt="user" data-toggle="modal" data-target="#loginModal" width="25px"/>
            )}
          </li>
          <li className="nav-item dHide">
            <Link className="nav-link shopping-bag p0" to="/cart">
              <Badge count={count} size="small">
                <img src={Cart} alt="cart" width="34px" style={{cursor:'pointer'}}/>
                {/* <i className="fas fa-shopping-cart" style={{ color: '#65541D', fontSize: '20px' }}></i> */}
              </Badge>
            </Link>
          </li>
          <div
            className="modal fade"
            id="loginModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content nvMenu2">
                <div className="modal-header" style={{ border: "none" }}>
                  <button
                    type="button"
                    className="close cls"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times; </span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="d-flex justify-content-center">
                    <img src={Logo} width="15%" alt="CREARE" />
                  </div>
                  <h5
                    className="modal-title text-center mb-3"
                    id="exampleModalLabel"
                    style={{
                      color: "rgb(101, 84, 29)",
                      fontWeight: "bold",
                    }}
                  >
                    Login
                  </h5>
                  <form onSubmit={handleSignIn}>
                    <input
                      value={email}
                      style={{
                        border: "1px solid #65541D",
                        background: "transparent",
                      }}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      placeholder="Email"
                    />
                    <br />
                    <input
                      value={pwd}
                      style={{
                        border: "1px solid #65541D",
                        background: "transparent",
                      }}
                      onChange={(e) => setPwd(e.target.value)}
                      className="form-control"
                      placeholder="Password"
                      type="password"
                    />
                    <br />
                    <button
                      type="submit"
                      className="btn-w btn-block"
                      style={{
                        margin: "0px",
                        padding: "5px",
                        borderRadius: "5px",
                      }}
                    >
                      Login
                    </button>
                  </form>
                  <button
                    onClick={handleSignInWithGmail}
                    className="btn-w btn-block"
                    style={{
                      margin: "0px",
                      marginTop: "5px",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    Sign in with <i className="fab fa-google"></i>
                  </button>
                  <div className="conatainer-fluid mt-2">
                    <div className="row">
                      <div className="col-md-6">
                        <p
                          style={{ color: "#65541D", cursor: "pointer" }}
                          onClick={handleSignUpOpen}
                        >
                          Don't have a account?Create now
                        </p>
                      </div>
                      <div className="col-md-2"></div>
                      <div className="col-md-4">
                        <p
                          onClick={handleForgotPassword}
                          style={{ color: "#65541D", cursor: "pointer" }}
                        >
                          Forgot password?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="createAccountModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content nvMenu2">
                <div className="modal-header" style={{ border: "none" }}>
                  <button
                    type="button"
                    className="close cls"
                    aria-label="Close"
                    onClick={() => {
                      $("body").css("overflow", "auto");
                      window.$("#createAccountModal").modal("hide");
                    }}
                  >
                    <span aria-hidden="true">&times; </span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="d-flex justify-content-center">
                    <img src={Logo} width="15%" alt="CREARE" />
                  </div>
                  <h5
                    className="modal-title text-center mb-3"
                    id="exampleModalLabel"
                    style={{
                      color: "rgb(101, 84, 29)",
                      fontWeight: "bold",
                    }}
                  >
                    Create Account
                  </h5>
                  <form onSubmit={handleSignUp}>
                    <input
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        border: "1px solid #65541D",
                        background: "transparent",
                      }}
                      placeholder="Name"
                      value={name}
                    />
                    <br />
                    <input
                      className="form-control"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      style={{
                        border: "1px solid #65541D",
                        background: "transparent",
                      }}
                      placeholder="Last Name"
                    />
                    <br />
                    <input
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        border: "1px solid #65541D",
                        background: "transparent",
                      }}
                      placeholder="Email"
                      value={email}
                    />
                    <br />
                    <input
                      className="form-control"
                      onChange={(e) => setPwd(e.target.value)}
                      style={{
                        border: "1px solid #65541D",
                        background: "transparent",
                      }}
                      placeholder="Password"
                      type="password"
                      value={pwd}
                    />
                    <br />
                    <button
                      type="submit"
                      className="btn-w btn-block"
                      style={{
                        margin: "0px",
                        padding: "5px",
                        borderRadius: "5px",
                      }}
                    >
                      Create
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </ul>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{borderColor:'transparent'}}
        >
          <i className="fas fa-bars" style={{ color: "#fff" }}></i>
        </button>

        {/* <ul className="navbar-nav mr-auto mHide">
          <li className="nav-item active dHide"></li>
          <li className="nav-item active dHide"></li>
          <li className="nav-item active dHide"></li>
          <li className="nav-item active dHide"></li>
          <li className="nav-item active dHide"></li>
          <li className="nav-item active dHide"></li>
          <li className="nav-item active dHide"></li>
          <li className="nav-item active dHide"></li>
          <li className="nav-item active dHide"></li>
          <li className="nav-item active dHide"></li>
          <li className="nav-item active dHide"></li>
          <li className="nav-item active dHide"></li>
          <li className="nav-item active dHide"></li>
          <li className="nav-item active ">
            <div style={{ paddingLeft: "30px", visibility: 'hidden' }}>
              <Input
                className="search-input-field"
                placeholder="Search your favourite products here"
                prefix={<i className="fa fa-search"></i>}
              />
            </div>
          </li>
        </ul> */}
      </nav>
      <div
        className="navbar navbar-expand-lg navbar-light nvMenu ps-0"
        role="navigation"
      >
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {user === null ? (
              <>
                <li className="nav-item dFlex mt-3">
                  <span data-toggle="modal" data-target="#loginModal">
                    {" "}
                    <i
                      className="far fa-user"
                      style={{
                        color: "#65541D",
                        cursor: "pointer",
                        fontSize: "23px",
                      }}
                    />
                    <span
                      style={{ color: '#65541D', fontWeight: '700' }}
                      className="ml-3"
                    >
                      Login/Signup
                    </span>
                  </span>
                  <Link
                    className="nav-link shopping-bag p0"
                    style={{ marginLeft: "40px" }}
                    to="/cart"
                  >
                    <i
                      className="fas fa-shopping-cart"
                      style={{ color: "#65541D", cursor: "pointer" }}
                    ></i>
                    <span className="ml-3"
                      style={{ color: '#65541D', fontWeight: '700', fontSize: '16px' }}
                    >Cart</span>
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item dFlex">
                <Link className="nav-link shopping-bag p0" to="/cart">
                  <i
                    className="fas fa-shopping-cart"
                    style={{ color: "#65541D", cursor: "pointer" }}
                  ></i>
                  <span className="ml-3">Cart</span>
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link
                className="nav-link nav"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link nav"
                to="/products/product_category-Mens"
              >
                Men's Wear
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link nav"
                to="/products/product_category-Womens"
              >
                Women's Wear
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link
                className="nav-link nav"
                to="/products/product_category-Loungewear"
              >
                Loungewear
              </Link>
            </li> */}
            <li className="nav-item">
              <Link
                className="nav-link nav"
                to="/products/product_category-Tshirts"
              >
                T-shirts
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link nav"
                to="/products/product_category-kaftaans"
              >
                Kaftaans
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link nav"
                to="/products/product_category-unisex"
              >
                Unisex clothing
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link nav"
                to="/products/product_category-Nightwear"
              >
                Nightwear
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link nav"
                to="/design-your-own"
              >
                CREARE YOUR OWN
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link nav"
                to="/story-page"
              >
                Our Story
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link nav"
                to="/contact-us"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
