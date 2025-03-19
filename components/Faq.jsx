import React from 'react';
import { useEffect, useState } from 'react';
import ReactHtmlParser from 'html-react-parser';

const FAQSection = ({ faq }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log('error,', error, loading)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/wp-json/custom/v1/faqs');
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


  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index)); // Toggle the current index
  };
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
  return (
    <>

      <section className="faq-section pt-130 pb-130">
        <div className="faq-shape">
          <img src="assets/img/shapes/faq-shape-1.png" alt="shape" />
        </div>
        <div className="faq-top-shape"></div>
        <div className="container">
          <div className="row gy-lg-0 gy-4">
            <div className="col-xl-6 col-lg-12 col-md-12">
              <div className="faq-content">
                <div className="section-heading">
                  <h4
                    className="sub-heading after-none"
                    data-text-animation="fade-in"
                    data-duration="1.5"
                  >
                    {faq && faq.title}
                  </h4>
                  <h2
                    className="section-title overflow-hidden active"
                    data-text-animation=""
                    data-split="word"
                    data-duration="1"
                    style={{ opacity: 1 }}
                  >
                    <div className="line" style={{ display: 'block', textAlign: 'start', width: '100%' }}>
                      {faq && faq.subtitle ? splitText(faq.subtitle) : null} {/* Dynamically render subtitle here */}
                    </div>
                  </h2>

                </div>
                <div className="accordion" id="accordionExampleTwo">
                  {data && data.length > 0 ? (
                    data.map((item, index) => (
                      <div key={index} className="accordion-item">
                        <h2 className="accordion-header  " id={`heading${index}`} >
                          <button
                            className={`accordion-button ${activeIndex === index ? '' : 'collapsed'}`}
                            type="button"
                            onClick={() => handleAccordionClick(index)}
                            aria-expanded={activeIndex === index}
                            aria-controls={`collapse${index}`}
                          >
                            {item && item.question ? item.question : ""}
                          </button>
                        </h2>
                        <div
                          id={`collapse${index}`}
                          className={`accordion-collapse ${activeIndex === index ? 'block' : 'hidden'}`} // Control visibility using Tailwind
                          aria-labelledby={`heading${index}`}
                        >
                          <div className="accordion-body">
                            {item?.answer ? ReactHtmlParser(item.answer) : "No answer available"}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-12 col-md-12">
              <div className="faq-img reveal text-center">
                <img src={faq && faq.image} alt="faq" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <div className="running-text testi">
        <div className="carouselTicker carouselTicker-nav" data-speed="fast">
          <ul className="text-anim carouselTicker__list">
            <li>Customer Testimonial .</li>
            <li>Client Feedbacks</li>
          </ul>
        </div>
      </div> */}
    </>
  );
};

export default FAQSection;
