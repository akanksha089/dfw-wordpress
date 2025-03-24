import React from "react";
import Link from "next/link";

export default function Sidebar({ onClose }) {
  const staticData = {
    address: "123 Street, City, Country",
    phone: "+000123456789",
    email: "info@example.com",
    fb_url: "https://facebook.com",
    instagram_url: "https://instagram.com",
    twitter_url: "https://twitter.com",
    google_url: "https://google.com",
  };

  return (
    <div className="sidebar-area">
      <button className="sidebar-trigger close" onClick={onClose}>
        <svg width="16px" height="12.7px" viewBox="0 0 16 12.7">
          <g>
            <rect
              x="0"
              y="5.4"
              transform="matrix(0.7071 -0.7071 0.7071 0.7071 -2.1569 7.5208)"
              width="16"
              height="2"
            />
            <rect
              x="0"
              y="5.4"
              transform="matrix(0.7071 0.7071 -0.7071 0.7071 6.8431 -3.7929)"
              width="16"
              height="2"
            />
          </g>
        </svg>
      </button>
      <div className="side-menu-content">
        <div className="side-menu-logo">
          <Link className="dark-img" href="/">
            <img src="/assets/img/logo/dfw.png" alt="logo" />
          </Link>
          <Link className="light-img" href="/">
            <img src="/assets/img/logo/dfw.png" alt="logo" />
          </Link>
        </div>
        <div className="side-menu-about">
          <div className="side-menu-header">
            <h3>About Us</h3>
          </div>
          <p>
            Welcome to our website! We provide high-quality services to help your
            business grow and succeed. Contact us today!
          </p>
          <Link href="/contact" className="rr-primary-btn">
            Contact Us
          </Link>
        </div>
        <div className="side-menu-contact">
          <div className="side-menu-header">
            <h3 className="custom-heading">Contact Us</h3>
          </div>
          <ul className="side-menu-list">
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <p>{staticData.address}</p>
            </li>
            <li>
              <i className="fas fa-phone"></i>
              <a href={`tel:${staticData.phone}`}>{staticData.phone}</a>
            </li>
            <li>
              <i className="fas fa-envelope-open-text"></i>
              <Link href={`mailto:${staticData.email}`}>{staticData.email}</Link>
            </li>
          </ul>
        </div>
        <ul className="side-menu-social">
          <li className="facebook">
            <Link href={staticData.fb_url}>
              <i className="fab fa-facebook-f"></i>
            </Link>
          </li>
          <li className="instagram">
            <Link href={staticData.instagram_url}>
              <i className="fab fa-instagram"></i>
            </Link>
          </li>
          <li className="twitter">
            <Link href={staticData.twitter_url}>
              <i className="fab fa-twitter"></i>
            </Link>
          </li>
          <li className="g-plus">
            <Link href={staticData.google_url}>
              <i className="fab fa-google-plus"></i>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
