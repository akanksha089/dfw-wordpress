import React, { useState } from 'react';
import ReactHtmlParser from 'html-react-parser';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faq = {
    title: "Frequently Asked Questions",
    subtitle: "Your Most Common Queries Answered",
    image: "https://via.placeholder.com/400",
  };

  const data = [
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase with the original receipt.",
    },
    {
      question: "How can I contact customer support?",
      answer: "You can contact our support team via email at support@example.com.",
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we offer worldwide shipping. Shipping rates vary by country.",
    },
  ];



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
              <h4 className="sub-heading after-none">{faq.title}</h4>
              <h2 className="section-title overflow-hidden active">
                <div style={{ display: "block", textAlign: "start", width: "100%" }}>
                  {faq.subtitle}
                </div>
              </h2>
            </div>
            <div className="accordion" id="accordionExampleTwo">
              {data.map((item, index) => (
                <div key={index} className="accordion-item">
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className={`accordion-button ${activeIndex === index ? "" : "collapsed"}`}
                      type="button"
                      onClick={() => handleAccordionClick(index)}
                      aria-expanded={activeIndex === index}
                      aria-controls={`collapse${index}`}
                    >
                      {item.question}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className={`accordion-collapse ${activeIndex === index ? "block" : "hidden"}`}
                    aria-labelledby={`heading${index}`}
                  >
                    <div className="accordion-body">
                      {ReactHtmlParser(item.answer)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-12 col-md-12">
          <div className="faq-img reveal text-center">
            <img src={faq.image} alt="FAQ" />
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
