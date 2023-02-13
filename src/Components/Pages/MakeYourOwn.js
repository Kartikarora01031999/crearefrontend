import React, { useEffect, useState } from "react";
import "./stylesheet.css";
import { ReactSVG } from "react-svg";
import Footer from "../Footer";
import Header from "../Nav/Header";
import { getSingleVirtualProduct } from "../../Functions/product";
import { getAllColors } from "../../Functions/colors";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const MakeYourOwn = ({ match, history }) => {
  const [color, setColor] = useState("#fff");
  const [virtual, setVirtual] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  useEffect(() => {
    loadSingleProduct();
    loadAllColors();
  }, []);

  const idArray = match.params.id.split("-");
  const { user } = useSelector((state) => ({ ...state }));
  const loadSingleProduct = () => {
    getSingleVirtualProduct(idArray[0])
      .then((res) => {
        setVirtual(res.data.product);
      })
      .catch((err) => console.log(err));
  };
  const loadAllColors = () => {
    getAllColors()
      .then((res) => {
        setColors(res.data.colors);
      })
      .catch((err) => console.log(err));
  };
  const handleChangeColor = (color_id, name) => {
    setSelectedColor(color_id);
    setColor(name);
  };
  const handleConfirm = () => {
    if (color === "#fff") {
      toast.warning("please select a color");
    } else {
      const c = color.replace("#", "");
      history.push(
        `/virtual-order/${idArray[0]}-${idArray[1]}-${selectedColor}`
      );
    }
  };
  return (
    <div>
      <Header />
      <h2 className="text-center mt-3 mb-3">
        Take your pick for your favourite colour
      </h2>
      <p className="text-center mb-5">
      Can't find the colour you want? No worries, get in touch with us and <Link to="/contact-us">let us know</Link>
      </p>
      <div className="container-fluid">
        {colors.length != 0 ? (
          <div className="d-flex">
            <div className="row">
              {colors.map((color, index) => (
                <div className="col-md-1 col-2" key={index}>
                  <p
                    onClick={() =>
                      handleChangeColor(color._id.$oid, color.color_name)
                    }
                    className="mr-4"
                    style={{
                      cursor: "pointer",
                      backgroundColor: color.color_name,
                      width: "50px",
                      height: "50px",
                      borderRadius: "25px",
                      boxShadow: "2px 2px 11px #e5e5e5",
                    }}
                  ></p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
        <br />
        {virtual.length != 0 ? (
          <div className="row mt-3" style={{ display: "flex" }}>
            <div className="col-md-4 mb-3">
              <ReactSVG
                src={virtual.product_image[0].secure_url}
                style={{ fill: color }}
              />
            </div>
            <div className="col-md-4 mb-3 dHide">
              <ReactSVG
                src={virtual.product_image[0].secure_url}
                style={{ fill: color }}
              />
            </div>
            <div className="col-md-4 mb-3 dHide">
              <ReactSVG
                src={virtual.product_image[0].secure_url}
                style={{ fill: color }}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="d-flex justify-content-center">
          <button className="btn" onClick={handleConfirm}>
            Confirm Order
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MakeYourOwn;
