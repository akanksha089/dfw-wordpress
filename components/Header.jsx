import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import Sidebar from './Sidebar'; 

export default function Header() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility
  const router = useRouter();
  // const isHomePage = router.pathname === '/';
  const [menuItems, setMenuItems] = useState([]); // Menu data state
  const [serviceData, setServiceData] = useState([]); // Service data state
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // API base URL from .env
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/custom/v1/services/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        setServiceData(result);
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

   // Fetch menu items
   useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`${BASE_URL}/cmd/v1/menu-items`);
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        const orderedMenuItems = reorderMenuItems(data); // Reorder menu items
        setMenuItems(orderedMenuItems);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems(); // Call the fetch function
  }, []);

    // Reorder the menu items to the desired order: Home, About, Services, Blog, Contact
    const reorderMenuItems = (items) => {
      const desiredOrder = ['Home', 'About', 'Services', 'Blog', 'Contact'];
  
      // Find the items that match the desired order
      const orderedItems = desiredOrder
        .map((title) => items.find((item) => item.title === title))  // Map items based on the desired order
        .filter((item) => item);  // Filter out undefined items if any title is missing
  
      // Find items that are not part of the desired order
      const otherItems = items.filter((item) => !desiredOrder.includes(item.title));
  
      // Concatenate the ordered items with any additional items
      return [...orderedItems, ...otherItems];
    };


    useEffect(() => {
      if (serviceData.length > 0) {
        // Only update menuItems once serviceData is available
        setMenuItems((prevMenuItems) =>
          prevMenuItems.map((item) => {
            if (item.title === 'Services') {
              return {
                ...item,
                subtitles: serviceData, // Add service data as subtitles for "Services"
              };
            }
            return item;
          })
        );
      }
    }, [serviceData]); // Only depend on serviceData, not menuItems

  return (
    <>
      {/* <header className={`header inner-header sticky-active ${isHomePage ? 'header-light' : 'header-dark'}`}> */}
      <header className="header inner-header sticky-active header-dark">
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
                    {/* Render menu items */}
                    {menuItems.map((item, index) => (
                      <li
                        key={index}
                        className={`menu-item ${item.title === 'Services' ? 'menu-item-has-children' : ''}`}
                      >
                        {/* Use Link correctly for main menu items */}
                        <Link href={item.url}>{item.title}</Link>

                        {/* Render subtitles dynamically for "Services" */}
                        {item.title === 'Services' && item.subtitles && item.subtitles.length > 0 && (
                          <ul>
                            {item.subtitles.map((subtitle, subIndex) => (
                              <li key={subIndex}>
                                {/* Use Link correctly for service submenu items */}
                                <Link href={`/service/${subtitle.slug}`}>{subtitle.title}</Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
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
