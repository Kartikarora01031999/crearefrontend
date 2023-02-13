import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Nav/Header";

const Refund = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header />
      <div
        className="container"
        style={{ textAlign: "justify", padding: "7%" }}
      >
        <h2>Refund and Exchange Policy</h2>
        <p style={{ fontSize: "15px" }} className="paragraph-space">
          We have a no return policy, we only provide size modification for
          custom products.
          <br />
          You must exchange your purchased item(s) within 5 days of receiving
          your order. To be eligible for an exchange, your item must be in the
          same condition that you received it, unworn or unused, with tags, and
          in its original packaging. You’ll also need the receipt or proof of
          purchase.
          <br />
          To start an exchange, you can contact us at creareapptech@gmail.com.
          If your exchange is accepted, we’ll send you instructions on how and
          where to send your package. Items sent back to us without first
          requesting an exchange will not be accepted. Please note the courier
          charges will be borne by the customer (an exception might be applied
          in certain cases).
          <br />
          An exchange is eligible when it is size-related for a Custom Product
          or if you want to exchange for a product the same amount as your
          original order or higher on the collection from our site.
          <br />
        </p>
        <p style={{ fontSize: "15px" }} className="paragraph-space-1">
        You can always contact us for any return question at
          creareapptech@gmail.com.
        </p>
        <br />
        <span
          style={{
            borderBottom: "1px solid",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Damages and issues
        </span>
        <p className="paragraph-space">
          We hold a strong quality-check before shipping our orders, however in
          the case of any damaged items, please inspect your order upon
          reception and contact us immediately if the item is defective, damaged
          or if you receive the wrong item, so that we can evaluate the issue
          and make it right.
        </p>
        <br />
        <span
          style={{
            borderBottom: "1px solid",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Exceptions / non-returnable items
        </span>
        <p className="paragraph-space">
          Unfortunately, we cannot accept exchanges on sale items or
          non-customized products or if the
          order has been customised for you.
        </p>
        <span
          style={{
            borderBottom: "1px solid",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Cancellation Policy:
        </span>
        <p className="paragraph-space">
          We do not offer cancellations on customised orders, for any other cancellations you can get in touch with us 
          but it is not our policy to offer cancellations on orders.
        </p>
        <span
          style={{
            borderBottom: "1px solid",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Shipping Policy:
        </span>
        <p className="paragraph-space">
          We try our best to get the product delivered at your door step within the maximum span of 10 working days 
          , for customize products the maximum span can even extend to 14 working days.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Refund;
