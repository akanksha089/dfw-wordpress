import React from 'react';
import Link from 'next/link';

export default function Sidebar({ data, onClose }) {
  return (
    <div id="" className="sidebar-area">
      <button className="sidebar-trigger close" onClick={onClose}>
        <svg
          className=""
          width="16px"
          height="12.7px"
          viewBox="0 0 16 12.7"
          style={{ enableBackground: 'new 0 0 16 12.7' }}
        >
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
        <div className="side-menu-wrap"></div>
        <div className="side-menu-about">
          <div className="side-menu-header">
            <h3>About Us</h3>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud nisi ut aliquip ex ea commodo consequat.
          </p>
          <Link href="/contact" className="rr-primary-btn">Contact Us</Link>
        </div>
        <div className="side-menu-contact">
          <div className="side-menu-header">
            <h3 className="custom-heading">Contact Us</h3>
          </div>
          <ul className="side-menu-list">
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <p>{data && data.address ? data.address : ""}</p>
            </li>
            <li>
              <i className="fas fa-phone"></i>
              <a href="tel:+000123456789">{data && data.phone ? data.phone : ""}</a>
            </li>
            <li>
              <i className="fas fa-envelope-open-text"></i>
              <Link href={data && data.email ? `mailto:${data.email}` : ""}>{data && data.email ? data.email : ""}</Link>
            </li>
          </ul>
        </div>
        <ul className="side-menu-social">
          {data && data.fb_url && (
            <li className="facebook">
              <Link href={data.fb_url}>
                <i className="fab fa-facebook-f"></i>
              </Link>
            </li>
          )}

          {data && data.instagram_url && (
            <li className="instagram">
              <Link href={data.instagram_url}>
                <i className="fab fa-instagram"></i>
              </Link>
            </li>
          )}

          {data && data.twitter_url && (
            <li className="twitter">
              <Link href={data.twitter_url}>
                <i className="fab fa-twitter"></i>
              </Link>
            </li>
          )}

          {data && data.google_url && (
            <li className="g-plus">
              <Link href={data.google_url}>
                <i className="fab fa-google-plus"></i>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
