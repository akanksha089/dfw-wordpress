import React, { useState, useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
//  import '../styles/custom.css';
import { EffectFade, Navigation } from 'swiper/modules';
import { gsap } from 'gsap'; // Import GSAP

const Hero = () => {
  const [sliders, setSliders] = useState([]);
  const [activeTab, setActiveTab] = useState(0);  // State to track active tab
  const swiperRef = useRef(null);  // Reference to the Swiper instance
  const [isMounted, setIsMounted] = useState(false); // Track if the component is mounted
  const titleRef = useRef(null);
  const subTitleRef = useRef(null);
  const bottomTitleRef = useRef(null);

  useEffect(() => {
    // Ensure the component is mounted in the browser
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return; // Wait for the component to mount

    // Check if refs are valid
    if (!subTitleRef.current || !titleRef.current || !bottomTitleRef.current) {
      console.error("Refs are not properly assigned.");
      return;
    }

    // GSAP animations
    const timeline = gsap.timeline();
    timeline
      .fromTo(
        subTitleRef.current.querySelectorAll(".char"),
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.03 }
      )
      .fromTo(
        titleRef.current.querySelectorAll(".char"),
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.03 }
      )
      .fromTo(
        bottomTitleRef.current.querySelectorAll(".char"),
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.03 }
      );
  }, [isMounted]); // Only run animations after the component is mounted


  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await fetch('http://localhost/wp-json/wp/v2/hero_slider');
        if (!response.ok) {
          throw new Error('Failed to fetch hero sliders');
        }
        const data = await response.json();
        setSliders(data);
      } catch (error) {
        console.error('Error fetching hero slider:', error);
      }
    };

    fetchSliders();
  }, []);
  // Handle tab click
  const handleTabClick = (index) => {
    setActiveTab(index);  // Set active tab
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);  // Change slide on tab click
    }
  };


  useEffect(() => {
    console.log("SubTitle:", subTitleRef.current);
    console.log("Title:", titleRef.current);
    console.log("BottomTitle:", bottomTitleRef.current);
  }, []);

  return (
    <div className="slider-section">
      <div className="runok-slider swiper-container">
        <Swiper className="swiper-wrapper"
          ref={swiperRef}
          loop={true}  // Enable looping for slides
          autoplay={{ delay: 2000, disableOnInteraction: false }}  // Auto-slide every 3 seconds
          effect={'fade'}
          onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
          grabCursor={true}
          modules={[EffectFade, Navigation]}
        >
          {/* Slide 1 */}
          {sliders.map((slider) => (
            <SwiperSlide className="swiper-slide" key={slider.id}>
              <div className="slider-item">
                <div className="overlay"></div>
                <div
                  className="shape"
                  data-animation="runok-fadeInUp"
                  data-delay="1000ms"
                  data-duration="1200ms"
                >
                  <img
                    src="assets/img/shapes/slider-shape-1.png"
                    alt="shape"
                  />
                </div>
                <div className="slide-img-wrap">
                  <img
                    decoding="async"
                    src={slider.image}
                    alt={slider.title.rendered}
                    className="slide-img kenburns kenburns-top"
                  />
                </div>
                <div className="slider-content-wrap">
                  <div className="container">
                    <div className="hero-content-wrap">
                      <div className="hero-content ">
                        <h4 className="sub-title anim-text custom-heading" ref={subTitleRef}>
                          <div className="line text-white" style={{ display: "block", textAlign: "start", width: "100%" }}>
                            {"Transforming".split("").map((char, index) => (
                              <div
                                className="char"
                                key={index}
                                style={{ display: "inline-block", transform: "translate(0px, 0%)" }}
                              >
                                {char}
                              </div>
                            ))}
                          </div>
                        </h4>
                        <h2 className="title anim-text" ref={titleRef}>
                          <div className="line text-white" style={{ display: "block", textAlign: "start", width: "100%" }}>
                            {"Visions into".split("").map((char, index) => (
                              <div
                                className="char"
                                key={index}
                                style={{ display: "inline-block", transform: "translate(0px, 0%)" }}
                              >
                                {char === " " ? "\u00A0" : char}
                              </div>
                            ))}
                          </div>
                        </h2>
                        <h3 className="bottom-title anim-text custom-heading" ref={bottomTitleRef}>
                          <div className="line text-white" style={{ display: "block", textAlign: "start", width: "100%" }}>
                            {"Digital Reality".split("").map((char, index) => (
                              <div
                                className="char"
                                key={index}
                                style={{ display: "inline-block", transform: "translate(0px, 0%)" }}
                              >
                                {char === " " ? "\u00A0" : char}
                              </div>
                            ))}
                          </div>
                        </h3>
                      </div>
                      {/* <div className="hero-content">
                        <h4 className="sub-title anim-text custom-heading" ref={subTitleRef}>
                          <div className="line" style={{ display: 'block', textAlign: 'start', width: '100%' }}>
                            {'Transforming'.split('').map((char, index) => (
                              <div className="char" key={index} style={{ display: 'inline-block', transform: 'translate(0px, 0%)' }}>{char}</div>
                            ))}
                          </div>
                        </h4>
                        <h2 className="title anim-text" ref={titleRef}>
                          <div className="line" style={{ display: 'block', textAlign: 'start', width: '100%' }}>
                            {'Visions into'.split('').map((char, index) => (
                              <div className="char" key={index} style={{ display: 'inline-block', transform: 'translate(0px, 0%)' }}>
                                {char === ' ' ? '\u00A0' : char}
                              </div>
                            ))}
                          </div>
                        </h2>
                        <h3 className="bottom-title anim-text custom-heading" ref={bottomTitleRef}>
                          <div className="line" style={{ display: 'block', textAlign: 'start', width: '100%' }}>
                            {'Digital Reality'.split('').map((char, index) => (
                              <div className="char" key={index} style={{ display: 'inline-block', transform: 'translate(0px, 0%)' }}>{char === ' ' ? '\u00A0' : char}</div>
                            ))}
                          </div>
                        </h3>
                      </div> */}
                      {/* <div
                      className="slider-btn-wrap"
                      data-animation="runok-fadeInUp"
                      data-delay="1200ms"
                      data-duration="1400ms"
                    >
                      <a href="about.html" className="slider-btn">
                        <i className="fa-thin fa-arrow-right"></i>
                      </a>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

          ))}
        </Swiper>
      </div>

      {/* Slider Tabs */}
      <div className="slider-tab-wrap">
        <div className="swiper slider-tab">
          <Swiper className="swiper-wrapper" slidesPerView={3}
            spaceBetween={30} >
            {sliders.map((slider, index) => (
              <SwiperSlide className="swiper-slide" key={slider.id}>
                <div className={`slider-tab-btn ${activeTab === index ? 'active bg-white text-[#11151C] border-2 border-blue-500' : 'text-white'}`}
                  onClick={() => handleTabClick(index)}  // Set active tab on click
                >{slider.title}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Hero;
