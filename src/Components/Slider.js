import React from "react";
import Banner from '../Images/backgourd-image.jpg';

const Slider = () => {
    return (
        <div style={{paddingBottom:'5%'}}>
            <div className="bgSlider" />
            <div className="sliderBar">
                <div className="container-fluid sliderBar" style={{ paddingTop: '0px' }}>
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
                            <li data-target="#carouselExampleIndicators" data-slide-to={1} />
                            <li data-target="#carouselExampleIndicators" data-slide-to={2} />
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item slider1 active">
                                <div className="container-image">
                                    <img className="d-block w-100 carousel-img" src={Banner} alt="" />
                                    <div className="centered-text">
                                        Creare
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item slider2">
                                <div className="container-image">
                                    <img className="d-block w-100 carousel-img" src={Banner} alt="" />
                                    <div className="centered-text">
                                        Creare your neighbourhood tailor
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item slider3">
                                <div className="container-image">
                                    <img className="d-block w-100 carousel-img" src={Banner} alt="" />
                                    <div className="centered-text">
                                        Make your own clothes at Creare
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon dHide" aria-hidden="true" />
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon dHide" aria-hidden="true" />
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Slider;