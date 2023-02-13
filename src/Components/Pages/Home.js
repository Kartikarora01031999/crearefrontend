import React, { useEffect, useState } from "react";
import "./sunny.css";
import Header from "../Nav/Header";
import Collections from "../Collections";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import { Carousel } from "antd";
import { getProductByCount } from "../../Functions/product";
import Banner from '../../Images/b1.png';
import Banner1 from '../../Images/b2.png';
import Banner2 from '../../Images/b3.png';
import mBanner from '../../Images/mBanner.png';
import mBanner1 from '../../Images/mBanner2.png';
import mBanner2 from '../../Images/mBanner3.png';
import Testimonials from "../Testimonials";
const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(async () => {
    getProductByCount(8).then((res) => {
      setProducts(res.data.product);
    });
  }, []);
  // function sendEmail() {
  //   Email.send({
  //   Host: "smtp.gmail.com",
  //   Username : "creareapptech@gmail.com",
  //   Password : "Creare@2021",
  //   To : 'anmolsingh1141@gmail.com',
  //   From : "creareapptech@gmail.com",
  //   Subject : "Order Confirmation",
  //   Body : "Your order has been sent successfully",
  //   }).then(
  //     message => alert("mail sent successfully")
  //   );
  // }


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
  const [count, setCount] = useState(0);

  const handleClick = () =>{
  setCount(count + 1)
  }
  
  return (
    <div>
      <Header />
      <div id="demo" class="carousel slide dHide" data-ride="carousel">

        <ul class="carousel-indicators">
          <li data-target="#demo" data-slide-to="0" class="active"></li>
          <li data-target="#demo" data-slide-to="1"></li>
          {/* <li data-target="#demo" data-slide-to="2"></li> */}
        </ul>

        <div class="carousel-inner">
          <div class="carousel-item active">
            <img className="d-block w-100 carousel-img" src={Banner} alt="Banner 1" />
          </div>
          <div class="carousel-item">
            <img className="d-block w-100 carousel-img" src={Banner1} alt="Banner 2" />
          </div>
          {/* <div class="carousel-item">
            <img className="d-block w-100 carousel-img" src={Banner2} alt="Banner 2" />
          </div> */}
        </div>

        <a class="carousel-control-prev" href="#demo" data-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </a>
        <a class="carousel-control-next" href="#demo" data-slide="next">
          <span class="carousel-control-next-icon"></span>
        </a>
      </div>
      <div id="demo1" class="carousel slide mHide" data-ride="carousel">

        <ul class="carousel-indicators">
          <li data-target="#demo1" data-slide-to="0" class="active"></li>
          <li data-target="#demo1" data-slide-to="1"></li>
          {/* <li data-target="#demo1" data-slide-to="2"></li> */}
        </ul>

        <div class="carousel-inner">
          <div class="carousel-item active">
            <img className="d-block w-100" src={mBanner} style={{ objectFit: 'cover' }} alt="Banner 1" />
          </div>
          <div class="carousel-item">
            <img className="d-block w-100" src={mBanner1} alt="Banner 2" />
          </div>
          {/* <div className="carousel-item">
            <img className="d-block w-100" src={mBanner2} alt="Banner 3" />
          </div> */}
        </div>

        <a class="carousel-control-prev" href="#demo1" data-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </a>
        <a class="carousel-control-next" href="#demo1" data-slide="next" style={{marginRight:'1.8%'}}>
          <span class="carousel-control-next-icon"></span>
        </a>
      </div>
      {/* <div className="container-image">
        <img className="d-block w-100 carousel-img" src={Banner} alt="" />
        <div className="centered-text">Creare</div>
      </div> */}
      <Collections />
      <Testimonials/>
      {/* Featured collection*/}
      <div className="featuredCollection text-center">
        <br />
        <h2>Featured collection</h2>
        <br />
        <div className="container" style={{ padding: "40px 45px 0px 45px", height: '374px' }}>
          <div
            id="carouselExampleControls"
            className="carousel slide dHide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row">
                  {products.map((product, index) =>
                    index < 4 ? (
                      <div className="col-6 col-lg-3">
                        <div className="overlay-products-container">
                          <Link
                            to={`/single-product/${product._id.$oid}`}
                          >
                            <div className="d-flex justify-content-center" style={{ cursor: 'pointer' }}>
                              <img
                                className="d-block image"
                                style={{ height: "250px", width: '188px', borderRadius: '5px' }}
                                src={index === 3 ? product.product_image[4].url : product.product_image[0].url}
                                alt="First slide"
                              />
                            </div>
                          </Link>
                          {/* <div className="bottom">
                            <Link
                              to={`/single-product/${product._id.$oid}`}
                              className="overlay-text"
                            >
                              Quick Buy
                            </Link>
                          </div> */}
                        </div>
                        <p
                          style={{
                            marginTop: "15px",
                            fontSize: "14px",
                            fontWeight: "300",
                            marginBottom: "0",
                          }}
                        >
                          {product.product_name}
                        </p>
                        <span className="price">
                          <strike>
                                            <i className="fas fa-rupee-sign" style={{ fontWeight: '100' }}></i> {getPrice(product.product_price)}
                                        </strike>
                                        <i className="fas fa-rupee-sign ml-3" style={{ fontWeight: '100' }}></i>
                          {getPrice(Math.floor(product.product_price - ((product.product_price * 50) / 100)))}
                        </span>
                      </div>
                    ) : (
                      ""
                    )
                  )}
                </div>
              </div>
              {products.length > 4 ? (
                <div className="carousel-item">
                  <div className="row">
                    {products.map((product, index) =>
                      index >= 4 ? (
                        <div className="col-6 col-lg-3">
                          <div className="overlay-products-container">
                            <Link to={`/single-product/${product._id.$oid}`}>
                              <div className="d-flex justify-content-center" style={{ cursor: 'pointer' }}>
                                <img
                                  className="d-block image"
                                  style={{ height: "250px", width: '188px', borderRadius: '5px' }}
                                  src={index === 5 ? product.product_image[2].url : index === 7 ? product.product_image[1].url : index === 6 ? product.product_image[3].url : product.product_image[0].url}
                                  alt="First slide"
                                />
                              </div>
                            </Link>
                            {/* <div className="bottom">
                              <Link
                                to={`/single-product/${product._id.$oid}`}
                                className="overlay-text"
                              >
                                Quick Buy
                              </Link>
                            </div> */}
                          </div>
                          <p
                            style={{
                              marginTop: "15px",
                              fontSize: "14px",
                              fontWeight: "300",
                              marginBottom: "0",
                            }}
                          >{product.product_name}</p>
                          <span className="price">
                            {/*<i className="fas fa-rupee-sign mr-1" style={{ fontWeight: '100' }}></i> {getPrice(product.product_price)}*/}
                            <strike>
                                            <i className="fas fa-rupee-sign" style={{ fontWeight: '100' }}></i> {getPrice(product.product_price)}
                                        </strike>
                                        <i className="fas fa-rupee-sign ml-3" style={{ fontWeight: '100' }}></i>
                            {getPrice(Math.floor(product.product_price - ((product.product_price * 50) / 100)))}
                          </span>
                        </div>
                      ) : (
                        ""
                      )
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleControls"
              role="button"
              data-slide="prev"
            >
              <span
                className="fas fa-arrow-left clrbtn mt-50"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleControls"
              role="button"
              data-slide="next"
            >
              <span className="fas fa-arrow-right clrbtn mt-50" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
          <div className="mHide">
            <Carousel autoplay>
              {products.map((product, index) =>
                index <= 4 ? (
                  <div>
                    <Link to={`/single-product/${product._id.$oid}`}>
                      <div className="overlay-products-container">
                        <div className="d-flex justify-content-center">
                          <img
                            className="d-block"
                            height="250px"
                            width="180px"
                            style={{ objectFit: 'cover' }}
                            src={product.product_image[0].url}
                            alt="First slide"
                          />
                        </div>
                      </div>
                      <span className="text-dark">{product.product_name}</span>
                      <br />
                      <span className="price text-dark">
                         <strike>
                                            <i className="fas fa-rupee-sign" style={{ fontWeight: '100' }}></i> {getPrice(product.product_price)}
                                        </strike>
                                        <i className="fas fa-rupee-sign ml-3" style={{ fontWeight: '100' }}></i>
                        {getPrice(Math.floor(product.product_price - ((product.product_price * 50) / 100)))}
                      </span>
                    </Link>
                  </div>
                ) : (
                  ""
                )
              )}
            </Carousel>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
