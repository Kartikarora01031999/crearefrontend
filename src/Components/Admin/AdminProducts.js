import { LoadingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteSingleProduct,
  getAllProducts,
  getAllVirtualProducts,
} from "../../Functions/product";
import SideNav from "../Nav/SideNav";

const AdminProducts = ({ history }) => {
  const [sideNav, setSideNav] = useState(true);
  const [products, setProducts] = useState([]);
  const [virtual, setVirtual] = useState([]);
  const [type, setType] = useState("normal");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (type === "normal") {
      loadAllProducts();
    }
    if (type === "virtual") {
      loadAllVirtualProducts();
    }
  }, [user, type]);
  const loadAllProducts = () => {
    if (user !== null) {
      setLoading(true);
      getAllProducts(user.token)
        .then((res) => {
          if (res.data !== "No products found") {
            setProducts(res.data.products);
            setLoading(false);
          } else {
            setProducts([]);
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const loadAllVirtualProducts = () => {
    if (user !== null) {
      setLoading(true);
      getAllVirtualProducts(user.token)
        .then((res) => {
          if (res.data !== "No products found") {
            setVirtual(res.data.products);
            setLoading(false);
          } else {
            setVirtual([]);
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const handleDeleteProduct = (_id) => {
    deleteSingleProduct(user.token, _id)
      .then((res) => {
        toast.success(res.data.message);
        if (type == "normal") {
          loadAllProducts();
        }
        if (type === "virtual") {
          loadAllVirtualProducts();
        }
      })
      .catch((err) => console.log(err));
  };

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
          <h3>Products</h3>
          <select
            className="form-control"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="normal">Normal Product</option>
            <option value="virtual">Virtual Product</option>
          </select>
          <br />
          {type == "normal" ? (
            <div className="row">
              {loading ? (
                <LoadingOutlined
                  className="text-danger"
                  style={{ fontSize: "30px" }}
                />
              ) : products.length != 0 ? (
                products.map((val, index) => (
                  <div className="col-md-3 mb-5" key={val._id.$oid}>
                    <div className="card">
                      <div className="card-header">{val.product_name}</div>
                      <div className="card-body">
                        <img
                          src={val.product_image[0].url}
                          width="100%"
                          height="200px"
                          alt="product Image"
                        />
                      </div>
                      <div className="card-footer d-flex">
                        <Link to={`/admin/edit-products/${val._id.$oid}`}>
                          <i
                            class="fa fa-pencil"
                            style={{ color: "#ffc30b", fontSize: "14px" }}
                            aria-hidden="true"
                          ></i>
                        </Link>
                        <i
                          className="fa fa-trash"
                          aria-hidden="true"
                          onClick={() => handleDeleteProduct(val._id.$oid)}
                          style={{
                            color: "red",
                            marginLeft: "auto",
                            marginTop: "10px",
                            cursor:'pointer'
                          }}
                        ></i>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h6 className="text-danger">No products Found</h6>
              )}
            </div>
          ) : (
            <div className="row">
              {loading ? (
                <LoadingOutlined
                  className="text-danger"
                  style={{ fontSize: "30px" }}
                />
              ) : virtual.length != 0 ? (
                virtual.map((val, index) => (
                  <div className="col-md-3 mb-5" key={val._id.$oid}>
                    <div className="card">
                      <div className="card-header">{val.product_name}</div>
                      <div className="card-body">
                        <img
                          src={val.product_image[0].url}
                          width="100%"
                          height="200px"
                          alt="product Image"
                        />
                      </div>
                      <div className="card-footer d-flex">
                      <Link to={`/admin/edit-virtual-product/${val._id.$oid}`}>
                          <i
                            class="fa fa-pencil"
                            style={{ color: "#ffc30b", fontSize: "14px" }}
                            aria-hidden="true"
                          ></i>
                        </Link>
                        <i
                          className="fa fa-trash"
                          aria-hidden="true"
                          onClick={() => handleDeleteProduct(val._id.$oid)}
                          style={{
                            color: "red",
                            marginLeft: "auto",
                            marginTop: "10px",
                            cursor:'pointer'
                          }}
                        ></i>
                        {/* <Link
                          className="btn-warning"
                          to={`/admin/edit-virtual-product/${val._id.$oid}`}
                        >
                          Edit
                        </Link>
                        <button
                          className="btn-delete ml-4"
                          onClick={() => handleDeleteProduct(val._id.$oid)}
                        >
                          Delete
                        </button> */}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h6 className="text-danger">No products Found</h6>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
