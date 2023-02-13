import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getAllOrders,
  getAllVirtualOrders,
  updateOrderStatus,
} from "../../Functions/orders";
import SideNav from "../Nav/SideNav";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const AdminDashboard = ({ history }) => {
  const [sideNav, setSideNav] = useState(true);
  const [nOrders, setNorders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderType, setOrderType] = useState("normal");
  const [orderStatus, setOrderStatus] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadAllVirtualOrders();
    loadAllOrders();
  }, [user]);

  const NewsProducts = (a, b) => {
    if (a.modified_at > b.modified_at) {
      return -1;
    }
    if (a.modified_at < b.modified_at) {
      return 1;
    }
    return 0;
  };

  const loadAllVirtualOrders = () => {
    if (user !== null) {
      setLoading(true);
      getAllVirtualOrders(user.token)
        .then((res) => {
          if (res.data !== "No orders found") {
            console.log(res.data.orders);
            setOrders(res.data.orders.sort(NewsProducts));
            setLoading(false);
          } else {
            setOrders([]);
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const loadAllOrders = () => {
    if (user !== null) {
      setLoading(true);
      getAllOrders(user.token)
        .then((res) => {
          if (res.data !== "No orders found") {
            setNorders(res.data.orders.sort(NewsProducts));
            setLoading(false);
            console.log(res.data.orders);
          } else {
            setNorders([]);
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleOrderUpdate = (e, order, product, count,size) => {
    console.log(e.target.value, order, product, count,size);
    setOrderStatus(e.target.value);
    updateOrderStatus(user.token, order, e.target.value, product, count,size)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        loadAllOrders();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getPrice = (str) =>{
    var str = str.toString();
    if(str.length <= 3){
      return str;
    }else if (str.length === 4) {
      return str.substr(0, 1) + "," + str.substr(1);
    } else if (str.length === 5) {
      return str.substr(0, 2) + "," + str.substr(2);
    } else {
      return str.substr(0,1)+","+str.substr(1,2)+","+str.substr(3);
    }
  } 
  return (
    <div className="container-fluid">
      <div className="d-flex">
        {sideNav ? <SideNav /> : ""}
        <div className="col-md-9 ml-3">
          <i
            onClick={() => setSideNav(!sideNav)}
            className="fas fa-bars"
            style={{ cursor: "pointer" }}
          ></i>
          <h3>Orders</h3>
          <select
            className="form-control mb-5"
            onChange={(e) => setOrderType(e.target.value)}
          >
            <option value="normal">Normal Orders</option>
            <option value="virtual">Virtual Orders</option>
          </select>
          {orderType === "normal" ? (
            nOrders.length != 0 ? (
              nOrders.map((order, index) => (
                <div key={index}>
                  <div className="card">
                    <div className="card-header">
                      OrderStatus:-{order.order_status}/ OrderBy:-{" "}
                      {order.order_by}/ Order price:- {order.order_price} / User
                      Contact :- {order.order_phone} / Ordered At:- {new Date(order.created_at).toLocaleDateString('en-GB')}
                    </div>
                  </div>
                  <div className="card-body">
                    {order.order_product.map((product, index) => (
                      <div key={index} className="row mt-3">
                        <div className="col-md-2">{product.product_name}</div>
                        <div className="col-md-2">{getPrice(product.product_price)}</div>
                        <div className="col-md-2">
                          {product.product_category}
                        </div>
                        <div className="col-md-2">{ product.count !== undefined ?  product.count: order.order_quantity}</div>
                        <div className="col-md-2">{product.size !== undefined ?  product.size: order.order_size}</div>
                        <div className="col-md-2">
                          <select
                            className="form-control"
                            onChange={(e) =>
                              handleOrderUpdate(
                                e,
                                order._id.$oid,
                                product._id.$oid,
                                product.count !== undefined ?  product.count: order.order_quantity,
                                order.order_size
                              )
                            }
                          >
                            <option
                              selected={order.order_status === "Not Processed"}
                              value="Not Processed"
                              disabled = {order.order_status === "Completed"}
                            >
                              Not processed
                            </option>
                            <option
                              selected={order.order_status === "Processing"}
                              value="Processing"
                              disabled = {order.order_status === "Completed"}
                            >
                              Processing
                            </option>
                            <option
                              selected={order.order_status === "Dispatched"}
                              value="Dispatched"
                              disabled = {order.order_status === "Completed"}
                            >
                              Dispatched
                            </option>
                            <option
                              selected={order.order_status === "Cancelled"}
                              value="Cancelled"
                              disabled = {order.order_status === "Completed"}
                            >
                              Cancelled
                            </option>
                            <option
                              selected={order.order_status === "Completed"}
                              value="Completed"
                            >
                              Completed
                            </option>
                          </select>
                        </div>
                        <div className="col-md-12" style={{borderTop:'1px solid',marginTop:'5px',paddingTop:'5px'}}>
                          <p><b>Order Address:- </b>{order.order_address}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-danger">No Orders Found</p>
            )
          ) : orders.length != 0 ? (
            orders.map((order, index) => (
              <div key={index}>
                <div className="card">
                  <div className="card-header">
                    OrderStatus:-{order.order_status}/ OrderBy:-{" "}
                    {order.order_by}/ Order price:- {order.order_price} / User
                    Contact :- {order.order_phone} / Ordered At:- {new Date(order.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="card-body">
                  {order.order_product.map((product, index) => (
                    <div className="row mt-3" key={index}>
                      <div className="col-md-2">{product.product_name}</div>
                      <div className="col-md-2">{order.order_fabric}</div>
                      <div className="col-md-2">{order.order_color}</div>
                      <div className="col-md-2">{order.order_size}</div>
                      <div className="col-md-2">{product.product_type}</div>
                      <div className="col-md-2">
                        <select
                          className="form-control"
                          onChange={(e) => {
                            console.log(e.target.value);
                          }}
                        >
                          <option value="NOT_PROCESSED">Not processed</option>
                          <option value="PROCESSING">Processing</option>
                          <option value="DISPATCHED">Dispatched</option>
                          <option value="CANCELLED">Cancelled</option>
                          <option value="COMPLETED">Completed</option>
                        </select>
                      </div>
                      <div className="col-md-12" style={{borderTop:'1px solid',marginTop:'5px',paddingTop:'5px'}}>
                          <p><b>Order Address:- </b>{order.order_address}</p>
                        </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-danger">No Orders Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
