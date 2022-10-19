import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header1 from './Header1';
import Baseline from './Baseline';
var Userdata=''
const Ordered=()=>{
   
   const [orderes, setOrderes]= useState([]);
   useEffect(() => {
      Userdata = JSON.parse(localStorage.getItem("Userdata"))
     
      ordersDetails();
     
   
    }, []);




    const ordersDetails = async () => {
      
      if(!Userdata==[]){     
       
      //await fetch("http://144.91.110.221:3033/api/order/order_by_id", {
         await fetch("http://localhost:3033/api/order/order_by_id", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
           
          userid:Userdata._id,
          
        }),
      })
   
        .then((res) => res.json())
      
        .then(async (data) => {
          if(data.data[0]!=undefined){
             setOrderes(data.data); 
          }
           
          
           console.log(data.data,"rrrr")   
        })
        .catch((err) => {
          console.log(err, "error");
        });
      
      }
    //  else
    //   {
        
    //  }
    };


    const UpdateOrderStatus = async (productId,status) => {
      //await fetch("http://144.91.110.221:3033/api/order/update_order", {
         await fetch("http://localhost:3033/api/order/update_order", {
         method: "PATCH",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            _id:productId,
            status:status,
            justification:'',
            delivery_time:''
         }),
      })
         .then((res) => res.json())
         .then(async (data) => {
           alert("canceled")
          ordersDetails();
   
         })
         .catch((err) => {
            console.log(err, "error");
         });
      };
   
   




    return(
    <>
    <Header1/>









    <div class="first-nav container-fluid"><span><Link to="/">Home</Link>/Orders</span></div>




    
    
   
   
   <br/>
            <div class="container">
            
            {orderes.length > 0 ? 
                  <div class="cart-table table-responsive nav1">
                  <br/>
                     <table class="table">
                        <thead>
                           <tr>
                              <th scope="col">Product</th>
                              <th scope="col">Name</th>
                              <th scope="col">Unit Price</th>
                              <th scope="col">Quantity</th>
                              <th scope="col">Total</th>
                              <th scope="col">Order Date</th>
                              <th scope="col">Status</th>
                              <th scope="col">Acation</th>
                           </tr>
                        </thead>
                        <tbody>
                        
                          
                       
                        {
                           orderes.map((el,ind1)=>(
                              JSON.parse(el.order).map((item,index)=>{
                              
                                 console.log(item.name)
                                 return(
                                 <tr>
                              <td class="product-thumbnail"><a href="#"><img src={"http://144.91.110.221:3033/"+item.image} alt="item" /></a></td>
                              <td class="product-name"><span class="subtotal-amount">{item.name}</span></td>
                              <td class="product-price"><span class="unit-amount">$
                      {isNaN(item.mrp - (item.mrp * item.discountprice) / 100)
                        ? 0
                        : item.mrp - (item.mrp * item.discountprice) / 100}</span></td>
                              <td class="product-quantity">
                                <span>{item.quantity}</span>
                              </td>
                              <td class="product-subtotal"><span class="subtotal-amount">{(item.mrp - item.mrp * item.discountprice / 100) * item.quantity}</span></td>
                              <td class="product-subtotal"><span class="subtotal-amount">22/08/2021</span></td>
                              <td class="product-subtotal"><span class="subtotal-amount">{el.status}</span></td>
                              <td class="product-subtotal" onClick={()=>UpdateOrderStatus(el._id,"Cancel")}>Cancel order</td>

                               </tr>
                           )})
                         
                           ))}
                          
                        
                          
                        </tbody>
                     </table>
                  </div>
                  :
                  <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_yRyM3f.json"  background="transparent"  speed="1"  style={{width: "300px", height: "300px",margin:"auto"}}  loop  autoplay></lottie-player>

                  }
                  </div>
                    <br/>
                
         <Baseline />       
    <Footer/>
    </>
    );
}
export default Ordered;