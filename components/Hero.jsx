import React, { useEffect, useRef } from 'react';
// import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap'; // Import GSAP

const Hero = () => {
  const titleRef = useRef(null);
  const subTitleRef = useRef(null);
  const bottomTitleRef = useRef(null);

  useEffect(() => {
    // GSAP animations after component mounts
    const timeline = gsap.timeline();

    // Animate all headings together
    timeline
      .fromTo(
        subTitleRef.current.querySelectorAll('.char'),
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.03 }
      )
      .fromTo(
        titleRef.current.querySelectorAll('.char'),
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.03 },
        '-=0.5' // Overlap the animation by 0.5 seconds
      )
      .fromTo(
        bottomTitleRef.current.querySelectorAll('.char'),
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.03 },
        '-=0.5' // Overlap the animation by 0.5 seconds
      );
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-bg-shape">
        <img
          src="/assets/img/bg-img/hero-bg-shape.png"
          alt="shape"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="hero-shape">
        <img
          src="/assets/img/shapes/hero-shape-1.png"
          alt="shape"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="hero-images">
        <img
          src="/assets/img/images/hero-img-1.png"
          alt="hero"
          style={{ objectFit: 'cover' }}
        />
        <img
          src="/assets/img/images/hero-img-2.png"
          alt="hero"
          style={{ objectFit: 'cover' }}
        />
        <img
          src="/assets/img/images/hero-img-3.png"
          alt="hero"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="hero-img">
        <img
          src="/assets/img/images/hero-img.png"
          alt="hero"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="container">
        <div className="hero-content">
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

          <Link href="/about" className="hero-btn">
            <i className="fa-thin fa-arrow-right"></i>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default Hero;
