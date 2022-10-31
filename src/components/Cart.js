import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header1 from "./Header1";
import { Link } from "react-router-dom";
import StarsRating from "stars-rating";
import Baseline from "./Baseline";
import "../components/Header1.css";
var Userdata = "";
const Cart = () => {
  const [newquantities, setNewqantities] = useState();
  const [cart, setCart] = useState([]);
  const [_id, Set_id] = useState();
  const [subtotal, setSubtotal] = useState(0);
  var total = 0;
  var actualtotal = 0;

  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    CartById();
    CartById();
  }, []);
  // const Subtotal=()=>{
  //    subtotal=subtotal+
  // }

  const CartById = async () => {
    if (Userdata) {
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
          console.log(data + "see");
          await localStorage.setItem("Usercartdata", JSON.stringify(data));
          setCart(data.data[0].order);
          Set_id(data.data[0]._id);
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
  };

  const UpdateCart = async (array) => {
    //const url = "http://144.91.110.221:3033/api/cart/update_cart_by_id";
    const url = "http://localhost:3033/api/cart/update_cart_by_id";
    console.log(cart, "erjhejgrekjbk");
    await fetch(url, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
        userid: Userdata._id,
        order: array ? array : cart,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "after update");
      })
      .then((err) => console.log(err));
  };

  const Minusquantity = async (quantity, price, index) => {
    if (quantity > 1) {
      //  isquantity = true
      cart[index].quantity = quantity - 1;
      //  newquantity = quantity

      //  totalamount = totalamount - price
      await UpdateCart();
      await CartById();
    }
  };
  const Plusquantity = async (quantity, price, index) => {
    if (quantity >= 1) {
      //  isquantity = true
      cart[index].quantity = quantity + 1;
      //  newquantity = quantity

      //  totalamount = totalamount - price
      await UpdateCart();
      await CartById();
    }
  };

  const Sliceorder = async (index, e) => {
    e.preventDefault();
    const array = await cart.filter((e, i) => i !== index);
    await UpdateCart(array);
    await CartById();
  };

  return (
    <>
      <Header1 />
      <div className="first-nav container-fluid">
        <span>
          <Link to="/">Home</Link>/ Cart
        </span>
      </div>
      <section className="cart-area ptb-70 pc-cart">
        <div className="container">
          <form>
            <div className="cart-buttons">
              <div className="row align-items-center">
                {/* <div className="col-lg-7 col-sm-7 col-md-7">
                           <div className="shopping-coupon-code"><input type="text" className="form-control" placeholder="Coupon code" name="coupon-code" id="coupon-code" /><button type="submit">Apply Coupon</button></div>
                        </div> */}
              </div>
            </div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-8">
                  {cart.length > 0 ? (
                    <div className="cart-table ">
                      <table className="table" cellsacing="10px" cellPadding="10px">
                        <thead className="text-center">
                          <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col">PRICE</th>
                            <th scope="col">QUANTITY</th>
                            <th scope="col">TOTAL</th>
                            <th scope="col">ACTION</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map((el, ind1) => {
                            console.log("cartttttttt", cart)
                           // total = total + (el.singleprice * el.quantity) ;
                            // (el.mrp - (el.mrp * el.discountprice) / 100) *
                            // el.quantity;
                            total = total + (el.singleprice * el.quantity);
                            localStorage.setItem("Subtotal", total);
                            actualtotal += el.mrp * el.quantity;
                            localStorage.setItem("ActualSubtotal", actualtotal);

                            return (
                              //  <Link to={"/SingleProduct/" + el.productid} >
                              <tr key={ind1} className="cart-data">
                                <td className="product-thumbnail">
                                  <Link to={"/SingleProduct/" + el.productid}>
                                    <img
                                      src={
                                        //"http://144.91.110.221:3033/" + el.image
                                        "http://localhost:3033/" + el.image
                                      }
                                      alt="item"
                                    />
                                  </Link>
                                </td>
                                <td className="product-name text-left">
                                  <Link to={"/SingleProduct/" + el.productid}>
                                    <div className="text-left">
                                      <StarsRating
                                        count={5}
                                        // onChange={ratingChanged}
                                        size={17}
                                        color2={"#ffd700"}
                                        value={3.5}
                                      />
                                      {el.name}
                                    </div>
                                  </Link>
                                </td>
                                <td className="product-price">
                                  <div className="amount">
                                    <span className="unit-amount">
                                      {
                                        el.mrp
                                        //   isNaN(
                                        //     el.mrp -
                                        //       (el.mrp * el.discountprice) / 100
                                        //   )
                                        //     ? 0
                                        //     : el.mrp -
                                        //       (el.mrp * el.discountprice) / 100
                                      }
                                    </span>
                                  </div>
                                </td>
                                <td className="product-quantity">
                                  <div className="amount">
                                    {" "}
                                    <div className="input-counter">
                                      <span
                                        className="minus-btn"
                                        onClick={() => {
                                          Minusquantity(
                                            el.quantity,
                                            el.mrp,
                                            ind1
                                          );
                                        }}
                                      >
                                        <i className="bx bx-minus minus"></i>
                                      </span>
                                      <input
                                        type="text"
                                        min="1"
                                        value={el.quantity}
                                      />
                                      <span
                                        className="plus-btn"
                                        onClick={() => {
                                          Plusquantity(
                                            el.quantity,
                                            el.mrp,
                                            ind1
                                          );
                                        }}
                                      >
                                        <i className="bx bx-plus  minus"></i>
                                      </span>
                                    </div>
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  <div className="amount">
                                    <span className="subtotal-amount mt-4">
                                      {/* {(el.mrp - el.discountprice) *
                                        el.quantity} */}
                                        {total}
                                    </span>
                                  </div>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-danger btn-sm w-50"
                                    style={{ margin: "0" }}
                                    onClick={(e) => {
                                      Sliceorder(ind1, e);
                                    }}
                                  >
                                    <i className="bx bx-trash"></i>
                                  </button>
                                </td>
                              </tr>
                              //     </Link>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <lottie-player
                      src="https://assets10.lottiefiles.com/packages/lf20_yRyM3f.json"
                      background="transparent"
                      speed="1"
                      style={{
                        width: "300px",
                        height: "300px",
                        margin: "auto",
                      }}
                      loop
                      autoplay
                    ></lottie-player>
                  )}
                </div>

                <div className="col-sm-4  mb-5">
                  <div className="cart-totals">
                    <h3>Cart Totals</h3>
                    <ul>
                      <li>
                        Subtotal <span>{total}</span>
                      </li>

                      {/* <li>Shipping <span>$30.00</span></li> */}
                      <li>
                        Total <span>{total}</span>
                      </li>
                    </ul>
                    <Link
                      className="default-btn1"
                      to={Userdata ? "/CheckOut" : "/register"}
                    >
                      <i className="flaticon-trolley"></i> Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* mobile responsive cart */}

      <div className="small-container cart-page cart-table mt-3">
        <table>
          <thead>
            <tr>
              <th className="text-center">Product</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Subtotal</th>
            </tr>
          </thead>
          {cart.map((el, ind1) => {
            return (
              <tr className="pt-2">
                <td>
                  <div className="cart-info">
                    <Link to={"/SingleProduct/" + el.productid}>
                      <img
                        //src={"http://144.91.110.221:3033/" + el.image}
                        src={"http://localhost:3033/" + el.image}
                        alt="item"
                      />
                    </Link>
                    <div>
                      <Link to={"/SingleProduct/" + el.productid}>
                        <p>{el.name}</p>
                      </Link>
                      <small>
                        Price ₹{" "}
                        {
                          el.mrp
                          //   isNaN(
                          //     el.mrp -
                          //       (el.mrp * el.discountprice) / 100
                          //   )
                          //     ? 0
                          //     : el.mrp -
                          //       (el.mrp * el.discountprice) / 100
                        }
                      </small>
                      <br />
                      <span
                        onClick={(e) => {
                          Sliceorder(ind1, e);
                        }}
                      >
                        Remove
                      </span>
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <div className="amount">
                    {" "}
                    <div className="input-counter">
                      <span
                        className="minus-btn"
                        onClick={() => {
                          Minusquantity(el.quantity, el.mrp, ind1);
                        }}
                      >
                        <i className="bx bx-minus minus mr-2"></i>
                      </span>
                      <input
                        className="text-center"
                        type="number"
                        min="1"
                        value={el.quantity}
                      />
                      <span
                        className="plus-btn"
                        onClick={() => {
                          Plusquantity(el.quantity, el.mrp, ind1);
                        }}
                      >
                        <i className="bx bx-plus  minus ml-2"></i>
                      </span>
                    </div>
                  </div>
                </td>
                <td>{(el.mrp - el.discountprice) * el.quantity} </td>
              </tr>
            );
          })}
        </table>

        <div className="total-price mt-5">
          <table>
            <tr>
              <td className="footheading">Subtotal</td>
              <td>₹{total}</td>
            </tr>

            <tr>
              <td className="footheading">Total</td>
              <td>₹{total}</td>
            </tr>
            <tr className="text-center">
              <td colSpan="2">
                <Link
                  className="default-btn1"
                  to={Userdata ? "/CheckOut" : "/register"}
                >
                  <button>Proccess to CheckOut</button>
                </Link>
              </td>
            </tr>
          </table>
        </div>
      </div>
      {/*  End mobile responsive cart */}
      <Baseline />
      <Footer />
    </>
  );
};
export default Cart;
