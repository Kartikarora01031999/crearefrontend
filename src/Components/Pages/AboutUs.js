import React from "react";
import Header from '../Nav/Header';
import Footer from '../Footer';
const AboutUs = () => {
    return (
        <div>
            <Header />
            <div className="container mb-5 pb-5 mt-5 pt-5">
                <h2>Our Story</h2>
                <p style={{ fontSize: '16px' }}>
                    Creare is a luxury loungewear label.
                    Creare is a Latin word that means ‘to create. Creare provides a platform for customers to create
                    and customise their designs on our website as per their preferences.
                    You can think of us as your neighbourhood tailor, who'll be 24*7 available, just a click away,
                    bringing all your designs to life!
                </p>
                <p style={{ fontSize: '16px' }}>
                    You think it, we make it!
                    We at Creare handpick quality fabrics from all across India with the intention of bringing only the
                    best quality products to our customers. Our kaarigars pay close attention to every garment we make for you,
                    so you get nothing but the best!
                    Our utmost priority is the quality of our products and fabrics that we curate and procure specifically
                    to engage our customers and provide them with a fulfilling shopping experience.
                    Creare believes in a more sustainable approach, choosing not to create full collections, but designing
                    exactly what you want by paying attention to all details that you provide us with. Therefore, minimising
                    fabric waste.
                </p>
            </div>
            <Footer />
        </div>
    );
}

export default AboutUs;