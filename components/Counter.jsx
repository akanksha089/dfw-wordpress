
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
// Dynamically import only on the client-side (no SSR)
const Odometer = dynamic(() => import('odometer'), { ssr: false });

const Counter = ({ growth }) => {
  const [isClient, setIsClient] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const splitText = (text) => {
    if (!text) return null;

    // Define the word after which you want to insert a line break
    const lineBreakWord = "issues";

    // Split the text into words
    const words = text.split(" ");

    // Initialize a variable to hold the words
    let line = [];
    const result = [];

    words.forEach((word, index) => {
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
      <div key={index} className="line" style={{ display: 'block', textAlign: 'start', width: '100%' }}>
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
  const [counterData, setCounterData] = useState([]);
  // Ensure that this effect runs only after the component mounts (on client-side)
  useEffect(() => {
    setIsClient(true);
  }, []);
  // Fetch counter data from the API
  useEffect(() => {
    fetch(`${BASE_URL}/count-api/v1/data`)
      .then((response) => response.json())
      .then((data) => {
        setCounterData(data);
      })
      .catch((error) => {
        console.error('Error fetching counter data:', error);
      });
  }, []);

  useEffect(() => {
    if (isClient && counterData.length > 0) {
      setTimeout(() => {
        document.querySelectorAll('.odometer').forEach((element) => {
          // Try using require to load Odometer if the above doesn't work
          const Odometer = require('odometer');
          const odometer = new Odometer({
            el: element,
            format: '(,ddd)', // Format for the counter (e.g., 1,000)
            theme: 'default',
          });
          odometer.update(element.getAttribute('data-count'));
        });
      }, 100);
    }
  }, [counterData, isClient]);
  return (
    <div>
      {/* <section className="counter-section pt-130 pb-130">
    <div className="container">
      <div className="row gy-lg-0 gy-4">
        <div className="col-lg-3 col-md-6">
          <div className="counter-item">
            <h3 className="title">
              <span className="odometer" data-count="10">0</span>
            </h3>
            <p>
              Years of <br /> Experience
            </p>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="counter-item">
            <h3 className="title">
              <span className="odometer" data-count="18">0</span>
            </h3>
            <p>
              Skilled <br /> Performance
            </p>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="counter-item">
            <h3 className="title">
              <span className="odometer" data-count="32">0</span>
            </h3>
            <p>
              Visited <br /> Conferences
            </p>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="counter-item">
            <h3 className="title">
              <span className="odometer" data-count="1">0</span>k
            </h3>
            <p>
              Years of <br /> Experience
            </p>
          </div>
        </div>
      </div>
    </div>
  </section> */}

      <section className="grow-section pt-130 pb-130 fade-wrapper">
        <div className="container">
          <div className="grow-top heading-space">
            <div className="section-heading mb-0">
              <h4
                className="sub-heading"
                data-text-animation="fade-in"
                data-duration="1.5"
              >
                {growth && growth.title}
              </h4>
              <h2
                className="section-title overflow-hidden active"
                data-text-animation=""
                data-split="word"
                data-duration="1"
                style={{ opacity: 1 }}
              >
                <div className="line" style={{ display: 'block', textAlign: 'start', width: '100%' }}>
                  {growth && growth.subtitle ? splitText(growth.subtitle) : null} {/* Dynamically render subtitle here */}
                </div>
              </h2>
            </div>
            <a href="/contact" className="rr-primary-btn">
              Get a Quote
            </a>
          </div>
          {/* <div className="container">
            <div className="row gy-lg-0 gy-4">
              <div className="col-lg-3 col-md-6">
                <div className="counter-item">
                  <h3 className="title">
                    <span className="odometer" data-count="10">0</span>
                  </h3>
                  <p>
                    Years of <br /> Experience
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="counter-item">
                  <h3 className="title">
                    <span className="odometer" data-count="18">0</span>
                  </h3>
                  <p>
                    Skilled <br /> Performance
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="counter-item">
                  <h3 className="title">
                    <span className="odometer" data-count="32">0</span>
                  </h3>
                  <p>
                    Visited <br /> Conferences
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="counter-item">
                  <h3 className="title">
                    <span className="odometer" data-count="1">0</span>k
                  </h3>
                  <p>
                    Years of <br /> Experience
                  </p>
                </div>
              </div>
            </div>
          </div> */}

<div className="container">
      <div className="row gy-lg-0 gy-4">
        {counterData.map((item, index) => (
          <div key={index} className="col-lg-3 col-md-6">
            <div className="counter-item">
              <h3 className="title">
                <span className="odometer" data-count={item.end_number}>
                  {item.start_number}
                </span>
              </h3>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
        </div>
      </section>
    </div>
  )
}

export default Counter