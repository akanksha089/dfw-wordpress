import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ReactHtmlParser from 'html-react-parser';
import Sidebar from '../../components/Sidebar';

export default function Post() {
    const [settingdata, setsettingData] = useState(null);
    const backgroundStyle = {
        backgroundImage: `url('/assets/img/default-image.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    useEffect(() => {
        // Simulate fetching contact data
        setsettingData({ siteName: 'My Blog', contactEmail: 'info@example.com' });
    }, []);

    const post = {
        title: { rendered: 'Sample Blog Post' },
        content: { rendered: '<p>This is a static sample blog post content.</p>' },
        slug: 'sample-blog-post'
    };

    const posts = [
        { title: { rendered: 'Post One' }, slug: 'post-one' },
        { title: { rendered: 'Post Two' }, slug: 'post-two' },
        { title: { rendered: 'Post Three' }, slug: 'post-three' }
    ];

    return (
        <div className="body">
            <Header />
            <Sidebar data={settingdata} />

            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <section className="page-header" style={backgroundStyle}>
                        <div className="overlay"></div>
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
                                <div className="col-lg-8 col-md-12">
                                    <div className="service-details-content">
                                        <h2 className="title custom-heading">{post.title.rendered}</h2>
                                        <div className="mb-30">{ReactHtmlParser(post.content.rendered)}</div>
                                    </div>
                                </div>
                                
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

                    <Footer data={settingdata} />
                </div>
            </div>
        </div>
    );
}