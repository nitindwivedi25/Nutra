import React, {useState, useEffect} from 'react';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Header1 from './Header1';
var Userdata=''
var Subtotal1=''
const Checkout=()=>{

    const [cart, setCart] = useState([]);
    const [_id,Set_id]=useState();
    useEffect(() => {
        Userdata =  JSON.parse(localStorage.getItem("Userdata"))
        Subtotal1 =  localStorage.getItem("Subtotal")
        CartById()
        },[]);


        const CartById = async () => {
            //await fetch("http://144.91.110.221:3033/api/cart/cart_by_id", {
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
                 setCart(data.data[0].order);
                 Set_id(data.data[0]._id)
                console.log(data.data[0]._id, "hello")
              })
              .catch((err) => {
                console.log(err, "error");
              });
          };
    return(
        <>
        <Header1/>
        <div class="first-nav container-fluid"><span><Link to="/">Home</Link>/CheckOut</span></div>
        <section class="checkout-area ptb-70">
            <div class="container">
               {/* <div class="user-actions"><i class="bx bx-log-in"></i><span>Returning customer? <a href="auth.html">Click here to login</a></span></div> */}
               <form>
                  <div class="row">
                     <div class="col-lg-12 col-md-12">
                        <div class="order-details">
                           <h3 class="title">Your Order</h3>
                           <div class="order-table table-responsive">
                              <table class="table table-bordered">
                                 <thead>
                                 
                                    <tr>
                                       <th scope="col">Name</th>
                                       <th scope="col">Quantity</th>
                                       <th scope="col">Total</th>
                                    </tr>
                         
                                 </thead>
                                 <tbody>

                                 {
                           cart.map((el,ind1)=>(
                             
                                    <tr>
                                       <th scope="col">{el.name}</th>
                                       <th scope="col">{el.quantity}</th>
                                       <th scope="col">{(el.mrp - el.mrp * el.discountprice / 100) * el.quantity}</th>
                                    </tr>
                           ))}
                                 
                                    
                                   
                                </tbody>
                        </table>
                        <br/>
                        <table class="table table-bordered">
                        <tbody>


                        <tr>
                                       <td class="order-subtotal"><span>Cart Subtotal</span></td>
                                       <td class="order-subtotal-price">
                                          <span class="order-subtotal-amount">
                                            {Subtotal1}
                                          </span>
                                       </td>
                                
                                </tr>
                                   {/* <tr>
                                       <td class="order-shipping"><span>Shipping</span></td>
                                       <td class="shipping-price"><span>$10.00</span></td>
                                    </tr>
                                    */}
                                    <tr>
                                       <td class="total-price"><span>Order Total</span></td>
                                       <td class="product-subtotal">
                                          <span class="subtotal-amount">
                                          {Subtotal1}
                                          </span>
                                       </td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                           <div class="payment-box"><Link class="default-btn" to={"/UserDetails/"+ _id}><i class="flaticon-tick"></i>Place Your Order <span></span></Link></div>
                        </div>
                     </div>
                  </div>
               </form>
            </div>
         </section>
         <Footer/>
        </>
    );
}
export default Checkout;