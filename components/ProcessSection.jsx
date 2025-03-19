import React from 'react';
import { useEffect, useState } from 'react';
import ReactHtmlParser from 'html-react-parser';
import Image from 'next/image';

const ProcessSection = ({ process }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://dfw.local/wp-json/custom/v1/process-api');
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

    fetchData();
  }, []);
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
    <section className="process-section pt-130 fade-wrapper">
      <div className="bg-shape">
        <img
          src="/assets/img/shapes/process-shape.png"
          alt="shape"
          layout="fill"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="container">
        <div className="section-heading text-center">
          <h4 className="sub-heading custom-heading" data-text-animation="fade-in" data-duration="1.5">
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
              {splitText(process && process.subtitle)} {/* Dynamically render subtitle here */}
            </div>
          </h2>


        </div>
        <div className="row gy-lg-0 gy-5">
          {data &&
            data.map((process, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <div className="process-item fade-top">
                  <div className="process-icon">
                    <div className="icon-border"></div>
                    {/* <Image 
                    className="dark-img" 
                    src={process.icon} 
                    alt="icon" 
                    layout="fill" 
                    objectFit="cover" 
                  /> */}
                    <img
                      className="light-img"
                      src={process.image}
                      alt="icon"
                      width={55}
                      height={55}
                      // layout="fill" 
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div className="process-content">
                    <h3 className="title custom-heading">{process.title}</h3>
                    <p > {process?.description ? ReactHtmlParser(process.description) : "No description available"}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="process-text wow fade-in-bottom" data-wow-delay="400ms">
        {/* <Image 
          className="dark-img" 
          src="/assets/img/images/process-img.png" 
          alt="process" 
          layout="fill" 
          objectFit="cover" 
        /> */}
        <img
          className="process-img-light light-img"
          src="/assets/img/images/process-img-light.png"
          alt="process"
          width={1553}
          height={291}
          style={{ objectFit: 'cover' }}
        />
      </div>
    </section>
  );
};

export default ProcessSection;
