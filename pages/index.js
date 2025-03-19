import { useEffect, useState } from 'react';
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
import { fetchCustomApiData, fetchContactData } from '../lib/api';

export default function Home() {
  const [settingdata, setsettingData] = useState(null);
  const [error, setError] = useState(null);
  const [about, setAbout] = useState(null); // State to hold the about data
  const [process, setprocess] = useState(null); // State to hold the process data
  const [service, setService] = useState(null); // State to hold the service data
  const [growth, setGrowth] = useState(null); // State to hold the growth data
  const [faq, setFaq] = useState(null); // State to hold the faq data
  const [blog, setBlog] = useState(null); // State to hold the blog data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCustomApiData();
        const aboutData = result.find(item => item.name === "About Section");
        if (aboutData) {
          setAbout(aboutData); // Set the found object into the 'about' state variable
        }
        const processData = result.find(item => item.name === "Process Section");
        if (processData) {
          setprocess(processData); // Set the found object into the 'process' state variable
        } 
        const serviceData = result.find(item => item.name === "Service Section");
        if (serviceData) {
          setService(serviceData); // Set the found object into the 'process' state variable
        } 
        const growthData = result.find(item => item.name === "Growth Section");
        if (growthData) {
          setGrowth(growthData); // Set the found object into the 'process' state variable
        } 
        const faqData = result.find(item => item.name === "FAQ Section");
        if (faqData) {
          setFaq(faqData); // Set the found object into the 'process' state variable
        } 
        const blogData = result.find(item => item.name === "Blog Section");
        if (blogData) {
          setBlog(blogData); // Set the found object into the 'process' state variable
        } 
      } catch (err) {
        setError('Failed to load data');
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once, after the initial render


 useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchContactData();
                setsettingData(result); // Set the fetched data       
            } catch (err) {
                setError('Failed to load data');
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);



  return (
    <div className="body">
      <Header />
      <Sidebar data = {settingdata}/>
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
          <Footer data = {settingdata} />
        </div>
      </div>
      <div id="scroll-percentage">
        <span id="scroll-percentage-value"></span>
      </div>
    </div>
  );
}
