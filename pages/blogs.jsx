import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../lib/api';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

export default function Blog({ initialPosts, totalPages }) {
  const [posts, setPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);

  const loadMorePosts = async () => {
    const nextPage = currentPage + 1;
    const { posts: newPosts } = await fetchPosts(nextPage);
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setCurrentPage(nextPage);
  };

  return (
    <div className="body">
      <Header />
      <Sidebar />

      <section className="blog-section pt-130 pb-130">
        <div className="container">
          <h1 className="title text-center">Blogs</h1>
          <div className="row">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="post-card-2 card-3 inner-blog-2">
                  <div className="post-content-wrap">
                    <h3 className="title">
                      <Link href={`/posts/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p>{post.body.substring(0, 100)}...</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading posts...</p>
            )}
          </div>

          {currentPage < totalPages && (
            <div className="text-center mt-4">
              <button onClick={loadMorePosts} className="btn btn-primary">
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const postsPerPage = 5;
  const { posts, totalPages } = await fetchPosts(1, postsPerPage);

  return {
    props: {
      initialPosts: posts,
      totalPages,
    },
  };
}
