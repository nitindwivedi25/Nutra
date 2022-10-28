import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import "./homepage.css";
import "../../sass/whislist.css";
import Carouselcomp from "../../components/Carouselcomp";
import Baseline from "../../components/Baseline";
import Header1 from "../../components/Header1";
import { useHistory } from "react-router-dom";
import ReadMoreReact from "read-more-react";
import Mobile from "../../Images/Mobile.png";

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
    $(document).ready(function () {
      //    $('.icon-wishlist').on('click', function(){
      //       $(this).toggleClass('in-wishlist');

      // })

      $(".frontimage").mouseover(function () {
        alert("in");
      });
      $(".frontimage").mouseleave(function () {
        alert("in");
      });
    });
  }, []);
  const WishlistHeart = () => {
    $(".icon-wishlist").on("click", function () {
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
  return (
    <>
      <Header1 />
      <Carouselcomp />
      <div id="body-pd">
        {/* trending section  */}
        <section className="trending-section  mt-3">
          <div className="container h-100">
            <div className="row h-100">
              <div className="col-12 p-0">
                <div className="align-items-center position-relative h-100 d-flex w-100 ">
                  <h1 className="trendign-head">Trending</h1>
                  <h2 className="pl-4 product-head">Products</h2>
                </div>
              </div>
              {/* <div className="col-5 pl-0">
               <div className="align-items-center position-relative h-100 d-flex text-center w-100 justify-content-center">
                  <hr className="w-100 trending-product-hr"/>
               </div>
            </div> */}
            </div>
          </div>
        </section>
        <section className="pt-4 pb-0 products-area">
          <div className="container-fluid">
            <div className="row">
              {data.map((el, ind) => {
                if (
                  (tranding < 8 && el.type == "Tranding Product") ||
                  el.type == "Trending Product"
                ) {
                  tranding = tranding + 1;
                  return (
                    <div className="col-lg-3 col-md-12 col-sm-12 ">
                      {/* <Link to={"/SingleProduct/" + el._id}> */}
                      <div className="single-products-box border">
                        <div className="row  align-items-center product-div">
                          <div className="col-6 product-image-div">
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
                          <div className="col-6 pd-0 tranding product-image-content">
                            <div className="content product-content">
                              <Link to={"/SingleProduct/" + el._id}>
                                <h3 className="pb-1 pl-4 pt-5">
                                  <ReadMoreReact
                                    text={el.name}
                                    min={10}
                                    ideal={10}
                                    max={10}
                                    readMoreText={"..."}
                                  />
                                </h3>
                              </Link>
                              <div className="d-flex pb-2 pl-4">
                                <i class="bx bxs-star"></i>
                                <i class="bx bxs-star"></i>
                                <i class="bx bxs-star"></i>
                                <i class="bx bxs-star"></i>
                                <i class="bx bxs-star"></i>
                              </div>
                              <div className=" justify-content-center align-items-center d-flex pt-3 mr-5">
                                <div className="discount-price-div">
                                  <span>10%</span>
                                </div>
                                <div className="discount-price-div2">
                                  <span>off</span>
                                </div>
                              </div>

                              <div className="hr-div">
                                <hr />
                              </div>
                              <div className="price-div justify-content-center align-items-center d-flex">
                                <span className="new-price ml-3">$899</span>
                                <del className="new-price ml-1">1000</del>
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
                                <i className="bx bx-cart ml-1"></i>
                              </div>
                              {/* <div className="price mt-1">
                              <div>
                                 <span className="new-price">
                                 $
                                 {isNaN(el.inrMrp - (el.inrMrp * el.inrDiscount) / 100)
                                 ? 0
                                 : el.inrMrp - (el.inrMrp * el.inrDiscount) / 100}
                                 </span>
                              </div>
                           </div> */}
                              {/* <div className="mt-2 mb-2">
                              <button className="add-to-cart-button1 text-nowrap"  onClick={()=>{cartfunction(el._id,el.name,quantity,el.inrMrp,el.inrDiscount,el.description,el.category,el.manufacturer.name,el.image[0].path)}} data-bs-toggle={Userdata==null?"modal":null} data-bs-target= {Userdata==null?"#exampleModal":null}>Add to Cart</button>
                           </div> */}
                              {/* <div className="row">
                              
                              <div className="col-12">
                                 <p className="bottom-icon text-nowrap" onClick={()=>{AddtoWishlist(el._id,el.name,quantity,el.inrMrp,el.inrDiscount,el.description,el.category,el.manufacturer.name,el.image)}}  data-bs-toggle={Userdata==null?"modal":null} data-bs-target= {Userdata==null?"#exampleModal":null}><i class='bx bx-heart' ></i>Wishlist</p>
                              <div class="icon-wishlist"></div>
                              </div>
                           </div> */}
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
            <div class="wrapperbtn pt-0">
              <Link to="/TrendingProducts" class="btn10">
                <span>Show More</span>
                <div class="transition"></div>
              </Link>
            </div>
            {/* Hover Button End */}
          </div>
        </section>
        <section className="categories-section">
          <div className="container h-100">
            <div className="row ">
              <div className="col-6">
                <Link to={"/Allcategory/" + "610a8c607c5c2f5f8b1e579b"}>
                  <div className="category-div">
                    <img
                      src={require("../../Images/Rectangle59.png")}
                      class="back-img"
                    />
                    <figure>
                      <img
                        src={require("../../Images/Nutraceutical-image 1.png")}
                        class="front-img"
                      />
                    </figure>
                  </div>
                </Link>
              </div>
              <div className="col-6 alignment-col">
                <div className="">
                  <div className="">
                    <hr className="w-70" />
                    <h1 className="cat-heading">Cosmetic</h1>
                    <hr className="w-70" />
                    <button className="btn btn btn-primary nutracuetical-shop-now">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-6 alignment-col">
                <button className="btn btn-primary cosmetic-shop-now">
                  Shop Now
                </button>
                <div className="">
                  <hr className="w-70" />
                  <h1 className="cat-heading">Nutracuetical</h1>
                  <hr className="w-70" />
                </div>
              </div>

              <div className="col-6 cat-second-col">
                <Link to={"/Allcategory/" + "610a8b4e7c5c2f5f8b1e578b"}>
                  <div className="category-div">
                    <img
                      src={require("../../Images/Rectangle59.png")}
                      class="back-img"
                    />
                    <figure className="second-row-fig">
                      <img
                        src={require("../../Images/Cosmetics image 1.png")}
                        class="front-img"
                      />
                    </figure>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="products-area ">
          <div className="container-fluid section-title pt-4 pb-4">
            <div className="row Products align-items-center">
              {/* <div className="col-1 pr-0"></div> */}

              <div className="col-12 pr-0 pl-0 ">
                <h1 className="trendign-head ml-5">Products</h1>
              </div>

              <div className="col-1 pr-0"></div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row ">
              {data.map((el, ind) => {
                if (ind > 8 && ind < 16) {
                  return (
                    <div className="col-lg-3 col-md-12 col-sm-12 ">
                      {/* <Link to={"/SingleProduct/" + el._id}> */}
                      <div className="single-products-box border">
                        <div className="row  align-items-center product-div">
                          <div className="col-6 product-image-div">
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
                          <div className="col-6 pd-0 tranding product-image-content">
                            <div className="content product-content">
                              <Link to={"/SingleProduct/" + el._id}>
                                <h3 className="pb-1 pl-4 pt-5">
                                  <ReadMoreReact
                                    text={el.name}
                                    min={10}
                                    ideal={10}
                                    max={10}
                                    readMoreText={"..."}
                                  />
                                </h3>
                              </Link>
                              <div className="d-flex pb-2 pl-4">
                                <i class="bx bxs-star"></i>
                                <i class="bx bxs-star"></i>
                                <i class="bx bxs-star"></i>
                                <i class="bx bxs-star"></i>
                                <i class="bx bxs-star"></i>
                              </div>
                              <div className=" justify-content-center align-items-center d-flex pt-3 mr-5">
                                <div className="discount-price-div">
                                  <span>10%</span>
                                </div>
                                <div className="discount-price-div2">
                                  <span>off</span>
                                </div>
                              </div>

                              <div className="hr-div">
                                <hr />
                              </div>
                              <div className="price-div justify-content-center align-items-center d-flex">
                                <span className="new-price ml-3">$899</span>
                                <del className="new-price ml-1">1000</del>
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
                                <i className="bx bx-cart ml-1"></i>
                              </div>
                              {/* <div className="price mt-1">
                              <div>
                                 <span className="new-price">
                                 $
                                 {isNaN(el.inrMrp - (el.inrMrp * el.inrDiscount) / 100)
                                 ? 0
                                 : el.inrMrp - (el.inrMrp * el.inrDiscount) / 100}
                                 </span>
                              </div>
                           </div> */}
                              {/* <div className="mt-2 mb-2">
                              <button className="add-to-cart-button1 text-nowrap"  onClick={()=>{cartfunction(el._id,el.name,quantity,el.inrMrp,el.inrDiscount,el.description,el.category,el.manufacturer.name,el.image[0].path)}} data-bs-toggle={Userdata==null?"modal":null} data-bs-target= {Userdata==null?"#exampleModal":null}>Add to Cart</button>
                           </div> */}
                              {/* <div className="row">
                              
                              <div className="col-12">
                                 <p className="bottom-icon text-nowrap" onClick={()=>{AddtoWishlist(el._id,el.name,quantity,el.inrMrp,el.inrDiscount,el.description,el.category,el.manufacturer.name,el.image)}}  data-bs-toggle={Userdata==null?"modal":null} data-bs-target= {Userdata==null?"#exampleModal":null}><i class='bx bx-heart' ></i>Wishlist</p>
                              <div class="icon-wishlist"></div>
                              </div>
                           </div> */}
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

            <div class="wrapperbtn pt-3 pb-4">
              <Link to="/AllProducts" class="btn10">
                <span>Show More</span>
                <div class="transition"></div>
              </Link>
            </div>
            {/* Hover Button End */}
          </div>
        </section>
        <section className="trending-section mb-4 ">
          <div className="container h-100 ">
            <div className="row h-100">
              <div className="col-12 p-0">
                <div className="align-items-center position-relative h-100 d-flex text-center w-100 ">
                  <h1 className="trendign-head">Skin</h1>
                  <h2 className="pl-4 product-head mb-0">Care</h2>
                </div>
              </div>

              <div className="col-2 pl-0"></div>
            </div>
          </div>
        </section>
        <section className="products-area pb-40">
          <div className="container-fluid">
            <div className="row">
              {data.map((el, ind) => {
                if (
                  (skincare < 8 && el.name == "Obloss") ||
                  el.name == "UDC II" ||
                  el.subcategory == "6133469ff51d5a1242de049a"
                ) {
                  skincare = skincare + 1;
                  return (
                    <div className="col-lg-3 col-md-12 col-sm-12 ">
                      {/* <Link to={"/SingleProduct/" + el._id}> */}
                      <div className="single-products-box border">
                        <div className="row  align-items-center product-div">
                          <div className="col-6 product-image-div">
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
                          <div className="col-6 pd-0 tranding product-image-content">
                            <div className="content product-content">
                              <Link to={"/SingleProduct/" + el._id}>
                                <h3 className="pb-1 pl-4 pt-5">
                                  <ReadMoreReact
                                    text={el.name}
                                    min={10}
                                    ideal={10}
                                    max={10}
                                    readMoreText={"..."}
                                  />
                                </h3>
                              </Link>
                              <div className="d-flex pb-2 pl-4">
                                <i class="bx bxs-star"></i>
                                <i class="bx bxs-star"></i>
                                <i class="bx bxs-star"></i>
                                <i class="bx bxs-star"></i>
                                <i class="bx bxs-star"></i>
                              </div>
                              <div className=" justify-content-center align-items-center d-flex pt-3 mr-5">
                                <div className="discount-price-div">
                                  <span>10%</span>
                                </div>
                                <div className="discount-price-div2">
                                  <span>off</span>
                                </div>
                              </div>

                              <div className="hr-div">
                                <hr />
                              </div>
                              <div className="price-div justify-content-center align-items-center d-flex">
                                <span className="new-price ml-3">$899</span>
                                <del className="new-price ml-1">1000</del>
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
                                <i className="bx bx-cart ml-1"></i>
                              </div>
                              {/* <div className="price mt-1">
                              <div>
                                 <span className="new-price">
                                 $
                                 {isNaN(el.inrMrp - (el.inrMrp * el.inrDiscount) / 100)
                                 ? 0
                                 : el.inrMrp - (el.inrMrp * el.inrDiscount) / 100}
                                 </span>
                              </div>
                           </div> */}
                              {/* <div className="mt-2 mb-2">
                              <button className="add-to-cart-button1 text-nowrap"  onClick={()=>{cartfunction(el._id,el.name,quantity,el.inrMrp,el.inrDiscount,el.description,el.category,el.manufacturer.name,el.image[0].path)}} data-bs-toggle={Userdata==null?"modal":null} data-bs-target= {Userdata==null?"#exampleModal":null}>Add to Cart</button>
                           </div> */}
                              {/* <div className="row">
                              
                              <div className="col-12">
                                 <p className="bottom-icon text-nowrap" onClick={()=>{AddtoWishlist(el._id,el.name,quantity,el.inrMrp,el.inrDiscount,el.description,el.category,el.manufacturer.name,el.image)}}  data-bs-toggle={Userdata==null?"modal":null} data-bs-target= {Userdata==null?"#exampleModal":null}><i class='bx bx-heart' ></i>Wishlist</p>
                              <div class="icon-wishlist"></div>
                              </div>
                           </div> */}
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
            <div class="wrapperbtn pt-2">
              <Link to="/Subcategory" class="btn10">
                <span>Show More</span>
                <div class="transition"></div>
              </Link>
            </div>
            {/* Hover Button End */}
          </div>
        </section>
        <div className="container-fluid mb-5 trending-section align-items-center justify-content-center">
          <div className="row h-100 ">
            <div className="container p-0">
              <div className=" p-0">
                <div className="align-items-center position-relative h-100 d-flex text-center w-100">
                  <h1 className="trendign-head">Selling</h1>
                  <h2 className="pl-4 product-head mb-0">Brands</h2>
                </div>
              </div>
            </div>
            <div className="col-2 pl-0"></div>
          </div>
        </div>
        <div className="">
          <div className="brands-area">
            <div className="container">
              <div className=" section-title"></div>
              <div className="row align-items-center">
                {Manufactureres && Manufactureres.length > 0 && Manufactureres.map((el, ind) => (
                  <div className="col-lg-2 col-sm-4 col-md-2 col-6">
                    <Link to={"/ProductByManufacturer/" + el.name}>
                      <div className="single-brands-item">
                        <a className="d-block" href="#">
                          {" "}
                          <img
                            src={el.image && el.image.length > 0 ?
                              //"http://144.91.110.221:3033/" + el.image[0].path : ""
                              "http://localhost:3033/" + el.image[0].path : ""
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
        </div>

        <section className="client-review">
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="..." className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src="..." className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src="..." className="d-block w-100" alt="..." />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
        </section>

        <section className="mobile-app">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="mobile-main">
                  <div><h3 className="heading">Download the medicine mobile app</h3>
                    <div><p id="para">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in</p></div></div>
                  <div className="btn-div">
                    <button type="button" class="btn btn-primary" id="btn-1">Primary</button>
                    <button type="button" class="btn btn-primary ms-3" id="btn-2">Primary</button>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div className="img-div">
                <div class="contact-image text-center"><img id="img"  src={Mobile} alt="image" /></div>
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
