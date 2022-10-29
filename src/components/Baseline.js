import React from 'react'
import '../components/singleproduct.css'
const Baseline=()=>{
    return(
        <>
            <div className="facility-area bg-f7f8fa pt-70 pb-40">
          <div className="container mt-5">
            <div className="row">
              <div className="col-lg-3 col-sm-6 col-md-3 col-6 box ">
                <div className="single-facility-box">
                  <div className="icon">
                    <i className="flaticon-free-shipping"></i>
                  </div>
                  <h3>Free Shipping</h3>
                  <p>Free shipping world wide</p>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-md-3 col-6  box ">
                <div className="single-facility-box">
                  <div className="icon">
                    <i className="flaticon-headset"></i>
                  </div>
                  <h3>Support 24/7</h3>
                  <p>Contact us 24 hours a day</p>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-md-3 col-6  box ">
                <div className="single-facility-box">
                  <div className="icon">
                    <i className="flaticon-secure-payment"></i>
                  </div>
                  <h3>Secure Payments</h3>
                  <p>100% payment protection</p>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-md-3 col-6  box ">
                <div className="single-facility-box">
                  <div className="icon">
                    <i className="flaticon-return-box"></i>
                  </div>
                  <h3>Easy Return</h3>
                  <p>Simple returns policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        </>
    );
}
export default Baseline;