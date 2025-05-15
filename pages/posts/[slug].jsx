import { useEffect, useState } from 'react';
import Link from 'next/link';
// import { fetchPostBySlug } from '../../lib/api';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ReactHtmlParser from 'html-react-parser';
import {  fetchContactData } from '../../lib/api';
import Sidebar from '../../components/Sidebar';
import Head from 'next/head';

export default function Post({ post, posts }) {
    const [settingdata, setsettingData] = useState(null);
  // const backgroundStyle = {
  //   backgroundImage: `url(${post.content.rendered.match(/<img.*?src="(.*?)"/)?.[1] || 'default-image-url.jpg'})`,
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  //   backgroundRepeat: 'no-repeat',
  // };

  const imageMatch = post?.content?.rendered?.match(/<img.*?src="(.*?)"/);
const backgroundStyle = {
  backgroundImage: `url(${imageMatch?.[1] || 'default-image-url.jpg'})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

  if (!post || !post.content) {
    return <div>Post not found!</div>;
  }

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
          <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Header />
              <Sidebar data={settingdata}/>
      <div id="popup-search-box">
        <div className="box-inner-wrap d-flex align-items-center">
          <form id="form" action="#" method="get" role="search">
            <input id="popup-search" type="text" name="s" placeholder="Type keywords here..." />
          </form>
          <div className="search-close">
            <i className="fa-sharp fa-regular fa-xmark"></i>
          </div>
        </div>
      </div>

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <section className="page-header" style={backgroundStyle}>
            <div className="overlay"></div>
            <div className="shapes">
              <div className="shape shape-1">
                <img src="/assets/img/shapes/page-header-shape-1.png" alt="shape" />
              </div>
              <div className="shape shape-2">
                <img src="/assets/img/shapes/page-header-shape-2.png" alt="shape" />
              </div>
              <div className="shape shape-3">
                <img src="/assets/img/shapes/page-header-shape-3.png" alt="shape" />
              </div>
            </div>
            <div className="container">
              <div className="page-header-content text-center">
                <h1 className="title text-white">{post.title.rendered}</h1>
                <h4 className="sub-title">
                  <Link href="/">Home</Link> <span>/</span> 
                  <Link href="/blog">Blog</Link> <span>/</span> 
                  <Link href={`/posts/${post.slug}`}>{post.title.rendered}</Link>
                </h4>
              </div>
            </div>
          </section>

          <section className="service-details pt-130 pb-130">
            <div className="container">
              <div className="row gy-lg-0 gy-5">
                {/* Post Content */}
                <div className="col-lg-8 col-md-12">
                  <div className="sidebar-content-wrap">
                    <div className="service-details-content">
                      <h2 className="title custom-heading">{post.title.rendered}</h2>
                      <div className="mb-30">{ReactHtmlParser(post.content.rendered)}</div>
                    </div>
                  </div>
                </div>

                {/* Sidebar with Blog Links */}
                <div className="col-lg-4 col-md-12">
                  <div className="service-widget">
                    <h3 className="widget-title custom-heading">Blogs</h3>
                    <ul className="category-list">
                      {posts.map((blogPost, index) => (
                        <li key={index} className={post.slug === blogPost.slug ? "active" : ""}>
                          <Link href={`/posts/${blogPost.slug}`}>
                            <i className="fa-sharp fa-regular fa-arrow-right"></i>
                            {blogPost.title.rendered}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Footer data={settingdata}/>
        </div>
      </div>

      <div id="scroll-percentage">
        <span id="scroll-percentage-value"></span>
      </div>
    </div>
  );
}

// Fetch all paths for static generation
export async function getStaticPaths() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const res = await fetch(`${BASE_URL}/wp/v2/posts`);
    const posts = await res.json();

    const paths = Array.isArray(posts)
      ? posts.map(post => ({ params: { slug: post.slug } }))
      : [];

    return {
      paths,
      fallback: true, // or 'blocking'
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return {
      paths: [],
      fallback: true,
    };
  }
}

// Fetch specific post and all posts for the sidebar
export async function getStaticProps({ params }) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const res = await fetch(`${BASE_URL}/wp/v2/posts?slug=${params.slug}`);
    const data = await res.json();
    const post = Array.isArray(data) && data.length > 0 ? data[0] : null;
    if (!post || !post.content) {
      console.warn("❌ No post found for slug:", params.slug);
      return { notFound: true };
    }
    const allPostsRes = await fetch(`${BASE_URL}/wp/v2/posts`);
    const allPosts = await allPostsRes.json();
    return {
      props: {
        post,
        posts: Array.isArray(allPosts) ? allPosts : [],
      },
      revalidate: 10,
    };
  } catch (err) {
    console.error("Error in getStaticProps:", err);
    return { notFound: true };
  }
}

