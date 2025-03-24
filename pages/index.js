import {  useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Hero from '../components/Hero';
import AboutSection from '../components/About';
import ProcessSection from '../components/ProcessSection';
import Service from '../components/Service';
import Counter from '../components/Counter';
import Carousal from '../components/Carousal';
import FAQSection from '../components/Faq';
import Blog from '../components/Blog';
// import { fetchCustomApiData, fetchContactData } from '../lib/api';

export default function Home() {
  // const [settingdata, setsettingData] = useState(null);
  const about = useState({
    name: "About Section",
    content: "This is the about section content.",
  });
  const process = useState({
    name: "Process Section",
    content: "This is the process section content.",
  });

  const service= useState({
    name: "Service Section",
    content: "This is the service section content.",
  });
  const growth = useState({
    name: "Growth Section",
    content: "This is the growth section content.",
  });

  const faq = useState({
    name: "FAQ Section",
    content: "This is the FAQ section content.",
  });

  const blog = useState({
    name: "Blog Section",
    content: "This is the blog section content.",
  });




//  useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const result = await fetchContactData();
//                 setsettingData(result);       
//             } catch (err) {
//                 setError('Failed to load data');
//                 console.error('Error fetching data:', err);
//             }
//         };

//         fetchData();
//     }, []);



  return (
    <div className="body">
      <Header />
      <Sidebar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Hero />
          <AboutSection about={about}/>
          <ProcessSection process = {process} />
          <Service service = {service} />
          <Counter growth = {growth} />
          <Carousal />
          <FAQSection faq = {faq} />
          <Blog blog = {blog} />
          <Footer  />
        </div>
      </div>
      <div id="scroll-percentage">
        <span id="scroll-percentage-value"></span>
      </div>
    </div>
  );
}
