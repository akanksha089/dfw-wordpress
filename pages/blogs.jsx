import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

const staticPosts = [
  { id: 1, title: 'Post One', body: 'This is the first static post content. It gives a brief idea about the topic.' },
  { id: 2, title: 'Post Two', body: 'This is the second static post content. Here you can add some more details.' },
  { id: 3, title: 'Post Three', body: 'This is the third static post content with an introduction to another topic.' },
  { id: 4, title: 'Post Four', body: 'This is the fourth static post with some exciting content about the subject.' },
  { id: 5, title: 'Post Five', body: 'This is the fifth static post talking about various aspects of a topic.' }
];

export default function Blog() {
  const [posts, setPosts] = useState(staticPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1; // Since the data is static, there is only one page

  return (
    <div className="body">
      <Header />
      <Sidebar />

      <section className="blog-section pt-130 pb-130">
        <div className="container">
          <h1 className="title text-center">Blogs</h1>
          <div className="row">
            {posts.map((post) => (
              <div key={post.id} className="post-card-2 card-3 inner-blog-2">
                <div className="post-content-wrap">
                  <h3 className="title">
                    <Link href={`/posts/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p>{post.body.substring(0, 100)}...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
