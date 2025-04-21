import React from 'react';
import Image from 'next/image';

const AboutSection = ({ about }) => {
  // Check if about and subtitle are available
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
  return (
    <section className="about-section pb-130">
      <div className="round-shape">
        <img
          src="/assets/img/shapes/round-shape.png"
          alt="shape"
          layout="fill"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="about-wrap">
        <div className="shape">
          <img
            src="/assets/img/shapes/about-dot-shape.png"
            alt="shape"
            layout="fill"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="row about-wrapper align-items-center">
          <div className="col-lg-7">
            <div className="about-content fade-wrapper">
              <div className="section-heading mb-0">
                <h4
                  className="sub-heading"
                  data-text-animation="fade-in"
                  data-duration="1.5"
                >
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


                <p>
                {about && about.description}
                </p>
                <a href="/about" className="rr-primary-btn">
                  Get Started Now
                  <i className="fa-regular fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="about-img-wrap">
              <div className="img-shape"></div>
              <div className="about-img reveal">
                <img
                  className="img-1"
                  src={about && about.image}
                  alt="img"
                  layout="fill"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="about-img-2 reveal">
                <img
                  className="img-2"
                  src="/assets/img/images/about-img-1.jpg"
                  alt="img"
                  layout="fill"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="about-text">
          {/* <img
            className="dark-img"
            src="/assets/img/images/about-text.png"
            alt="about"
            layout="fill"
            objectFit="cover"
          /> */}
          <img
            className="light-img"
            src="/assets/img/images/about-text-light.png"
            alt="about"
            layout="fill"
            style={{ objectFit: 'cover' }}
            width={660}
            height={100}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

