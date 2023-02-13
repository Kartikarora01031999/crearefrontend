import React from "react";
import noodoll from "../Images/blogs1.jpeg";
import user from './Pages/assets/img/user.jpg';
const Blog = () => {
    return (
        <div>
            <div className="blogs text-center">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-lg-6 col-sm-12">
                            <div className="blogs1">
                                <div className="box-1">
                                    <h1>Blogs</h1>
                                    <p>The latest from Ricetown</p>
                                    <a href="#">All Artiicles</a>
                                </div>
                            </div>
                            <div className="space" />
                        </div>
                        <div className="col-12 col-lg-6 col-sm-6">
                            <div className="blogs2">
                                <a href><img src={noodoll} style={{ height: "500px", width: '100%' }} className="img-fluid" /></a>
                                <div className="info">
                                    <h2>Meet the Weather Ricemonsters</h2>
                                    <p>Ricetown Sky is a busy place full of funny Ricemonsters, it is the home of Ricestorm the impatient cloud, Ricebow the shy rainbow, Ricerain and ma...</p>
                                    <a href="#">Read More</a>
                                    <a href><div className="user-box">
                                        <span><img src={user} className /></span>
                                        <div>Oliver Daniels<br /><span>September 22, 2020</span></div>
                                    </div></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blog;