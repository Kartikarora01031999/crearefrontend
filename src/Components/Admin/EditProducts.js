import { Avatar, Badge } from "antd";
import axios from "axios";
import { set } from "lodash";
import React, { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getSingleProduct, updateSingleProduct } from "../../Functions/product";
import SideNav from "../Nav/SideNav";

const EditProducts = ({ match }) => {
  const [sideNav, setSideNav] = useState(true);
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [fabric, setFabric] = useState("");
  const [images, setImages] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState("");
  const [sizePrice, setSizePrice] = useState("");
  const [sizeQuantity, setSizeQuantity] = useState("");
  const [sizeArr, setSizeArr] = useState([]);
  const [product, setProduct] = useState({});
  const [type, setType] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadSingleProduct();
  }, [user]);

  const loadSingleProduct = () => {
    if (user !== null) {
      getSingleProduct(match.params._id)
        .then((res) => {
          setProduct(res.data.product);
          setCategory(res.data.product.product_category);
          setDesc(res.data.product.product_description);
          setImages(res.data.product.product_image);
          setName(res.data.product.product_name);
          setPrice(res.data.product.product_price);
          setSizeArr(res.data.product.product_size);
          setQuantity(res.data.product.product_quantity);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSubmit = () => {
    updateSingleProduct(
      product._id.$oid,
      name,
      price,
      category,
      quantity,
      images,
      sizeArr,
      desc,
      type,
      user.token
    )
      .then((res) => toast.success(res.data.message))
      .catch((err) => console.log(err));
  };

  const fileUploadAndResize = (e) => {
    let files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(files[i], 720, 720, "JPEG", 100, 0, (url) => {
          axios
            .post(
              `http://127.0.0.1:5000/api/admin/upload`,
              { file: url },
              {
                headers: {
                  authorization: user ? user.token : "",
                },
              }
            )
            .then((res) => {
              setImages((oldArray) => [...oldArray, res.data]);
            })
            .catch((err) => console.log(err));
        });
      }
    }
  };

  const handleImageRemove = (public_id) => {
    axios
      .post(
        `http://127.0.0.1:5000/api/admin/delete`,
        { public_id },
        {
          headers: {
            authorization: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        setImages(images.filter((item) => item.public_id !== public_id));
        toast.success(res.data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleAdd = (size, price, quantity) => {
    setSizeArr((oldArray) => [...oldArray, { size, price, quantity }]);
    setSize("");
    setSizePrice("");
    setSizeQuantity("");
  };
  const handleSizeRemove = (size, price) => {
    let filteredSize = sizeArr.filter((Item) => {
      return Item.size !== size;
    });

    setSizeArr(filteredSize);
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
          <div>
            <h4>Update Product</h4>
            {images.length
              ? images.map((image, index) => (
                <Badge
                  key={index}
                  className="ml-2"
                  count="x"
                  onClick={() => handleImageRemove(image.public_id)}
                  style={{ cursor: "pointer" }}
                >
                  <Avatar src={image.url} size={60} />
                </Badge>
              ))
              : ""}
            <br />
            <br />
            <label>Choose File</label>
            <input
              className="form-control"
              multiple
              type="file"
              accept="image/*"
              onChange={fileUploadAndResize}
            />
            <label>Product Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            />
            <label>Product Category</label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="form-control"
            >
              <option value="choose an option">Choose an option</option>
              <option selected={category === "Mens"} value="Mens">Men's Wear</option>
              <option selected={category === "Womens"} value="Womens">Women's Wear</option>
              <option value="Tshirts">T-shirts</option>
              <option value="kaftaans">Kaftaans</option>
              <option value="unisex">Unisex clothing</option>
              <option selected={category === "Loungewear"} value="Loungewear">Loungewear Wear</option>
              <option selected={category === "Nightwear"} value="Nightwear">Nightwear Wear</option>
            </select>
            <label>Product Price</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-control"
            />
            <br />
            <table className="color-table">
              <tbody>
                {sizeArr.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td>{item.size}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => handleSizeRemove(item.size, item.price)}
                    >
                      remove
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
            <label>Product Size:- </label>
            <div className="row">
              <div className="col-md-3">
                <input
                  className="form-control"
                  placeholder="Enter Size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <input
                  className="form-control"
                  placeholder="Enter Price"
                  value={sizePrice}
                  onChange={(e) => setSizePrice(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <input
                  className="form-control"
                  placeholder="Enter Quantity"
                  value={sizeQuantity}
                  onChange={(e) => setSizeQuantity(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <button
                  onClick={() => handleAdd(size, sizePrice, sizeQuantity)}
                  className="btn"
                  style={{ marginTop: "0px" }}
                >
                  Add More
                </button>
              </div>
            </div>
            <label>Product Quantity</label>
            <input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="form-control"
            />
            <label>Product Description</label>
            <textarea
              className="form-control"
              rows="8"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="btn btn-primary"
              style={{ marginLeft: "0px" }}
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProducts;
