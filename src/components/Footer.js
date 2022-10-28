import React from "react";
import { Link } from "react-router-dom";
import "../views/landing/homepage.css";
const Footer = () => {
  return (
    <>
      <footer class="footer-area ">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-sm-6 col-md-6">
              <div class="single-footer-widget">
                <a class="logo d-inline-block" href="#">
                  <img src={require("../Images/logo1.png")} alt="image" />
                </a>
                <ul class="footer-contact-info">
                  <li>
                    <span>Hotline:</span> <a href="tel:16768">16768</a>
                  </li>
                  <li>
                    <span>Phone:</span>{" "}
                    <a href="tel:+91-135-2976990">+91-135-2976990/91</a>
                  </li>
                  <li>
                    <span>Email:</span>{" "}
                    <a href="cdn-cgi/l/email-protection.html#adc5c8c1c1c2edc0c8c9fc83cec2c0">
                      info@ishaanagroup.com
                    </a>
                  </li>
                  <li>
                    <span>Address:</span>{" "}
                    <a href="#" target="_blank">
                      NutraZik Corp 539 W. Commerce Suite #6696 Dallas, TX 75208{" "}
                    </a>
                  </li>
                </ul>
                <ul class="social">
                  <li>
                    <a href="#" target="_blank">
                      <i class="bx bxl-facebook-square"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i class="bx bxl-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i class="bx bxl-instagram-alt"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i class="bx bxl-linkedin-square"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i class="bx bxl-pinterest"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 col-md-6">
              <div class="single-footer-widget">
                <h3>Information</h3>
                <ul class="link-list">
                  <li>
                    <a href="/about">About Us</a>
                  </li>
                  <li>
                    <Link to="/ContactUs">Contact Us</Link>
                  </li>
                  <li>
                    <a href="privacy-policy.html">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="terms-of-service.html">Terms &amp; Conditions</a>
                  </li>
                  <li>
                    <a href="customer-service.html">Delivery Information</a>
                  </li>
                  <li>
                    <a href="customer-service.html">Orders and Returns</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 col-md-6">
              <div class="single-footer-widget">
                <h3>Customer Care</h3>
                <ul class="link-list">
                  <li>
                    <a href="faq.html">Help &amp; FAQs</a>
                  </li>
                  <li>
                    <a href="profile-authentication.html">My Account</a>
                  </li>
                  <li>
                    <Link to="/Ordered">Order History</Link>
                  </li>
                  <li>
                    <a href="cart.html">Wishlist</a>
                  </li>
                  <li>
                    <a href="contact.html">Newsletter</a>
                  </li>
                  <li>
                    <a href="purchase-guide.html">Purchasing Policy</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 col-md-6">
              <div class="single-footer-widget">
                <h3>Newsletter</h3>
                <p class="Subscribe">
                  Sign up for our mailing list to get the latest updates &amp;
                  offers.
                </p>
                <form class="newsletter-form">
                  <input
                    type="text"
                    class="input-newsletter"
                    placeholder="Enter your email address"
                    name="email"
                    required=""
                  />
                  <div className="align-items-center">
                    <button type="submit" class="default-btn">
                      Subscribe Now
                      <img
                        src={require("../Images/Icons/cib_telegram-plane.png")}
                        className="pl-2 pb-1"
                      />
                    </button>
                  </div>

                  <div id="validator-newsletter" class="form-result"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom-area">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-6 col-md-6">
                <p>
                  Designed & Developed by <i class="bx bx-copyright"></i>2021
                  GiksIndia.
                </p>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="payment-types">
                  <ul class="d-flex align-items-center justify-content-end">
                    <li>We accept payment via:</li>
                    <li>
                      <a href="#" target="_blank">
                        <img
                          src={require(".././Images/payment-types/visa.png")}
                          alt="image"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <img
                          src={require(".././Images/payment-types/mastercard.png")}
                          alt="image"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <img
                          src={require(".././Images/payment-types/paypal.png")}
                          alt="image"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <img
                          src={require(".././Images/payment-types/descpver.png")}
                          alt="image"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <img
                          src={require(".././Images/payment-types/american-express.png")}
                          alt="image"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
