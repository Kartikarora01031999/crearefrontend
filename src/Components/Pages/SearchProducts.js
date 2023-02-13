import React, { useEffect, useState } from "react";
import {
  searchProduct,
} from "../../Functions/product";
import Footer from "../Footer";
import Header from "../Nav/Header";
import { Link } from "react-router-dom";
import "./stylesheet.css";
import { LoadingOutlined } from "@ant-design/icons";
import { Slider, Radio } from "antd";
const SearchProducts = ({ match }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10000);
  const [value, setValue] = useState(1);
  const [page, setPage] = useState(1);
  const [availability, setAvailability] = useState(1);
  const [type, setType] = useState(4);
  const [filterType, setFilterType] = useState(1);
  const filterArray = "";
  useEffect(() => {
    setLoading(true);
    searchProduct(match.params.query)
      .then((res) => {
        setProducts(res.data.products);
        localStorage.setItem("searchedProducts", JSON.stringify(res.data.products));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [match.params.query]);

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
    var prods = [];
    const filteredProductArray = [];
    if (localStorage.getItem("searchedProducts")) {
      prods = JSON.parse(localStorage.getItem("searchedProducts"));
    }
    let value = e.target.value;
    if (value === 1) {
      // In stock
      prods.map((p) => {
        if (p.product_quantity > 0) {
          filteredProductArray.push(p);
        }
      });
      setProducts(filteredProductArray);
      console.log("Products", filteredProductArray);
    } else {
      // out of stock
      prods.map((p) => {
        if (p.product_quantity === 0) {
          filteredProductArray.push(p);
        }
      })
      setProducts(filteredProductArray);
      console.log("Products", filteredProductArray);
    }
    setMin(0);
    setMax(10000);
    setType(1);
    setFilterType(1);
  }

  function onPriceChange(value) {
    setMin(value[0]);
    setMax(value[1]);

    var prods = [];
    const filteredProductArray = [];
    if (localStorage.getItem("searchedProducts")) {
      prods = JSON.parse(localStorage.getItem("searchedProducts"));
    }

    prods.map((p) => {
      if (p.product_price < value[1] && p.product_price > value[0]) {
        filteredProductArray.push(p);
      }
    })
    setProducts(filteredProductArray);
    setAvailability(1);
    setType(1);
    setFilterType(1);
  }
  function onTypeChange(e) {
    setType(e.target.value);

    var prods = [];
    const filteredProductArray = [];
    if (localStorage.getItem("searchedProducts")) {
      prods = JSON.parse(localStorage.getItem("searchedProducts"));
    }

    switch (e.target.value) {
      case 1:
        // Mens
        prods.map((p) => {
          if (p.product_category === "Mens") {
            filteredProductArray.push(p);
          }
        })
        break;
      case 2:
        // womens
        prods.map((p) => {
          if (p.product_category === "Womens") {
            filteredProductArray.push(p);
          }
        })
        break;
      case 3:
        // Unisex
        prods.map((p) => {
          if (p.product_category === "Unisex") {
            filteredProductArray.push(p);
          }
        })
        break;
        case 4:
        // All
        filteredProductArray.push(...prods);
        break;
    }
    setProducts(filteredProductArray);
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

  const getPrice = (str) =>{
    var str = str.toString();
    if(str.length <= 3){
      return str;
    }else if (str.length === 4) {
      return str.substr(0, 1) + "," + str.substr(1);
    } else if (str.length === 5) {
      return str.substr(0, 2) + "," + str.substr(2);
    } else {
      return str.substr(0,1)+","+str.substr(1,2)+","+str.substr(3);
    }
  }
  
  return (
    <>
      <Header />
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
        <div style={{ margin: "0px 20px" }} className="d-flex dHide">
          <div className="dropdown">
            <button
              className="btn dropdown-toggle filters"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ border: "none", height: '40px' }}
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
              style={{ border: "none", height: '40px' }}
            >
              Price
            </button>
            <div
              className="dropdown-menu p-3"
              aria-labelledby="dropdownMenuButton"
            >
              <input value={min} onChange={(e) => setMin(e.target.value)} /> -{" "}
              <input value={max} onChange={(e) => setMax(e.target.value)} />
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
              style={{ border: "none", height: '40px' }}
            >
              Product Type
            </button>
            <div
              className="dropdown-menu p-3"
              aria-labelledby="dropdownMenuButton"
            >
              <div className="ml-8">
                <Radio.Group onChange={onTypeChange} value={type}>
                  <Radio value={4}>All</Radio>
                  <br />
                  <Radio value={1}>Male</Radio>
                  <br />
                  <Radio value={2}>Female</Radio>
                  <br />
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
              style={{ border: "none", height: '40px' }}
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
                  <br />
                  <Radio value={2}>Price, High To Low</Radio>
                  <br />
                  <Radio value={3}>Popular</Radio>
                  <br />
                  <Radio value={4}>Title, A to Z</Radio>
                  <br />
                  <Radio value={5}>Title, Z to A</Radio>
                  <br />
                  <Radio value={6}>Date, New to Old</Radio>
                  <br />
                  <Radio value={7}>Date, Old to New</Radio>
                </Radio.Group>
              </div>
            </div>
          </div>
        </div>
        <div
          className="container"
          style={{ padding: "40px 30px 0px 30px" }}
        >
          <div className="row">
            {loading ? (
              <div
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: "2.75rem",
                }}
              >
                <LoadingOutlined style={{ fontSize: "40px" }} /> Loading
              </div>
            ) : (
              products.length !== 0
                ?
                products.map((product, index) => (
                  <div className="col-6 col-lg-3 mb-5" key={index}>
                    <div className="overlay-products-container">
                      <div className="d-flex justify-content-center">
                        <img
                          className="d-block image product-Image"
                          src={product.product_image[0].secure_url}
                          alt="First slide"
                        />
                      </div>
                      <div className="bottom">
                        <Link
                          to={`/single-product/${product._id.$oid}`}
                          className="overlay-text"
                        >
                          Quick Buy
                        </Link>
                      </div>
                    </div>
                    <div className="text-center">
                      <p style={{ marginBottom: '0px' }}>
                        {product.product_name}
                      </p>
                      <i className="fas fa-rupee-sign mr-1" style={{ fontWeight: '100' }}></i>
                      <span className="price">{getPrice(product.product_price)}</span>
                    </div>
                  </div>
                ))
                :
                <p className="text-danger" style={{ fontSize: '18px', marginLeft: 'auto', marginRight: 'auto' }}>No products found</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchProducts;
