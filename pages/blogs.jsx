import React, { useState, useEffect } from 'react';
import { fetchPosts, fetchContactData } from '../lib/api';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
export default function Blog({  initialPosts, totalPages }) {
  const [posts, setPosts] = useState(initialPosts); // Initial posts in state
  const [currentPage, setCurrentPage] = useState(1);
  const [settingdata, setsettingData] = useState(null);
  // Function to load more posts (pagination)
  const loadMorePosts = async () => {
    const nextPage = currentPage + 1;
    const newPosts = await fetchPosts(nextPage);  // Fetch next page of posts

    setPosts((prevPosts) => [...prevPosts, ...newPosts.data]);
    setCurrentPage(nextPage);
  };

  useEffect(() => {
         const fetchData = async () => {
             try {
                 const result = await fetchContactData();
                 setsettingData(result); // Set the fetched data       
             } catch (err) {
                 console.error('Error fetching data:', err);
             }
         };
 
         fetchData();
     }, []);
 
  return (
    <div className="body">
      <Header />
         <Sidebar data = {settingdata}/>
      <div id="popup-search-box">
        <div className="box-inner-wrap d-flex align-items-center">
          <form id="form" action="#" method="get" role="search">
            <input
              id="popup-search"
              type="text"
              name="s"
              placeholder="Type keywords here..."
            />
          </form>
          <div className="search-close">
            <i className="fa-sharp fa-regular fa-xmark"></i>
          </div>
        </div>
      </div>

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <section
            className="page-header"
            style={{ backgroundImage: 'url(assets/img/bg-img/page-header-bg.jpg)' }}
          >
            <div className="overlay"></div>
            <div className="shapes">
              <div className="shape shape-1">
                <img
                  src="assets/img/shapes/page-header-shape-1.png"
                  alt="shape"
                />
              </div>
              <div className="shape shape-2">
                <img
                  src="assets/img/shapes/page-header-shape-2.png"
                  alt="shape"
                />
              </div>
              <div className="shape shape-3">
                <img
                  src="assets/img/shapes/page-header-shape-3.png"
                  alt="shape"
                />
              </div>
            </div>
            <div className="container">
              <div className="page-header-content text-center">
                <h1 className="title text-white">Blogs</h1>
                <h4 className="sub-title">
                  <Link className="home" href="/">Home</Link>
                  <span></span>
                  <Link className="inner-page" href="/">Blogs</Link>
                </h4>
              </div>
            </div>
          </section>

          <section className="blog-section pt-130 pb-130">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="grid-post-wrap-2">
                    {posts.map(post => (
                      <div key={post.id} className="post-card-2 card-3 inner-blog-2">
                        <div className="post-thumb">
                          <img
                            src={post.image || '/placeholder-image.jpg'}
                            alt="blog"
                          />
                        </div>
                        <div className="post-content-wrap">
                          <div className="post-content">
                            <ul className="post-meta">
                              <li>
                                <i className="fa-sharp fa-regular fa-clock"></i>
                                {new Date(post.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </li>
                              <li>
                                <i className="fa-light fa-user"></i>
                                Post by: {post.author}
                              </li>
                            </ul>
                            <h3 className="title">
                              <Link href={`/posts/${post.slug}`}>
                                {post.title}
                              </Link>
                            </h3>
                            <p>{post.excerpt}</p>
                            <Link href={`/posts/${post.slug}`} className="rr-primary-btn">
                              Read More <i className="fa-sharp fa-regular fa-arrow-right"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Load More Button */}
            {currentPage < totalPages && (
             <div className="load-more-btn text-center mt-8">
                <button onClick={loadMorePosts}     className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
>
                  Load More
                </button>
              </div>
            )}
          </section>

          <Footer data = {settingdata} />
        </div>
      </div>

      <div id="scroll-percentage"><span id="scroll-percentage-value"></span></div>
    </div>
  );
}

export async function getStaticProps() {
  const postsPerPage = 5; // Number of posts per page
  const { data, totalPages } = await fetchPosts(1, postsPerPage); // Fetch the first set of posts

  return {
    props: {
      initialPosts: data,
      totalPages: totalPages,
    },
  };
}
