import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import only on the client-side (no SSR)
const Odometer = dynamic(() => import('odometer'), { ssr: false });

const Counter = ({ growth }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      setTimeout(() => {
        document.querySelectorAll('.odometer').forEach((element) => {
          const Odometer = require('odometer');
          const odometer = new Odometer({
            el: element,
            format: '(,ddd)',
            theme: 'default',
          });
          odometer.update(element.getAttribute('data-count'));
        });
      }, 100);
    }
  }, [isClient]);

  const counterData = [
    { title: 'Years of Experience', start_number: 0, end_number: 10 },
    { title: 'Skilled Performance', start_number: 0, end_number: 18 },
    { title: 'Visited Conferences', start_number: 0, end_number: 32 },
    { title: 'Projects Completed', start_number: 0, end_number: 1000 },
  ];

  return (
    <section className="grow-section pt-130 pb-130 fade-wrapper">
      <div className="container">
        <div className="grow-top heading-space">
          <div className="section-heading mb-0">
            <h4 className="sub-heading" data-text-animation="fade-in" data-duration="1.5">
              {growth && growth.title}
            </h4>
            <h2 className="section-title overflow-hidden active" data-text-animation="" data-split="word" data-duration="1" style={{ opacity: 1 }}>
              {growth && growth.subtitle}
            </h2>
          </div>
          <a href="contact.html" className="rr-primary-btn">
            Get a Quote
          </a>
        </div>

        <div className="container">
          <div className="row gy-lg-0 gy-4">
            {counterData.map((item, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <div className="counter-item">
                  <h3 className="title">
                    <span className="odometer" data-count={item.end_number}>{item.start_number}</span>
                  </h3>
                  <p>{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Counter;