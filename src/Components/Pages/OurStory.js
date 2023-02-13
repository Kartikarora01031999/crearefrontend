import React, { useEffect } from "react";
import Header from '../Nav/Header';
import Footer from '../Footer';
import banner from '../../Images/Banner.jpg';
import { Link } from "react-router-dom";
import imag from '../../Images/our.jpg';
import imag1 from '../../Images/our1.jpg';
import imag2 from '../../Images/our2.jpg';
import product1 from "../../Images/p1.jpeg";
import product2 from "../../Images/p2.jpeg";
import product3 from "../../Images/p3.jpeg";
import product4 from "../../Images/p4.jpeg";
import product5 from "../../Images/p5.jpeg";
import product6 from "../../Images/p6.jpeg";
import product7 from "../../Images/p7.jpeg";
import product8 from "../../Images/p8.jpeg";
const OurStory = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Header />
            <div className="ricereviews">
                <div className="container-fluid mb-5 mt-5">
                    <img src={banner} width="100%" height="550px" style={{ borderRadius: '10px' }} />
                    <div className="row mt-5 mb-5" style={{ padding: '0px 15px' }}>
                        <div className="col-md-6" style={{ padding: '0px' }}>
                            <img src={imag} style={{ width: '100%', height: '550px', borderRadius: '15px 0px 0px 15px' }} />
                        </div>
                        <div className="col-md-6" style={{ padding: '0px', backgroundColor: '#F5D7DF', height: '550px', borderRadius: '0px 15px 15px 0px' }}>
                            <div style={{ padding: '10% 15% 10% 15%' }}>
                                <br />
                                <br />
                                <h3>Our mission</h3>
                                <p>
                                    Our mission is to make honest quality products, whether in it’s design, production, customer service or our ethos of fair trading.
                                    Here’s a clip of how each of our Ricemonsters are made. Each of our plush toys is hand stuffed and sewn in our London studio
                                    and we won’t let them leave unless they are cuddly and cute enough!
                                </p>
                                <Link className="btn btn-secondry" to="/about-us">Learn More</Link>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5 mb-5" style={{ padding: '0px 13px' }}>
                        <div className="col-md-6" style={{ padding: '0px', backgroundColor: '#C0F0E5', height: '550px', borderRadius: '15px 0px 0px 15px' }}>
                            <div style={{ padding: '10% 15% 10% 15%' }}>
                                <br />
                                <br />
                                <h3>Design ethos</h3>
                                <p>
                                    At the heart of Noodoll’s design ethos is playfulness, uniqueness and quality! Our toys bridge the gap between collectable
                                    design items and children’s plush toys, and with this they make great design accessible to everyone. Noodoll products fit
                                    seamlessly into the modern home and we encourage everyone to add a roarsome touch to their life!
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6" style={{ padding: '0px' }}>
                            <img src={imag1} style={{ width: '100%', height: '550px', borderRadius: '0px 15px 15px 0px' }} />
                        </div>
                    </div>
                    <div className="row mt-5 mb-5" style={{ padding: '0px 13px' }}>
                        <div className="col-md-6" style={{ padding: '0px' }}>
                            <img src={imag2} style={{ width: '100%', height: '550px', borderRadius: '15px 0px 0px 15px' }} />
                        </div>
                        <div className="col-md-6" style={{ padding: '0px', backgroundColor: '#FFF2BE', height: '550px', borderRadius: '0px 15px 15px 0px' }}>
                            <div style={{ padding: '10% 15% 10% 15%' }}>
                                <br />
                                <br />
                                <h3>For everyone</h3>
                                <p>
                                    We relish bringing our characters to life and sending them out into the world.
                                    We design each of our monsters complete with a personality and we know there’s a Ricemonster for everyone!
                                </p>
                                <Link className="btn btn-secondry">Learn More</Link>
                            </div>
                        </div>
                    </div>

                    <div className="ricereviews">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <iframe src="https://www.youtube.com/embed/3BT8z0FenBE" width="100%" height="550px" style={{ border: 'none', borderRadius: '15px' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="featuredCollection text-center">
                        <br />
                        <h2>Our Products</h2>
                        <a href="#"> Shop Now</a>
                        <br /><br /><br />
                        <div className="container-fluid" style={{ padding: '40px 30px 0px 30px' }}>
                            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div className="row">
                                            <div className="col-6 col-lg-3">
                                                <div className="overlay-products-container">
                                                    <img className="d-block w-100 image" style={{ height: '474px' }} src={product1} alt="First slide" />
                                                    <div className="bottom">
                                                        <Link to="/single-product" className="overlay-text">Quick Buy</Link>
                                                    </div>
                                                </div>
                                                <p><Link to="/single-product" className="product-name">Ricebeet</Link></p>
                                                <span className="price">₹ 1200</span>
                                            </div>
                                            <div className="col-6 col-lg-3">
                                                <div className="overlay-products-container">
                                                    <img className="d-block w-100 image" style={{ height: '474px' }} src={product2} alt="First slide" />
                                                    <div className="bottom">
                                                        <Link to="/single-product" className="overlay-text">Quick Buy</Link>
                                                    </div>
                                                </div>
                                                <p><Link to="/single-product" className="product-name">Ricebeet</Link></p>
                                                <span className="price">₹ 1200</span>
                                            </div>
                                            <div className="col-6 col-lg-3">
                                                <div className="overlay-products-container">
                                                    <img className="d-block w-100 image" style={{ height: '474px' }} src={product3} alt="First slide" />
                                                    <div className="bottom">
                                                        <Link to="/single-product" className="overlay-text">Quick Buy</Link>
                                                    </div>
                                                </div>
                                                <p><Link to="/single-product" className="product-name">Ricebeet</Link></p>
                                                <span className="price">₹ 1200</span>
                                            </div>
                                            <div className="col-6 col-lg-3">
                                                <div className="overlay-products-container">
                                                    <img className="d-block w-100 image" style={{ height: '474px' }} src={product4} alt="First slide" />
                                                    <div className="bottom">
                                                        <Link to="/single-product" className="overlay-text">Quick Buy</Link>
                                                    </div>
                                                </div>
                                                <p><Link to="/single-product" className="product-name">Ricebeet</Link></p>
                                                <span className="price">₹ 1200</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div className="row">
                                            <div className="col-6 col-lg-3">
                                                <div className="overlay-products-container">
                                                    <img className="d-block w-100 image" style={{ height: '474px' }} src={product5} alt="First slide" />
                                                    <div className="bottom">
                                                        <Link to="/single-product" className="overlay-text">Quick Buy</Link>
                                                    </div>
                                                </div>
                                                <p><Link to="/single-product" className="product-name">Ricebeet</Link></p>
                                                <span className="price">₹ 1200</span>
                                            </div>
                                            <div className="col-6 col-lg-3">
                                                <div className="overlay-products-container">
                                                    <img className="d-block w-100 image" style={{ height: '474px' }} src={product6} alt="First slide" />
                                                    <div className="bottom">
                                                        <Link to="/single-product" className="overlay-text">Quick Buy</Link>
                                                    </div>
                                                </div>
                                                <p><Link to="/single-product" className="product-name">Ricebeet</Link></p>
                                                <span className="price">₹ 1200</span>
                                            </div>
                                            <div className="col-6 col-lg-3">
                                                <div className="overlay-products-container">
                                                    <img className="d-block w-100 image" style={{ height: '474px' }} src={product7} alt="First slide" />
                                                    <div className="bottom">
                                                        <Link to="/single-product" className="overlay-text">Quick Buy</Link>
                                                    </div>
                                                </div>
                                                <p><Link to="/single-product" className="product-name">Ricebeet</Link></p>
                                                <span className="price">₹ 1200</span>
                                            </div>
                                            <div className="col-6 col-lg-3">
                                                <div className="overlay-products-container">
                                                    <img className="d-block w-100 image" style={{ height: '474px' }} src={product8} alt="First slide" />
                                                    <div className="bottom">
                                                        <Link to="/single-product" className="overlay-text">Quick Buy</Link>
                                                    </div>
                                                </div>
                                                <p><Link to="/single-product" className="product-name">Ricebeet</Link></p>
                                                <span className="price">₹ 1200</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                    <span className="fas fa-arrow-left clrbtn" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                    <span className="fas fa-arrow-right clrbtn" aria-hidden="true" />
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default OurStory;