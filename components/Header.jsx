import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Header() {
  const [menuItems, setMenuItems] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const router = useRouter();
  // const isHomePage = router.pathname === '/';
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Slugify helper
  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-'); // Replace spaces with -

  // Fetch Services (for Services submenu)
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${BASE_URL}/custom/v1/services/`);
        if (!response.ok) throw new Error('Failed to fetch services');
        const data = await response.json();
        setServiceData(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchServices();
  }, []);

  // Fetch Menu Items
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`${BASE_URL}/cmd/v1/menu-items`);
        if (!response.ok) throw new Error('Failed to fetch menu items');
        const data = await response.json();

        // Normalize Staff Augmentation subtitles if they are plain strings
        const updatedItems = data.map((item) => {
          if (item.title === 'Staff Augmentation' && Array.isArray(item.subtitles)) {
            return {
              ...item,
              subtitles: item.subtitles.map((sub) => ({
                title: sub,
                slug: slugify(sub),
              })),
            };
          }
          return item;
        });

        const orderedMenuItems = reorderMenuItems(updatedItems);
        setMenuItems(orderedMenuItems);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  // Inject services into "Services" menu
  useEffect(() => {
    if (serviceData.length > 0) {
      setMenuItems((prev) =>
        prev.map((item) =>
          item.title === 'Services'
            ? {
              ...item,
              subtitles: serviceData.map((service) => ({
                title: service.title,
                slug: service.slug || slugify(service.title),
              })),
            }
            : item
        )
      );
    }
  }, [serviceData]);

  // Reorder Menu
  const reorderMenuItems = (items) => {
    const desiredOrder = ['Home', 'About', 'Services', 'Staff Augmentation', 'Blog', 'Contact'];
    const ordered = desiredOrder
      .map((title) => items.find((item) => item.title === title))
      .filter(Boolean);
    const others = items.filter((item) => !desiredOrder.includes(item.title));
    return [...ordered, ...others];
  };

  // Handle Sidebar Toggle
  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add('open-sidebar');
    } else {
      document.body.classList.remove('open-sidebar');
    }
    return () => document.body.classList.remove('open-sidebar');
  }, [sidebarOpen]);

  return (

    <header className="header inner-header sticky-active header-dark">
      {/* <header className={`header inner-header sticky-active ${isHomePage ? 'header-light' : 'header-dark'}`}>  */}
      <div className="primary-header">
        <div className="primary-header-inner">
          <div className="header-logo d-lg-block">
            <Link href="/" legacyBehavior>
              <a><img src="/assets/img/logo/dfw.png" alt="Logo" /></a>
            </Link>
          </div>
          <div className="header-right-wrap">
            <div className="header-menu-wrap">
              <div className="mobile-menu-items">
                <ul>
                  {menuItems.map((item, index) => {
                    const hasDropdown = (item.title === 'Services' || item.title === 'Staff Augmentation') &&
                      item.subtitles?.length > 0;

                    return (
                      <li
                        key={index}
                        className={`menu-item ${hasDropdown ? 'menu-item-has-children' : ''}`}
                      >
                        {item.title === 'Staff Augmentation' ? (
                          <a onClick={(e) => e.preventDefault()} style={{ cursor: 'default' }}>
                            {item.title}
                          </a>
                        ) : (
                          <Link href={item.url}>{item.title}</Link>
                        )}

                        {hasDropdown && (
                       <ul className={`${(item.title === 'Staff Augmentation' || item.title === 'Services') ? 'dropdown-grid' : ''}`}>

                            {item.subtitles.map((sub, subIndex) => (
                              <li key={subIndex}>
                                {item.title === 'Staff Augmentation' ? (
                                  <Link href={`/staff-augmentation/${sub.slug}`}>{sub.title}</Link>
                                ) : (
                                  <Link href={`/${sub.slug}`}>{sub.title}</Link>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })} 
                </ul>




              </div>
            </div>
            <div className="header-right">
              <div className="sidebar-icon">
                <button className="sidebar-trigger" onClick={() => setSidebarOpen(true)}>
                  <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {[0, 9, 18].map((y) =>
                      [0, 9, 18].map((x, i) => (
                        <path key={`${x}-${y}-${i}`} d={`M${x}.300781 ${y}H${x + 5}.30078V${y + 5}H${x}.300781V${y}Z`} fill="currentColor" />
                      ))
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
