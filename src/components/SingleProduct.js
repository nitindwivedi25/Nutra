import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header1 from "./Header1";
import "../components/singleproduct.css";
import { useHistory } from "react-router-dom";
import StarsRating from "stars-rating";
import ReactImageZoom from "react-image-zoom";
import Baseline from "./Baseline";
import ReadMoreReact from "read-more-react";
import $ from "jquery";

var Userdata = "";
var CartDataWoLogin = [];
const SingleProduct = (props) => {
  let related = 0;
  const [AllProduct, setAllProduct] = useState([]);
  const [data, setData] = useState([]);
  const [ProductCategory, setProductCategory] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [userCart, setUserCart] = useState([]);
  const [order, Setorder] = useState([]);
  const [Categorydetails, setCategoryDetails] = useState({});
  const [categoryname, Setcategoryname] = useState();
  const [wishlist, setWishlist] = useState();
  const history = useHistory();
  let Wishlist = [];
  //let ImageData ;
  useEffect(() => {
    related = 0;
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    console.log(Userdata, "sadbhksabdhk");

    Getsingledata();
    CartById();
    ProductByCategory();

    $(document).ready(function() {
      $("#comments-button-div").css("visibility", "hidden");
      $("#submit-review-div").hide();
      $("#Reviewdiv").hide();
      $("#Technicaldiv").hide();
      $("#Description").css("background", "white");
      $("#Review").click(function() {
        $("#Reviewdiv").show();
        $("#Descriptiondiv").hide();
        $("#Technicaldiv").hide();
        $("#Review").css({
          background: "white",
          "transition-delay": "0s",
          "transition-duration": "0.8s",
        });
        $("#Description").css({
          background: "#00D872",
          color: "black",
          "transition-delay": "0s",
          "transition-duration": "1s",
        });

        $("#Review").css("color", "white");
        $("#Technical").css({
          background: "#00D872",
          color: "black",
          "transition-delay": "0s",
          "transition-duration": "1s",
        });
        $("#Review > .button1").css("color", "#00B560");
        $("#Description > .button2").css("color", "white");
        $("#Technical > .button1").css("color", "white");
      });
      $("#Description").click(function() {
        $("#Reviewdiv").hide();
        $("#Descriptiondiv").show();
        $("#Technicaldiv").hide();
        $("#Description").css({
          background: "white",
          "transition-delay": "0s",
          "transition-duration": "0.8s",
        });
        $("#Review").css({
          background: "#00D872",
          "transition-delay": "0s",
          "transition-duration": "1s",
        });
        $("#Technical").css({
          background: "#00D872",
          "transition-delay": "0s",
          "transition-duration": "1s",
        });
        $("#Review > .button1").css("color", "white");
        $("#Description > .button2").css("color", "#00B560");
        $("#Technical > .button1").css("color", "white");
      });
      $("#Technical").click(function() {
        $("#Technicaldiv").show();
        $("#Descriptiondiv").hide();
        $("#Reviewdiv").hide();
        $("#Technical").css({
          background: "white",
          "transition-delay": "0s",
          "transition-duration": "0.8s",
        });
        $("#Review").css({
          background: "#00D872",
          "transition-delay": "0s",
          "transition-duration": "1s",
        });
        $("#Description").css({
          background: "#00D872",
          "transition-delay": "0s",
          "transition-duration": "1s",
        });
        $("#Review > .button1").css("color", "white");
        $("#Description > .button2").css("color", "white");
        $("#Technical > .button1").css("color", "#00B560");
      });
      $("#Comments").click(function() {
        $("#submit-review-div").hide();
        $("#commtent-div").show();
        $("#comments-button-div").css("visibility", "hidden");
        $("#SubmitComments-button-div").css("visibility", "visible");
      });
      $("#SubmitComments").click(function() {
        $("#commtent-div").hide();
        $("#submit-review-div").show();
        $("#comments-button-div").css("visibility", "inherit");
        $("#SubmitComments-button-div").css("visibility", "hidden");
      });
    });

    //  $(function() {
    //   $(".heart").on("click", function() {
    //     $(this).toggleClass("is-active");
    //   });
    // });
  }, []);
  // const AddtoWishlist=async (_id,name,quantity,mrp,discount,description,category,image)=>{
  //    Wishlist.push({_id,name,quantity,mrp,discount,description,category,image});
  //     localStorage.setItem("Wishlist", JSON.stringify(Wishlist));
  //   }

  const ProductByCategory = async () => {
    //await fetch("http://144.91.110.221:3033/api/product/all_product")
    await fetch("http://localhost:3033/api/product/all_product")
      .then((res) => res.json())
      .then(async (data) => {
        setAllProduct(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const Getsingledata = async () => {
    //await fetch("http://144.91.110.221:3033/api/product/product_by_id", {
    await fetch("http://localhost:3033/api/product/product_by_id", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: props.match.params.id,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        setData(data.data[0]);

        //  ImageData= {width: 400, height: 250, zoomWidth: 500, img:data.data[0].image}
        // console.log("image path " , data.data[0].image)
        setProductCategory(data.data[0].category.name);
        console.log(data, "hete");
        categoryDetails(data.data[0].category);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const CartById = async () => {
    if (!Userdata == []) {
      // await fetch("http://144.91.110.221:3033/api/cart/cart_by_id", {
      await fetch("http://localhost:3033/api/cart/cart_by_id", {
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
      //await fetch("http://144.91.110.221:3033/api/cart/add_to_cart", {
      await fetch("http://localhost:3033/api/cart/add_to_cart", {
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
    //   history.push('/Register')
    // }
  };
  const UpdateCart = () => {
    //const url = "http://144.91.110.221:3033/api/cart/update_cart_by_id";
    const url = "http://localhost:3033/api/cart/update_cart_by_id";
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
    if (quantity > 0) {
      var merged = false;
      var newItemObj = {
        productid: productid,
        name: name,
        image: image,
        quantity: quantity,
        mrp: parseInt(mrp),
        singleprice: parseInt(mrp),
        discountprice: discount,
        description: description,
        category: category,
        manufacturer: manufacturer,
        description: description,
        status: "Pending",
        justification: "Enjoy",
        delivery_time: "No Status",
      };
      if (userCart.order == null || userCart.order == []) {
        for (var i = 0; i < order.length; i++) {
          if (order[i].productid == newItemObj.productid) {
            order[i].quantity += newItemObj.quantity;
            // order[i].mrp += newItemObj.mrp;
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
            merged = true;
          }
          setQuantity(1);
        }
        if (!merged) {
          userCart.order.push(newItemObj);
        }
        setQuantity(1);
        // CartById();
        await UpdateCart();
        //   await AsyncStorage.setItem("order1", JSON.stringify(userCart.order));
        //   newamount = 0;
      }
    }
  };

  const categoryDetails = async (id) => {
    //await fetch("http://144.91.110.221:3033/api/category/category_by_id", {
    await fetch("http://localhost:3033/api/category/category_by_id", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        Setcategoryname(data.data[0].name);
        await console.log(categoryname, "khlklklklk");
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const addToCartWithoutRegistration = (
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
    var newItemObj = {
      productid: productid,
      name: name,
      image: image,
      quantity: quantity,
      mrp: parseInt(mrp),
      singleprice: parseInt(mrp),
      discountprice: discount,
      description: description,
      category: category,
      manufacturer: manufacturer,
      description: description,
      status: "Pending",
      justification: "Enjoy",
      delivery_time: "No Status",
    };
    if (
      !JSON.stringify(CartDataWoLogin).includes(name) &&
      !JSON.stringify(localStorage.getItem("CartDataWoLogin")).includes(name)
    ) {
      if (JSON.parse(localStorage.getItem("CartDataWoLogin"))) {
        CartDataWoLogin = JSON.parse(localStorage.getItem("CartDataWoLogin"));
      }
      CartDataWoLogin.push(newItemObj);
      localStorage.setItem("CartDataWoLogin", JSON.stringify(CartDataWoLogin));
      console.log(JSON.stringify(CartDataWoLogin));
    }
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
    //await fetch("http://144.91.110.221:3033/api/wishlist/wishlist_by_id", {
    await fetch("http://localhost:3033/api/wishlist/wishlist_by_id", {
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
              //"http://144.91.110.221:3033/api/wishlist/add_to_wishlist",
              "http://localhost:3033/api/wishlist/add_to_wishlist",
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
                //"http://144.91.110.221:3033/api/wishlist/add_to_wishlist",
                "http://localhost:3033/api/wishlist/add_to_wishlist",
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
  return (
    <>
      <Header1 />
      <div class="first-nav container-fluid">
        <span>
          <Link to="/">Home</Link>/
          <Link to={"/Allcategory/" + data.category}>{categoryname}</Link>/
          {data.name}
        </span>
      </div>
      <div class="container-fluid product-div mt-5">
        <div class="row ">
          {/* <div className="col-sm-1"></div> */}

          <div class="col-sm-6 pd-0 picture-div justify-content-center align-items-center ">
            <div className="single-img-div justify-content-center align-items-center d-flex">
              {" "}
              {data.image !== undefined ? (
                <img src={require("../../src/Images/products/facewash1.png")} />
              ) : null}
            </div>
            {/* <ReactImageZoom {...ImageData} /> */}

            <div className="row image-group pt-2">
              <div className="col-3">
                <div>
                  <img
                    src={require("../../src/Images/products/facewash1.png")}
                  />
                </div>
              </div>
              <div className="col-3">
                <div>
                  <img
                    src={require("../../src/Images/products/facewash1.png")}
                  />
                </div>
              </div>
              <div className="col-3">
                <div>
                  <img
                    src={require("../../src/Images/products/facewash1.png")}
                  />
                </div>
              </div>
              <div className="col-3">
                <div>
                  <img
                    src={require("../../src/Images/products/facewash1.png")}
                  />
                </div>
              </div>
            </div>

            {/* phone single page caresouel */}
            <div
              id="carouselExampleIndicators"
              class="carousel slide single-page-caresouel"
              data-bs-ride="carousel"
            >
              <div class="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  class="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img
                    src={require("../../src/Images/products/facewash1.png")}
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src={require("../../src/Images/products/facewash1.png")}
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src={require("../../src/Images/products/facewash1.png")}
                  />
                </div>
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>

            {/* end phone single page careousel */}
          </div>
          <div class="col-sm-6 content-div">
            <div class="row ml-2">
              <div class="details pt-2">
                <span>{data.name}</span>
              </div>
              <div className="pt-2 pb-2">
                <StarsRating
                  count={5}
                  // onChange={ratingChanged}
                  size={35}
                  color2={"#ffd700"}
                  value={4}
                />
              </div>
              <div className="MRP-Taxes-div">
                <span>MRP (incl. of all taxes)</span>
              </div>

              <div class="price pt-2">
                <span className="price-detail">
                  ₹899 <del>1000</del> <span>10% OFF</span>
                </span>
              </div>

              <div class="List pt-1">
                <ul>
                  <li>Balances Skin pH levels</li>
                  <li>Restructures and shrinks pores</li>
                  <li>Non-Drying, Alcohol-Free Formula</li>
                  <li>Chlorophyll in Matcha protects against sun damage.</li>
                  <li>Stabilized Vitamin C provides compact & firmer skin.</li>
                </ul>
              </div>
            </div>
            <div class="row pt-2 pb-3 add ml-2">
              {/* wishlist animation */}
              {/* <div class="stage">
                 <div class="heart"></div>
                  </div> */}

              {/* end Wishlist animation */}
              <div class="wishlist">
                <i class="search-btn bx bx-category-alt ml-1"></i>
                <span className="ml-1">
                  Category: <span> Skin Care</span>
                </span>
                &nbsp; <span className="pl-2">Share:</span>
                <a href="https://www.facebook.com/Nutrazik" target="_blank">
                  <i class="search-btn bx bxl-facebook "></i>
                </a>
                <a href="https://www.instagram.com/soulnutra/" target="_blank">
                  <i class="search-btn bx bxl-instagram "></i>
                </a>
                <a href="https://twitter.com/nutrazik" target="_blank">
                  <i class="search-btn bx bxl-twitter "></i>
                </a>
                <a
                  href="https://www.linkedin.com/company/70941207/admin/"
                  target="_blank"
                >
                  <i class="search-btn bx bxl-linkedin "></i>
                </a>
              </div>
            </div>
            <div className="mt-3 add-cart-buttons">
              <div className="quantity1 mt-1 justify-content-center align-items-center d-flex">
                <i
                  className="bx bx-minus minus-single mr-2"
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                ></i>
                <input
                  type="number"
                  //value="1"
                  min="1"
                  max="9"
                  step="1"
                  value={quantity}
                  onChange={(e) => cartfunction(e.target.value)}
                />
                <i
                  className="bx bx-plus minus-single ml-2"
                  onClick={() => setQuantity(quantity + 1)}
                ></i>
              </div>
              <div class="add-to-cart mt-1">
                <button
                  onClick={() => {
                    {
                      Userdata != null
                        ? cartfunction(
                            data._id,
                            data.name,
                            quantity,
                            data.mrp,
                            data.discount,
                            data.description,
                            data.category,
                            data.manufacturer.name,
                            data.image[0].path
                          )
                        : addToCartWithoutRegistration(
                            data._id,
                            data.name,
                            quantity,
                            data.mrp,
                            data.discount,
                            data.description,
                            data.category,
                            data.manufacturer.name,
                            data.image[0].path
                          );
                    }
                  }}
                >
                  Add to Cart
                </button>
              </div>
              <div className="quantity2 mt-1 ml-2 justify-content-center align-items-center d-flex">
                {Userdata ? (
                  <i
                    className="bx bxs-heart"
                    onClick={() => {
                      AddtoWishlist(
                        data._id,
                        data.name,
                        quantity,
                        data.mrp,
                        data.discount,
                        data.description,
                        data.category,
                        data.manufacturer.name,
                        data.image
                      );
                    }}
                  ></i>
                ) : (
                  <>
                    <i
                      className="bx bxs-heart ml-3 pc-heart"
                      data-bs-toggle="modal"
                      data-bs-target={Userdata == null ? "#exampleModal" : null}
                    ></i>
                    <Link to="/Register">
                      <i className="bx bxs-heart ml-3 mobile-heart"></i>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid description">
        <div class="row main-div p-4">
          <div>
            <div class="row heading mt-4 jutify-content-center align-items-center">
              <div class="col-sm-1"></div>
              <div class="col-sm-2 text-center title" id="Description">
                <button className="button2">Description</button>
              </div>
              <div class="col-sm-2 text-center title " id="Review">
                <button className="button1">Review</button>
              </div>
              <div class="col-sm-2 text-center title" id="Technical">
                <button className="button1">Add a Review</button>
              </div>
              <div class="col-sm-3"></div>
            </div>
            <div class="row content1">
              <div class="container p-5  text" id="Descriptiondiv">
                <span>{data.description}</span>
              </div>
              <div class="container p-5  text " id="Reviewdiv">
                <div className="row ">
                  <div className="col-4">
                    <div className="start-div">
                      <div className="row">
                        <div className="col-6">
                          <StarsRating
                            count={5}
                            // onChange={ratingChanged}
                            size={25}
                            color2={"#ffd700"}
                            value={4}
                          />
                        </div>
                        <div className="col-6 text-right">
                          <span className="date">22/07/2021</span>
                        </div>
                        {/* </div> */}
                        <div className="col-12 ">
                          <span className="content-text">
                            Loved this toner! I've been searching for
                            non-alcohol options and this one is my match!
                            Alcohol Free Matcha Toner To Tighten Pores And
                            Balance pH & Oil Levels
                          </span>
                        </div>
                        <div className="col-12 varified-div">
                          <span>
                            Prerna J. <span>Varified Buyer</span>
                          </span>
                        </div>
                        <div className="col-12 location-div ml-2">
                          <span>INDIA</span>
                        </div>
                        <div className="col-12 help-div ml-2 pd-0">
                          <span>Was this helpful?</span>
                          <i className="bx bx-like pl-2"></i>
                          <span>1</span>
                          <i className="bx bx-dislike pl-2"></i>
                          <span>1</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-4 ">
                    <div className="start-div">
                      <div className="row">
                        <div className="col-6">
                          <StarsRating
                            count={5}
                            // onChange={ratingChanged}
                            size={25}
                            color2={"#ffd700"}
                            value={4}
                          />
                        </div>
                        <div className="col-6 text-right">
                          <span className="date">22/07/2021</span>
                        </div>
                        {/* </div> */}
                        <div className="col-12 ">
                          <span className="content-text">
                            Loved this toner! I've been searching for
                            non-alcohol options and this one is my match!
                            Alcohol Free Matcha Toner To Tighten Pores And
                            Balance pH & Oil Levels
                          </span>
                        </div>
                        <div className="col-12 varified-div">
                          <span>
                            Prerna J. <span>Varified Buyer</span>
                          </span>
                        </div>
                        <div className="col-12 location-div ml-2">
                          <span>INDIA</span>
                        </div>
                        <div className="col-12 help-div ml-2 pd-0">
                          <span>Was this helpful?</span>
                          <i className="bx bx-like pl-2"></i>
                          <span>1</span>
                          <i className="bx bx-dislike pl-2"></i>
                          <span>1</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="container p-5  text" id="Technicaldiv">
                <div className="row">
                  <div className="col-4 "></div>
                  <div className="col-5 add-review-div">
                    <div className="form-group">
                      <label>Email</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Order ID</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Write a Review</label>
                      <textarea
                        type="text"
                        className="form-control"
                        rows="5"
                        placeholder="Type here.."
                      ></textarea>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <StarsRating
                          count={5}
                          // onChange={ratingChanged}
                          size={30}
                          color2={"#ffd700"}
                          value={0}
                        />
                      </div>

                      <div className="col-6">
                        <button>Submit</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-3 "></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid p-4 relate-products text-center">
        <div className="row relate-product">
          <div className="col-3 line">
            <hr className="hr"></hr>
          </div>
          <div className="col-6">
            <div class="row related">
              <span>Related Products</span>
            </div>
          </div>
          <div className="col-3 line">
            <hr className="hr"></hr>
          </div>
        </div>
        {/* Related product heading for phone view */}
        <div className="row relate-product1">
          <div className="col-12">
            <div class="row related">
              <span>Related Products</span>
            </div>
          </div>
        </div>
        {/* End Related product heading for phone view */}
      </div>
      <div class="container-fluid p-4 products">
        <div class="row products-row  ">
          {AllProduct.map((item, index) => {
            if (related < 4 && ProductCategory == item.category.name) {
              related = related + 1;
              return (
                <div className="col-lg-3 col-md-12 col-sm-12 ">
                  {/* <Link to={"/SingleProduct/" + el._id}> */}
                  <div className="single-products-box border">
                    <div className="row  align-items-center product-div">
                      <div className="col-6 product-image-div">
                        <Link
                          to={"/SingleProduct/" + item._id}
                          className="product-image-link"
                        >
                          <div className="image hover-switch">
                            {/* <img
                           src={
                           require('../../Images/products/Hintosulin (1).png')
                           }
                           alt="" 
                            /> */}
                            <img
                              src={
                                //"http://144.91.110.221:3033/" +
                                "http://localhost:3033/" + item.image[0].path
                              }
                              alt=""
                            />
                          </div>
                        </Link>
                      </div>
                      <div className="col-6 pd-0 tranding product-image-content">
                        <div className="content product-content">
                          <Link to={"/SingleProduct/" + item._id}>
                            <h3 className="pb-1 pl-4 pt-5">
                              <ReadMoreReact
                                text={item.name}
                                min={7}
                                ideal={7}
                                max={7}
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
                              <span>{item.inrDiscount}%</span>
                            </div>
                            <div className="discount-price-div2">
                              <span>off</span>
                            </div>
                          </div>

                          <div className="hr-div">
                            <hr />
                          </div>
                          <div className="price-div justify-content-center align-items-center d-flex">
                            <span className="new-price ml-3">
                              ${" "}
                              {isNaN(
                                item.inrMrp -
                                  (item.inrMrp * item.inrDiscount) / 100
                              )
                                ? 0
                                : item.inrMrp -
                                  (item.inrMrp * item.inrDiscount) / 100}
                            </span>
                            <del className="new-price ml-1">{item.inrMrp}</del>
                            {Userdata ? (
                              <i
                                className="bx bxs-heart ml-3"
                                onClick={() => {
                                  AddtoWishlist(
                                    item._id,
                                    item.name,
                                    quantity,
                                    item.inrMrp,
                                    item.inrDiscount,
                                    item.description,
                                    item.category,
                                    item.manufacturer.name,
                                    item.image
                                  );
                                }}
                              ></i>
                            ) : (
                              <>
                                <i
                                  className="bx bxs-heart ml-3 pc-heart"
                                  data-bs-toggle="modal"
                                  data-bs-target={
                                    Userdata == null ? "#exampleModal" : null
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
      </div>

      {/* Review Section for mobile */}
      <div className="review-sec">
        <div className="cmt-button-sec">
          <div
            className="col-sm-6  align-items-center d-flex"
            id="comments-button-div"
          >
            <span>Review Form</span>
            <button style={{ float: "right" }} id="Comments" className="ml-5">
              Comments
            </button>
          </div>
          <div
            className="col-sm-6  align-items-center d-flex"
            id="SubmitComments-button-div"
          >
            <span>Rating & Review</span>
            <button style={{ float: "right" }} id="SubmitComments">
              Submit Comment
            </button>
          </div>
        </div>
        <hr />

        <div className="review-sec-mobile" id="commtent-div">
          <section id="testimonials">
            <div class="testimonial-heading">
              <span>Comments</span>
            </div>

            <div class="testimonial-box-container">
              <div class="testimonial-box">
                <div class="box-top">
                  <div class="profile">
                    <div class="profile-img">
                      <img src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" />
                    </div>

                    <div class="name-user">
                      <strong>Barry Allen</strong>
                      <div class="reviews">
                        <span>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="far fa-star"></i>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="date">
                    <span>22/09/2021</span>
                  </div>
                </div>

                <div class="client-comment">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Exercitationem, quaerat quis? Provident temporibus
                    architecto asperiores nobis maiores nisi a. Quae doloribus
                    ipsum aliquam tenetur voluptates incidunt blanditiis sed
                    atque cumque.
                  </p>
                </div>
              </div>
            </div>
            <div class="testimonial-box-container">
              <div class="testimonial-box">
                <div class="box-top">
                  <div class="profile">
                    <div class="profile-img">
                      <img src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" />
                    </div>

                    <div class="name-user">
                      <strong>Barry Allen</strong>
                      <div class="reviews">
                        <span>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="far fa-star"></i>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="date">
                    <span>22/09/2021</span>
                  </div>
                </div>

                <div class="client-comment">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Exercitationem, quaerat quis? Provident temporibus
                    architecto asperiores nobis maiores nisi a. Quae doloribus
                    ipsum aliquam tenetur voluptates incidunt blanditiis sed
                    atque cumque.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* submit review div */}
        <div id="submit-review-div">
          <h2 id="fh2">WE APPRECIATE YOUR REVIEW!</h2>

          <form id="feedback" action="">
            <div class="pinfo">Your Email</div>

            <div class="form-group">
              <div class="col-md-4 inputGroupContainer">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="fa fa-envelope"></i>
                  </span>
                  <input
                    name="email"
                    type="email"
                    class="form-control"
                    placeholder="john.doe@yahoo.com"
                  />
                </div>
              </div>
            </div>
            <div class="pinfo">Your Order id.</div>
            <div class="form-group">
              <div class="col-md-4 inputGroupContainer">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="fa fa-globe"></i>
                  </span>
                  <input
                    name="URL"
                    placeholder="Order id"
                    class="form-control"
                  />
                </div>
              </div>
            </div>

            <div class="pinfo">Rate our overall services.</div>

            <div class="form-group">
              <StarsRating
                count={5}
                // onChange={ratingChanged}
                size={25}
                color2={"#ffd700"}
                value={4}
              />
            </div>

            <div class="pinfo">Write your feedback.</div>

            <div class="form-group">
              <div class="col-md-4 inputGroupContainer">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="fa fa-edit"></i>
                  </span>
                  <textarea
                    class="form-control"
                    id="review"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
      {/* end submit review div */}
      {/* End Review section for mobile */}
      <Baseline />
      <Footer />
    </>
  );
};
export default SingleProduct;
