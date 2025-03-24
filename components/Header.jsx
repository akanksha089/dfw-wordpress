import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Sidebar from './Sidebar'; 

export default function Header() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dfweb-v2.onrender.com/api/v1/api-services');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add('open-sidebar');
    } else {
      document.body.classList.remove('open-sidebar');
    }

    return () => {
      document.body.classList.remove('open-sidebar');
    };
  }, [sidebarOpen]);

  return (
    <>
      <header className={`header inner-header sticky-active ${isHomePage ? '' : 'header-dark'}`}>
        <div className="primary-header">
          <div className="primary-header-inner">
            <div className="header-logo d-lg-block">
              <Link href="/" legacyBehavior>
                <a> <img src="/assets/img/logo/dfw.png" alt="Logo" /> </a>
              </Link>
            </div>
            <div className="header-right-wrap">
              <div className="header-menu-wrap">
                <div className="mobile-menu-items">
                  <ul>
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <Link href="/about">About</Link>
                    </li>
                    <li className="menu-item-has-children active">
                      <Link href="/services">Services</Link>
                      <ul>
                        {data && data.blogs && data.blogs.length > 0 ? (
                          data.blogs.map((item, index) => (
                            <li key={index} className={`${isHomePage ? '' : 'header-sub-dark'}`}>
                              <Link href={`/service/${item.slug}`} >
                                {item.title}
                              </Link>
                            </li>
                          ))
                        ) : (
                          <li></li>
                        )}
                      </ul>
                    </li>
                    <li>
                      <Link href="/blogs">Blog</Link>
                    </li>
                    <li>
                      <Link href="/contact">Contact</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="header-right">
                <div className="sidebar-icon">
                  <button className="sidebar-trigger">
                    <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.300781 0H5.30078V5H0.300781V0Z" fill="currentColor" />
                      <path d="M0.300781 9H5.30078V14H0.300781V9Z" fill="currentColor" />
                      <path d="M0.300781 18H5.30078V23H0.300781V18Z" fill="currentColor" />
                      <path d="M9.30078 0H14.3008V5H9.30078V0Z" fill="currentColor" />
                      <path d="M9.30078 9H14.3008V14H9.30078V9Z" fill="currentColor" />
                      <path d="M9.30078 18H14.3008V23H9.30078V18Z" fill="currentColor" />
                      <path d="M18.3008 0H23.3008V5H18.3008V0Z" fill="currentColor" />
                      <path d="M18.3008 9H23.3008V14H18.3008V9Z" fill="currentColor" />
                      <path d="M18.3008 18H23.3008V23H18.3008V18Z" fill="currentColor" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* {sidebarOpen && <Sidebar  onClose={closeSidebar} />} */}
    </>
  );
}
