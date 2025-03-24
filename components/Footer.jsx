import React from 'react';
import Link from 'next/link';

export default function Footer() {

  const data = {
    address: "123 Street, City, Country",
    phone: "+000123456789",
    email: "info@example.com",
    fb_url: "https://facebook.com",
    instagram_url: "https://instagram.com",
    twitter_url: "https://twitter.com",
    google_url: "https://google.com",
  };
  const socialMediaLinks = [
    { platform: 'facebook', iconClass: 'fab fa-facebook-f', url: data?.fb_url },
    { platform: 'pinterest', iconClass: 'fab fa-pinterest', url: data?.pinterest_url },
    { platform: 'twitter', iconClass: 'fab fa-twitter', url: data?.twitter_url },
    { platform: 'instagram', iconClass: 'fab fa-instagram', url: data?.instagram_url },
  ];
    return (
      <footer className="footer-section bg-dark-1">
      <div className="shape">
        <img src="/assets/img/shapes/footer-shape.png" alt="footer" />
      </div>
      <div className="container">
        <div className="row footer-wrap">
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <div className="widget-header">
                <div className="footer-logo ">
                  <Link href="/">
                    <img src="\assets\img\logo\dfw.png" alt="logo" />
                  </Link>
                </div>
              </div>
              <p className="mb-20">
                Centric applications productize before front end vortals visualize front end is results and value added
              </p>
              {/* <h4 className="title">
                WE ARE AVAILABLE <span>Mon-Sat: 09.00 am to 6.30 pm</span>
              </h4> */}
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget footer-col-2">
              <div className="widget-header">
                <h3 className="widget-title">Useful Links</h3>
              </div>
              <ul className="footer-list">
                <li><Link href="/about">About </Link></li>
                <li><Link href="/service">Our Services</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <div className="widget-header">
                <h3 className="widget-title">Contact Us</h3>
              </div>
              <ul className="address-list">
                <li>
                  {data && data.address ? data.address : ""} <br />
                </li>
                <li><Link href={data && data.email ? data.email : ""}>{data && data.email ? data.email : ""}</Link></li>
                <li><Link href={data && data.phone ? data.phone : ""}>{data && data.phone ? data.phone : ""}</Link></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <div className="widget-header">
                <h3 className="widget-title">Subscribe newsletter</h3>
              </div>
              <div className="footer-form mb-20">
                <form action="#" className="rr-subscribe-form">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Email address"
                  />
                  <input type="hidden" name="action" value="mailchimpsubscribe" />
                  <button className="submit">Sign Up</button>
                  <div className="clearfix"></div>
                </form>
              </div>
              <div className="form-check form-item">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="man"
                />
                <label className="form-check-label" htmlFor="man">
                  I’m okay with getting emails and having
                  that tracked to improve my experience
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area">
        <div className="container">
          <div className="row copyright-content">
            <div className="col-md-6">
              <p>© 2024 DIgital Future Web Solutions. All Rights Reserved.</p>
            </div>
            <div className="col-md-6">
              <ul className="social-list">
                {socialMediaLinks
                  .filter(link => link.url) // Only include platforms with URLs
                  .map(link => (
                    <li key={link.platform} className={link.platform}>
                      <Link href={link.url}>
                        <i className={link.iconClass}></i>
                      </Link>
                    </li>
                  ))}

              </ul>
            </div>

          </div>
        </div>
      </div>
    </footer>
    );
  }
  