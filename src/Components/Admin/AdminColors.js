import { LoadingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteColor, getAllColors } from "../../Functions/colors";
import SideNav from "../Nav/SideNav";

const AdminColors = () => {
    const [sideNav, setSideNav] = useState(true);
    const [loading, setLoading] = useState(false);
    const [colors, setColors] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadAllColors();
    }, [user]);
    const loadAllColors = () => {
        setLoading(true);
        getAllColors().then((res) => {
            if (res != "No colors found") {
                setColors(res.data.colors);
                setLoading(false);
            }
            else {
                setColors([]);
                setLoading(false);
            }
        }).catch((err) => console.log(err));
    }
    const handleRemove = (id) => {
        deleteColor(id, user.token).then(res => {
            loadAllColors();
        }).catch(err => console.log(err));
    }
    return (
        <div className="container-fluid">
            <div className="d-flex">
                {sideNav ? <SideNav /> : ""}
                <div className="col-md-9 ml-3">
                    <i onClick={() => setSideNav(!sideNav)} className="fas fa-bars" style={{ cursor: 'pointer' }}></i>
                    <h3>Colors</h3>
                    <div className="row">
                        {loading ? <LoadingOutlined className="text-dark" style={{ fontSize: '30px' }} /> :
                            colors.length != 0
                                ?
                                colors.map((color, index) => (
                                    <div className="card col-md-12 mt-3">
                                        <div className="card-body">
                                            {color.color_name}
                                            <div className="flex" style={{ float: 'right' }}>
                                                <Link to={`/admin/edit-color/${color._id.$oid}`} style={{ fontSize: 'inherit' }}><i className="fas fa-pencil-alt mr-3" style={{ color: '#e1ad01', cursor: 'pointer', fontSize: '14px' }}></i></Link>
                                                <i className="fas fa-trash" onClick={() => handleRemove(color._id.$oid)} style={{ color: 'red', cursor: 'pointer' }}></i>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                :
                                <p className="text-danger">No colors Found</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminColors;