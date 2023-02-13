import React from "react";
import { Link } from "react-router-dom";
import toys from "../Images/womens.jpg";
import home from "../Images/mens.jpg";
import bag from "../Images/daily.jpeg";
import accessories from "../Images/party.jpeg";

const Collections = () => {
    return (
        <div>
            <h3 className="text-center mt-5">Shop Our Collections</h3>\
            <div className="collections sliderBar" style={{ paddingTop: '0px' }}>
                <div className="container sliderBar" style={{ paddingTop: '0px' }}>
                    <div className="row p0 m0">
                        <div className="col-lg-3"></div>
                        <div className="col-6 col-lg-3 text-center">
                            <div className="overlay-container">
                                <img src={home} alt="Avatar" style={{ objectFit: 'cover' }} className="collectionImage ml-auto mr-auto collectionsimg" />
                                <div className="middle">
                                    <Link to="/products/product_category-Mens">Shop now</Link>
                                </div>
                                <p className="dropdownmenu">Men's Collection</p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3 text-center">
                            <div className="overlay-container">
                                <img src={toys} style={{ objectFit: 'cover' }} alt="Avatar" className="collectionImage ml-auto mr-auto collectionsimg" />
                                <div className="middle">
                                    <Link to="/products/product_category-Womens">Shop now</Link>
                                </div>
                                <p className="dropdownmenu">Women's Collection</p>
                            </div>
                        </div>
                        <div className="col-lg-3"></div>
                        {/* <div className="col-6 col-lg-3 text-center">
                            <div className="overlay-container">
                                <img src={bag} alt="Avatar" className="collectionImage ml-auto mr-auto collectionsimg" />
                                <div className="middle">
                                    <Link to="/products/product_category-Loungewear">Shop now</Link>
                                </div>
                                <p className="dropdownmenu">Loungewear Collection</p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3 text-center">
                            <div className="overlay-container">
                                <img src={accessories} alt="Avatar" className="collectionImage ml-auto mr-auto collectionsimg" />
                                <div className="middle">
                                    <Link to="/products/product_category-Nightwear">Shop now</Link>
                                </div>
                                <p className="dropdownmenu">Nightwear Collection</p>
                            </div>
                        </div> */}
                    </div>
                </div>
                <p className="text-center">
                    <Link to="/products/products-All" style={{ fontWeight: 300 }} className="btn">Shop Now</Link>
                </p>
            </div>
        </div>
    );
}

export default Collections;