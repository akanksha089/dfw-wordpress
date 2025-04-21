import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { fetchContactData } from '../../lib/api';

// Component to display the subtitle content
const StaffAugmentationPage = ({ subtitle }) => {
    const [settingdata, setsettingData] = useState(null);
    const [activeTab, setActiveTab] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchContactData();
                setsettingData(result); // Set the fetched data       
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);
    // Step 2: Handle tab click to change active tab
    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
    };
    const router = useRouter();
    const { slug } = router.query; // Get the slug from the URL

    // If the slug is not yet available, show a loading state
    if (!slug) {
        return <div>Loading...</div>;
    }

    return (
        <div className="body">
            <Header />
            <Sidebar data={settingdata} />
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <section className="page-header" data-background="/assets/img/bg-img/page-header-bg.jpg">
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
                                <h1 className="title">{subtitle ? subtitle.title : 'Loading...'}</h1>
                                <h4 className="sub-title"><Link className="home" href="/">Home </Link><span></span><Link className="inner-page" href={`/staff-augmentation/${subtitle?.title}`}> {subtitle ? subtitle.title : 'Loading...'}</Link></h4>
                            </div>
                        </div>
                    </section>
                    <section className="business_models py-3 py-sm-4 py-lg-5 position-relative bg-light nitro-offscreen">
                        <div className="container">
                            <div className="grow-top heading-space">
                                <div className="section-heading mb-0">
                                    <h2
                                        className="section-title overflow-hidden active"
                                        data-text-animation=""
                                        data-split="word"
                                        data-duration="1"
                                        style={{ opacity: 1 }}
                                    >
                                        <div className="line" style={{ display: 'block', textAlign: 'start', width: '100%' }}>
                                            {subtitle ? subtitle.title : 'Loading...'} from India for Your Project
                                        </div>
                                    </h2>
                                    <p className='pt-3'>Hustling over finding a dedicated developer and trying to cope in the market with multi-million dollar companies. Worry no more; you are in the right place. At Digital Future Web Solutions, we are a close-knit team of dedicated developers who serve as catalysts offering a multitude of opportunities and benefits such as budget-friendly service, operational effectiveness, savings on utilities, access to the latest technologies, and market trends. We also deliver transparent, global tech exposure for your existing or new project requirements.</p>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="service-section-3 pb-130 fade-wrapper">
                        <div className="container">
                            <div className="section_heading mb-3 mb-md-4 mb-xl-5">
                                <h2 className="section-title text-center" data-text-animation data-split="word" data-duration="1">
                                    Our Dedicated Developer Diverse Hiring Models
                                </h2>
                                <p>
                                    We have multiple engagement models to suit different business needs. Hire Dedicated Developers today from DFW and make your dream idea come to reality by leveraging the benefits of these diverse models.
                                </p>
                                <div className="process-counter">
                                    <div className="container">
                                        <div className="row process-counter-wrap" id="myTab" role="tablist">
                                            <div className="col-lg-4 col-md-6" role="presentation">
                                                <button
                                                    className={activeTab === 0 ? "active" : ""}
                                                    id="tab_0"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#tab_target_0"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="tab_target_0"
                                                    aria-selected={activeTab === 0 ? "true" : "false"}
                                                    onClick={() => handleTabClick(0)}
                                                >
                                                    <div className="counter-card">
                                                        <div className="icon">
                                                            <img src="/assets/img/icon/counter-1.png" alt="counter" />
                                                        </div>
                                                        <div className="content">
                                                            <p> Hire Full-Time Developer</p>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                            <div className="col-lg-4 col-md-6" role="presentation">
                                                <button
                                                    className={activeTab === 1 ? "active" : ""}
                                                    id="tab_1"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#tab_target_1"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="tab_target_1"
                                                    aria-selected={activeTab === 1 ? "true" : "false"}
                                                    onClick={() => handleTabClick(1)}
                                                >
                                                    <div className="counter-card">
                                                        <div className="icon">
                                                            <img src="/assets/img/icon/counter-2.png" alt="counter" />
                                                        </div>
                                                        <div className="content">
                                                            <p> Hire Part-Time Developer</p>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                            <div className="col-lg-4 col-md-6" role="presentation">
                                                <button className={activeTab === 2 ? "active" : ""}
                                                    id="tab_2"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#tab_target_2"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="tab_target_2"
                                                    aria-selected={activeTab === 2 ? "true" : "false"}
                                                    onClick={() => handleTabClick(2)}
                                                >
                                                    <div className="counter-card">
                                                        <div className="icon">
                                                            <img src="/assets/img/icon/counter-3.png" alt="counter" />
                                                        </div>
                                                        <div className="content">
                                                            <p> Hourly Based Hiring</p>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-content" id="myTabContent">
                                        <div
                                            id="tab_target_0"
                                            className={`container tab-pane fade ${activeTab === 0 ? "active show" : ""}`}
                                            role="tabpanel"
                                            aria-labelledby="tab_0"
                                        >
                                            <div className="row align-items-md-center">
                                                <div className="col-md-7 order-md-2">
                                                    <article className="models_content">
                                                        <h3>Hire Full-Time Developer</h3>
                                                        <p>Select a full-time dedicated developer as per the project requirement. Here is what you will get: </p>
                                                        <ul className="check_list">
                                                            <li><b>Hours -</b> 150 hr/month</li>
                                                            <li><b>Time to Hire - </b> Within 72 hr</li>
                                                            <li><b>Hiring Period -</b> 1 month</li>
                                                            <li><b>Method -</b> Agile</li>
                                                            <li><b>Communication -</b> E-mail, Skype, Slack, Business Communication Tools</li>
                                                        </ul>
                                                        {/* <a href="/contanct" className="btn_primary">Talk to Consultant</a> */}
                                                        <Link href="/contact" className="rr-primary-btn">
                                                            Talk to Consultant
                                                            <i className="fa-regular fa-arrow-right"></i>
                                                        </Link>
                                                    </article>
                                                </div>
                                                <div className="col-md-5 order-md-1">
                                                    <figure className="business-models-img text-center">
                                                        <img
                                                            alt=""
                                                            src="/assets/img/service/service-2.jpg"
                                                            className="content_img lazyloaded h-[340px]"
                                                        />
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            id="tab_target_1"
                                            className={`container tab-pane fade ${activeTab === 1 ? "active show" : ""}`}
                                            role="tabpanel"
                                            aria-labelledby="tab_1"
                                        >
                                            <div className="row align-items-md-center">
                                                <div className="col-md-7 order-md-2">
                                                    <article className="models_content">
                                                        <h3>Hire Part-Time Developer</h3>
                                                        <p>Hire a part-time remote developer to fulfill your project needs. Things you will get: </p>
                                                        <ul className="check_list">
                                                            <li><b>Hours -</b> 80-100 hr/month</li>
                                                            <li><b>Time to Hire - </b> Within 48 hrs</li>
                                                            <li><b>Hiring Period -</b> 1 month</li>
                                                            <li><b>Method -</b> Agile</li>
                                                            <li><b>Communication -</b> E-mail, Skype, Slack, Business Communication Tools</li>
                                                        </ul>
                                                        <Link href="/contact" className="rr-primary-btn">
                                                            Talk to Consultant
                                                            <i className="fa-regular fa-arrow-right"></i>
                                                        </Link>
                                                    </article>
                                                </div>
                                                <div className="col-md-5 order-md-1">
                                                    <figure className="business-models-img text-center">
                                                        <img
                                                            alt=""
                                                            src="/assets/img/service/service-3.jpg"
                                                            className="content_img lazyloaded h-[340px]"
                                                        />
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            id="tab_target_2"
                                            className={`container tab-pane fade ${activeTab === 2 ? "active show" : ""}`}
                                            role="tabpanel"
                                            aria-labelledby="tab_2"
                                        >
                                            <div className="row align-items-md-center">
                                                <div className="col-md-7 order-md-2">
                                                    <article className="models_content">
                                                        <h3>Hourly Based Hiring</h3>
                                                        <p>Get an hourly- basis programmer for your small project requirement. You will get: </p>
                                                        <ul className="check_list">
                                                            <li><b>Hire -</b> on-demand</li>
                                                            <li><b>Time to Hire - </b> Within 24 hrs</li>
                                                            <li><b>Hiring Period -</b> 48 hrs (min)</li>
                                                            <li><b>Method -</b> Agile</li>
                                                            <li><b>Communication -</b> E-mail, Skype, Slack, Business Communication Tools</li>
                                                        </ul>
                                                        <Link href="/contact" className="rr-primary-btn">
                                                            Talk to Consultant
                                                            <i className="fa-regular fa-arrow-right"></i>
                                                        </Link>
                                                    </article>
                                                </div>
                                                <div className="col-md-5 order-md-1">
                                                    <figure className="business-models-img text-center">
                                                        <img
                                                            alt=""
                                                            src="/assets/img/service/service-4.jpg"
                                                            className="content_img lazyloaded h-[340px]"
                                                        />
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </section>

                    <section className="process-section-2 pb-130 fade-wrapper">
                        <div className="container">
                            <div className="section-heading text-center">
                                <span className="bg-text">Studio</span>
                                <h4 className="sub-heading" data-text-animation="fade-in" data-duration="1.5">
                                    Work Process
                                </h4>
                                <h2 className="section-title" data-text-animation data-split="word" data-duration="1">
                                    Quality Service For Growth <br /> Your Branding Identity
                                </h2>
                            </div>
                            <div className="row gy-lg-4 gy-4 ">
                                <div className="col-lg-4 col-md-6">
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
                                </div>
                                <div className="col-lg-4 col-md-6 ">
                                    <div className="process-box fade-top">
                                        <span className="number">04</span>
                                        <h3 className="title">Client Consultation</h3>
                                        <p>Autem vel eum repreh enderit eui in ea velit esse quame nihil molestiae</p>
                                        <a href="about.html" className="read-more">
                                            Read More <i className="fa-sharp fa-regular fa-chevrons-right"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="process-box fade-top">
                                        <span className="number">05</span>
                                        <h3 className="title">Research and Analysis</h3>
                                        <p>Autem vel eum repreh enderit eui in ea velit esse quame nihil molestiae</p>
                                        <a href="about.html" className="read-more">
                                            Read More <i className="fa-sharp fa-regular fa-chevrons-right"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="process-box fade-top">
                                        <span className="number">06</span>
                                        <h3 className="title">Project Revisions Launch</h3>
                                        <p>Autem vel eum repreh enderit eui in ea velit esse quame nihil molestiae</p>
                                        <a href="about.html" className="read-more">
                                            Read More <i className="fa-sharp fa-regular fa-chevrons-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="reward-section fade-wrapper pb-130">
                        <div className="container">
                            <div className="section-heading text-center">
                                <span className="bg-text">Awards</span>
                                <h4 className="sub-heading" data-text-animation="fade-in" data-duration="1.5">
                                    Our Rewards From Awards Shows
                                </h4>
                                <h2 className="section-title" data-text-animation data-split="word" data-duration="1">
                                    Our Most Demanding Awards <br /> that we got
                                </h2>
                            </div>
                            <div className="reward-items">
                                {[
                                    {
                                        year: "Main Developer 2020",
                                        title: "New York Design Week",
                                        number: "01",
                                    },
                                    {
                                        year: "UI/UX Designer 2021",
                                        title: "Best in Jury's Selection",
                                        number: "02",
                                    },
                                    {
                                        year: "Top 15 Website 2023",
                                        title: "Webby's, Site of the Year",
                                        number: "03",
                                    },
                                    {
                                        year: "Best Developer 2024",
                                        title: "Webby's, Site of the Year",
                                        number: "04",
                                    },
                                ].map((reward, index) => (
                                    <div className="reward-item fade-top" key={index}>
                                        <div
                                            className="bg-img"
                                            style={{ backgroundImage: "url('/assets/img/bg-img/reward-bg.png')" }}
                                        ></div>
                                        <div className="reward-left">
                                            <h4 className="date">{reward.year}</h4>
                                        </div>
                                        <div className="reward-right-wrap">
                                            <div className="reward-middle">
                                                <h2 className="title">{reward.title}</h2>
                                            </div>
                                            <div className="reward-right">
                                                <span className="number">{reward.number}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>


                    <Footer data={settingdata} />
                </div>
            </div>
        </div>
    );
};

// Fetch dynamic routes for each subtitle (the slugs)
export async function getStaticPaths() {
    // Fetch data from your API
    const res = await fetch('http://dfwebsolutions.com:8080/wp-json/cmd/v1/menu-items');
    const menuItems = await res.json();

    // Find the "Staff Augmentation" item in the menu
    const staffAugmentation = menuItems.find(item => item.title === 'Staff Augmentation');

    // Generate paths for each subtitle
    const paths = staffAugmentation.subtitles.map(sub => ({
        params: { slug: sub.replace(/\s+/g, '-').toLowerCase() }, // Convert spaces to hyphens and to lowercase for URL compatibility
    }));

    return {
        paths, // Return all generated paths
        fallback: false, // Disable fallback, so 404 will be shown for non-existent slugs
    };
}

// Fetch subtitle data for each slug at build time
export async function getStaticProps({ params }) {
    const { slug } = params;

    // Fetch data from your API
    const res = await fetch('http://dfwebsolutions.com:8080/wp-json/cmd/v1/menu-items');
    const menuItems = await res.json();

    // Find the "Staff Augmentation" item
    const staffAugmentation = menuItems.find(item => item.title === 'Staff Augmentation');

    // Find the specific subtitle based on the slug
    const subtitle = staffAugmentation.subtitles.find(sub => sub.replace(/\s+/g, '-').toLowerCase() === slug);

    // If subtitle is not found, return a 404 page
    if (!subtitle) {
        return {
            notFound: true, // This will return a 404 page
        };
    }

    return {
        props: { subtitle: { title: subtitle } }, // Pass subtitle title as a prop
    };
}

export default StaffAugmentationPage;
