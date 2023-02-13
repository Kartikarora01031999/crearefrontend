import React from "react";
import promo1 from "../Images/promo1.jpg";
import { Link } from "react-router-dom";
const Featured = () => {
    return (
        <div>
            <div className="promo text-center">
                <div className="container-fluid" style={{padding:'40px 30px 0px 30px'}}>
                    <div className="row">
                        <div className="col-lg-1"></div>
                        <div className="col-12 col-lg-5 col-sm-6">
                            <div className="prbox1">
                            <img src={promo1} className="img-fluid featured" />
                                <div className="promo1"><p>Music Mobile</p>
                                    <h2> ₹ 2500</h2>
                                    <Link to="/products/products-All" className="btn">Shop Now</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-5 col-sm-6">
                            <div className="prbox2">
                                <div className="promo1">
                                    <p>New Noodoll night lights</p>
                                    <h1>₹ 1350</h1>
                                    <Link to="/products/products-All" className="btn">Shop Now</Link>
                                </div>
                                <img src={promo1} className="img-fluid featured" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Featured;