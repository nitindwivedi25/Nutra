import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header1 from "./Header1";
import "../views/landing/homepage.css";

const OrderDetails = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Getsingledata();
    
     
     
    },[]);




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
        console.log(data, "hete");
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

       return (
    <>
      <Header1 />
      <div class="page-title-area">
        <div class="container">
          <div class="page-title-content p-2">
            {/* <h1>Hearing Aid Device</h1> */}
            <ul>
              <li>
            <Link to="/">Home</Link>
              </li>
              <li>Product Details</li>
            </ul>
          </div>
        </div>
      </div>
      <section class="product-details-area pt-70 pb-40">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-12">
              <div class="products-details-image">
                <img
                  src={require("../Images/products/products-img1.jpg")}
                  className="Single-product-Img"
                />
              </div>
              <hr />
              <div className="container">
                <div className="row">
                  <div className="col-4">
                    <img
                      src={require("../Images/products/products-img1.jpg")}
                      className=""
                    />
                  </div>
                  <div className="col-4">
                    <img
                      src={require("../Images/products/products-img1.jpg")}
                      className=""
                    />
                  </div>
                  <div className="col-4">
                    <img
                      src={require("../Images/products/products-img1.jpg")}
                      className=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-12">
              <div class="products-details-desc">
                <h3>Iphone</h3>
                <div class="price">
                  <div>
                    <span class="old-price">50000</span>
                    <span class="new-price">
                      45000                   </span>
                  </div>
                </div>
                
                <ul class="products-info">
                  <li>
                    <span>Vendor:</span> <a href="#">Lereve</a>
                  </li>
                 
                  <li>
                    <span>Products Type:</span>{" "}
                    <a>medical</a>
                  </li>
                  <li>
                    <span>Quality:</span>{" "}
                    <a>2</a>
                  </li>
                </ul>
                <div class="products-color-switch">
                  <span>Color:</span>
                  <ul>
                    <li>
                      <a title="Black" class="color-black" href="#"></a>
                    </li>
                    <li>
                      <a title="White" class="color-white" href="#"></a>
                    </li>
                    <li class="active">
                      <a title="Green" class="color-green" href="#"></a>
                    </li>
                    <li>
                      <a
                        title="Yellow Green"
                        class="color-yellowgreen"
                        href="#"
                      ></a>
                    </li>
                    <li>
                      <a title="Teal" class="color-teal" href="#"></a>
                    </li>
                  </ul>
                </div>
                <div class="products-size-wrapper">
                  <span>Size:</span>
                  <ul>
                    <li>
                      <a href="#">XS</a>
                    </li>
                    <li class="active">
                      <a href="#">S</a>
                    </li>
                    <li>
                      <a href="#">M</a>
                    </li>
                    <li>
                      <a href="#">XL</a>
                    </li>
                    <li>
                      <a href="#">XXL</a>
                    </li>
                  </ul>
                </div>
                
                
               
                <div class="products-size-wrapper">
                  <span>Description:</span>
                  <div className="description">
                  <p>A degenerative joint disease, osteoarthritis is a condition in which low-grade inflammation results in joint pain, caused by the wearing of cartilage that covers and acts as a cushion inside joints. Degradation of cartilage causes the bone surfaces to become less protected by cartilage and rub against each other, causing stiffness and pain. As the mobility and flexibility of joints decrease, an acceleration of inflammation and a chronic condition occurs leading to more pain, inflexibility & discomfort in the joints.</p>
                </div>
                </div>
                
                
              </div>
            </div>
            <div class="col-lg-12 col-md-12">
              <div class="products-details-tabs">
                <ul class="nav nav-tabs">
                  
                  <li>Shipping</li>
                  <li>Reviews (2)</li>
                </ul>
                <div class="tab-content">
                  <div id="tab1" class="tab-pane">
                    
                  </div>

                  <div id="tab2" class="tab-pane">
                    <div class="table-responsive">
                      <table class="table table-bordered">
                        <tbody>
                          <tr>
                            <td>Shipping</td>
                            <td>This item Ship to USA</td>
                          </tr>
                          <tr>
                            <td>Delivery</td>
                            <td>
                              Estimated between Wednesday 07/31/2020 and Monday
                              08/05/2020 <br />
                              Will usually ship within 1 bussiness day.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div id="tab3" class="tab-pane">
                    <div class="products-reviews">
                      <h3>Products Rating</h3>
                      <div class="rating">
                        <span class="bx bxs-star checked"></span>
                        <span class="bx bxs-star checked"></span>
                        <span class="bx bxs-star checked"></span>
                        <span class="bx bxs-star checked"></span>
                        <span class="bx bxs-star"></span>
                      </div>
                      <div class="rating-count">
                        <span>4.1 average based on 4 reviews.</span>
                      </div>
                      <div class="row">
                        <div class="side">
                          <div>5 star</div>
                        </div>
                        <div class="middle">
                          <div class="bar-container">
                            <div class="bar-5"></div>
                          </div>
                        </div>
                        <div class="side right">
                          <div>02</div>
                        </div>
                        <div class="side">
                          <div>4 star</div>
                        </div>
                        <div class="middle">
                          <div class="bar-container">
                            <div class="bar-4"></div>
                          </div>
                        </div>
                        <div class="side right">
                          <div>03</div>
                        </div>
                        <div class="side">
                          <div>3 star</div>
                        </div>
                        <div class="middle">
                          <div class="bar-container">
                            <div class="bar-3"></div>
                          </div>
                        </div>
                        <div class="side right">
                          <div>04</div>
                        </div>
                        <div class="side">
                          <div>2 star</div>
                        </div>
                        <div class="middle">
                          <div class="bar-container">
                            <div class="bar-2"></div>
                          </div>
                        </div>
                        <div class="side right">
                          <div>05</div>
                        </div>
                        <div class="side">
                          <div>1 star</div>
                        </div>
                        <div class="middle">
                          <div class="bar-container">
                            <div class="bar-1"></div>
                          </div>
                        </div>
                        <div class="side right">
                          <div>00</div>
                        </div>
                      </div>
                    </div>
                    <div class="products-review-comments">
                      <h3>3 Reviews</h3>
                      <div class="user-review">
                        <img src="../img/user1.jpg" alt="image" />
                        <div class="review-rating">
                          <div class="review-stars">
                            <i class="bx bxs-star checked"></i>
                            <i class="bx bxs-star checked"></i>
                            <i class="bx bxs-star checked"></i>
                            <i class="bx bxs-star checked"></i>
                            <i class="bx bxs-star checked"></i>
                          </div>
                          <span class="d-inline-block">James Anderson</span>
                        </div>
                        <span class="d-block sub-comment">Excellent</span>
                        <p>
                          Very well built theme, couldn&#x27;t be happier with
                          it. Can&#x27;t wait for future updates to see what
                          else they add in.
                        </p>
                      </div>
                      <div class="user-review">
                        <img src="../img/user2.jpg" alt="image" />
                        <div class="review-rating">
                          <div class="review-stars">
                            <i class="bx bxs-star checked"></i>
                            <i class="bx bxs-star checked"></i>
                            <i class="bx bxs-star checked"></i>
                            <i class="bx bxs-star"></i>
                            <i class="bx bxs-star"></i>
                          </div>
                          <span class="d-inline-block">Sarah Taylor</span>
                        </div>
                        <span class="d-block sub-comment">Video Quality!</span>
                        <p>
                          Was really easy to implement and they quickly answer
                          my additional questions!
                        </p>
                      </div>
                      <div class="user-review">
                        <img src="../img/user3.jpg" alt="image" />
                        <div class="review-rating">
                          <div class="review-stars">
                            <i class="bx bxs-star checked"></i>
                            <i class="bx bxs-star checked"></i>
                            <i class="bx bxs-star checked"></i>
                            <i class="bx bxs-star checked"></i>
                            <i class="bx bxs-star checked"></i>
                          </div>
                          <span class="d-inline-block">David Warner</span>
                        </div>
                        <span class="d-block sub-comment">Perfect Coding!</span>
                        <p>
                          Stunning design, very dedicated crew who welcome new
                          ideas suggested by customers, nice support.
                        </p>
                      </div>
                      <div class="user-review">
                        <img src="../img/user4.jpg" alt="image" />
                        <div class="review-rating">
                          <div class="review-stars">
                            <i class="bx bxs-star checked"></i>
                            <i class="bx bxs-star checked"></i>
                            <i class="bx bxs-star checked"></i>
                            <i class="bx bxs-star checked"></i>
                            <i class="bx bxs-star"></i>
                          </div>
                          <span class="d-inline-block">King Kong</span>
                        </div>
                        <span class="d-block sub-comment">Perfect Video!</span>
                        <p>
                          Stunning design, very dedicated crew who welcome new
                          ideas suggested by customers, nice support.
                        </p>
                      </div>
                    </div>
                    <div class="review-form-wrapper">
                      <h3>Add a review</h3>
                      <p class="comment-notes">
                        Your email address will not be published. Required
                        fields are marked <span>*</span>
                      </p>
                      <form>
                        <div class="row">
                          <div class="col-lg-12 col-md-12">
                            <div class="rating">
                              <input
                                type="radio"
                                id="star5"
                                name="rating"
                                value="5"
                              />
                              <label for="star5"></label>
                              <input
                                type="radio"
                                id="star4"
                                name="rating"
                                value="4"
                              />
                              <label for="star4"></label>
                              <input
                                type="radio"
                                id="star3"
                                name="rating"
                                value="3"
                              />
                              <label for="star3"></label>
                              <input
                                type="radio"
                                id="star2"
                                name="rating"
                                value="2"
                              />
                              <label for="star2"></label>
                              <input
                                type="radio"
                                id="star1"
                                name="rating"
                                value="1"
                              />
                              <label for="star1"></label>
                            </div>
                          </div>
                          <div class="col-lg-6 col-md-6">
                            <div class="form-group">
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Name *"
                              />
                            </div>
                          </div>
                          <div class="col-lg-6 col-md-6">
                            <div class="form-group">
                              <input
                                type="email"
                                class="form-control"
                                placeholder="Email *"
                              />
                            </div>
                          </div>
                          <div class="col-lg-12 col-md-12">
                            <div class="form-group">
                              <textarea
                                placeholder="Your review"
                                class="form-control"
                                cols="30"
                                rows="6"
                              ></textarea>
                            </div>
                          </div>
                          <div class="col-lg-12 col-md-12">
                            <p class="comment-form-cookies-consent">
                              <input type="checkbox" id="test1" />
                              <label for="test1">
                                Save my name, email, and website in this browser
                                for the next time I comment.
                              </label>
                            </p>
                          </div>
                          <div class="col-lg-12 col-md-12">
                            <button type="submit" class="default-btn">
                              Submit
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pt-70">
          <div class="products-area">
            <div class="container">
              <div class="section-title">
                <h2>Related Products</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default OrderDetails;