import React from "react";

const Testimonials = () => {
    return (
        <>
            <div className="container" style={{ padding: "40px 55px 0px 55px" }}>
                <h2 className="text-center">Testimonials</h2>
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    {/* <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol> */}
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="card testimonial-height" style={{ backgroundColor: '#49AD90',  borderRadius: '10px' }}>
                                <div className="card-body mt-5">
                                    <p className="text-white">
                                        <i className="fa fa-quote-left mr-2 text-white" aria-hidden="true"></i>
                                        I ordered the tie-dye sweats set. It is one of the most comfortable sweats I have ever worn.
                                        The colours are well balanced and the material used is very high quality.
                                        It makes a perfect shopping look, I can’t wait to try other products.
                                        <i className="fa fa-quote-right ml-2 text-white" aria-hidden="true"></i>
                                    </p>
                                    <h4 className="text-center text-white"><b>Shreya Gupta</b></h4>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="card testimonial-height" style={{ backgroundColor: '#49AD90',  borderRadius: '10px' }}>
                                <div className="card-body mt-5 ">
                                    <p className="text-white">
                                        <i className="fa fa-quote-left mr-2 text-white" aria-hidden="true"></i>
                                        I was a little nervous to order because it’s a very new company but boy am I glad I did!
                                        The clothing is true to size, fabrics are truly great and styles are up to date with justified
                                        pricing. Glad I took the chance, now I'm a happy returning customer.
                                        <i class="fa fa-quote-right ml-2 text-white" aria-hidden="true"></i>
                                    </p>
                                    <h4 className="text-center text-white"><b>Rahul Bajaj</b></h4>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="card testimonial-height" style={{ backgroundColor: '#49AD90',  borderRadius: '10px' }}>
                                <div className="card-body mt-5">
                                    {/* <p className="text-center">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </p> */}
                                    <p className="mt-3 text-white">
                                        <i className="fa fa-quote-left mr-2 text-white" aria-hidden="true"></i>
                                        I ordered the dearly beloved set, I was so impressed by the quality of the fabrics and the
                                        silhouettes that I ended up ordering a few other things as well. I loved the packaging as well,
                                        definitely recommended!
                                        <i className="fa fa-quote-right ml-2 text-white" aria-hidden="true"></i>
                                    </p>
                                    <h4 className="text-center text-white"><b>Nandeka Mehta</b></h4>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="card testimonial-height" style={{ backgroundColor: '#49AD90',  borderRadius: '10px' }}>
                                <div className="card-body mt-5">
                                    {/* <p className="text-center">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </p> */}
                                    <p className="mt-3 text-white">
                                        <i className="fa fa-quote-left mr-2 text-white" aria-hidden="true"></i>
                                        I ordered the soul green co-ord set, and it reached me in a week. The outfit looked better than the pictures.
                                         So many people asked me where I got it from. The material is super soft, seems perfect for summers!
                                        <i className="fa fa-quote-right ml-2 text-white" aria-hidden="true"></i>
                                    </p>
                                    <h4 className="text-center text-white"><b>Stuti Bajaj</b></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span
                            className="fas fa-arrow-left clrbtn"
                            aria-hidden="true"
                        ></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="fas fa-arrow-right clrbtn" aria-hidden="true" />
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </>
    )
}

export default Testimonials;