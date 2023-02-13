import React from "react";

const Review = () => {
    return (
        <div>
            <div className="ricereviews text-center">
                <div className="container-fluid">
                    <div className="box">
                        <h2>Creare Reviews</h2>
                        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
                                <li data-target="#carouselExampleIndicators" data-slide-to={1} />
                            </ol>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="review">
                                        <p className="rating"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /></p>
                                        <p>Absolutely adorable! My nieces couldn't have been happier!</p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="review">
                                        <p className="rating"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /></p>
                                        <p>Absolutely adorable! My nieces couldn't have been happier!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Review;