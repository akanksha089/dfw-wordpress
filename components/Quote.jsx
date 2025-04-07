import React from 'react'

function Quote() {
  return (
    <section className="cta-section pb-130">
    <div className="container">
      <div className="cta-wrap text-center">
        <div className="section-heading text-center">
          <span className="bg-text">Get Started</span>
          <h4 className="sub-heading" data-text-animation="fade-in" data-duration="1.5">
            Have you project in mind?
          </h4>
          <h2
            className="section-title"
            data-text-animation
            data-split="word"
            data-duration="1"
          >
            Let’s make something <br /> great together!
          </h2>
        </div>
        <div className="cta-thumb-wrap">
          <img src="assets/img/images/cta-img.png" alt="cta" />
          <a href="/contact" className="cta-btn">
            <i className="fa-sharp fa-regular fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
  
  )
}

export default Quote