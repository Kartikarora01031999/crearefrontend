import React from "react";
import { Link } from "react-router-dom";
import maleSize from "../Images/size1.png";
import femaleSize from "../Images/size2.png";
const Footer = () => {
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <div>
      <div className="footer nvMenu1">
        <div className="container-fluid">
          <hr />
          <div className="row text-left imp-link">
            <div className="mobile-text-center col-lg-3">
              <p>Collections:</p>
              <Link to="/products/product_category-Womens">WomensWear</Link>
              <br />
              <Link to="/products/product_category-Mens" >MensWear</Link>
              {/* <br />
              <Link to="/products/product_category-Loungewear">Loungewear</Link>
              <br />
              <Link to="/products/product_category-Nightwear">Nightwear</Link> */}
            </div>
            <div className="mobile-text-center col-lg-3">
              <p>Get to know us:</p>
              <Link to="/story-page" className>Our Story</Link>
              <br />
              <Link to="/contact-us">Contact</Link>
              <br />
              <a data-toggle="modal" data-target="#exampleModal1" style={{ color: '#fff', fontSize: '20px', fontWeight: '300', cursor: 'pointer' }}>
                Size Chart
              </a>
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
                    <div class="modal-header" style={{ border: 'none' }}>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
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
              <br />
              <a onClick={topFunction}>Search</a>
            </div>
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
            <div className="mobile-text-center col-lg-3">
              <p>Policies:</p>
              <Link to="/refunds">Shipping and Returns</Link>
              <br />
              <Link to="/terms-and-conditions" className>Terms &amp; Conditions</Link>
              <br />
              <Link to="/policy">Privacy Policy</Link>
            </div>
            <div className="mobile-text-center col-lg-3">
              <p>Contact us</p>
              <div className="social-link">
                <a href="https://www.facebook.com/Crearebygauri_-100802649248836" target="_blank"><i className="fab fa-facebook-square" /></a>
                <a href="https://www.instagram.com/crearebygauri_/" target="_blank"><i className="fab fa-instagram" /></a>
                <a href=" https://wa.me/919997462501" target="_blank"><i className="fab fa-whatsapp" /></a>
                <a href="mailto:crearebygauri@gmail.com" className="d-flex dHide"><i className="fa fa-envelope mr-3" aria-hidden="true"></i>
                  <p style={{ fontSize: '16px' }}>crearebygauri@gmail.com</p>
                </a>
                {/* <a href="https://api.whatsapp.com/send?phone=9997462501" target="_blank" className="d-flex dHide"><i className="fa fa-phone mr-3" aria-hidden="true"></i>
                  <p style={{ fontSize: '16px' }}>+91 9997462501</p>
                </a> */}
              </div>
              <address style={{ color: "#fff" }}>
                15 Lord Krishna Residency, Teg Bhadhur Road, Dalanwala, Dehradun, Uttarakhand.
                <br/>
                Pincode - 248001
              </address>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="mobile-text-center col-12 col-lg-6 text-left col copyright-text">
              <p>Copyright © 2021 <Link to="/">CREARE</Link></p>
            </div>
            <div className="col-12 col-lg-6 d-none col m-no">
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;