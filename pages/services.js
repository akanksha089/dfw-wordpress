import  { useEffect, useState } from 'react';
 import Head from 'next/head';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { fetchContactData } from '../lib/api';

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/wp/v2/pages?slug=service`);
  const data = await res.json();

  if (!data || data.length === 0) {
    return { notFound: true };
  }

  const page = data[0];
  const { meta_title, meta_description } = page.acf || {};
  return {
    props: {
      title: meta_title || page.title.rendered,
      description: meta_description || '',
    },
    revalidate: 60, // Regenerate every 60 seconds (ISR)
  };
}
function Service({ title, description }) {
    const [data, setData] = useState(null);
    const [serviceData, setServiceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


    console.log('loadingerror', loading, error)
    console.log('serviceDataserviceDataserviceData', serviceData)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchContactData();
                setData(result); // Set the fetched data       
            } catch (err) {
                setError('Failed to load data');
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        const serviceFetchData = async () => {
            try {
                // const response = await fetch( `http://dfw.local/wp-json/custom/v1/services/`);
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
        serviceFetchData();
    }, []);




    return (
        <div className="body ">

            <Head>
                <title>{title}</title>
                <meta name="title" content={title} />
                <meta name="description" content={description} />
            </Head>
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
                        style={{ backgroundImage: 'url(/assets/img/bg-img/page-header-bg.jpg)' }}
                    >
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
                                <h1 className="title customHeading">Our Services</h1>
                                <h4 className="sub-title">
                                    <Link href="/">
                                        <span className="home custom-heading">Home</span>
                                    </Link>
                                    <span></span>
                                    <Link href="/services">
                                        <span className="inner-page custom-heading">Our Services</span>
                                    </Link>
                                </h4>
                            </div>
                        </div>
                    </section>
                    <section className="service-section pt-130 pb-130">
                        <div className="container">

                            <div className="row gy-5">
                                {serviceData && serviceData.length > 0 ? (
                                    serviceData.map((item, index) => (
                                        <div key={index} className="col-lg-3 col-md-6">
                                            <div className="service-item md-pb-30">
                                                <h4 className="service-text service-custom-text"><Link href={`/${item.slug}`}>{item.title}</Link></h4>
                                                <div className="service-thumb">
                                                    <div className="overlay-color"></div>
                                                    <div className="transparent-shape"><img src={item.acf_image} alt="shape" /></div>
                                                    <img src={item.acf_image} alt="service" />
                                                    <div className="service-icon">
                                                        <svg width="50" height="50" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M50.3639 36.3801L45.2404 33.8184L41.9797 25.3365C41.9413 25.2363 41.8826 25.145 41.8074 25.0684C41.7321 24.9918 41.6419 24.9315 41.5423 24.8914L21.3101 16.8039C21.1686 16.7476 21.0138 16.7339 20.8646 16.7644C20.7155 16.7949 20.5785 16.8684 20.4705 16.9758L17.7721 19.6742C17.6661 19.7822 17.5939 19.9187 17.5641 20.0671C17.5343 20.2155 17.5482 20.3693 17.6042 20.5099L25.6916 40.7421C25.7317 40.8417 25.792 40.9319 25.8686 41.0072C25.9452 41.0824 26.0365 41.1411 26.1368 41.1794L34.6186 44.4402L37.1803 49.5636C37.2343 49.6766 37.3146 49.775 37.4145 49.8504C37.5144 49.9258 37.6309 49.9761 37.7544 49.9971C37.7959 50.001 37.8378 50.001 37.8793 49.9971C38.0861 49.9962 38.2841 49.9134 38.4299 49.7667L50.5669 37.6297C50.6563 37.5435 50.7237 37.4373 50.7638 37.3198C50.8039 37.2023 50.8154 37.077 50.7973 36.9541C50.7764 36.8307 50.726 36.7142 50.6506 36.6143C50.5752 36.5144 50.4768 36.434 50.3639 36.3801ZM19.2404 20.4083L19.6739 19.9788L29.745 30.05C29.0813 30.9905 28.7947 32.1458 28.9418 33.2875C29.0889 34.4292 29.659 35.4741 30.5394 36.2156C31.4199 36.9572 32.5465 37.3414 33.6966 37.2922C34.8467 37.2431 35.9365 36.7642 36.7504 35.9502C37.5644 35.1362 38.0433 34.0465 38.0924 32.8964C38.1416 31.7463 37.7574 30.6197 37.0159 29.7392C36.2743 28.8588 35.2294 28.2886 34.0877 28.1415C32.946 27.9945 31.7907 28.2811 30.8502 28.9448L20.779 18.8736L21.2086 18.4402L40.6441 26.2152L43.7096 34.1894L34.9896 42.9094L27.0154 39.8439L19.2404 20.4083ZM33.4978 29.6634C34.1998 29.6644 34.8796 29.9088 35.4216 30.3549C35.9635 30.8009 36.3341 31.4211 36.4701 32.1098C36.6061 32.7984 36.4991 33.5129 36.1674 34.1315C35.8357 34.7501 35.2998 35.2346 34.6509 35.5024C34.0021 35.7702 33.2805 35.8047 32.609 35.6001C31.9375 35.3956 31.3578 34.9645 30.9685 34.3804C30.5792 33.7963 30.4044 33.0953 30.474 32.3969C30.5436 31.6984 30.8532 31.0456 31.35 30.5498C31.9202 29.9814 32.6927 29.6626 33.4978 29.6634ZM38.0941 47.8962L36.1416 43.9911L44.7835 35.3492L48.6886 37.3017L38.0941 47.8962Z" fill="currentColor" />
                                                            <path d="M15.7493 41.7964C15.5999 41.6553 15.4022 41.5766 15.1967 41.5766C14.9912 41.5766 14.7935 41.6553 14.6441 41.7964L13.6522 42.7883C11.0053 39.1959 9.54506 34.8671 9.47506 30.4053C9.40506 25.9436 10.7288 21.5711 13.2617 17.8974C14.0206 18.3149 14.8944 18.4753 15.7521 18.3545C16.6098 18.2337 17.4052 17.8382 18.0192 17.2273C18.6332 16.6164 19.0327 15.8229 19.1579 14.9658C19.283 14.1087 19.127 13.2342 18.7132 12.4732C22.387 9.94028 26.7594 8.61656 31.2212 8.68656C35.6829 8.75656 40.0117 10.2168 43.6042 12.8637L42.5967 13.8439C42.4514 13.9903 42.37 14.1883 42.3702 14.3945C42.3696 14.4973 42.3893 14.5992 42.4281 14.6944C42.467 14.7895 42.5243 14.8761 42.5967 14.949L46.0409 18.366C46.1873 18.5114 46.3852 18.5931 46.5916 18.5931C46.7979 18.5931 46.9958 18.5114 47.1422 18.366L50.5669 14.9412C50.6395 14.8687 50.6971 14.7826 50.7364 14.6877C50.7757 14.5929 50.796 14.4913 50.796 14.3887C50.796 14.286 50.7757 14.1844 50.7364 14.0896C50.6971 13.9948 50.6395 13.9086 50.5669 13.8361L47.1422 10.4113C46.9958 10.2659 46.7979 10.1842 46.5916 10.1842C46.3852 10.1842 46.1873 10.2659 46.0409 10.4113L44.7171 11.7274C41.4544 9.27221 37.5971 7.72971 33.5412 7.25823C29.4853 6.78676 25.377 7.40331 21.6381 9.04456L26.1407 4.55372C26.6512 4.79766 27.2316 4.85288 27.779 4.70958C28.3264 4.56628 28.8053 4.23372 29.1308 3.77091C29.4563 3.3081 29.6073 2.74495 29.5571 2.18137C29.5069 1.61778 29.2586 1.09021 28.8564 0.692234C28.4543 0.294258 27.9241 0.051612 27.36 0.00734173C26.7959 -0.0369285 26.2344 0.120039 25.7751 0.450398C25.3157 0.780757 24.9882 1.26315 24.8507 1.812C24.7132 2.36084 24.7745 2.94066 25.0238 3.44859L17.4245 11.0596C16.653 10.542 15.7256 10.3084 14.8009 10.3986C13.8762 10.4888 13.0115 10.8973 12.3545 11.5543C11.6976 12.2113 11.2891 13.076 11.1988 14.0007C11.1086 14.9254 11.3422 15.8527 11.8598 16.6243L4.2488 24.2236C3.73889 23.9751 3.1574 23.9155 2.60766 24.0553C2.05792 24.195 1.57554 24.5252 1.24623 24.987C0.91692 25.4489 0.762015 26.0125 0.809038 26.5778C0.856061 27.1431 1.10197 27.6734 1.50306 28.0745C1.90415 28.4756 2.43445 28.7215 2.99973 28.7685C3.56501 28.8155 4.12865 28.6606 4.59051 28.3313C5.05236 28.002 5.3825 27.5196 5.52228 26.9699C5.66206 26.4201 5.60241 25.8386 5.35394 25.3287L9.85649 20.8379C8.2136 24.5757 7.59511 28.6835 8.06452 32.7394C8.53393 36.7952 10.0743 40.6531 12.5276 43.9169L11.2077 45.2407C11.0622 45.3871 10.9805 45.585 10.9805 45.7913C10.9805 45.9977 11.0622 46.1956 11.2077 46.342L14.6324 49.7667C14.7782 49.9134 14.9762 49.9962 15.183 49.9971C15.2861 49.9972 15.3881 49.9769 15.4833 49.9373C15.5785 49.8978 15.6649 49.8398 15.7375 49.7667L19.1662 46.342C19.3117 46.1956 19.3933 45.9977 19.3933 45.7913C19.3933 45.585 19.3117 45.3871 19.1662 45.2407L15.7493 41.7964ZM46.5994 12.0593L48.919 14.3789L46.5994 16.6985L44.2797 14.3789L46.5994 12.0593ZM26.5858 1.82017C26.7019 1.70317 26.8501 1.62327 27.0116 1.59063C27.1732 1.55799 27.3408 1.57406 27.4931 1.63682C27.6455 1.69958 27.7758 1.80618 27.8675 1.94312C27.9592 2.08005 28.0082 2.24113 28.0082 2.40593C28.0082 2.57073 27.9592 2.73181 27.8675 2.86875C27.7758 3.00568 27.6455 3.11229 27.4931 3.17504C27.3408 3.2378 27.1732 3.25387 27.0116 3.22123C26.8501 3.18859 26.7019 3.1087 26.5858 2.99169C26.5089 2.9148 26.4478 2.82349 26.4061 2.72298C26.3644 2.62247 26.343 2.51474 26.343 2.40593C26.343 2.29713 26.3644 2.18939 26.4061 2.08888C26.4478 1.98837 26.5089 1.89706 26.5858 1.82017ZM13.4648 12.6646C13.6916 12.4367 13.9611 12.2559 14.258 12.1325C14.5549 12.0091 14.8732 11.9456 15.1947 11.9456C15.5162 11.9456 15.8346 12.0091 16.1314 12.1325C16.4283 12.2559 16.6979 12.4367 16.9247 12.6646C17.2675 13.0068 17.5011 13.4431 17.5959 13.9182C17.6907 14.3932 17.6424 14.8858 17.4572 15.3334C17.272 15.781 16.9582 16.1636 16.5554 16.4329C16.1527 16.7021 15.6792 16.8458 15.1947 16.8458C14.7103 16.8458 14.2368 16.7021 13.834 16.4329C13.4313 16.1636 13.1175 15.781 12.9323 15.3334C12.7471 14.8858 12.6988 14.3932 12.7936 13.9182C12.8884 13.4431 13.122 13.0068 13.4648 12.6646ZM3.79581 26.9572C3.63637 27.0901 3.43296 27.1587 3.22555 27.1493C3.01815 27.1399 2.82174 27.0533 2.67494 26.9065C2.52813 26.7597 2.44153 26.5633 2.43216 26.3559C2.42279 26.1485 2.49132 25.9451 2.62429 25.7856C2.78058 25.632 2.99093 25.546 3.21005 25.546C3.42918 25.546 3.63953 25.632 3.79581 25.7856C3.8728 25.8625 3.93387 25.9538 3.97554 26.0543C4.01721 26.1548 4.03866 26.2626 4.03866 26.3714C4.03866 26.4802 4.01721 26.5879 3.97554 26.6884C3.93387 26.789 3.8728 26.8803 3.79581 26.9572ZM15.1947 48.0953L12.8751 45.7757L15.1947 43.4561L17.5144 45.7757L15.1947 48.0953Z" fill="currentColor" />
                                                        </svg>
                                                    </div>
                                                    <Link href={`/${item.slug}`} className="service-btn">Read Details <i className="fa-regular fa-arrow-right"></i></Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : "data"}
                            </div>

                        </div>
                    </section>

                    <section className="service-cta">
                        <div className="bg-img" style={{ backgroundImage: 'url(assets/img/bg-img/service-cta.jpg)' }}></div>
                        <div className="overlay"></div>
                        <div className="container">
                            <div className="service-cta-wrap">
                                <div className="section-heading mb-0">
                                    <h4
                                        className="sub-heading after-none custom-heading"
                                        data-text-animation="fade-in"
                                        data-duration="1.5"
                                    >
                                        Make an Appointment
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
                                                <div className="char" style={{ display: 'inline-block' }}>H</div>
                                                <div className="char" style={{ display: 'inline-block' }}>a</div>
                                                <div className="char" style={{ display: 'inline-block' }}>v</div>
                                                <div className="char" style={{ display: 'inline-block' }}>e</div>
                                            </div>
                                            <div className="word" style={{ display: 'inline-block', translate: 'none', rotate: 'none', scale: 'none', opacity: 1, transform: 'translate(0px, 0px)', marginLeft: '6px' }}>
                                                <div className="char" style={{ display: 'inline-block' }}>A</div>
                                                <div className="char" style={{ display: 'inline-block' }}>n</div>
                                                <div className="char" style={{ display: 'inline-block' }}>y</div>
                                            </div>
                                            <div className="word" style={{ display: 'inline-block', translate: 'none', rotate: 'none', scale: 'none', opacity: 1, transform: 'translate(0px, 0px)', marginLeft: '6px' }}>
                                                <div className="char" style={{ display: 'inline-block' }}>P</div>
                                                <div className="char" style={{ display: 'inline-block' }}>r</div>
                                                <div className="char" style={{ display: 'inline-block' }}>o</div>
                                                <div className="char" style={{ display: 'inline-block' }}>j</div>
                                                <div className="char" style={{ display: 'inline-block' }}>e</div>
                                                <div className="char" style={{ display: 'inline-block' }}>c</div>
                                                <div className="char" style={{ display: 'inline-block' }}>t</div>
                                                <div className="char" style={{ display: 'inline-block' }}>s</div>
                                            </div>
                                            <div className="word" style={{ display: 'inline-block', translate: 'none', rotate: 'none', scale: 'none', opacity: 1, transform: 'translate(0px, 0px)', marginLeft: '6px' }}>
                                                <div className="char" style={{ display: 'inline-block' }}>O</div>
                                                <div className="char" style={{ display: 'inline-block' }}>n</div>
                                            </div>
                                            <div className="word" style={{ display: 'inline-block', translate: 'none', rotate: 'none', scale: 'none', opacity: 1, transform: 'translate(0px, 0px)', marginLeft: '6px' }}>
                                                <div className="char" style={{ display: 'inline-block' }}>M</div>
                                                <div className="char" style={{ display: 'inline-block' }}>i</div>
                                                <div className="char" style={{ display: 'inline-block' }}>n</div>
                                                <div className="char" style={{ display: 'inline-block' }}>d</div>
                                                <div className="char" style={{ display: 'inline-block' }}>s</div>
                                                <div className="char" style={{ display: 'inline-block' }}>!</div>
                                            </div>
                                        </div>
                                        <div className="line" style={{ display: 'block', textAlign: 'start', width: '100%' }}>
                                            <div className="word" style={{ display: 'inline-block', translate: 'none', rotate: 'none', scale: 'none', opacity: 1, transform: 'translate(0px, 0px)', marginLeft: '6px' }}>
                                                <div className="char" style={{ display: 'inline-block' }}>C</div>
                                                <div className="char" style={{ display: 'inline-block' }}>o</div>
                                                <div className="char" style={{ display: 'inline-block' }}>n</div>
                                                <div className="char" style={{ display: 'inline-block' }}>t</div>
                                                <div className="char" style={{ display: 'inline-block' }}>a</div>
                                                <div className="char" style={{ display: 'inline-block' }}>c</div>
                                                <div className="char" style={{ display: 'inline-block' }}>t</div>
                                            </div>
                                            <div className="word" style={{ display: 'inline-block', translate: 'none', rotate: 'none', scale: 'none', opacity: 1, transform: 'translate(0px, 0px)', marginLeft: '6px' }}>
                                                <div className="char" style={{ display: 'inline-block' }}>U</div>
                                                <div className="char" style={{ display: 'inline-block' }}>s</div>
                                            </div>
                                        </div>
                                    </h2>



                                </div>
                                <Link href="/contact" className="rr-primary-btn cta-btn">
                                    Make Appointment <i className="fa-regular fa-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    </section>
                    <Footer data={data} />
                </div>
            </div>
            <div id="scroll-percentage"><span id="scroll-percentage-value"></span></div>

            {/* <div id="theme-toogle" className="switcher-button">
                <div className="switcher-button-inner-left"></div>
                <div className="switcher-button-inner"></div>
            </div> */}

        </div>
    );
}

export default Service;
