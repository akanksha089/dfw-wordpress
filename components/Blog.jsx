import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../lib/api';
import Link from 'next/link';

const Blog = ({ blog }) => {
  const [posts, setPosts] = useState([]); // Store posts in state
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch posts on component mount
  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const { data } = await fetchPosts(1, 2); // Get only 2 latest posts
        setPosts(data); // Update state with fetched posts
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchLatestPosts(); // Call function to fetch posts
  }, []);

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
      <div key={index} className="line" style={{ display: 'block', textAlign: 'center', width: '100%' }}>
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
    <section className="blog-section pb-130 fade-wrapper">
      <div className="container">
        <div className="section-heading text-center">
          <h4 className="sub-heading" data-text-animation="fade-in" data-duration="1.5">
        {blog && blog.title}
          </h4>
          <h2
            className="section-title overflow-hidden active"
            data-text-animation=""
            data-split="word"
            data-duration="1"
            style={{ opacity: 1 }}
          >
            <div className="line" style={{ display: 'block', textAlign: 'start', width: '100%' }}>
              {blog && blog.subtitle ? splitText(blog.subtitle) : null} {/* Dynamically render subtitle here */}
            </div>
          </h2>
        </div>
        <div className="row gy-lg-0 gy-4">

          {posts.map((post, index) => (
            <div className="col-md-6" key={post.id}>
              <div className="post-card-2 fade-top">
                <div className="overlay"></div>
                <div className="post-thumb">
                  <img
                    src={post.image || 'assets/img/default-image.jpg'} // Use default image if no image is available
                    alt={post.title}
                  />
                </div>
                <div className="post-content-wrap">
                  <div className="post-content">
                    <ul className="post-meta">
                      <li>
                        <i className="fa-sharp fa-regular fa-clock"></i>      {new Date(post.date).toLocaleDateString()}
                      </li>
                      <li>
                        <i className="fa-light fa-user"></i>Post by: {post.author}
                      </li>
                    </ul>
                    <h3 className="title">
                      <Link href={`/posts/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <Link href={`/posts/${post.slug}`} className="rr-primary-btn">
                      Read More <i className="fa-sharp fa-regular fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

  )
}

export default Blog