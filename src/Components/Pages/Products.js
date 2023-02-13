import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./stylesheet.css";
import Header from "../Nav/Header";
import Footer from "../Footer";
import {Pagination, Slider, Radio, Skeleton} from "antd";
import {
    getProductByAvailability,
    getProductByAvailability1,
    getProductByPrice,
    getProductsByCategory,
    getProductByPage,
    getAllProducts,
} from "../../Functions/product";
import {LoadingOutlined} from "@ant-design/icons";
import test from '../../Images/3.png';

const Products = ({match}) => {
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(10000);
    const [value, setValue] = useState(1);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [availability, setAvailability] = useState(1);
    const [type, setType] = useState(1);
    const [filterType, setFilterType] = useState(1);
    const [count, setCount] = useState(0);
    const filterArray = match.params.filter.split("-");
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        loadAllProducts();
    }, [page, filterArray[1]]);
    const loadAllProducts = () => {
        getProductsByCategory(filterArray[1]).then((res) => {
            setCount(res.data.products.length);
        })
        setLoading(true);
        //sort,order,limit
        if (filterArray[1] != "All") {
            getProductsByCategory(filterArray[1], page, 8)
                .then((res) => {
                    setLoading(false);
                    setProducts(res.data.products);
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                });
        } else {
            getAllProducts().then((res) => {
                setCount(res.data.products.length);
            })
            getProductByPage(page, 8)
                .then((res) => {
                    setLoading(false);
                    setProducts(res.data.product);
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                });
        }
    };

    // Filter Products
    const priceLowToHigh = (a, b) => {
        if (a.product_price < b.product_price) {
            return -1;
        }
        if (a.product_price > b.product_price) {
            return 1;
        }
        return 0;
    };
    const priceHighToLow = (a, b) => {
        if (a.product_price > b.product_price) {
            return -1;
        }
        if (a.product_price < b.product_price) {
            return 1;
        }
        return 0;
    };

    const PopularProducts = (a, b) => {
        if (a.product_sold < b.product_sold) {
            return 1;
        }
        if (a.product_sold > b.product_sold) {
            return -1;
        }
        return 0;
    };
    const NewsProducts = (a, b) => {
        if (a.created_at > b.created_at) {
            return -1;
        }
        if (a.created_at < b.created_at) {
            return 1;
        }
        return 0;
    };
    const TitleAtoZ = (a, b) => {
        if (a.product_name > b.product_name) {
            return -1;
        }
        if (a.product_name < b.product_name) {
            return 1;
        }
        return 0;
    };
    const TitleZtoA = (a, b) => {
        if (a.product_name < b.product_name) {
            return -1;
        }
        if (a.product_name > b.product_name) {
            return 1;
        }
        return 0;
    };
    const NewsProductsOldToNew = (a, b) => {
        if (a.created_at < b.created_at) {
            return -1;
        }
        if (a.created_at > b.created_at) {
            return 1;
        }
        return 0;
    };
    if (filterArray[1] === "price") {
        products.sort(priceLowToHigh);
    }
    if (filterArray[1] === "popular") {
        // product_sold
        products.sort(PopularProducts);
    }
    if (filterArray[1] === "new") {
        // product_sold
        products.sort(NewsProducts);
        console.log(products);
    }

    function onAvailabilityChange(e) {
        setAvailability(e.target.value);
        let filteredProductArray = [];
        let value = e.target.value;
        if (value === 1) {
            getProductByAvailability(page, 8)
                .then((res) => setProducts(res.data.products))
                .catch((err) => console.log(err));
        } else {
            getProductByAvailability1(page, 8)
                .then((res) => setProducts(res.data.products))
                .catch((err) => console.log(err));
        }
        console.log("products", products);
        setMin(0);
        setMax(10000);
        setType(1);
        setFilterType(1);
    }

    function onPriceChange(value) {
        console.log(value);
        setMin(value[0]);
        setMax(value[1]);
        getProductByPrice(value[0], value[1], filterArray[1], page, 8)
            .then((res) => setProducts(res.data.products))
            .catch((err) => console.log(err));
        setAvailability(1);
        setType(1);
        setFilterType(1);
    }

    function onTypeChange(e) {
        setType(e.target.value);
        switch (e.target.value) {
            case 1:
                getProductsByCategory("Mens", page, 8)
                    .then((res) => setProducts(res.data.products))
                    .catch((err) => console.log(err));
                break;
            case 2:
                getProductsByCategory("Womens", page, 8)
                    .then((res) => setProducts(res.data.products))
                    .catch((err) => console.log(err));
                break;
            case 3:
                getProductsByCategory("Unisex", page, 8)
                    .then((res) => setProducts(res.data.products))
                    .catch((err) => console.log(err));
                break;
        }
        setMin(0);
        setMax(10000);
        setAvailability(1);
        setFilterType(1);
    }

    function onFilterTypeChange(e) {
        setFilterType(e.target.value);
        switch (e.target.value) {
            case 1:
                products.sort(priceLowToHigh);
                break;
            case 2:
                products.sort(priceHighToLow);
                break;
            case 3:
                products.sort(PopularProducts);
                break;
            case 4:
                products.sort(TitleAtoZ);
                break;
            case 4:
                products.sort(TitleAtoZ);
                break;
            case 5:
                products.sort(TitleZtoA);
                break;
            case 6:
                products.sort(NewsProducts);
                break;
            case 7:
                products.sort(NewsProductsOldToNew);
                break;
        }
        setMin(0);
        setMax(10000);
        setAvailability(1);
        setType(1);
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
        <div>
            <Header/>
            <div className="container-fluid">
                <h4
                    style={{
                        color: "#fff",
                        backgroundColor: "#000",
                        borderRadius: "5px",
                        height: "80px",
                        margin: "15px 37px",
                    }}
                    className="pt-4 text-center"
                >
                    Products
                </h4>
                <div style={{margin: "0px 20px"}} className="d-flex dHide">
                    <div className="dropdown">
                        <button
                            className="btn dropdown-toggle filters"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            style={{border: "none", height: '40px'}}
                        >
                            Availability
                        </button>
                        <div
                            className="dropdown-menu dropdown-menu-center p-3"
                            aria-labelledby="dropdownMenuButton"
                        >
                            <Radio.Group onChange={onAvailabilityChange} value={availability}>
                                <Radio value={1}>In Stock</Radio>
                                <Radio value={2}>Out Of Stock</Radio>
                            </Radio.Group>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button
                            className="btn dropdown-toggle filters"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            style={{border: "none", height: '40px'}}
                        >
                            Price
                        </button>
                        <div
                            className="dropdown-menu p-3"
                            aria-labelledby="dropdownMenuButton"
                        >
                            <input value={min} onChange={(e) => setMin(e.target.value)}/> -{" "}
                            <input value={max} onChange={(e) => setMax(e.target.value)}/>
                            <Slider
                                range
                                value={[min, max]}
                                defaultValue={[0, 10000]}
                                max={10000}
                                onChange={onPriceChange}
                            />
                        </div>
                    </div>
                    <div className="dropdown">
                        <button
                            className="btn  dropdown-toggle filters"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            style={{border: "none", height: '40px'}}
                        >
                            Product Type
                        </button>
                        <div
                            className="dropdown-menu p-3"
                            aria-labelledby="dropdownMenuButton"
                        >
                            <div className="ml-8">
                                <Radio.Group onChange={onTypeChange} value={type}>
                                    <Radio value={1}>Male</Radio>
                                    <br/>
                                    <Radio value={2}>Female</Radio>
                                    <br/>
                                    <Radio value={3}>Unisex</Radio>
                                </Radio.Group>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown ml-auto">
                        <button
                            className="btn  dropdown-toggle filters"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            style={{border: "none", height: '40px'}}
                        >
                            Sort by:{" "}
                            {value === 1
                                ? "Price, Low To High"
                                : value === 2
                                    ? "Price, High To Low"
                                    : value === 3
                                        ? "Popular"
                                        : value === 4
                                            ? "Title, A to Z"
                                            : value === 5
                                                ? "Title, Z to A"
                                                : value === 6
                                                    ? "Date, New to Old"
                                                    : value === 7
                                                        ? "Date, Old to New"
                                                        : ""}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <div className="ml-8">
                                <Radio.Group onChange={onFilterTypeChange} value={filterType}>
                                    <Radio value={1}>Price, Low To High</Radio>
                                    <br/>
                                    <Radio value={2}>Price, High To Low</Radio>
                                    <br/>
                                    <Radio value={3}>Popular</Radio>
                                    <br/>
                                    <Radio value={4}>Title, A to Z</Radio>
                                    <br/>
                                    <Radio value={5}>Title, Z to A</Radio>
                                    <br/>
                                    <Radio value={6}>Date, New to Old</Radio>
                                    <br/>
                                    <Radio value={7}>Date, Old to New</Radio>
                                </Radio.Group>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="accordion mHide" id="accordionExample">
                    <h2 className="mb-0">
                        <p
                            style={{
                                fontSize: "18px",
                                marginLeft: "15px",
                                marginBottom: "0px",
                            }}
                            data-toggle="collapse"
                            data-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                        >
                            Filters <i className="fas fa-filter"></i>
                        </p>
                    </h2>
                    <div
                        id="collapseThree"
                        className="collapse"
                        aria-labelledby="headingThree"
                        data-parent="#accordionExample"
                    >
                        <div className="card-body">
                            <div className="dropdown">
                                <p
                                    className="dropdown-toggle filters"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Availability
                                </p>
                                <div
                                    className="dropdown-menu dropdown-menu-center p-3"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    <p className="ml-8">0 results</p>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <Radio.Group
                                        onChange={onAvailabilityChange}
                                        value={availability}
                                    >
                                        <Radio value={1}>In Stock</Radio>
                                        <Radio value={2}>Out Of Stock</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="dropdown">
                                <p
                                    className="dropdown-toggle filters"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Price
                                </p>
                                <div
                                    className="dropdown-menu p-3"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    <p className="ml-8">0 results</p>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <input
                                        value={min}
                                        style={{width: "40%"}}
                                        onChange={(e) => setMin(e.target.value)}
                                    />{" "}
                                    -{" "}
                                    <input
                                        value={max}
                                        style={{width: "40%"}}
                                        onChange={(e) => setMax(e.target.value)}
                                    />
                                    <Slider
                                        range
                                        value={[min, max]}
                                        defaultValue={[0, 10000]}
                                        max={10000}
                                        onChange={onPriceChange}
                                    />
                                </div>
                            </div>
                            <div className="dropdown">
                                <p
                                    className="dropdown-toggle filters"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Product Type
                                </p>
                                <div
                                    className="dropdown-menu p-3"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    <p className="ml-8">0 results</p>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <div className="ml-8">
                                        <Radio.Group onChange={onTypeChange} value={type}>
                                            <Radio value={1}>Male</Radio>
                                            <br/>
                                            <Radio value={2}>Female</Radio>
                                            <br/>
                                            <Radio value={3}>Unisex</Radio>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown ml-auto">
                                <p
                                    className="dropdown-toggle filters"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Sort by:{" "}
                                    {value === 1
                                        ? "Price, Low To High"
                                        : value === 2
                                            ? "Price, High To Low"
                                            : value === 3
                                                ? "Popular"
                                                : value === 4
                                                    ? "Title, A to Z"
                                                    : value === 5
                                                        ? "Title, Z to A"
                                                        : value === 6
                                                            ? "Date, New to Old"
                                                            : value === 7
                                                                ? "Date, Old to New"
                                                                : ""}
                                </p>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    <div className="ml-8">
                                        <Radio.Group
                                            onChange={onFilterTypeChange}
                                            value={filterType}
                                        >
                                            <Radio value={1}>Price, Low To High</Radio>
                                            <br/>
                                            <Radio value={2}>Price, High To Low</Radio>
                                            <br/>
                                            <Radio value={3}>Popular</Radio>
                                            <br/>
                                            <Radio value={4}>Title, A to Z</Radio>
                                            <br/>
                                            <Radio value={5}>Title, Z to A</Radio>
                                            <br/>
                                            <Radio value={6}>Date, New to Old</Radio>
                                            <br/>
                                            <Radio value={7}>Date, Old to New</Radio>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container" style={{padding: "40px 30px 0px 30px"}}>
                    <div className="row">
                        {loading ? (
                            // <div
                            //   style={{
                            //     marginLeft: "auto",
                            //     marginRight: "auto",
                            //     marginBottom: "2.75rem",
                            //   }}
                            // >
                            //   <LoadingOutlined style={{ fontSize: "40px" }} /> Loading
                            // </div>
                            <>
                                <div className="col-lg-3 dHide">
                                    <Skeleton.Avatar active={true} shape={"square"}
                                                     style={{width: '100%', height: '300px', marginBottom: '4px'}}/>
                                    <Skeleton.Button active={true}
                                                     style={{width: '80%', marginLeft: '10%', marginBottom: '4px'}}/>
                                    <Skeleton.Button active={true} style={{marginLeft: '38%', height: '20px'}}/>
                                </div>
                                <div className="col-lg-3 dHide">
                                    <Skeleton.Avatar active={true} shape={"square"}
                                                     style={{width: '100%', height: '300px', marginBottom: '4px'}}/>
                                    <Skeleton.Button active={true}
                                                     style={{width: '80%', marginLeft: '10%', marginBottom: '4px'}}/>
                                    <Skeleton.Button active={true} style={{marginLeft: '38%', height: '20px'}}/>
                                </div>
                                <div className="col-lg-3 dHide">
                                    <Skeleton.Avatar active={true} shape={"square"}
                                                     style={{width: '100%', height: '300px', marginBottom: '4px'}}/>
                                    <Skeleton.Button active={true}
                                                     style={{width: '80%', marginLeft: '10%', marginBottom: '4px'}}/>
                                    <Skeleton.Button active={true} style={{marginLeft: '38%', height: '20px'}}/>
                                </div>
                                <div className="col-lg-3 dHide">
                                    <Skeleton.Avatar active={true} shape={"square"}
                                                     style={{width: '100%', height: '300px', marginBottom: '4px'}}/>
                                    <Skeleton.Button active={true}
                                                     style={{width: '80%', marginLeft: '10%', marginBottom: '4px'}}/>
                                    <Skeleton.Button active={true} style={{marginLeft: '38%', height: '20px'}}/>
                                </div>
                                <div className="col-lg-3 mt-5 dHide">
                                    <Skeleton.Avatar active={true} shape={"square"}
                                                     style={{width: '100%', height: '300px', marginBottom: '4px'}}/>
                                    <Skeleton.Button active={true}
                                                     style={{width: '80%', marginLeft: '10%', marginBottom: '4px'}}/>
                                    <Skeleton.Button active={true} style={{marginLeft: '38%', height: '20px'}}/>
                                </div>
                                <div className="col-lg-3 mt-5 dHide">
                                    <Skeleton.Avatar active={true} shape={"square"}
                                                     style={{width: '100%', height: '300px', marginBottom: '4px'}}/>
                                    <Skeleton.Button active={true}
                                                     style={{width: '80%', marginLeft: '10%', marginBottom: '4px'}}/>
                                    <Skeleton.Button active={true} style={{marginLeft: '38%', height: '20px'}}/>
                                </div>
                                <div className="col-lg-3 mt-5 dHide">
                                    <Skeleton.Avatar active={true} shape={"square"}
                                                     style={{width: '100%', height: '300px', marginBottom: '4px'}}/>
                                    <Skeleton.Button active={true}
                                                     style={{width: '80%', marginLeft: '10%', marginBottom: '4px'}}/>
                                    <Skeleton.Button active={true} style={{marginLeft: '38%', height: '20px'}}/>
                                </div>
                                <div className="col-lg-3 mt-5 dHide">
                                    <Skeleton.Avatar active={true} shape={"square"}
                                                     style={{width: '100%', height: '300px', marginBottom: '4px'}}/>
                                    <Skeleton.Button active={true}
                                                     style={{width: '80%', marginLeft: '10%', marginBottom: '4px'}}/>
                                    <Skeleton.Button active={true} style={{marginLeft: '38%', height: '20px'}}/>
                                </div>
                                <div className="col-6 mHide">
                                    <Skeleton.Avatar active={true} shape={"square"}
                                                     style={{width: '100%', height: '200px', marginBottom: '4px'}}/>
                                    <Skeleton.Button active={true} style={{
                                        width: '80%',
                                        marginLeft: '10%',
                                        marginBottom: '4px',
                                        height: '15px'
                                    }}/>
                                    <Skeleton.Button active={true} style={{marginLeft: '32%', height: '15px'}}
                                                     size={"small"}/>
                                </div>
                                <div className="col-6 mHide">
                                    <Skeleton.Avatar active={true} shape={"square"}
                                                     style={{width: '100%', height: '200px', marginBottom: '4px'}}/>
                                    <Skeleton.Button active={true} style={{
                                        width: '80%',
                                        marginLeft: '10%',
                                        marginBottom: '4px',
                                        height: '15px'
                                    }}/>
                                    <Skeleton.Button active={true} style={{marginLeft: '32%', height: '15px'}}
                                                     size={"small"}/>
                                </div>
                                <div className="col-6 mHide">
                                    <Skeleton.Avatar active={true} shape={"square"}
                                                     style={{width: '100%', height: '200px', marginBottom: '4px'}}/>
                                    <Skeleton.Button active={true} style={{
                                        width: '80%',
                                        marginLeft: '10%',
                                        marginBottom: '4px',
                                        height: '15px'
                                    }}/>
                                    <Skeleton.Button active={true} style={{marginLeft: '32%', height: '15px'}}
                                                     size={"small"}/>
                                </div>
                                <div className="col-6 mHide">
                                    <Skeleton.Avatar active={true} shape={"square"}
                                                     style={{width: '100%', height: '200px', marginBottom: '4px'}}/>
                                    <Skeleton.Button active={true} style={{
                                        width: '80%',
                                        marginLeft: '10%',
                                        marginBottom: '4px',
                                        height: '15px'
                                    }}/>
                                    <Skeleton.Button active={true} style={{marginLeft: '32%', height: '15px'}}
                                                     size={"small"}/>
                                </div>
                                <div className="col-6 mHide">
                                    <Skeleton.Avatar active={true} shape={"square"}
                                                     style={{width: '100%', height: '200px', marginBottom: '4px'}}/>
                                    <Skeleton.Button active={true} style={{
                                        width: '80%',
                                        marginLeft: '10%',
                                        marginBottom: '4px',
                                        height: '15px'
                                    }}/>
                                    <Skeleton.Button active={true} style={{marginLeft: '32%', height: '15px'}}
                                                     size={"small"}/>
                                </div>
                                <div className="col-6 mHide">
                                    <Skeleton.Avatar active={true} shape={"square"}
                                                     style={{width: '100%', height: '200px', marginBottom: '4px'}}/>
                                    <Skeleton.Button active={true} style={{
                                        width: '80%',
                                        marginLeft: '10%',
                                        marginBottom: '4px',
                                        height: '15px'
                                    }}/>
                                    <Skeleton.Button active={true} style={{marginLeft: '32%', height: '15px'}}
                                                     size={"small"}/>
                                </div>
                                <div className="col-6 mHide">
                                    <Skeleton.Avatar active={true} shape={"square"}
                                                     style={{width: '100%', height: '200px', marginBottom: '4px'}}/>
                                    <Skeleton.Button active={true} style={{
                                        width: '80%',
                                        marginLeft: '10%',
                                        marginBottom: '4px',
                                        height: '15px'
                                    }}/>
                                    <Skeleton.Button active={true} style={{marginLeft: '32%', height: '15px'}}
                                                     size={"small"}/>
                                </div>
                                <div className="col-6 mHide">
                                    <Skeleton.Avatar active={true} shape={"square"}
                                                     style={{width: '100%', height: '200px', marginBottom: '4px'}}/>
                                    <Skeleton.Button active={true} style={{
                                        width: '80%',
                                        marginLeft: '10%',
                                        marginBottom: '4px',
                                        height: '15px'
                                    }}/>
                                    <Skeleton.Button active={true} style={{marginLeft: '32%', height: '15px'}}
                                                     size={"small"}/>
                                </div>
                            </>
                        ) : products.length !== 0 ? (
                            products.map((product, index) => (
                                <div className="col-6 col-lg-3 mb-5" key={index}>
                                    <div className="overlay-products-container">
                                        <Link
                                            to={`/single-product/${product._id.$oid}`}
                                        >
                                            <div className="d-flex justify-content-center" style={{cursor: 'pointer'}}>
                                                <img
                                                    className="d-block image product-Image"
                                                    src={product.product_image[0].secure_url}
                                                    alt="First slide"
                                                />
                                            </div>
                                        </Link>
                                        {/* <div className="bottom">
                      <Link
                        to={`/single-product/${product._id.$oid}`}
                        className="overlay-text"
                      >
                        Quick Buy
                      </Link>
                    </div> */}
                                    </div>
                                    <div className="text-center">
                                        <p style={{marginBottom: '0px'}}>
                                            {product.product_name}
                                        </p>
                                        <strike>
                                            <i className="fas fa-rupee-sign" style={{ fontWeight: '100' }}></i> {getPrice(product.product_price)}
                                        </strike>
                                        <i className="fas fa-rupee-sign ml-3" style={{ fontWeight: '100' }}></i>
                                        {getPrice(Math.floor(product.product_price - ((product.product_price * 50) / 100)))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h1
                                className="mt-5 mb-5"
                                style={{marginLeft: "auto", marginRight: "auto"}}
                            >
                                We will upload products in the same category soon.
                            </h1>
                        )}
                    </div>
                </div>
                <Pagination
                    current={page}
                    total={count}
                    pageSize={8}
                    onChange={(value) => setPage(value)}
                    className="text-center"
                />
            </div>
            <Footer/>
        </div>
    );
};

export default Products;
