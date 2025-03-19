import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { fetchContactData } from '../lib/api';
// import './custom.css';
// const Preloader = () => (
//     <div id="preloader">
//       <div className="loading" data-loading-text="Digital"></div>
//     </div>
//   );
function Contact() {
    const [data, setData] = useState(null);
    // const [error, setError] = useState(0);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        querytopic: '',
        message: ''
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchContactData();
                setData(result); // Set the fetched data       
            } catch (err) {
                // setError('Failed to load data');
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form submission

        try {
            // Send the form data to the WordPress API
            const response = await fetch('https://dfweb-v2.onrender.com/api/v1/submit/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Form submitted successfully');
console.log('data', data)
                // Optionally reset the form data
                setFormData({
                    firstname: '',
                    lastname: '',
                    phone: '',
                    email: '',
                    querytopic: '',
                    message: '',
                });
            } else {
                const errorData = await response.json();
                alert(`Failed to submit form: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form. Please try again later.');
        }
    };


    return (
        <div className="body">
            <Header />
            <div id="popup-search-box">
                <div className="box-inner-wrap d-flex align-items-center">
                    <form id="form" action="#" method="get" role="search">
                        <input
                            id="popup-search"
                            type="text"
                            name="s"
                            placeholder="Type keywords here..."
                        />
                    </form>
                    <div className="search-close">
                        <i className="fa-sharp fa-regular fa-xmark"></i>
                    </div>
                </div>
            </div>
            <Sidebar data={data} />
            {/* {preloaderVisible && <Preloader />} */}

            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <section
                        className="page-header"
                        data-background="assets/img/bg-img/page-header-bg.jpg"
                    >
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
                                <h1 className="title">Contact Us</h1>
                                <h4 className="sub-title">
                                    <Link className="home" href="/">Home </Link>
                                    <span></span>
                                    <Link className="inner-page" href="/contact"> Contact Us</Link>
                                </h4>
                            </div>
                        </div>
                    </section>
                    <section className="contact-section pt-130 pb-130">
                        <div className="container">
                            <div className="row gy-lg-0 gy-5">
                                <div className="col-lg-5 col-md-12">
                                    <div className="contact-content">
                                        <div className="section-heading">
                                            <h4
                                                className="sub-heading after-none"
                                                data-text-animation="fade-in"
                                                data-duration="1.5"
                                            >
                                                Contact Us
                                            </h4>
                                            <h2
                                                className="section-title active"
                                                data-text-animation=""
                                                data-split="word"
                                                data-duration="1"
                                                style={{ opacity: 1 }}
                                            >
                                                <div className="line" style={{ display: 'block', textAlign: 'start', width: '100%' }}>
                                                    <div className="word" style={{ display: 'inline-block', translate: 'none', rotate: 'none', scale: 'none', opacity: 1, transform: 'translate(0px, 0px)', marginLeft: '6px' }}>
                                                        <div className="char" style={{ display: 'inline-block' }}>L</div>
                                                        <div className="char" style={{ display: 'inline-block' }}>e</div>
                                                        <div className="char" style={{ display: 'inline-block' }}>t</div>
                                                        <div className="char" style={{ display: 'inline-block' }}>’</div>
                                                        <div className="char" style={{ display: 'inline-block' }}>s</div>
                                                    </div>
                                                    <div className="word" style={{ display: 'inline-block', translate: 'none', rotate: 'none', scale: 'none', opacity: 1, transform: 'translate(0px, 0px)', marginLeft: '6px' }}>
                                                        <div className="char" style={{ display: 'inline-block' }}>w</div>
                                                        <div className="char" style={{ display: 'inline-block' }}>o</div>
                                                        <div className="char" style={{ display: 'inline-block' }}>r</div>
                                                        <div className="char" style={{ display: 'inline-block' }}>k</div>
                                                        <div className="char" style={{ display: 'inline-block' }}>i</div>
                                                        <div className="char" style={{ display: 'inline-block' }}>n</div>
                                                        <div className="char" style={{ display: 'inline-block' }}>g</div>
                                                    </div>
                                                    <div className="word" style={{ display: 'inline-block', translate: 'none', rotate: 'none', scale: 'none', opacity: 1, transform: 'translate(0px, 0px)', marginLeft: '6px' }}>
                                                        <div className="char" style={{ display: 'inline-block' }}>t</div>
                                                        <div className="char" style={{ display: 'inline-block' }}>o</div>
                                                        <div className="char" style={{ display: 'inline-block' }}>g</div>
                                                        <div className="char" style={{ display: 'inline-block' }}>e</div>
                                                        <div className="char" style={{ display: 'inline-block' }}>t</div>
                                                        <div className="char" style={{ display: 'inline-block' }}>h</div>
                                                        <div className="char" style={{ display: 'inline-block' }}>e</div>
                                                        <div className="char" style={{ display: 'inline-block' }}>r</div>
                                                    </div>
                                                </div>
                                            </h2>

                                            <p>
                                                Thank you for your interest in Attach Web Agency. We
                                                excited to hear from you and discuss...
                                            </p>
                                        </div>
                                        <div className="contact-list">
                                            <div className="list-item">
                                                <div className="icon">
                                                    <i className="fa-light fa-location-dot"></i>
                                                </div>
                                                <div className="content">
                                                    <h4 className="title custom-heading">Our Address</h4>
                                                    <p>
                                                        {data && data.address}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="list-item">
                                                <div className="icon">
                                                    <i className="fa-light fa-phone"></i>
                                                </div>
                                                <div className="content">
                                                    <h4 className="title custom-heading">Phone Number</h4>
                                                    <span>
                                                        <a href="tel:+65485965789">(+91)   {data && data.phone}</a>
                                                    </span>
                                                    <span>
                                                        <a href={data && data.email}>{data && data.email}</a>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="list-item">
                                                <div className="icon">
                                                    <i className="fa-light fa-clock"></i>
                                                </div>
                                                <div className="content">
                                                    <h4 className="title custom-heading">Hours of Operation</h4>
                                                    <p>
                                                        <span>Monday - Friday: 09:00 - 20:00</span>
                                                        <span>Sunday & Saturday: 10:30 - 22:00</span>
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <div className="blog-contact-form form-2">
                                        <div className="request-form">
                                            <form onSubmit={handleSubmit} action="mail.php" method="post" id="ajax_contact" className="form-horizontal">
                                                <div className="form-group row">
                                                    <div className="col-md-6">
                                                        <div className="form-item">
                                                            <input
                                                                type="text"
                                                                name="firstname"  
                                                                className="form-control"
                                                                placeholder="First Name"
                                                                value={formData.firstname}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-item">
                                                        <input
                                                                type="text"
                                                                name="lastname"  
                                                                className="form-control"
                                                                placeholder="Last Name"
                                                                value={formData.lastname}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-md-6">
                                                        <div className="form-item">
                                                            <input
                                                                type="email"
                                                                name="email"  
                                                                className="form-control"
                                                                placeholder="Email address*"
                                                                value={formData.email}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-item">
                                                            <input
                                                                type="tel"
                                                                name="phone"  
                                                                className="form-control"
                                                                placeholder="Phone number*"
                                                                value={formData.phone}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-md-12">
                                                        <div className="form-item">
                                                            <input
                                                                type="text"
                                                                name="querytopic"  
                                                                className="form-control"
                                                                placeholder="Query Topic"
                                                                value={formData.querytopic}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-md-12">
                                                        <div className="form-item message-item">
                                                            <textarea
                                                                name="message"  
                                                                placeholder="Message"
                                                                value={formData.message}
                                                                onChange={handleChange}
                                                                cols="30"
                                                                rows="5"
                                                                className="form-control address"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="submit-btn">
                                                    <button id="submit" className="rr-primary-btn" type="submit">
                                                        Submit Message
                                                    </button>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="map-wrapper pb-130">
                        <div className="container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8826.923787362664!2d-118.27754354757262!3d34.03471770929568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20California%2C%20Hoa%20K%E1%BB%B3!5e0!3m2!1svi!2s!4v1566525118697!5m2!1svi!2s"
                                width="100%"
                                height="600"
                                frameBorder="0"
                                style={{ border: '0' }}
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                    <Footer data={data} />
                </div>
            </div>
            <div id="scroll-percentage"><span id="scroll-percentage-value"></span></div>



        </div>
    )
}

export default Contact