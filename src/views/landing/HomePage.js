import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import "./homepage.css";
import "../../sass/whislist.css";
import Carouselcomp from "../../components/Carouselcomp";
import Baseline from "../../components/Baseline";
import Header1 from "../../components/Header1";
import { useHistory } from "react-router-dom";
import Delivery from "../../Images/delivery.jpg";
import ReadMoreReact from "read-more-react";
import Mobile from "../../Images/Mobile.png";
import {AiFillApple} from 'react-icons/ai';
import {IoLogoGooglePlaystore} from "react-icons/io5";

import $ from "jquery";

var Userdata = "";
let tranding = 0;
let skincare = 0;
const HomePage = () => {
  const images = [
    "../../Images/categories/categories-img1.png",
    "../../Images/categories/categories-img2.png",
    "../../Images/categories/categories-img3.png",
    "../../Images/categories/categories-img4.png",
    "../../Images/categories/categories-img5.png",
    "../../Images/categories/categories-img6.png",
  ];

  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [Manufactureres, setManufactureres] = useState([]);
  const [AllProduct, setAllProduct] = useState([]);
  const [search, setSearch] = useState("");

  const [ProductCategory, setProductCategory] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [userCart, setUserCart] = useState([]);
  const [order, Setorder] = useState([]);
  const [Categorydetails, setCategoryDetails] = useState({});
  const [categoryname, Setcategoryname] = useState();
  const history = useHistory();
  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    console.log(Userdata, "sadbhksabdhk");
    GetData();
    CartById();
    GetCategory();
    GetManufacturer();
    tranding = 0;
    skincare = 0;
    $(document).ready(function() {
      //    $('.icon-wishlist').on('click', function(){
      //       $(this).toggleClass('in-wishlist');

      // })

      $(".frontimage").mouseover(function() {
        alert("in");
      });
      $(".frontimage").mouseleave(function() {
        alert("in");
      });
    });
  }, []);
  const WishlistHeart = () => {
    $(".icon-wishlist").on("click", function() {
      $(this).toggleClass("in-wishlist");
    });
  };
  const GetData = async () => {
    Userdata = await JSON.parse(localStorage.getItem("Userdata"));
    console.log(Userdata, "sadbhksabdhk");
    await fetch("http://localhost:3033/api/product/all_product")
      //await fetch("http://144.91.110.221:3033/api/product/all_product")
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data, "product");
        setData(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const GetManufacturer = async () => {
    await fetch("http://localhost:3033/api/manufacture/all_manufacture")
      //await fetch("http://144.91.110.221:3033/api/manufacture/all_manufacture")
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data, "hello");
        setManufactureres(data.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };
  const GetCategory = async () => {
    await fetch("http://localhost:3033/api/category/all_category")
      // await fetch("http://144.91.110.221:3033/api/category/all_category")
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data, "hrre");
        setCategories(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const cartfunction = async (
    productid,
    name,
    quantity,
    mrp,
    discount,
    description,
    category,
    manufacturer,
    image
  ) => {
    if (quantity !== 0) {
      var merged = false;
      var newItemObj = {
        productid: productid,
        name: name,
        image: image,
        quantity: quantity,
        mrp: parseInt(mrp),
        singleprice: parseInt(mrp),
        discountprice: discount,

        category: category,
        manufacturer: manufacturer,
        description: description,
      };
      if (userCart.order == null || userCart.order == []) {
        for (var i = 0; i < order.length; i++) {
          if (order[i].productid == newItemObj.productid) {
            order[i].quantity += newItemObj.quantity;
            order[i].mrp += newItemObj.mrp;
            // order[i].actualprice+=newItemObj.actualprice
            merged = true;
            setQuantity(1);
          }
        }
        if (!merged) {
          order.push(newItemObj);
          setQuantity(1);
          await AddtoCart();
          await CartById();
        }
      } else {
        for (var i = 0; i < userCart.order.length; i++) {
          if (userCart.order[i].productid == newItemObj.productid) {
            userCart.order[i].quantity += newItemObj.quantity;
            userCart.order[i].mrp += newItemObj.mrp;
            merged = true;
          } else {
            merged = false;
          }
          setQuantity(1);
        }
        if (!merged) {
          userCart.order.push(newItemObj);
        }
        setQuantity(1);
        CartById();
        UpdateCart();

        //   await AsyncStorage.setItem("order1", JSON.stringify(userCart.order));
        //   newamount = 0;
      }
    }
  };
  const UpdateCart = () => {
    const url = "http://localhost:3033/api/cart/update_cart_by_id";
    // const url = "http://144.91.110.221:3033/api/cart/update_cart_by_id";
    fetch(url, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: userCart._id,
        userid: Userdata._id,
        order: userCart.order,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "after update");
        history.push("/Cart");
      })
      .then((err) => console.log(err));
  };
  const CartById = async () => {
    if (!Userdata == []) {
      await fetch("http://localhost:3033/api/cart/cart_by_id", {
        // await fetch("http://144.91.110.221:3033/api/cart/cart_by_id", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: Userdata._id,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          setUserCart(data.data[0]);
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
  };
  const AddtoCart = async () => {
    if (!Userdata == []) {
      await fetch("http://localhost:3033/api/cart/add_to_cart", {
        //await fetch("http://144.91.110.221:3033/api/cart/add_to_cart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: Userdata._id,
          order: order,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          setUserCart(data.data);
          history.push("/Cart");
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
    // else{
    //    history.push('/Register')
    // }
  };
  const AddtoWishlist = async (
    productid,
    name,
    quantity,
    mrp,
    discount,
    description,
    category,
    manufacturer,
    image
  ) => {
    await fetch("http://localhost:3033/api/wishlist/wishlist_by_id", {
      // await fetch("http://144.91.110.221:3033/api/wishlist/wishlist_by_id", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: Userdata._id,
      }),
    })
      .then((data) => data.json())
      .then(async (data) => {
        if (data.data == undefined) {
          if (!Userdata == []) {
            await fetch(
              "http://localhost:3033/api/wishlist/add_to_wishlist",
              // "http://144.91.110.221:3033/api/wishlist/add_to_wishlist",
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userid: Userdata._id,
                  image: image,
                  name: name,
                  productId: productid,
                  rating: "5",
                  category: category,
                  manufacturer: manufacturer,
                  description: description,
                }),
              }
            )
              .then((res) => res.json())
              .then(async (data) => {
                // setWishlist(data.data[0]);
                //  await console.log(wishlist,"khlklklklk")
              })
              .catch((err) => {
                console.log(err, "error e");
              });
          }
        } else {
          if (!JSON.stringify(data.data).includes(productid) && data.data) {
            if (!Userdata == []) {
              await fetch(
                "http://localhost:3033/api/wishlist/add_to_wishlist",
                // "http://144.91.110.221:3033/api/wishlist/add_to_wishlist",
                {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    userid: Userdata._id,
                    image: image,
                    name: name,
                    productId: productid,
                    rating: "5",
                    category: category,
                    manufacturer: manufacturer,
                    description: description,
                  }),
                }
              )
                .then((res) => res.json())
                .then(async (data) => {
                  // setWishlist(data.data[0]);
                  //  await console.log(wishlist,"khlklklklk")
                })
                .catch((err) => {
                  console.log(err, "error e");
                });
            }
          } else {
            alert("Allready in wishlist");
          }
        }
      });
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const searchData = (e) => {
    // if (props.func) props.func(e);
  };

  return (
    <>
      <Header1 />
      {/* <Carouselcomp /> */}
      <div id="body-pd">
        {/* trending section  */}
        <section className="home-banner">
          <div className="container m-auto">
            <div className="row">
              <div className="col-md-6">
                <div className="home-banner-left">
                  <p className="home-banner-heading">
                    Reliable on time home delivery
                  </p>
                  <p className="home-banner-content">
                    We are excited to be part of the WordPress community and
                    looking to make contribution by releasing free WordPress
                    themes for everyone to use. Other themes can be found here.
                  </p>

                  <div className="login-div2 clearfix mb-5">
                    <input
                      type="text"
                      onChange={(e) => setSearch(e.target.value.toLowerCase())}
                      onKeyPress={(e) => {
                        if (e.key == "Enter") {
                          searchData(search);
                        }
                      }}
                    />
                    <Link to={"/SearchResult/" + search}>
                      <button
                        className="search mr-1"
                        onClick={() => searchData(search)}
                      >
                        <i className="bx bx-search-alt"></i>
                      </button>
                    </Link>
                  </div>

                  <div className="home-banner-buttons pt-4">
                    <button className="btn common-gradient-btn">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="home-banner-right">
                  <img src={Delivery} className="img-fluid"></img>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="products-area">
          <h1 className="trendign-head">Trending Products</h1>
          <div className="container m-auto">
            <div className="row">
              {data.map((el, ind) => {
                console.log("tranding products", el);
                if (
                  (tranding < 8 && el.type == "Tranding Product") ||
                  el.type == "Trending Product"
                ) {
                  tranding = tranding + 1;
                  return (
                    <>
                      <div className="col-lg-2 col-md-12 col-sm-12 ">
                        {/* <Link to={"/SingleProduct/" + el._id}> */}
                        <div className="single-products-box border">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="product-div">
                                <div className="product-image-div">
                                  <Link
                                    to={"/SingleProduct/" + el._id}
                                    className="product-image-link"
                                  >
                                    <div className="image hover-switch">
                                      <img
                                        src={require("../../Images/products/Hintosulin (1).png")}
                                        alt=""
                                      />
                                      <img
                                        src={
                                          //"http://144.91.110.221:3033/" +
                                          "http://localhost:3033/" +
                                          el.image[0].path
                                        }
                                        alt=""
                                        style={{ position: "absolute" }}
                                      />
                                    </div>
                                  </Link>
                                </div>
                                <div className="tranding product-image-content">
                                  <div className="content product-content">
                                    <Link to={"/SingleProduct/" + el._id}>
                                      <ReadMoreReact text={el.name} />
                                    </Link>
                                    <div className="price-div d-flex align-items-center">
                                      <span className="new-price"><i class="fa fa-inr"></i>{" "}{el.inrDiscount}</span>
                                      <del className="new-price ml-1">
                                         {el.inrMrp}
                                      </del>
                                      {Userdata ? (
                                        <i
                                          className="bx bxs-heart ml-3"
                                          onClick={() => {
                                            AddtoWishlist(
                                              el._id,
                                              el.name,
                                              quantity,
                                              el.inrMrp,
                                              el.inrDiscount,
                                              el.description,
                                              el.category,
                                              el.manufacturer.name,
                                              el.image
                                            );
                                          }}
                                        ></i>
                                      ) : (
                                        <>
                                          <i
                                            className="bx bxs-heart ml-3 pc-heart"
                                            data-bs-toggle="modal"
                                            data-bs-target={
                                              Userdata == null
                                                ? "#exampleModal"
                                                : null
                                            }
                                          ></i>
                                          <Link to="/Register">
                                            <i className="bx bxs-heart ml-3 mobile-heart"></i>
                                          </Link>
                                        </>
                                      )}
                                      <i className="bx bx-cart ml-2"></i>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* </Link> */}
                      </div>
                    </>
                  );
                }
              })}
            </div>
            {/* hover Button */}
            {/* <div className="wrapperbtn pt-0">
              <Link to="/TrendingProducts" className="btn10">
                <span>Show More</span>
                <div className="transition"></div>
              </Link>
            </div> */}
            {/* Hover Button End */}
          </div>
        </section>

        <section className="categories-section">
          <div className="container m-auto">
            <div className="row ">
              <div className="col-md-6">
                <div className="cat-left-side">
                  <div className="row">
                    <div className="col-md-6">
                      <h1 className="cat-heading">Cosmetic</h1>
                      <p className="cat-para">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolore dolores harum corporis, rerum, animi explicabo
                        sed consequatur aut voluptas inventore dolorem
                        perferendis natus, velit eius.
                      </p>
                      <button className="btn btn cosmetic-shop-now">
                        Shop Now
                      </button>
                    </div>
                    <div className="col-md-6">
                      <Link to={"/Allcategory/" + "610a8c607c5c2f5f8b1e579b"}>
                        <div className="category-div">
                          <figure>
                            <img
                              // src={require("../../Images/Nutraceutical-image 1.png")} cosmatic-healthcare.jpeg
                              src={require("../../Images/cosmatic-healthcare.jpeg")}
                              className="front-img img-fluid"
                            />
                          </figure>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="cat-right-side">
                  <div className="row">
                    <div className="col-md-6">
                      <h1 className="cat-heading">Nutracuetical</h1>
                      <p className="cat-para">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Quibusdam earum dicta, laudantium soluta assumenda
                        ad veniam veritatis porro nostrum nesciunt a adipisci
                        eligendi, corrupti dolorum!
                      </p>
                      <button className="btn btn nutracuetical-shop-now">
                        Shop Now
                      </button>
                    </div>
                    <div className="col-md-6">
                      <Link to={"/Allcategory/" + "610a8b4e7c5c2f5f8b1e578b"}>
                        <div className="category-div">
                          <figure>
                            <img
                              // src={require("../../Images/Cosmetics image 1.png")}
                              src={require("../../Images/nutrat.jpeg")}
                              className="front-img img-fluid"
                            />
                          </figure>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="products-area ">
          <h1 className="trendign-head">Products</h1>
          <div className="container m-auto py-4">
            <div className="row ">
              {data.map((el, ind) => {
                if (ind > 0) {
                  return (
                    <div className="col-lg-3 col-md-12 col-sm-12 ">
                      {/* <Link to={"/SingleProduct/" + el._id}> */}
                      <div className="single-products-box border">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="product-div">
                                <div className="product-image-div">
                                  <Link
                                    to={"/SingleProduct/" + el._id}
                                    className="product-image-link"
                                  >
                                    <div className="image hover-switch">
                                      <img
                                        src={require("../../Images/products/Hintosulin (1).png")}
                                        alt=""
                                      />
                                      <img
                                        src={
                                          //"http://144.91.110.221:3033/" +
                                          "http://localhost:3033/" +
                                          el.image[0].path
                                        }
                                        alt=""
                                        style={{ position: "absolute" }}
                                      />
                                    </div>
                                  </Link>
                                </div>
                                <div className="tranding product-image-content">
                                  <div className="content product-content">
                                    <Link to={"/SingleProduct/" + el._id}>
                                      <ReadMoreReact text={el.name} />
                                    </Link>
                                    <div className="price-div d-flex align-items-center">
                                      <span className="new-price">$899</span>
                                      <del className="new-price ml-1">
                                        $1000
                                      </del>
                                      {Userdata ? (
                                        <i
                                          className="bx bxs-heart ml-3"
                                          onClick={() => {
                                            AddtoWishlist(
                                              el._id,
                                              el.name,
                                              quantity,
                                              el.inrMrp,
                                              el.inrDiscount,
                                              el.description,
                                              el.category,
                                              el.manufacturer.name,
                                              el.image
                                            );
                                          }}
                                        ></i>
                                      ) : (
                                        <>
                                          <i
                                            className="bx bxs-heart ml-3 pc-heart"
                                            data-bs-toggle="modal"
                                            data-bs-target={
                                              Userdata == null
                                                ? "#exampleModal"
                                                : null
                                            }
                                          ></i>
                                          <Link to="/Register">
                                            <i className="bx bxs-heart ml-3 mobile-heart"></i>
                                          </Link>
                                        </>
                                      )}
                                      <i className="bx bx-cart ml-2"></i>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      {/* </Link> */}
                    </div>
                  );
                }
              })}
            </div>
            {/* hover Button */}

            <div className="wrapperbtn pt-3 pb-4">
              <Link to="/AllProducts" className="btn10">
                <span>Show More</span>
                <div className="transition"></div>
              </Link>
            </div>
            {/* Hover Button End */}
          </div>
        </section>
        <section className="products-area">
        <h1 className="trendign-head">Skin Care</h1>
          <div className="container m-auto">
            <div className="row">
              {data.map((el, ind) => {
                console.log("skin careee outside", data);
                // if (
                //   (ind > 0  && el.name == "Obloss") ||
                //   el.name == "UDC II" ||
                //   el.subcategory == "6133469ff51d5a1242de049a"
                // ) {
                if (ind > 0 && el.category.name == "Skin Care") {
                  console.log("skin careee inside", el);
                  skincare = skincare + 1;
                  return (
                    <div className="col-lg-3 col-md-12 col-sm-12 ">
                      {/* <Link to={"/SingleProduct/" + el._id}> */}
                      <div className="single-products-box border">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="product-div">
                                <div className="product-image-div">
                                  <Link
                                    to={"/SingleProduct/" + el._id}
                                    className="product-image-link"
                                  >
                                    <div className="image hover-switch">
                                      <img
                                        src={require("../../Images/products/Hintosulin (1).png")}
                                        alt=""
                                      />
                                      <img
                                        src={
                                          //"http://144.91.110.221:3033/" +
                                          "http://localhost:3033/" +
                                          el.image[0].path
                                        }
                                        alt=""
                                        style={{ position: "absolute" }}
                                      />
                                    </div>
                                  </Link>
                                </div>
                                <div className="tranding product-image-content">
                                  <div className="content product-content">
                                    <Link to={"/SingleProduct/" + el._id}>
                                      <ReadMoreReact text={el.name} />
                                    </Link>
                                    <div className="price-div d-flex align-items-center">
                                      <span className="new-price">$899</span>
                                      <del className="new-price ml-1">
                                        $1000
                                      </del>
                                      {Userdata ? (
                                        <i
                                          className="bx bxs-heart ml-3"
                                          onClick={() => {
                                            AddtoWishlist(
                                              el._id,
                                              el.name,
                                              quantity,
                                              el.inrMrp,
                                              el.inrDiscount,
                                              el.description,
                                              el.category,
                                              el.manufacturer.name,
                                              el.image
                                            );
                                          }}
                                        ></i>
                                      ) : (
                                        <>
                                          <i
                                            className="bx bxs-heart ml-3 pc-heart"
                                            data-bs-toggle="modal"
                                            data-bs-target={
                                              Userdata == null
                                                ? "#exampleModal"
                                                : null
                                            }
                                          ></i>
                                          <Link to="/Register">
                                            <i className="bx bxs-heart ml-3 mobile-heart"></i>
                                          </Link>
                                        </>
                                      )}
                                      <i className="bx bx-cart ml-2"></i>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      {/* </Link> */}
                    </div>
                  );
                }
              })}
            </div>
            {/* hover Button */}
            <div className="wrapperbtn pt-3 pb-4">
              <Link to="/Subcategory" className="btn10">
                <span>Show More</span>
                <div className="transition"></div>
              </Link>
            </div>
            {/* Hover Button End */}
          </div>
        </section>

        <div className="brands-area">
          <div className="container m-auto">
            <div className="trendign-head">Selling Brands</div>
            <div className="row align-items-center">
              {Manufactureres &&
                Manufactureres.length > 0 &&
                Manufactureres.map((el, ind) => (
                  <div className="col-lg-2 col-sm-4 col-md-2 col-6">
                    <Link to={"/ProductByManufacturer/" + el.name}>
                      <div className="single-brands-item">
                        <a className="d-block" href="#">
                          {" "}
                          <img
                            src={
                              el.image && el.image.length > 0
                                ? //"http://144.91.110.221:3033/" + el.image[0].path : ""
                                  "http://localhost:3033/" + el.image[0].path
                                : ""
                            }
                          />
                        </a>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <section className="mobile-app">
          <div className="container m-auto">
            <div className="row">
              <div className="col-lg-6">
                <div className="mobile-main">
                  <div>
                    <h3 className="cat-heading">
                      Download the Nutrazik <br/> mobile app
                    </h3>
                    <div>
                      <p id="para" className="text-justify">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in
                      </p>
                    </div>
                  </div>
                  <div className="btn-div">
                    <button
                      type="button"
                      className="btn"
                      id="btn-1"
                    >
                      <div className="d-flex align-items-center">
                    <div><AiFillApple/></div>
                    <div>App Store</div>
                    </div>
                    </button>
                    <button
                      type="button"
                      className="btn ms-3"
                      id="btn-2"
                    >
                      <div className="d-flex align-items-center">
                      <div><IoLogoGooglePlaystore/></div>
                      <div>Google Play</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div className="img-div d-flex justify-content-center">
                  <img id="img" src={Mobile} alt="image" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Baseline />
      <Footer />
    </>
  );
};
export default HomePage;
