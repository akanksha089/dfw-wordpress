import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Blog = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Static data for blog posts
  const posts = [
    {
      id: 1,
      slug: 'the-first-post',
      title: 'The First Post',
      content: 'This is the content of the first post. It can be a lengthy content for demonstration purposes.',
      date: '2025-01-01',
      excerpt: 'This is the excerpt for the first post.',
    },
    {
      id: 2,
      slug: 'the-second-post',
      title: 'The Second Post',
      content: 'This is the content of the second post. Here, you can write another interesting blog post.',
      date: '2025-01-02',
      excerpt: 'This is the excerpt for the second post.',
    },
    {
      id: 3,
      slug: 'the-third-post',
      title: 'The Third Post',
      content: 'This is the content of the third post. More interesting content for your readers!',
      date: '2025-01-03',
      excerpt: 'This is the excerpt for the third post.',
    },
    // Add more posts as needed
  ];

  // Find the selected post based on the slug
  const post = posts.find(p => p.slug === slug);

  return (
    <div>
      <h1>Blog Posts</h1>

      {/* Show list of posts if no slug is selected */}
      {!slug ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog?slug=${post.slug}`} passHref>
                <a>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        // Show individual post if slug is available
        <div>
          <button onClick={() => router.push('/blog')}>Back to List</button>
          <h1>{post?.title}</h1>
          <p>{post?.date}</p>
          <div>{post?.content}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;
