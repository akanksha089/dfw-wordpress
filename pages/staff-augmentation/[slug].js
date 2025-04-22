import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { fetchContactData } from '../../lib/api';
import ReactHtmlParser from 'html-react-parser';
import { parseContent } from '../../lib/parser';

const StaffAugmentationPage = ({ subtitle }) => {
    const [settingdata, setsettingData] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paragraph, setParagraph] = useState('');
    const [tabsContent, setTabsContent] = useState([]);
    const [tabTitles, setTabTitles] = useState([]);
    const [workProcess, setWorkProcess] = useState([]);
    const [awards, setAwards] = useState([]);
    const [content, setContent] = useState(null);

    const router = useRouter();
    const { slug } = router.query;
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchContactData();
                setsettingData(result);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!slug) return;

        const apiUrl = `${BASE_URL}/custom/v1/staff-detail/${slug}`;

        const fetchData = async () => {
            try {
                const res = await fetch(apiUrl);
                const json = await res.json();
                const structuredData = parseContent(json.content);
                setContent(structuredData);
                setParagraph(structuredData.introParagraph);
                setTabTitles(structuredData.tabs.map(tab => tab.title));
                setTabsContent(structuredData.tabs.map(tab => tab.content));
                setWorkProcess(structuredData.workProcess);
                setAwards(structuredData.awards);
                setData(json);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug]);

    const handleTabClick = (index) => setActiveTab(index);
console.log('loading', loading)
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
                                <h4 className="sub-title">
                                    <Link className="home" href="/">Home </Link>
                                    <span></span>
                                    <Link className="inner-page" href={`/staff-augmentation/${subtitle?.title}`}>
                                        {subtitle ? subtitle.title : 'Loading...'}
                                    </Link>
                                </h4>
                            </div>
                        </div>
                    </section>

                    {/* Section for content */}
                    <section className="business_models py-3 py-sm-4 py-lg-5 position-relative bg-light nitro-offscreen">
                        <div className="container">
                            <div className="grow-top heading-space">
                                <div className="section-heading mb-0">
                                    <h2 className="section-title overflow-hidden active">
                                        {content && (
                                            <div className="line">
                                                {content.sectionTitles[0] || subtitle.title}
                                            </div>
                                        )}
                                    </h2>
                                    <div className="pt-3">
                                        {paragraph ? ReactHtmlParser(paragraph) : <p>No content found.</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Service Section */}
                    <section className="service-section-3 pb-130 fade-wrapper">
                        <div className="container">
                            <div className="section_heading mb-3 mb-md-4 mb-xl-5">
                                <h2 className="section-title text-center">
                                    {data?.developer_section_heading || 'Our Dedicated Developer Diverse Hiring Models'}
                                </h2>
                                <p>
                                    {data?.developer_section_paragraph || 'We have multiple engagement models to suit different business needs. Hire Dedicated Developers today from DFW and make your dream idea come to reality by leveraging the benefits of these diverse models.'}
                                </p>
                                <div className="process-counter">
                                    <div className="container">
                                        <div className="row process-counter-wrap" id="myTab" role="tablist">
                                            {tabTitles.map((title, index) => (
                                                <div className="col-lg-4 col-md-6" role="presentation" key={index}>
                                                    <button
                                                        className={activeTab === index ? 'active' : ''}
                                                        id={`tab_${index}`}
                                                        data-bs-toggle="tab"
                                                        data-bs-target={`#tab_target_${index}`}
                                                        type="button"
                                                        role="tab"
                                                        aria-controls={`tab_target_${index}`}
                                                        aria-selected={activeTab === index ? 'true' : 'false'}
                                                        onClick={() => handleTabClick(index)}
                                                    >
                                                        <div className="counter-card">
                                                            <div className="icon">
                                                                <img src={`/assets/img/icon/counter-${index + 1}.png`} alt="counter" />
                                                            </div>
                                                            <div className="content">
                                                                <p>{title}</p>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tabs Content */}
                                    <div className="tab-content" id="myTabContent">
                                        {tabsContent.map((contentHtml, index) => (
                                            <div
                                                id={`tab_target_${index}`}
                                                className={`container tab-pane fade ${activeTab === index ? 'active show' : ''}`}
                                                role="tabpanel"
                                                aria-labelledby={`tab_${index}`}
                                                key={index}
                                            >
                                                <div className="row align-items-md-center">
                                                    <div className="col-md-7 order-md-2">
                                                        <article className="models_content">
                                                            <h3>{tabTitles[index]}</h3> {/* Display the title */}
                                                            <p>Select a {tabTitles[index]} as per the project requirement. Here is what you will get: </p>
                                                            <ul className="check_list">
                                                            {ReactHtmlParser(contentHtml)}
                                                            </ul>
                                                            <Link href="/contact" className="rr-primary-btn mt-3 d-inline-block">
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
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Work Process Section */}
                    <section className="process-section-2 pb-130 fade-wrapper">
                        <div className="container">
                            <div className="section-heading text-center">
                                <span className="bg-text">Studio</span>
                                {content && (
                                    <h4 className="sub-heading" data-text-animation="fade-in" data-duration="1.5">
                                        {content.sectionTitles[2] || 'Work Process'}</h4>)}
                                {content && (
                                            <h2 className="section-title" data-text-animation data-split="word" data-duration="1">{content.sectionTitles[8] || 'Quality Service For Growth Your Branding Identity'}</h2>)}
                            </div>
                            <div className="row gy-lg-4 gy-4">
                                {workProcess.map((step, i) => (
                                    <div key={i} className="col-lg-4 col-md-6">
                                        <div className="process-box fade-top">
                                            <span className="number">{step.number}</span>
                                            <h3 className="title">{step.title}</h3>
                                            <p>{step.description}</p>
                                            <Link href="/about" className="read-more">
                                                Read More <i className="fa-sharp fa-regular fa-chevrons-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Awards Section */}
                    <section className="reward-section fade-wrapper pb-130">
                        <div className="container">
                            <div className="section-heading text-center">
                                <span className="bg-text">Awards</span>
                                {content && (
                                    <h4 className="sub-heading" data-text-animation="fade-in" data-duration="1.5">{content.sectionTitles[9] || 'Awards'}</h4>
                                )}
                                {content && (
                                    <h2 className="section-title" data-text-animation data-split="word" data-duration="1">{content.sectionTitles[10] || 'Our Rewards From Awards Shows'}</h2>
                                )}
                            </div>
                            <div className="reward-items">
                                {awards.map((award, i) => (
                                    <div className="reward-item fade-top" key={i}>
                                        <div
                                            className="bg-img"
                                            style={{ backgroundImage: "url('/assets/img/bg-img/reward-bg.png')" }}
                                        ></div>
                                        <div className="reward-left">
                                            <h4 className="date">{award.year}</h4>
                                        </div>
                                        <div className="reward-right-wrap">
                                            <div className="reward-middle">
                                                <h2 className="title">{award.title}</h2>
                                            </div>
                                            <div className="reward-right">
                                                <span className="number">{award.number}</span>
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
    const res = await fetch('http://dfwebsolutions.com:8080/wp-json/cmd/v1/menu-items');
    const menuItems = await res.json();
    const staffAugmentation = menuItems.find(item => item.title === 'Staff Augmentation');

    const paths = staffAugmentation.subtitles.map(sub => ({
        params: { slug: sub.replace(/\s+/g, '-').toLowerCase() }, // Convert spaces to hyphens
    }));

    return {
        paths,
        fallback: false, // 404 page for non-existent slugs
    };
}

// Fetch subtitle data for each slug at build time
export async function getStaticProps({ params }) {
    const { slug } = params;

    const res = await fetch('http://dfwebsolutions.com:8080/wp-json/cmd/v1/menu-items');
    const menuItems = await res.json();
    const staffAugmentation = menuItems.find(item => item.title === 'Staff Augmentation');
    const subtitle = staffAugmentation.subtitles.find(sub => sub.replace(/\s+/g, '-').toLowerCase() === slug);

    if (!subtitle) {
        return { notFound: true }; // Return a 404 page if subtitle is not found
    }

    return {
        props: { subtitle: { title: subtitle } },
    };
}

export default StaffAugmentationPage;
