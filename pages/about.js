import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Link from 'next/link';
import ReactHtmlParser from 'html-react-parser';
import { fetchCustomApiData, fetchContactData } from '../lib/api';

function About() {
    const [about, setAbout] = useState(null);
    const [testiData, setTestiData] = useState(null);
    const [process, setprocess] = useState(null); // State to hold the process data
    const [pro, setpro] = useState(null); // State to hold the process data
    // const [ setError] = useState(null);
    const [settingdata, setsettingData] = useState(null);
    const [company, setCompany] = useState(null); // State to hold the company data
    const [member, setMember] = useState(null); // State to hold the member data
    const [testimonial, setTestimonial] = useState(null); // State to hold the Testimonial data
    const [team, setTeam] = useState(null);
    const [companyInfo, setCompanyInfo] = useState({
        mission: {},
        vision: {},
        goal: {},
    });

    const splitTextMulti = (text) => {
        if (!text) return null;

        // Define the word after which you want to insert a line break
        const lineBreakWord = "issues";

        // Split the text into words
        const words = text.split(" ");

        // Initialize a variable to hold the words
        let line = [];
        const result = [];

        words.forEach((word) => {
            // Push the word to the current line
            line.push(word);

            // Check if the word is the one where you want to insert a line break
            if (word === lineBreakWord) {
                // Push the current line (as a single string) into the result array
                result.push(line.join(" "));

                // Start a new line (empty array) after the break
                line = [];
            }
        });

        // Add the last line if there's any remaining words
        if (line.length > 0) {
            result.push(line.join(" "));
        }

        // Now return the result with each "line" inside a <div> to handle the display
        return result.map((line, index) => (
            <div key={index} className="line" style={{ display: 'block', textAlign: 'center', width: '100%' }}>
                {line.split(' ').map((word, wordIndex) => (
                    <span key={wordIndex} className="word" style={{ display: 'inline-block', marginLeft: wordIndex > 0 ? '5px' : '0' }}>
                        {word.split('').map((char, charIndex) => (
                            <span key={charIndex} className="char" style={{ display: 'inline-block' }}>
                                {char}
                            </span>
                        ))}
                    </span>
                ))}
            </div>
        ));
    };

    const splitText = (text) => {
        if (!text) return null;

        // Split the text into words (space-separated)
        const words = text.split(' ');

        return words.map((word, wordIndex) => (
            <div key={wordIndex} className="word" style={{ display: 'inline-block', marginLeft: wordIndex > 0 ? '5px' : '0' }}>
                {word.split('').map((char, charIndex) => (
                    <div key={charIndex} className="char" style={{ display: 'inline-block' }}>
                        {char}
                    </div>
                ))}
            </div>
        ));
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchCustomApiData();
                const aboutData = result.find(item => item.name === "About Us Section");
                if (aboutData) {
                    setAbout(aboutData); // Set the found object into the 'about' state variable
                }
                const processData = result.find(item => item.name === "Work Process Section");
                if (processData) {
                    setprocess(processData); // Set the found object into the 'process' state variable
                }
                const companyData = result.find(item => item.name === "About Company Section");
                if (companyData) {
                    setCompany(companyData); // Set the found object into the 'process' state variable
                }
                const memberData = result.find(item => item.name === "Team Members");
                if (memberData) {
                    setMember(memberData); // Set the found object into the 'process' state variable
                }
                const testimonialData = result.find(item => item.name === "Testimonials Section");
                if (testimonialData) {
                    setTestimonial(testimonialData); // Set the found object into the 'process' state variable
                }
            } catch (err) {
                // setError('Failed to load data');
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchContactData();
                setsettingData(result); // Set the fetched data       
            } catch (err) {
                // setError('Failed to load data');
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://dfw.local/wp-json/custom/v1/custom_processes');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                console.log('result', result)
                setpro(result);
            } catch (error) {
                // setError(error);
            }
        };

        const fetchTeamData = async () => {
            try {
                const response = await fetch('http://dfw.local/wp-json/custom/v1/team-member-api');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                console.log('result', result)
                setTeam(result);
            } catch (error) {
                // setError(error);
            }
        };

        const fetchTestiData = async () => {
            try {
                const response = await fetch('http://dfw.local/wp-json/custom/v1/testimonial-api');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                console.log('result', result)
                setTestiData(result);
            } catch (error) {
                // setError(error);
            }
        };
        const fetchInfoData = async () => {
            try {
                const response = await fetch('http://dfw.local/wp-json/dynamic-api/v1/info');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setCompanyInfo({
                    mission: result[0] || {},
                    vision: result[1] || {},
                    goal: result[2] || {},
                });
            } catch (error) {
                // setError(error);
            }
        };

        fetchData(); fetchTeamData(); fetchTestiData(); fetchInfoData();
    }, []);

    return (
        <div className="body">
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
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <section className="page-header" data-background="assets/img/bg-img/page-header-bg.jpg">
                        <div className="overlay"></div>
                        <div className="shapes">
                            <div className="shape shape-1">
                                <img src="assets/img/shapes/page-header-shape-1.png" alt="shape" />
                            </div>
                            <div className="shape shape-2">
                                <img src="assets/img/shapes/page-header-shape-2.png" alt="shape" />
                            </div>
                            <div className="shape shape-3">
                                <img src="assets/img/shapes/page-header-shape-3.png" alt="shape" />
                            </div>
                        </div>
                        <div className="container">
                            <div className="page-header-content text-center">
                                <h1 className="title">About Our Company</h1>
                                <h4 className="sub-title"><Link className="home" href="/">Home </Link><span></span><Link className="inner-page" href="/about"> About Us</Link></h4>
                            </div>
                        </div>
                    </section>
                    <section className="about-section-2 pt-130 pb-130">
                        <div className="container">
                            <div className="row about-wrap-2 gy-lg-0 gy-4 align-items-center">
                                <div className="col-lg-5 col-md-12">
                                    <div className="about-img-box">
                                        <div className="shapes">
                                            <img className="shape shape-1 " src="assets/img/shapes/about-shape-1.png" alt="about" />
                                            <img className="shape shape-2" src="assets/img/shapes/about-shape-2.png" alt="about" />
                                        </div>
                                        <div className="img-1 reveal ">
                                            <img src={about && about.image} alt="about" />
                                        </div>
                                        <div className="img-2 reveal">
                                            <img src="assets/img/images/about-img-3.jpg" alt="about" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7 col-md-12">
                                    <div className="about-content-2">
                                        <div className="section-heading">
                                            <h4 className="sub-heading after-none " data-text-animation="fade-in" data-duration="1.5">
                                                {about && about.title}
                                            </h4>
                                            <h2
                                                className="section-title overflow-hidden active"
                                                data-text-animation=""
                                                data-split="word"
                                                data-duration="1"
                                                style={{ opacity: 1 }}
                                            >
                                                <div className="line" style={{ display: 'block', textAlign: 'start', width: '100%' }}>
                                                    {splitText(about && about.subtitle)} {/* Dynamically render subtitle here */}
                                                </div>
                                            </h2>
                                            <p> {about && about.description}</p>
                                        </div>
                                        <div className="about-items">
                                            <div className="about-item">
                                                <div className="icon">
                                                    <img src="assets/img/icon/about-1.png" alt="icon" />
                                                </div>
                                                <div className="content">
                                                    <h4 className="title custom-heading">Professional Creative <br />Team Members</h4>
                                                </div>
                                            </div>
                                            <div className="about-item">
                                                <div className="icon">
                                                    <img src="assets/img/icon/about-2.png" alt="icon" />
                                                </div>
                                                <div className="content">
                                                    <h4 className="title custom-heading">Provide Market Standard <br />Service to Client’s</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <a href="#" className="rr-primary-btn">
                                            Get Started Now <i className="fa-sharp fa-regular fa-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="process-section-2 fade-wrapper">
                        <div className="container">
                            <div className="section-heading text-center">
                                <span className="bg-text">Studio</span>
                                <h4 className="sub-heading" data-text-animation="fade-in" data-duration="1.5">
                                    {process && process.title}
                                </h4>
                                <h2
                                    className="section-title overflow-hidden active"
                                    data-text-animation=""
                                    data-split="word"
                                    data-duration="1"
                                    style={{ opacity: 1 }}
                                >
                                    <div className="line" style={{ display: 'block', textAlign: 'center', width: '100%' }}>
                                        {process && process.subtitle ? splitTextMulti(process.subtitle) : null} {/* Dynamically render subtitle here */}
                                    </div>
                                </h2>
                                {/* <h2
                                    className="section-title active"
                                    data-text-animation=""
                                    data-split="word"
                                    data-duration="1"
                                    style={{ opacity: 1 }}
                                >
                                    <div
                                        className="line"
                                        style={{ display: 'block', textAlign: 'center', width: '100%' }}
                                    >
                                        <div className="word" style={{ display: 'inline-block', transform: 'translate(0px, 0px)', opacity: 1, marginLeft: '6px' }}>
                                            <span className="char" style={{ display: 'inline-block' }}>Q</span>
                                            <span className="char" style={{ display: 'inline-block' }}>u</span>
                                            <span className="char" style={{ display: 'inline-block' }}>a</span>
                                            <span className="char" style={{ display: 'inline-block' }}>l</span>
                                            <span className="char" style={{ display: 'inline-block' }}>i</span>
                                            <span className="char" style={{ display: 'inline-block' }}>t</span>
                                            <span className="char" style={{ display: 'inline-block' }}>y</span>
                                        </div>
                                        <div className="word" style={{ display: 'inline-block', transform: 'translate(0px, 0px)', opacity: 1, marginLeft: '6px' }}>
                                            <span className="char" style={{ display: 'inline-block' }}>S</span>
                                            <span className="char" style={{ display: 'inline-block' }}>e</span>
                                            <span className="char" style={{ display: 'inline-block' }}>r</span>
                                            <span className="char" style={{ display: 'inline-block' }}>v</span>
                                            <span className="char" style={{ display: 'inline-block' }}>i</span>
                                            <span className="char" style={{ display: 'inline-block' }}>c</span>
                                            <span className="char" style={{ display: 'inline-block' }}>e</span>
                                        </div>
                                        <div className="word" style={{ display: 'inline-block', transform: 'translate(0px, 0px)', opacity: 1, marginLeft: '6px' }}>
                                            <span className="char" style={{ display: 'inline-block' }}>F</span>
                                            <span className="char" style={{ display: 'inline-block' }}>o</span>
                                            <span className="char" style={{ display: 'inline-block' }}>r</span>
                                        </div>
                                        <div className="word" style={{ display: 'inline-block', transform: 'translate(0px, 0px)', opacity: 1, marginLeft: '6px' }}>
                                            <span className="char" style={{ display: 'inline-block' }}>G</span>
                                            <span className="char" style={{ display: 'inline-block' }}>r</span>
                                            <span className="char" style={{ display: 'inline-block' }}>o</span>
                                            <span className="char" style={{ display: 'inline-block' }}>w</span>
                                            <span className="char" style={{ display: 'inline-block' }}>t</span>
                                            <span className="char" style={{ display: 'inline-block' }}>h</span>
                                        </div>
                                    </div>
                                    <div
                                        className="line"
                                        style={{ display: 'block', textAlign: 'center', width: '100%' }}
                                    >
                                        <div className="word" style={{ display: 'inline-block', transform: 'translate(0px, 0px)', opacity: 1, marginLeft: '6px' }}>
                                            <span className="char" style={{ display: 'inline-block' }}>Y</span>
                                            <span className="char" style={{ display: 'inline-block' }}>o</span>
                                            <span className="char" style={{ display: 'inline-block' }}>u</span>
                                            <span className="char" style={{ display: 'inline-block' }}>r</span>
                                        </div>
                                        <div className="word" style={{ display: 'inline-block', transform: 'translate(0px, 0px)', opacity: 1, marginLeft: '6px' }}>
                                            <span className="char" style={{ display: 'inline-block' }}>B</span>
                                            <span className="char" style={{ display: 'inline-block' }}>r</span>
                                            <span className="char" style={{ display: 'inline-block' }}>a</span>
                                            <span className="char" style={{ display: 'inline-block' }}>n</span>
                                            <span className="char" style={{ display: 'inline-block' }}>d</span>
                                            <span className="char" style={{ display: 'inline-block' }}>i</span>
                                            <span className="char" style={{ display: 'inline-block' }}>n</span>
                                            <span className="char" style={{ display: 'inline-block' }}>g</span>
                                        </div>
                                        <div className="word" style={{ display: 'inline-block', transform: 'translate(0px, 0px)', opacity: 1, marginLeft: '6px' }}>
                                            <span className="char" style={{ display: 'inline-block' }}>I</span>
                                            <span className="char" style={{ display: 'inline-block' }}>d</span>
                                            <span className="char" style={{ display: 'inline-block' }}>e</span>
                                            <span className="char" style={{ display: 'inline-block' }}>n</span>
                                            <span className="char" style={{ display: 'inline-block' }}>t</span>
                                            <span className="char" style={{ display: 'inline-block' }}>i</span>
                                            <span className="char" style={{ display: 'inline-block' }}>t</span>
                                            <span className="char" style={{ display: 'inline-block' }}>y</span>
                                        </div>
                                    </div>
                                </h2> */}
                            </div>
                            <div className="row gy-lg-0 gy-4">
                                {
                                    pro && pro.length > 0 ? (
                                        pro.map((item, index) => (
                                            <div key={index} className="col-lg-4 col-md-6">
                                                <div className="process-box fade-top">
                                                    <span className="number">0{index + 1}</span>
                                                    <h3 className="title">{item && item.name}</h3>
                                                    {item.description ? (
                                                        <div>{ReactHtmlParser(item.description)}</div>
                                                    ) : (
                                                        <p>   </p>
                                                    )}
                                                    <a href="about.html" className="read-more">
                                                        Read More <i className="fa-sharp fa-regular fa-chevrons-right"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        ))
                                    ) : ""
                                }
                                {/* <div className="col-lg-4 col-md-6">
                                    <div className="process-box fade-top">
                                        <span className="number">01</span>
                                        <h3 className="title">Client Consultation</h3>
                                        <p>Autem vel eum repreh enderit eui in ea velit esse quame nihil molestiae</p>
                                        <a href="about.html" className="read-more">
                                            Read More <i className="fa-sharp fa-regular fa-chevrons-right"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="process-box fade-top">
                                        <span className="number">02</span>
                                        <h3 className="title">Research and Analysis</h3>
                                        <p>Autem vel eum repreh enderit eui in ea velit esse quame nihil molestiae</p>
                                        <a href="about.html" className="read-more">
                                            Read More <i className="fa-sharp fa-regular fa-chevrons-right"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="process-box fade-top">
                                        <span className="number">03</span>
                                        <h3 className="title">Project Revisions Launch</h3>
                                        <p>Autem vel eum repreh enderit eui in ea velit esse quame nihil molestiae</p>
                                        <a href="about.html" className="read-more">
                                            Read More <i className="fa-sharp fa-regular fa-chevrons-right"></i>
                                        </a>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </section>
                    <section className="counter-section counter-2">
                        <div className="container">
                            <div className="row gy-lg-0 gy-4">
                                <div className="col-lg-3 col-md-6">
                                    <div className="counter-item">
                                        <h3 className="title">
                                            <span className="odometer" data-count="10">0</span>
                                        </h3>
                                        <p>Years of <br />Experience</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="counter-item">
                                        <h3 className="title">
                                            <span className="odometer" data-count="18">0</span>
                                        </h3>
                                        <p>Skilled <br />Performance</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="counter-item">
                                        <h3 className="title">
                                            <span className="odometer" data-count="32">0</span>
                                        </h3>
                                        <p>Visited <br />Conferences</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="counter-item">
                                        <h3 className="title">
                                            <span className="odometer" data-count="1">0</span>k
                                        </h3>
                                        <p>Years of <br />Experience</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="running-text running-3">
                        <div className="bg-img" style={{ backgroundImage: `url('assets/img/bg-img/running-bg.jpg')` }}></div>
                        <div className="carouselTicker carouselTicker-nav" data-speed="fast">
                            <ul className="text-anim carouselTicker__list scroller__inner inner-3">
                                <li>Latest Projects</li>
                                <li className="stroke-text">Web Development</li>
                                <li>Latest Projects</li>
                                <li className="stroke-text">Web Development</li>
                                <li>Latest Projects</li>
                                <li className="stroke-text">Web Development</li>
                                <li>Latest Projects</li>
                                <li className="stroke-text">Web Development</li>
                            </ul>
                        </div>
                    </div>
                    <section className="about-section-5 pt-130 pb-130">
                        <div className="container">
                            <div className="row gy-lg-0 gy-4">
                                <div className="col-lg-6">
                                    <div className="about-content-5">
                                        <div className="section-heading">
                                            <h4
                                                className="sub-heading after-none"
                                                data-text-animation="fade-in"
                                                data-duration="1.5"
                                            >
                                                {company && company.title}
                                            </h4>
                                            <h2
                                                className="section-title overflow-hidden active"
                                                data-text-animation=""
                                                data-split="word"
                                                data-duration="1"
                                                style={{ opacity: 1 }}
                                            >
                                                <div className="line" style={{ display: 'block', textAlign: 'start', width: '100%' }}>
                                                    {company && company.subtitle ? splitText(company.subtitle) : null} {/* Dynamically render subtitle here */}
                                                </div>
                                            </h2>

                                        </div>
                                        <div className="about-tab">
                                            <nav>
                                                <div
                                                    className="nav nav-tabs"
                                                    id="nav-tab"
                                                    role="tablist"
                                                >
                                                    <button
                                                        className="nav-link active"
                                                        id="nav-home-tab"
                                                        data-bs-toggle="tab"
                                                        data-bs-target="#nav-home"
                                                        type="button"
                                                        role="tab"
                                                        aria-controls="nav-home"
                                                        aria-selected="true"
                                                    >
                                                        {companyInfo.mission.title || 'Our Mission'}
                                                    </button>
                                                    <button
                                                        className="nav-link"
                                                        id="nav-profile-tab"
                                                        data-bs-toggle="tab"
                                                        data-bs-target="#nav-profile"
                                                        type="button"
                                                        role="tab"
                                                        aria-controls="nav-profile"
                                                        aria-selected="false"
                                                    >
                                                        {companyInfo.vision.title || 'Our Vision'}
                                                    </button>
                                                    <button
                                                        className="nav-link"
                                                        id="nav-contact-tab"
                                                        data-bs-toggle="tab"
                                                        data-bs-target="#nav-contact"
                                                        type="button"
                                                        role="tab"
                                                        aria-controls="nav-contact"
                                                        aria-selected="false"
                                                    >
                                                        {companyInfo.goal.title || 'Our Goal'}
                                                    </button>
                                                </div>
                                            </nav>
                                            <div className="tab-content" id="nav-tabContent">
                                                <div
                                                    className="tab-pane fade show active"
                                                    id="nav-home"
                                                    role="tabpanel"
                                                    aria-labelledby="nav-home-tab"
                                                >
                                                    <h3 className="title custom-heading"> {companyInfo.mission.subtitle || 'Digital Web Design Agency'}</h3>
                                                    <p className="mb-20">
                                                        {companyInfo.mission.description}
                                                    </p>
                                                    {/* <p className="mb-0">
                                                        At the core of a web design agency is essence lies the artistry of visual storytelling and user experience creation.
                                                    </p> */}
                                                </div>
                                                <div
                                                    className="tab-pane fade"
                                                    id="nav-profile"
                                                    role="tabpanel"
                                                    aria-labelledby="nav-profile-tab"
                                                >
                                                    <h3 className="title custom-heading">  {companyInfo.vision.subtitle || 'Digital Web Design Agency'}</h3>
                                                    <p className="mb-20">
                                                        {companyInfo.vision.description}
                                                    </p>
                                                </div>
                                                <div
                                                    className="tab-pane fade"
                                                    id="nav-contact"
                                                    role="tabpanel"
                                                    aria-labelledby="nav-contact-tab"
                                                >
                                                    <h3 className="title custom-heading">  {companyInfo.goal.subtitle || 'Digital Web Design Agency'}</h3>
                                                    <p className="mb-20">
                                                        {companyInfo.goal.description ||
                                                            'A web design agency is a multifaceted entity that plays a pivotal role in shaping the digital presence of businesses and individuals alike.'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="about-img-wrap-5">
                                        <div className="shapes">
                                            <div className="shape shape-1">
                                                <img src="assets/img/shapes/about-shape-4.png" alt="shape" />
                                            </div>
                                            <div className="shape shape-2">
                                                <img src="assets/img/shapes/about-shape-5.png" alt="shape" />
                                            </div>
                                        </div>
                                        <div className="about-img reveal">
                                            <img className="img-1" src={company && company.image} alt="img" />
                                        </div>
                                        <div className="about-img-2 reveal">
                                            <img className="img-2" src="assets/img/images/about-img-9.png" alt="img" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="team-section fade-wrapper">
                        <div className="container">
                            <div className="section-heading text-center">
                                <h4
                                    className="sub-heading"
                                    data-text-animation="fade-in"
                                    data-duration="1.5"
                                >
                                    {member && member.title}
                                </h4>
                                <h2
                                    className="section-title overflow-hidden active"
                                    data-text-animation=""
                                    data-split="word"
                                    data-duration="1"
                                    style={{ opacity: 1 }}
                                >
                                    <div className="line" style={{ display: 'block', textAlign: 'center', width: '100%' }}>
                                        {member && member.subtitle ? splitText(member.subtitle) : null} {/* Dynamically render subtitle here */}
                                    </div>
                                </h2>

                            </div>
                            <div className="row gy-lg-0 gy-5">
                                {
                                    team && team.length > 0 ? (
                                        team.map((item, index) => <div className="col-lg-3 col-md-6">
                                            <div key={index} className="team-item fade-top">
                                                <div className="team-thumb">
                                                    <div className="gradient-color"></div>
                                                    <img src={item && item.image} alt="team" />
                                                    <ul className="team-social-2">
                                                        <li className="facebook">
                                                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                                                        </li>
                                                        <li className="pinterest">
                                                            <a href="#"><i className="fab fa-pinterest"></i></a>
                                                        </li>
                                                        <li className="twitter">
                                                            <a href="#"><i className="fab fa-twitter"></i></a>
                                                        </li>
                                                        <li className="instagram">
                                                            <a href="#"><i className="fab fa-instagram"></i></a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="team-content">
                                                    <h3 className="title custom-heading"><a href="team-details.html">{item && item.name}</a></h3>
                                                    <span>{item && item.designation}</span>
                                                </div>
                                            </div>
                                        </div>)
                                    ) : ""
                                }
                            </div>
                        </div>
                    </section>
                    <section className="testimonial-section pt-130 pb-130 fade-wrapper">
                        <div className="container">
                            <div className="section-heading heading-3 text-center">
                                <h4
                                    className="sub-heading"
                                    data-text-animation="fade-in"
                                    data-duration="1.5"
                                >
                                    {testimonial && testimonial.title}
                                </h4>

                                <h2
                                    className="section-title overflow-hidden active"
                                    data-text-animation=""
                                    data-split="word"
                                    data-duration="1"
                                    style={{ opacity: 1 }}
                                >
                                    <div className="line" style={{ display: 'block', textAlign: 'center', width: '100%' }}>
                                        {testimonial && testimonial.subtitle ? splitText(testimonial.subtitle) : null} {/* Dynamically render subtitle here */}
                                    </div>
                                </h2>

                            </div>
                            <div className="row  gy-lg-0 gy-4 testi-wrap justify-content-center">
                                {testiData && testiData.length > 0 ? (
                                    testiData.map((item, index) => (
                                        <div key={index} className="col-lg-4 col-md-6 ">
                                            <div className="testi-item item-3 text-center fade-top">
                                                <div className="testi-thumb">
                                                    <img src={item.image} alt="img" />
                                                </div>
                                                <div className="testi-content">
                                                    <h3 className="author ">
                                                        {item.title} <span>Writter</span>
                                                    </h3>
                                                    {item.description ? (
                                                        <div>{ReactHtmlParser(item.description)}</div>
                                                    ) : (
                                                        <p>   </p>
                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : ""}

                            </div>
                        </div>
                    </section>
                    <Footer data={settingdata} />
                </div>
            </div>
            <div id="scroll-percentage"><span id="scroll-percentage-value"></span></div>


        </div>
    )
}

export default About