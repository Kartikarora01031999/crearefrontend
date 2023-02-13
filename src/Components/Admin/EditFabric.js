import { Badge } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SideNav from "../Nav/SideNav";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getSingleFabric, updateSingleFabric } from "../../Functions/fabric";
import { set } from "lodash";
const EditFabric = ({ match }) => {
  const [sideNav, setSideNav] = useState(true);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [imageURL, setImageURL] = useState([]);
  const [category, setCategory] = useState("");
  const [fabric, setFabric] = useState({});
  const [description, setDescription] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadSingleFabric();
  }, [user]);

  const loadSingleFabric = () => {
    getSingleFabric(match.params.id, user.token)
      .then((res) => {
        setFabric(res.data.fabric);
        setName(res.data.fabric.fabric_name);
        setPrice(res.data.fabric.fabric_price);
        setDescription(res.data.fabric.fabric_description);
        setImages(res.data.fabric.fabric_image);
        setCategory(res.data.fabric.fabric_category);
      })
      .catch((err) => console.log(err));
  };
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
    updateSingleFabric(
      fabric._id.$oid,
      name,
      price,
      images,
      description,
      category,
      user.token
    )
      .then((res) => toast.success(res.data.message))
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
          <div>
            <h1>Update Fabric</h1>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Fabric Price:</label>
            <input
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label>Fabric Description:</label>
            <textarea
              className="form-control"
              rows="8"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <label>Category</label>
            <select
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Choose an option</option>
              <option selected={category === "Bamboo Fabric"} value="Bamboo Fabric">Bamboo Fabric</option>
              <option selected={category === "Banana Fabric"} value="Banana Fabric">Banana Fabric </option>
              <option selected={category === "Aloe-Vera Fabric"} value="Aloe-Vera Fabric">Aloe-Vera Fabric</option>
              <option selected={category === "Corn Fabric"} value="Corn Fabric">Corn Fabric </option>
              <option selected={category === "Eucalyptus Fabric"} value="Eucalyptus Fabric">Eucalyptus Fabric</option>
              <option selected={category === "Hemp Fabric"} value="Hemp Fabric">Hemp Fabrics</option>
              <option selected={category === "Cotton Fabric"} value="Cotton Fabric">Cotton Fabrics </option>
              <option selected={category === "Khadi Fabric"} value="Khadi Fabric">Khadi Fabrics</option>
              <option selected={category === "Linen Fabric"} value="Linen Fabric">Linen Fabrics </option>
              <option selected={category === "Lotus Fabric"} value="Lotus Fabric">Lotus Fabrics </option>
              <option selected={category === "Milk Fabric"} value="Milk Fabric">Milk Fabrics </option>
              <option selected={category === "Nettle Fabric"} value="Nettle Fabric">Nettle Fabrics </option>
              <option selected={category === "Orange Fabric"} value="Orange Fabric">Orange Fabric </option>
              <option selected={category === "Rose Fabric"} value="Rose Fabric">Rose </option>
              <option selected={category === "Fabric"} value="Fabric">Fabric </option>
              <option selected={category === "Soya Fabric"} value="Soya Fabric">Soya Fabric</option>
              <option selected={category === "Silk Fabric"} value="Silk Fabric">Silk Fabrics</option>
              <option selected={category === "Wool Fabric"} value="Wool Fabric">Wool Fabrics</option>
            </select>
            <button className="btn" onClick={handleSubmit}>
              Update Fabric
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFabric;
