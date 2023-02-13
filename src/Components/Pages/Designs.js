import React, { useEffect, useState } from "react";
import Header from "../Nav/Header";
import Footer from "../Footer";
import { Avatar } from "antd";
import { getFabricByCategory, getFabrics } from "../../Functions/fabric";
import {
  getAllVirtualProducts,
  getProductByfabric,
  getVirtualByCategory,
} from "../../Functions/product";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";

const Designs = ({ history }) => {
  const [design, setDesign] = useState(1);
  const [fabrics, setFabrics] = useState([]);
  const [virtual, setVirtual] = useState([]);
  const [val, setVal] = useState(1);
  const [fabric, setFabric] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [valProduct, setValProducts] = useState(1);
  const [virtualId, setVirtualId] = useState("");
  const [selectedProductImage, setSelectedProductImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fabricCategory, setFabricCategory] = useState("");
  const [modalFabric, setModalFabric] = useState();
  const [modalProduct, setModalProduct] = useState();
  const [designCategory, setDesignCategory] = useState();
  useEffect(() => {
    loadAllFabrics();
    loadllVirtualProducts();
  }, []);

  const loadAllFabrics = () => {
    setLoading(true);
    getFabrics().then((res) => {
      if (res.data !== "No fabrics found") {
        console.log(res.data);
        setFabrics(res.data.fabrics);
        setLoading(false);
      } else {
        setFabrics([]);
        setLoading(false);
      }
    });
  };

  const loadllVirtualProducts = () => {
    setLoading(true);
    getAllVirtualProducts()
      .then((res) => {
        if (res.data !== "No products found") {
          console.log(res.data);
          setVirtual(res.data.products);
          setLoading(false);
        } else {
          setVirtual([]);
          setLoading(false);
        }
      })
      .catch((err) => console.log());
  };
  const onSelect = (fabric_id, index, image) => {
    if (val === 1) {
      setVal("S" + index);
      setFabric(fabric_id);
      setSelectedImage(image);
    } else if (val === "S" + index) {
      setVal(1);
      setFabric("");
      setSelectedImage("");
    } else {
      setVal("S" + index);
      setFabric(fabric_id);
      setSelectedImage(image);
    }
  };

  const onSelectProduct = (id, index, image) => {
    if (valProduct === 1) {
      setValProducts("S" + index);
      setVirtualId(id);
      setSelectedProductImage(image);
    } else if (valProduct === "S" + index) {
      setValProducts(1);
      setVirtualId("");
      setSelectedProductImage("");
    } else {
      setValProducts("S" + index);
      setVirtualId(id);
      setSelectedProductImage(image);
    }
  };

  const onDesignChange = async () => {
    if (design === 1) {
      if (fabric != "") {
        await getAllVirtualProducts()
          .then((res) => {
            setVirtual(res.data.products);
            setDesign(2);
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const handleSubmit = () => {
    if (virtualId === "") {
      toast.warning("Please select a design");
    } else {
      history.push(`/order-your-design/${virtualId}-${fabric}`);
    }
  };

  const handleFabricModal = (fabric) => {
    setModalFabric(fabric);
    window.$("#fabricDescriptionModal").modal("show");
  };

  const handleVirtualModal = (product) => {
    setModalProduct(product);
    window.$("#productDescriptionModal").modal("show");
  };

  const handleFabricCategory = (e) => {
    setFabricCategory(e.target.value);
    if (e.target.value === "") {
      loadAllFabrics();
    } else {
      getFabricByCategory(e.target.value).then((res) => {
        console.log(res);
        setFabrics(res.data.fabric);
      }).catch((err) => {
        console.log(err);
      });
    }
    console.log(e.target.value);
  }

  const handleDesignCategory = (e) => {
    setDesignCategory(e.target.value);
    if (e.target.value === "") {
      loadllVirtualProducts();
    } else {
      getVirtualByCategory(e.target.value).then((res) => {
        console.log(res);
        setVirtual(res.data.products);
      }).catch((err) => {
        console.log(err);
      });
    }
    console.log(e.target.value);
  }

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

  return (
    <>
      <div
        className="modal fade"
        id="fabricDescriptionModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-lg" role="document">
          <div className="modal-content">
            {modalFabric !== undefined ? (
              <>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    {modalFabric.fabric_name}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <img
                    src={modalFabric.fabric_image[0].secure_url}
                    width="100%"
                    height="200px"
                    style={{ objectFit: 'contain' }}
                  />
                  <h5>Description: </h5>
                  <p>
                    {modalFabric.fabric_description
                      .split("\n")
                      .map((p, index) => (
                        <pre style={{ fontSize: "14px", whiteSpace: 'pre-wrap' }} key={index}>
                          {p}
                        </pre>
                      ))}
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="productDescriptionModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-lg" role="document">
          <div className="modal-content">
            {modalProduct !== undefined ? (
              <>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel1">
                    {modalProduct.fabric_name}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <img
                    src={modalProduct.product_image[2].secure_url}
                    width="100%"
                    height="200px"
                    style={{ objectFit: 'contain' }}
                  />
                  <h5>Description: </h5>
                  <p>
                    {modalProduct.product_description
                      .split("\n")
                      .map((p, index) => (
                        <pre style={{ fontSize: "14px", whiteSpace: 'pre-wrap' }} key={index}>
                          {p}
                        </pre>
                      ))}
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="productDescriptionModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-lg" role="document">
          <div className="modal-content">
            {modalProduct !== undefined ? (
              <>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel1">
                    {modalProduct.fabric_name}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <img
                    src={modalProduct.product_image[2].secure_url}
                    width="100%"
                    height="200px"
                    style={{ objectFit: 'contain' }}
                  />
                  <h5>Description: </h5>
                  <p>
                    {modalProduct.product_description
                      .split("\n")
                      .map((p, index) => (
                        <pre style={{ fontSize: "14px", whiteSpace: 'pre-wrap' }} key={index}>
                          {p}
                        </pre>
                      ))}
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="productDescriptionModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-lg" role="document">
          <div className="modal-content">
            {modalProduct !== undefined ? (
              <>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel1">
                    {modalProduct.fabric_name}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <img
                    src={modalProduct.product_image[2].secure_url}
                    width="100%"
                    height="200px"
                    style={{ objectFit: 'contain' }}
                  />
                  <h5>Description: </h5>
                  <p>
                    {modalProduct.product_description
                      .split("\n")
                      .map((p, index) => (
                        <pre style={{ fontSize: "14px", whiteSpace: 'pre-wrap' }} key={index}>
                          {p}
                        </pre>
                      ))}
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="productDescriptionModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-lg" role="document">
          <div className="modal-content">
            {modalProduct !== undefined ? (
              <>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel1">
                    {modalProduct.fabric_name}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <img
                    src={modalProduct.product_image[2].secure_url}
                    width="100%"
                    height="200px"
                    style={{ objectFit: 'contain' }}
                  />
                  <h5>Description: </h5>
                  <p>
                    {modalProduct.product_description
                      .split("\n")
                      .map((p, index) => (
                        <pre style={{ fontSize: "14px", whiteSpace: 'pre-wrap' }} key={index}>
                          {p}
                        </pre>
                      ))}
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <Header />
      <div
        className="container"
        style={{ paddingLeft: "50px", paddingRight: "50px" }}
      >
        {design === 1 ? (
          <>
            <h4 className="mt-5 mb-3 mBlock">
              <span>Fabrics of your Choice</span>
            </h4>
            {selectedImage !== "" ? (
              <div className="test">
                <div>
                  Selected :
                  <Avatar className="ml-3" src={selectedImage} size={60} />
                </div>
                <button className="btn mobile-btn" onClick={onDesignChange}>
                  Next
                </button>
              </div>
            ) : (
              ""
            )}
            <hr style={{ width: "100%", border: "1px solid black" }} />

            <div className="row d-flex justify-content-center">
              <div className="col-md-3 border-design-right">
                <select
                  className="form-control w-select ml-auto"
                  onChange={handleFabricCategory}
                  style={{ fontSize: '11px' }}
                >
                  <option disabled selected>Choose fabric category</option>
                  <option value="">All</option>
                  <option value="Bamboo Fabric">Bamboo Fabric</option>
                  <option value="Banana Fabric">Banana Fabric </option>
                  <option value="Aloe-Vera Fabric">Aloe-Vera Fabric</option>
                  <option value="Corn Fabric">Corn Fabric </option>
                  <option value="Eucalyptus Fabric">Eucalyptus Fabric</option>
                  <option value="Hemp Fabric">Hemp Fabrics</option>
                  <option value="Cotton Fabric">Cotton Fabrics </option>
                  <option value="Khadi Fabric">Khadi Fabrics</option>
                  <option value="Linen Fabric">Linen Fabrics </option>
                  <option value="Lotus Fabric">Lotus Fabrics </option>
                  <option value="Milk Fabric">Milk Fabrics </option>
                  <option value="Nettle Fabric">Nettle Fabrics </option>
                  <option value="Orange Fabric">Orange Fabric </option>
                  <option value="Rose Fabric">Rose Fabric</option>
                  <option value="Soya Fabric">Soya Fabric</option>
                  <option value="Silk Fabric">Silk Fabrics</option>
                  <option value="Wool Fabric">Wool Fabrics</option>
                </select>
              </div>
              <div className="col-md-9">
                <div className="row">
                  {loading ? (
                    <div
                      style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "2.75rem",
                        marginBottom: "2.75rem",
                      }}
                    >
                      <p>
                        <LoadingOutlined
                          style={{ fontSize: "40px", verticalAlign: "middle" }}
                        />{" "}
                        Loading
                      </p>
                    </div>
                  ) : (
                    fabrics.map((fabric, index) => (
                      <div className="col-md-4" key={index}>
                        <img
                          src={fabric.fabric_image[0].url}
                          style={{
                            width: "100%",
                            height: "180px",
                            borderRadius: "11px",
                            cursor: 'pointer'
                          }}
                          alt={fabric.fabric_name}
                          onClick={() => handleFabricModal(fabric)}
                        />
                        <p
                          className="text-center"
                        >
                          {fabric.fabric_name}
                          <br />
                          <span>
                            <strike>
                                            <i className="fas fa-rupee-sign" style={{ fontWeight: '100' }}></i> {getPrice(fabric.fabric_price)}
                                        </strike>
                                        <i className="fas fa-rupee-sign ml-3" style={{ fontWeight: '100' }}></i>
                            {getPrice(Math.floor(fabric.fabric_price - ((fabric.fabric_price * 50) / 100)))}/m
                            {/*{fabric.fabric_price}/m*/}
                          </span>
                          <br />
                          {val === "S" + index ? (
                            <span
                              className="btn"
                              onClick={() =>
                                onSelect(
                                  fabric._id.$oid,
                                  index,
                                  fabric.fabric_image[0].url
                                )
                              }
                              style={{
                                // color: "rgb(101, 84, 29)",
                                cursor: "pointer",
                                marginTop: "0px",
                              }}
                            >
                              - Deselect
                            </span>
                          ) : (
                            <span
                              className="btn"
                              onClick={() =>
                                onSelect(
                                  fabric._id.$oid,
                                  index,
                                  fabric.fabric_image[0].url
                                )
                              }
                              style={{
                                // color: "rgb(101, 84, 29)",
                                cursor: "pointer",
                                marginTop: "0px",
                              }}
                            >
                              + select
                            </span>
                          )}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <hr style={{ width: "100%", border: "1px solid black" }} />
            {selectedImage !== "" ? (
              <div className="test">
                <div>
                  Selected :
                  <Avatar className="ml-3" src={selectedImage} size={60} />
                </div>
                <button className="btn mobile-btn" onClick={onDesignChange}>
                  Next
                </button>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
        {design === 2 ? (
          <>
            <h4 className="text-center mt-5 mb-3 mbu mBlock">
              <span>Design of your Choice</span>
            </h4>
            <div className="test">
              <div>
                Selected :
                <Avatar className="ml-3" src={selectedImage} size={60} />
                {selectedProductImage !== "" ? (
                  <Avatar
                    src={selectedProductImage}
                    size={60}
                    className="ml-3"
                  />
                ) : (
                  ""
                )}
              </div>
              <button className="btn mobile-btn" onClick={handleSubmit}>
                Next
              </button>
            </div>
            <hr style={{ width: "100%", border: "1px solid black" }} />
            <div className="row d-flex justify-content-center">
              <div className="col-md-3 border-design-right">
                <select
                  onChange={handleDesignCategory}
                  className="form-control w-select ml-auto mb-5"
                >
                  <option disabled selected>Choose a category</option>
                  <option value="">All</option>
                  <option value="Mens">Men's Wear</option>
                  <option value="Womens">Women's Wear</option>
                  <option value="Unisex">Unisex Wear</option>
                </select>
              </div>
              <div className="col-md-9">
                <div className="row">
                  {loading ? (
                    <div
                      className="text-danger"
                      style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "2.75rem",
                        marginBottom: "2.75rem",
                      }}
                    >
                      <p>
                        <LoadingOutlined
                          style={{ fontSize: "40px", verticalAlign: "middle" }}
                        />{" "}
                        Loading
                      </p>
                    </div>
                  ) : (
                    virtual.map((p, index) => (
                      <div className="col-md-4" key={index}>
                        <div
                          className="card design-img"
                          style={{
                            boxShadow: "0px 0px 11px 4px #e5e5e5",
                            borderRadius: "14px",
                          }}
                        >
                          <div className="card-body" style={{ cursor: 'pointer' }}
                            onClick={() => handleVirtualModal(p)}
                          >
                            <img
                              src={p.product_image[1].secure_url}
                              style={{
                                width: "100%",
                                borderRadius: "11px",
                              }}
                              alt="orange fabric with polka dots"
                            />
                          </div>
                        </div>
                        <p
                          className="text-center mt-3"
                        >
                          {p.product_name}
                          <br />
                          <span>
                            <strike>
                                <i className="fas fa-rupee-sign" style={{ fontWeight: '100' }}></i> {getPrice(p.product_price)}
                            </strike>
                                <i className="fas fa-rupee-sign ml-3" style={{ fontWeight: '100' }}></i>
                            {getPrice(Math.floor(p.product_price - ((p.product_price * 50) / 100)))}
                          </span>
                          <br />
                          {valProduct === "S" + index ? (
                            <span
                              className="btn"
                              onClick={() =>
                                onSelectProduct(
                                  p._id.$oid,
                                  index,
                                  p.product_image[0].url
                                )
                              }
                              style={{
                                cursor: "pointer",
                                marginTop: "0px",
                              }}
                            >
                              - Deselect
                            </span>
                          ) : (
                            <span
                              className="btn"
                              onClick={() =>
                                onSelectProduct(
                                  p._id.$oid,
                                  index,
                                  p.product_image[0].url
                                )
                              }
                              style={{
                                cursor: "pointer",
                                marginTop: "0px",
                              }}
                            >
                              + select
                            </span>
                          )}{" "}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <hr style={{ width: "100%", border: "1px solid black" }} />
            <div className="test">
              <div>
                Selected :
                <Avatar className="ml-3" src={selectedImage} size={60} />
                {selectedProductImage !== "" ? (
                  <Avatar
                    src={selectedProductImage}
                    size={60}
                    className="ml-3"
                  />
                ) : (
                  ""
                )}
              </div>
              <button className="btn mobile-btn" onClick={handleSubmit}>
                Next
              </button>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <Footer />
    </>
  );
};
export default Designs;
