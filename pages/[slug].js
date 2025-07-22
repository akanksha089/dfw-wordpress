import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import ReactHtmlParser from 'html-react-parser';
import { fetchContactData } from '../lib/api';


const ServiceDetails = () => {



    const backgroundStyle = {
        backgroundImage: 'url(/assets/img/bg-img/page-header-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };
    const router = useRouter();
    const { slug } = router.query;

    const [data, setData] = useState(null);
    const [services, setServices] = useState([]);
    const [otherSections, setOtherSections] = useState([]);
    const [settingdata, setSettingData] = useState(null);
    const [serviceData, setServiceData] = useState(null);
    const [servicesHeading, setServicesHeading] = useState("OUR SERVICES");
    const [otherHeading, setOtherHeading] = useState("Service We Offer");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    console.log('loading', loading)
    useEffect(() => {

        if (!slug) return;
         const apiUrl = `${BASE_URL}/custom/v1/service-detail/${slug}`;
        // const apiUrl = `http://dfw.local/wp-json/custom/v1/service-detail/${slug}`;

        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
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
        const serviceData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/custom/v1/services/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setServiceData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        const fetchSettingData = async () => {
            try {
                const result = await fetchContactData();
                setSettingData(result); // Set the fetched data       
            } catch (err) {
                setError('Failed to load data');
                console.error('Error fetching data:', error, err);
            }
        };

        fetchData(); serviceData(); fetchSettingData();
    }, [slug]);

    useEffect(() => {
        if (!data || !data.content) return;

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = data.content;

        // --- Extract h2 headings dynamically (if you have 2 h2, assign accordingly) ---
        const h2Elements = tempDiv.querySelectorAll("h2");
        if (h2Elements.length >= 2) {
            setServicesHeading(h2Elements[0].textContent.trim());
            setOtherHeading(h2Elements[1].textContent.trim());
        }

        // --- Parse services (h3 + following p) ---
        const h3Elements = Array.from(tempDiv.querySelectorAll("h3"));
        const parsedServices = h3Elements.map((h3) => {
            let title = h3.textContent.trim();
            let descriptionParts = [];

            let sibling = h3.nextElementSibling;
            while (sibling && !["H2", "H3", "H4"].includes(sibling.tagName)) {
                if (sibling.tagName === "P") {
                    descriptionParts.push(sibling.outerHTML);
                }
                sibling = sibling.nextElementSibling;
            }

            return { title, description: descriptionParts.join("") };
        });
        setServices(parsedServices);

        // --- Parse otherSections (<p><strong> + following p) ---
        const offerSections = [];
        tempDiv.querySelectorAll("h4 > strong").forEach((strongEl) => {
            const title = strongEl.textContent.trim();
            let description = "";
            let sibling = strongEl.closest("h4").nextElementSibling;

            while (sibling && sibling.tagName === "P" && !sibling.querySelector("strong")) {
                description += sibling.outerHTML;
                sibling = sibling.nextElementSibling;
            }

            if (description) offerSections.push({ title, description });
        });

        setOtherSections(offerSections);
    }, [data]);



    console.log('otherSections', otherSections)

    // const content = data && data.content ? data.content : '';
    const meta_title = data?.meta?.title || '';
    const meta_description = data?.meta?.description || '';
    const meta_keyword = data?.meta?.meta_keyword || '';
    return (
        <div>
            {data ? (
                <div className="body">
                    <Head>
                        <title>{meta_title}</title>
                        <meta name="description" content={meta_description} />
                        <meta name="keyword" content={meta_keyword} />
                    </Head>
                    <Header />
                    <div id="popup-search-box">
                        <div className="box-inner-wrap d-flex align-items-center">
                            <form id="form" action="#" method="get" role="search">
                                <input id="popup-search" type="text" name="s" placeholder="Type keywords here..." />
                            </form>
                            <div className="search-close"><i className="fa-sharp fa-regular fa-xmark"></i></div>
                        </div>
                    </div>
                    <Sidebar data={settingdata} />
                    {/* <div id="preloader">
           <div className="loading" data-loading-text="Runok"></div>
       </div> */}
                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            <section className="page-header" style={backgroundStyle}>
                                <div className="overlay"></div>
                                <div className="shapes">
                                    <div className="shape shape-1">
                                        <img src="/assets/img/shapes/page-header-shape-1.png" alt="shape" />
                                    </div>
                                    <div className="shape shape-2">
                                        <img src="/assets/img/shapes/page-header-shape-2.png" alt="shape" />
                                    </div>
                                    <div className="shape shape-3">
                                        <img src="/assets/img/shapes/page-header-shape-3.png" alt="shape" />
                                    </div>
                                </div>
                                <div className="container">
                                    <div className="page-header-content text-center">
                                        <h1 className="title text-white">{data && data.title ? data.title : " "}</h1>
                                        <h4 className="sub-title">
                                            <Link className="home" href="/">Home</Link>
                                            <Link className="home" href="/service">Service</Link>
                                            <Link className="inner-page custom-heading" href={`/service/${data.slug}`}>{data && data.title ? data.title : ""}</Link>
                                        </h4>
                                    </div>
                                </div>
                            </section>




                            <section className="service-section pt-130 pb-130 overflow-hidden">
                                <div className="container">
                                    <div className="section-heading text-center">
                                        <h4 className="sub-heading" data-text-animation="fade-in" data-duration="1.5">
                                            Our Services
                                        </h4>
                                        <h2 className="section-title" data-text-animation data-split="word" data-duration="1">
                                            {servicesHeading}
                                        </h2>
                                    </div>
                                    <div className="row gy-4 fade-wrapper">
                                        {services.map((service, idx) => (
                                            <div className="col-md-6" key={idx}>
                                                <div className="service-card fade-top">
                                                    <div className="shape">
                                                        <img src="assets/img/shapes/service-shape-2.png" alt="service" />
                                                    </div>
                                                    <div className="icon">
                                                        <img src="/assets/img/icon/service-1.png" alt="service" />
                                                    </div>
                                                    <div className="content">
                                                        <h3 className="title">{service.title}</h3>
                                                        <div dangerouslySetInnerHTML={{ __html: service.description }} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>


                            <section className="service-section-3 pb-130 fade-wrapper">
                                <div className="container">
                                    <div className="row gy-lg-0 gy-4">
                                        <div className="col-lg-4 col-md-12">
                                            <div className="service-left sticky-widget">
                                                <div className="section-heading heading-3">
                                                    <h4 className="sub-heading after-none" data-text-animation="fade-in" data-duration="1.5">
                                                        Service We Offer
                                                    </h4>
                                                    <h2 className="section-title" data-text-animation data-split="word" data-duration="1">
                                                        {otherHeading}
                                                    </h2>
                                                    <Link href="/service" className="rr-primary-btn">
                                                        More Services <i className="fa-sharp fa-regular fa-arrow-right"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-8 col-md-12">
                                            <div className="service-box-wrap fade-top">
                                                {otherSections.length > 0
                                                    ? otherSections.map((svc, idx) => (
                                                        <div key={idx} className="service-box">
                                                            <span className="number">{idx + 1}</span>
                                                            <div className="icon">
                                                                <svg width="61" height="61" viewBox="0 0 61 61" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M11.8887 0.563477C10.244 0.563477 8.89062 1.91686 8.89062 3.56156V35.5616C8.89062 36.8962 10.8926 36.8962 10.8926 35.5616V10.5674H50.8867V35.5616C50.8565 36.9252 52.9173 36.9252 52.8867 35.5616V3.56156C52.8867 1.91686 51.5353 0.563477 49.8906 0.563477H11.8887ZM11.8887 2.56547H49.8906C50.4619 2.56547 50.8867 2.99025 50.8867 3.56156V8.56544H10.8926V3.56156C10.8926 2.99025 11.3174 2.56547 11.8887 2.56547ZM13.8906 4.56354C13.3383 4.56354 12.8906 5.01129 12.8906 5.56355C12.8906 6.11586 13.3383 6.56345 13.8906 6.56345C14.4429 6.56345 14.8906 6.11586 14.8906 5.56355C14.8906 5.01129 14.4429 4.56354 13.8906 4.56354ZM17.8906 4.56354C17.3384 4.56354 16.8906 5.01129 16.8906 5.56355C16.8906 6.11586 17.3384 6.56345 17.8906 6.56345C18.4429 6.56345 18.8906 6.11586 18.8906 5.56355C18.8906 5.01129 18.4429 4.56354 17.8906 4.56354ZM21.8906 4.56354C21.3384 4.56354 20.8906 5.01129 20.8906 5.56355C20.8906 6.11586 21.3384 6.56345 21.8906 6.56345C22.4429 6.56345 22.8906 6.11586 22.8906 5.56355C22.8906 5.01129 22.4429 4.56354 21.8906 4.56354ZM35.8398 4.5655C34.4897 4.65734 34.5818 6.5986 35.8867 6.56553H47.8906C49.1947 6.53529 49.1947 4.59441 47.8906 4.5655H35.8398ZM3.89453 6.56553C2.24984 6.56553 0.890625 7.91695 0.890625 9.56165V45.5635C0.890625 47.2082 2.24984 48.5616 3.89453 48.5616H57.8926C59.5373 48.5616 60.8906 47.2082 60.8906 45.5635V9.56154C60.8906 7.91684 59.5373 6.56541 57.8926 6.56541H55.8926C54.5293 6.53518 54.5293 8.59568 55.8926 8.56544H57.8926C58.4639 8.56544 58.8887 8.99022 58.8887 9.56154V38.5654H2.89062V9.56154C2.89062 8.99022 3.32325 8.56544 3.89453 8.56544H5.88671C7.24995 8.59568 7.24995 6.53518 5.88671 6.56541L3.89453 6.56553ZM33.9023 14.5479C33.4627 14.5449 33.0728 14.8296 32.9414 15.2492L26.9395 33.2471C26.5163 34.5128 28.4147 35.1475 28.8379 33.8819L34.8398 15.878C35.0662 15.2305 34.5883 14.5524 33.9023 14.5479ZM38.25 20.3292L43.3281 24.5655L38.25 28.796C37.165 29.6454 38.5047 31.2483 39.5332 30.3312L45.5273 25.3331C46.006 24.9333 46.006 24.1978 45.5273 23.798L39.5332 18.7921C39.354 18.6387 39.1264 18.5536 38.8398 18.5539C37.8946 18.6367 37.5519 19.7642 38.25 20.3292ZM22.8652 18.5558C22.64 18.5634 22.4239 18.6465 22.252 18.792L16.252 23.7979C15.7733 24.1977 15.7733 24.9332 16.252 25.3329L22.252 30.3311C23.2839 31.2922 24.662 29.6358 23.5293 28.7959L18.4512 24.5653L23.5293 20.3291C24.2682 19.7241 23.8198 18.5267 22.8652 18.5558ZM2.89062 40.5674H58.8887V45.5635C58.8887 46.1348 58.4639 46.5596 57.8926 46.5596H3.89453C3.32325 46.5596 2.89062 46.1348 2.89062 45.5635V40.5674ZM32.9453 42.5655L28.8418 42.5675C27.5671 42.7198 27.6527 44.5255 28.8887 44.5597H32.8906C34.264 44.681 34.3783 42.5931 32.9453 42.5655ZM25.2812 50.4834C24.8799 50.4758 24.5123 50.7071 24.3477 51.0732C23.8661 52.1061 23.0034 53.3122 21.5137 54.5615H19.8906C18.2459 54.5615 16.8945 55.9228 16.8945 57.5675V59.5597C16.8925 60.1119 17.3384 60.5613 17.8906 60.5635H43.8887C44.444 60.5655 44.8947 60.115 44.8926 59.5597V57.5675C44.8926 55.9228 43.5334 54.5615 41.8887 54.5615H40.2676C38.778 53.3123 37.9151 52.106 37.4336 51.0732C37.2643 50.6976 36.8821 50.4643 36.4707 50.4853C35.7563 50.5231 35.3101 51.2748 35.6211 51.919C36.0109 52.7552 36.6062 53.652 37.4082 54.5615H24.373C25.175 53.652 25.7703 52.7552 26.1602 51.919C26.4776 51.2632 26.0097 50.4989 25.2812 50.4834ZM19.8906 56.5635H41.8887C42.4599 56.5635 42.8926 56.9962 42.8926 57.5675V58.5636H18.8945V57.5675C18.8945 56.9962 19.3193 56.5635 19.8906 56.5635Z" fill="currentColor" />
                                                                </svg>
                                                            </div>
                                                            <h3 className="title">{svc.title}</h3>
                                                            <div dangerouslySetInnerHTML={{ __html: svc.description }} />
                                                        </div>
                                                    ))
                                                    : <p>No service-offer items found.</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <Footer data={settingdata} />
                        </div>
                    </div>
                    <div id="scroll-percentage"><span id="scroll-percentage-value"></span></div>

                    {/* <div id="theme-toogle" className="switcher-button">
                        <div className="switcher-button-inner-left"></div>
                        <div className="switcher-button-inner"></div>
                    </div> */}
                </div>
            ) : (
                <p></p>
            )}
        </div>
    );
};

export default ServiceDetails;
