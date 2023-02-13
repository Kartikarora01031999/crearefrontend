import React from "react";
import Footer from "../Footer";
import Header from "../Nav/Header";
import Review from "../Review";
import imag from "../../Images/1.jpg";
import { Link } from "react-router-dom";
const AllCollections = () => {
    return (
        <>
            <Header />
            <h4 className="text-center mt-5">All Collections</h4>
            <div className="sliderBar">
                <div className="container-fluid mb-5" style={{ padding: '0px 30px' }}>
                    <div className="row mb-5" >
                        <div className="col-md-6" style={{ padding: '0px' }}><div className="text-container">
                            <img src={imag} style={{ width: '100%', height: '600px', borderRadius: '15px 0px 0px 15px' }} />
                            <div className="centered">
                                <h2 className="mt-2">Jeans</h2>
                                <Link to="/products">Shop Now</Link>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-6" style={{ padding: '0px', backgroundColor: '#93c572', marginTop: '20px', borderRadius: '0px 15px 15px 0px' }}>
                            <div id="carouselExampleIndicators" style={{ width: '100%' }} className="carousel slide" data-ride="carousel">
                                <ol className="carousel-indicators" style={{ display: 'none' }}>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                </ol>
                                <div className="carousel-inner">
                                    <div className="carousel-item active" style={{ padding: '10%' }}>
                                        <div className="card" style={{ borderRadius: '10px', border: 'none', backgroundColor: '#93c572' }}>
                                            <div className="card-body">
                                                <Link to="/single-product">
                                                    <img src={imag} style={{ width: '100%', height: '280px', borderRadius: '15px' }} />
                                                </Link>
                                            </div>
                                            <div className="card-footer" style={{ display: 'flex', border: 'none', backgroundColor: '#93c572', justifyContent: 'center' }}>
                                                Product name<br />
                                                ₹ price
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item" style={{ padding: '10%' }}>
                                        <div className="card" style={{ borderRadius: '10px', border: 'none', backgroundColor: '#93c572' }}>
                                            <div className="card-body">
                                                <Link to="/single-product">
                                                    <img src={imag} style={{ width: '100%', height: '280px', borderRadius: '15px' }} />
                                                </Link>
                                            </div>
                                            <div className="card-footer" style={{ display: 'flex', border: 'none', backgroundColor: '#93c572', justifyContent: 'center' }}>
                                                Product name<br />
                                                ₹ price
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item" style={{ padding: '10%' }}>
                                        <div className="card" style={{ borderRadius: '10px', border: 'none', backgroundColor: '#93c572' }}>
                                            <div className="card-body">
                                                <Link to="/single-product">
                                                    <img src={imag} style={{ width: '100%', height: '280px', borderRadius: '15px' }} />
                                                </Link>
                                            </div>
                                            <div className="card-footer" style={{ display: 'flex', border: 'none', backgroundColor: '#93c572', justifyContent: 'center' }}>
                                                Product name<br />
                                                ₹ price
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev" style={{ color: '#000' }}>
                                    <i className="fas fa-arrow-left" aria-hidden="true"></i>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next" style={{ color: '#000' }}>
                                    <i className="fas fa-arrow-right" style={{ color: '#000' }} aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="row" >
                        <div className="col-md-6" style={{ padding: '0px', backgroundColor: '#93c572', marginTop: '20px', borderRadius: '15px 0px 0px 15px' }}>
                            <div id="carouselExampleIndicators" style={{ width: '100%' }} className="carousel slide" data-ride="carousel">
                                <ol className="carousel-indicators" style={{ display: 'none' }}>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                </ol>
                                <div className="carousel-inner">
                                    <div className="carousel-item active" style={{ padding: '10%' }}>
                                        <div className="card" style={{ borderRadius: '10px', border: 'none', backgroundColor: '#93c572' }}>
                                            <div className="card-body">
                                                <Link to="/single-product">
                                                    <img src={imag} style={{ width: '100%', height: '280px', borderRadius: '15px' }} />
                                                </Link>
                                            </div>
                                            <div className="card-footer" style={{ display: 'flex', border: 'none', backgroundColor: '#93c572', justifyContent: 'center' }}>
                                                Product name<br />
                                                ₹ price
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item" style={{ padding: '10%' }}>
                                        <div className="card" style={{ borderRadius: '10px', border: 'none', backgroundColor: '#93c572' }}>
                                            <div className="card-body">
                                                <Link to="/single-product">
                                                    <img src={imag} style={{ width: '100%', height: '280px', borderRadius: '15px' }} />
                                                </Link>
                                            </div>
                                            <div className="card-footer" style={{ display: 'flex', border: 'none', backgroundColor: '#93c572', justifyContent: 'center' }}>
                                                Product name<br />
                                                ₹ price
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item" style={{ padding: '10%' }}>
                                        <div className="card" style={{ borderRadius: '10px', border: 'none', backgroundColor: '#93c572' }}>
                                            <div className="card-body">
                                                <Link to="/single-product">
                                                    <img src={imag} style={{ width: '100%', height: '280px', borderRadius: '15px' }} />
                                                </Link>
                                            </div>
                                            <div className="card-footer" style={{ display: 'flex', border: 'none', backgroundColor: '#93c572', justifyContent: 'center' }}>
                                                Product name<br />
                                                ₹ price
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev" style={{ color: '#000' }}>
                                    <i className="fas fa-arrow-left" aria-hidden="true"></i>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next" style={{ color: '#000' }}>
                                    <i className="fas fa-arrow-right" style={{ color: '#000' }} aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6" style={{ padding: '0px' }}>
                            <div className="text-container">
                                <img src={imag} style={{ width: '100%', height: '600px', borderRadius: '0px 15px 15px 0px' }} />
                                <div className="centered">
                                    <h2 className="mt-2">Jeans</h2>
                                    <Link to="/products">Shop Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5 mb-5" >
                        <div className="col-md-6" style={{ padding: '0px' }}><div className="text-container">
                            <img src={imag} style={{ width: '100%', height: '600px', borderRadius: '15px 0px 0px 15px' }} />
                            <div className="centered">
                                <h2 className="mt-2">Jeans</h2>
                                <Link to="/products">Shop Now</Link>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-6" style={{ padding: '0px', backgroundColor: '#93c572', marginTop: '20px', borderRadius: '0px 15px 15px 0px' }}>
                            <div id="carouselExampleIndicators" style={{ width: '100%' }} className="carousel slide" data-ride="carousel">
                                <ol className="carousel-indicators" style={{ display: 'none' }}>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                </ol>
                                <div className="carousel-inner">
                                    <div className="carousel-item active" style={{ padding: '10%' }}>
                                        <div className="card" style={{ borderRadius: '10px', border: 'none', backgroundColor: '#93c572' }}>
                                            <div className="card-body">
                                                <Link to="/single-product">
                                                    <img src={imag} style={{ width: '100%', height: '280px', borderRadius: '15px' }} />
                                                </Link>
                                            </div>
                                            <div className="card-footer" style={{ display: 'flex', border: 'none', backgroundColor: '#93c572', justifyContent: 'center' }}>
                                                Product name<br />
                                                ₹ price
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item" style={{ padding: '10%' }}>
                                        <div className="card" style={{ borderRadius: '10px', border: 'none', backgroundColor: '#93c572' }}>
                                            <div className="card-body">
                                                <Link to="/single-product">
                                                    <img src={imag} style={{ width: '100%', height: '280px', borderRadius: '15px' }} />
                                                </Link>
                                            </div>
                                            <div className="card-footer" style={{ display: 'flex', border: 'none', backgroundColor: '#93c572', justifyContent: 'center' }}>
                                                Product name<br />
                                                ₹ price
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item" style={{ padding: '10%' }}>
                                        <div className="card" style={{ borderRadius: '10px', border: 'none', backgroundColor: '#93c572' }}>
                                            <div className="card-body">
                                                <Link to="/single-product">
                                                    <img src={imag} style={{ width: '100%', height: '280px', borderRadius: '15px' }} />
                                                </Link>
                                            </div>
                                            <div className="card-footer" style={{ display: 'flex', border: 'none', backgroundColor: '#93c572', justifyContent: 'center' }}>
                                                Product name<br />
                                                ₹ price
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev" style={{ color: '#000' }}>
                                    <i className="fas fa-arrow-left" aria-hidden="true"></i>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next" style={{ color: '#000' }}>
                                    <i className="fas fa-arrow-right" style={{ color: '#000' }} aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="row" >
                        <div className="col-md-6" style={{ padding: '0px', backgroundColor: '#93c572', marginTop: '20px', borderRadius: '15px 0px 0px 15px' }}>
                            <div id="carouselExampleIndicators" style={{ width: '100%' }} className="carousel slide" data-ride="carousel">
                                <ol className="carousel-indicators" style={{ display: 'none' }}>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                </ol>
                                <div className="carousel-inner">
                                    <div className="carousel-item active" style={{ padding: '10%' }}>
                                        <div className="card" style={{ borderRadius: '10px', border: 'none', backgroundColor: '#93c572' }}>
                                            <div className="card-body">
                                                <Link to="/single-product">
                                                    <img src={imag} style={{ width: '100%', height: '280px', borderRadius: '15px' }} />
                                                </Link>
                                            </div>
                                            <div className="card-footer" style={{ display: 'flex', border: 'none', backgroundColor: '#93c572', justifyContent: 'center' }}>
                                                Product name<br />
                                                ₹ price
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item" style={{ padding: '10%' }}>
                                        <div className="card" style={{ borderRadius: '10px', border: 'none', backgroundColor: '#93c572' }}>
                                            <div className="card-body">
                                                <Link to="/single-product">
                                                    <img src={imag} style={{ width: '100%', height: '280px', borderRadius: '15px' }} />
                                                </Link>
                                            </div>
                                            <div className="card-footer" style={{ display: 'flex', border: 'none', backgroundColor: '#93c572', justifyContent: 'center' }}>
                                                Product name<br />
                                                ₹ price
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item" style={{ padding: '10%' }}>
                                        <div className="card" style={{ borderRadius: '10px', border: 'none', backgroundColor: '#93c572' }}>
                                            <div className="card-body">
                                                <Link to="/single-product">
                                                    <img src={imag} style={{ width: '100%', height: '280px', borderRadius: '15px' }} />
                                                </Link>
                                            </div>
                                            <div className="card-footer" style={{ display: 'flex', border: 'none', backgroundColor: '#93c572', justifyContent: 'center' }}>
                                                Product name<br />
                                                ₹ price
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev" style={{ color: '#000' }}>
                                    <i className="fas fa-arrow-left" aria-hidden="true"></i>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next" style={{ color: '#000' }}>
                                    <i className="fas fa-arrow-right" style={{ color: '#000' }} aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6" style={{ padding: '0px' }}>
                            <div className="text-container">
                                <img src={imag} style={{ width: '100%', height: '600px', borderRadius: '0px 15px 15px 0px' }} />
                                <div className="centered">
                                    <h2 className="mt-2">Jeans</h2>
                                    <Link to="/products">Shop Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Review />
            <Footer />
        </>

    );
}

export default AllCollections;