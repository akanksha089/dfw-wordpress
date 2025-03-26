import React from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Link from 'next/link';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactHtmlParser from 'html-react-parser';
import {  fetchContactData } from '../../lib/api';


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
    const [settingdata, setSettingData] = useState(null);
    const [serviceData, setServiceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; 
    useEffect(() => {

        if (!slug) return;
        const apiUrl = `${BASE_URL}/custom/v1/service-detail/${slug}`;

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
                console.error('Error fetching data:', err);
            }
        };

        fetchData(), serviceData(), fetchSettingData();
    }, [slug]);


console.log('serviceData', serviceData)
    const content = data  && data.content
        ? data.content
        : '';
        const meta_title = data?.blog?.meta_title || '';
         const meta_description = data?.blog?.meta_description || '';
         const meta_keyword = data?.blog?.meta_keyword || '';
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
                    <Sidebar data={settingdata}/>
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
                                        <h1 className="title text-white">{data  && data.title ? data.title : " "}</h1>
                                        <h4 className="sub-title">
                                            <Link className="home" href="/">Home</Link>
                                            <Link className="home" href="/service">Service</Link>
                                            <Link className="inner-page custom-heading" href={`/service/${data.slug}`}>{data  && data.title ? data.title : ""}</Link>
                                        </h4>
                                    </div>
                                </div>
                            </section>
                            <section className="service-details pt-130 pb-130">
                                <div className="container">
                                    <div className="row gy-lg-0 gy-5">
                                        <div className="col-lg-8 col-md-12">
                                            <div className="sidebar-content-wrap">
                                                <div className="service-details-img">
                                                    <img src={data  && data.image ? data.image : " "} alt="service" />
                                                </div>
                                                <div className="service-details-content">
                                                    <h2 className="title custom-heading">{data  && data.title ? data.title : " "}</h2>
                                                    <p className="mb-30">
                                                        {ReactHtmlParser(content)}

                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-12">
                                            <div className="service-widget">
                                                <h3 className="widget-title custom-heading">Services</h3>
                                                <ul className="category-list">

                                                    {serviceData  && serviceData.length > 0 ? (
                                                        serviceData.map((item, index) => (
                                                            <li key={index} className={item.slug === data.slug ? "active" : ""}><Link href={`/service/${item.slug}`}><i className="fa-sharp fa-regular fa-arrow-right"></i>{item.title} </Link></li>
                                                        ))
                                                    ) : (
                                                        <li></li>
                                                    )}

                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </section>
                            <Footer data={settingdata}/>
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
