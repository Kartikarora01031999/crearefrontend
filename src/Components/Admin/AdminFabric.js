import { Avatar, Badge } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SideNav from "../Nav/SideNav";
import Resizer from "react-image-file-resizer";
import { createFabric } from "../../Functions/fabric";
const AdminFabric = () => {
  const [sideNav, setSideNav] = useState(true);
  const [images, setImages] = useState([]);
  const [imageURL, setImageURL] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    //resize
    let files = e.target.files;
    let allUploadedFiles = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (url) => {
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
                allUploadedFiles.push(res.data.url);
                setImageURL((oldArray) => [...oldArray, res.data.url]);
                setImages((oldArray) => [...oldArray, res.data]);
              })
              .catch((error) => {
                console.log(error);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleRemove = (public_id) => {
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
  const handleSubmit = () => {
    if (
      name === "" ||
      price === "" ||
      images.length === 0 ||
      description === "" || 
      category === ""
    ) {
      toast.warning("Please fill all the fields");
    } else {
      console.log(category);
      createFabric(name, images, price, description,category, user.token)
        .then((res) => {
          toast.success(res.data.message);
          setName("");
          setPrice("");
          setImages([]);
          setDescription("");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="d-flex">{sideNav ? <SideNav /> : ""}</div>
          <div className="col-md-9 ml-3">
            <i
              onClick={() => setSideNav(!sideNav)}
              className="fas fa-bars"
              style={{ cursor: "pointer" }}
            ></i>
            <div>
              <h1>Create Fabric</h1>
              {images.length
                ? images.map((image) => (
                    <Badge
                      key={image.public_id}
                      onClick={() => handleRemove(image.public_id)}
                      className="ml-2"
                      count="x"
                      style={{ cursor: "pointer" }}
                    >
                      <Avatar src={image.url} size={60} />
                    </Badge>
                  ))
                : ""}
              <br />
              <label>Choose File</label>
              <input
                className="form-control"
                type="file"
                accept="image/*"
                onChange={fileUploadAndResize}
              />
              <label>Fabric Name:</label>
              <input
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
              <label>Fabric Price:</label>
              <input
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
              <label>Fabric Description:</label>
              <textarea
                rows="8"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
              <label>Fabric Category</label>
              <select
                className="form-control"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose an option</option>
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
              <button
                className="btn"
                style={{ marginLeft: "0px" }}
                onClick={handleSubmit}
              >
                Create Fabric
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminFabric;
