import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOrdersForUser } from "../../Functions/orders";
import Footer from "../Footer";
import { LoadingOutlined } from "@ant-design/icons";
import Header from "../Nav/Header";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    loadAllOrders();
  }, [user]);

  const loadAllOrders = () => {
    if (user !== null) {
      setLoading(true);
      getOrdersForUser(user.token)
        .then((res) => {
          if (res.data.message === "No order found") {
            setOrders([]);
            setLoading(false);
          } else {
            setOrders(res.data.orders);
            console.log(res.data.orders);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center mt-5 mb-5">My Orders</h1>
            {loading ? (
              <span
                className="text-center d-block"
                style={{ fontSize: "28px" }}
              >
                <LoadingOutlined /> Loading
              </span>
            ) : orders.length != 0 ? (
              orders.map((order, index) => (
                <Link to={`/single-product/${order.order_product[0]._id.$oid}`} className="dark">
                  <div
                    className="card box-shadow mb-3"
                    style={{ flexDirection: "row" }}
                  >
                    <img
                    className="order-img"
                      src={order.order_product[0].product_image[0].secure_url}
                      alt={index}
                    />
                    <div className="card-body order-card">
                      <div className="row">
                        <div className="col-md-5">
                          <p style={{color:'#000'}}><b>{order.order_product[0].product_name}</b></p>
                          <p>
                            <b>Size:</b>{" "}
                            {order.order_product[0].product_size[0].size}
                          </p>
                          <p>
                            <b>Description:</b>{" "}
                            {order.order_product[0].product_description.length > 100 ?
                            `${order.order_product[0].product_description.substring(0,100)}.......` :
                            order.order_product[0].product_description}
                          </p>
                        </div>
                        <div className="col-md-2">
                          <i className="fa fa-rupee-sign"></i>{" "}
                          {order.order_product[0].product_price}
                        </div>
                        <div className="col-md-5">
                          <p>
                            <b>Order Status: </b>
                            {order.order_status}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              "No Orders Found"
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;
