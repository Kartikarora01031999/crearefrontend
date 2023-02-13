import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getFabrics, removeSingleFabric } from "../../Functions/fabric";
import SideNav from "../Nav/SideNav";
import { LoadingOutlined } from "@ant-design/icons";

const AdminFabric = () => {
  const [sideNav, setSideNav] = useState(true);
  const [fabrics, setFabrics] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadAllFabrics();
  }, [user]);

  const loadAllFabrics = () => {
    setLoading(true);
    if (user != null) {
      getFabrics(user.token)
        .then((res) => {
          if (res.data !== "No fabrics found") {
            setFabrics(res.data.fabrics);
            setLoading(false);
          } else {
            setFabrics([]);
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const handleRemove = (id) => {
    removeSingleFabric(id, user.token)
      .then((res) => {
        toast.success(res.data.message);
        loadAllFabrics();
      })
      .catch((err) => console.log(err));
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
              <h1>Fabrics</h1>
              <div className="row">
                {loading ? (
                  <LoadingOutlined
                    className="text-danger"
                    style={{ fontSize: "30px" }}
                  />
                ) : fabrics.length != 0 ? (
                  fabrics.map((fabric, index) => (
                    <div className="col-md-4" key={index}>
                      <div className="card mt-3">
                        <div className="card-header"><b>{fabric.fabric_name}</b></div>
                        <div className="card-body">
                          <img
                            src={fabric.fabric_image[0].url}
                            width="100%"
                            height="300px"
                            alt="fabric"
                          />
                        </div>
                        <div className="card-footer">
                          {/* <Link
                            className="btn-warning"
                            to={`/admin/edit-fabric/${fabric._id.$oid}`}
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleRemove(fabric._id.$oid)}
                            className="btn-delete ml-4"
                          >
                            Delete
                          </button> */}
                          <Link
                            to={`/admin/edit-fabric/${fabric._id.$oid}`}
                          >
                            <i
                              class="fa fa-pencil"
                              style={{ color: "#ffc30b", fontSize: "14px" }}
                              aria-hidden="true"
                            ></i>
                          </Link>
                          <i
                            className="fa fa-trash ml-5"
                            aria-hidden="true"
                            onClick={() => handleRemove(fabric._id.$oid)}
                            style={{
                              color: "red",
                              float:'right',
                              marginTop: "10px",
                              cursor:'pointer'
                            }}
                          ></i>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-danger text-center">No Fabrics Found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminFabric;
