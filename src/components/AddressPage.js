import React,{useState} from 'react'
import Baseline from './Baseline';
import Footer from './Footer';
import { Link } from "react-router-dom";
import '../components/singleproduct.css'
import ShippingAddress from './ShippingAddress';
import Orders from './Orders';
import $ from 'jquery';
import Header1 from './Header1';
const AddressPage = (props)=>{
    const [RightContent,setRightContent]=useState('')
    const Changelinecolor=(value)=>{
      if(value=='lin1'){
          $('.lin1').addClass('account-details')
          $('.lin2').removeClass('account-details')
          $('.lin3').removeClass('account-details')
      }
     else if(value=='lin2'){
        $('.lin1').removeClass('account-details')
        $('.lin2').addClass('account-details')
        $('.lin3').removeClass('account-details')
    }
    else if(value=='lin3'){
        $('.lin1').removeClass('account-details')
        $('.lin2').removeClass('account-details')
        $('.lin3').addClass('account-details')
    }
    }
    return(<>
    <Header1 />
          <div class="first-nav container-fluid"><span><Link to="/">Home</Link>/My Account</span></div>
    <div className="container-fluid Addresses-main">
        <div className="row address-row mt-4">
            <div className="col-sm-3 address-col">
                <div className="address">
                    <ul>
                        <li onClick={()=>{Changelinecolor("lin1");setRightContent('orders')}} className=" lin1">Orders</li>
                        <li onClick={()=>{Changelinecolor("lin2");setRightContent('addressDiv')}}  className=" lin2">Addresses</li>
                        <li onClick={()=>{Changelinecolor("lin3");setRightContent('')}}  className="lin3 account-details">Account details</li>
                        <li  className="lin4">Logout</li>
                    </ul>
                </div>
            </div>
            <div className="col-sm-1"></div>
            <div className="col-sm-6 details-col mt-2">
                {RightContent=='addressDiv'?
                <ShippingAddress />
                :
                RightContent=='orders' ?
                <Orders />
                :
                
                
                
                <div class="form-row">
                            <div class="form-group col-lg-12">
                              <label>Country<span>*</span></label>
                              <select class="form-control options">
                                <option>India</option>
                                <option>America</option>
                                <option>South Africa</option>
                                </select>                              
                            </div>
                            <div class="form-group col-lg-12">
                              <label>Street address<span>*</span></label>
                              <input class="form-control " placeholder="House number and street name" />
                              <input class="form-control mt-2 " placeholder="Landmark" />
                            </div>
                            <div class="form-group col-lg-12">
                              <label>Town/City<span>*</span></label>
                              <input class="form-control " />
                            </div>
                            <div class="form-group col-lg-12">
                              <label>Postcode / Zip <span>*</span></label>
                              <input class="form-control " />
                            </div>
                            <div class="form-group col-lg-12">
                              <label>Phone<span>*</span></label>
                              <input class="form-control " />
                            </div>
                            <div class="form-group col-lg-12">
                              <label>Email address<span>*</span></label>
                              <input class="form-control " />
                            </div>
                            <div class="form-group col-lg-12">
                              <button class="btn btn-success btn-lg">Save Changes</button>
                            </div>
                        </div>
                    }
                
            </div>
        </div>
    </div>
      <Baseline />
      <Footer />
    </>);
}

export default AddressPage;