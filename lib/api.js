

export async function fetchPosts() {
  try {
    const res = await fetch(
      `https://dfweb-v2.onrender.com/api/v1/api-service`
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const posts = await res.json();
    const totalPages = res.headers.get('X-WP-TotalPages') || 1;

    const formattedPosts = posts.map(post => ({
      id: post.id,
      title: post.title.rendered,
      slug: post.slug,
      date: post.date,
      excerpt: post.excerpt?.rendered?.replace(/(<([^>]+)>)/gi, '') || 'No excerpt available', // Default message if no excerpt
      content: post.content.rendered,
      image: post.content.rendered.match(/<img.*?src="(.*?)"/)?.[1] || null, // Extract the first image URL
      author: post._embedded?.author?.[0]?.name || 'Unknown', // Author name
    }));

    return {
      data: formattedPosts,
      totalPages: parseInt(totalPages, 10),
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      data: [],
      totalPages: 0,
    };
  }
}



export async function fetchPostBySlug(slug) {
  try {
    const res = await fetch(`http://localhost/wp-json/wp/v2/posts?slug=${slug}`);

    // Check if the response is not OK (i.e., not in the 200 range)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const post = await res.json();
    return post[0]; // Assuming the API returns an array with the post as the first element
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null; // Return null if there's an error
  }
}


export const fetchCustomApiData = async () => {
  try {
    const response = await fetch('https://dfweb-v2.onrender.com/api/v1/api-service');
    
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from custom API:', error);
    throw error; // rethrow the error after logging it
  }
};

export const fetchContactData = async () => {
  try {
    const response = await fetch('https://dfweb-v2.onrender.com/api/v1/api-service');
    
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from custom API:', error);
    throw error; // rethrow the error after logging it
  }
};
