const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // API base URL from .env


// export async function fetchPosts(page = 1, perPage = 5) {
//   try {
//     const res = await fetch(
//       `${BASE_URL}/wp/v2/posts?_embed=true&fields=id,title,slug,date,excerpt,content,_embedded&page=${page}&per_page=${perPage}`
//     );
//     console.log('Fetching from:', res.url);
//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }

//     const posts = await res.json();
//     const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);
//     console.log('Raw posts:', posts);
//     const formattedPosts = posts.map(post => ({
//       id: post.id,
//       title: post.title.rendered,
//       slug: post.slug,
//       date: post.date,
//       excerpt: post.excerpt?.rendered?.replace(/(<([^>]+)>)/gi, '') || 'No excerpt available',
//       content: post.content.rendered,
//       image: post.content.rendered.match(/<img.*?src="(.*?)"/)?.[1] || null,
//       author: post._embedded?.author?.[0]?.name || 'Unknown',
//     }));
//     console.log('Formatted posts:', formattedPosts);
//     return {
//       data: formattedPosts,
//       totalPages,
//     };
//   } catch (error) {
//     console.error('Error fetching posts:', error.message);
//     return {
//       data: [],
//       totalPages: 0,
//     };
//   }
// }


const stripHtmlTags = (htmlContent) => {
  return htmlContent.replace(/(<([^>]+)>)/gi, '');
};

// Updated fetchPosts function with better error handling and fallback
export async function fetchPosts(page = 1, perPage = 5) {
  try {
    const res = await fetch(
      `${BASE_URL}/wp/v2/posts?_embed=true&fields=id,title,slug,date,excerpt,content,_embedded&page=${page}&per_page=${perPage}`
    );

    console.log('Fetching from:', res.url);

    // Check if the response is ok
    if (!res.ok) {
      const errorText = await res.text();  // Get raw text if not OK
      console.error('Error response text:', errorText);
      throw new Error(`Error fetching posts: ${errorText}`);
    }

    // Get the raw response text
    const rawResponse = await res.text();
    console.log('Raw response content:', rawResponse);  // Log the raw response for inspection

    // Check if the response is JSON (Content-Type header should be application/json)
    const contentType = res.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Unexpected response format:', rawResponse);
      throw new Error('Expected JSON response, but received something else');
    }

    // Try to parse the response as JSON
    const posts = JSON.parse(rawResponse);  // Manually parse the response

    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);

    // Map and format the posts data
    const formattedPosts = posts.map(post => ({
      id: post.id,
      title: post.title.rendered,
      slug: post.slug,
      date: post.date,
      // Stripping HTML from the excerpt and content
      excerpt: stripHtmlTags(post.excerpt?.rendered || 'No excerpt available'),
      content: post.content.rendered,  // Keep HTML content for rendering
      image: post.content.rendered.match(/<img.*?src="(.*?)"/)?.[1] || null,
      author: post._embedded?.author?.[0]?.name || 'Unknown',
    }));

    return {
      data: formattedPosts,
      totalPages,
    };
  } catch (error) {
    // Gracefully handle the error without breaking the build
    console.error('Error fetching posts:', error.message);

    // Ensure that the build doesn't fail, return a fallback response
    return {
      data: [],
      totalPages: 0,
    };
  }
}




export async function fetchPostBySlug(slug) {
  try {
    const res = await fetch(`${BASE_URL}/wp/v2/posts?slug=${slug}`);

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
    const response = await fetch(`${BASE_URL}/custom/v1/coustom-api`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const rawText = await response.text();

    // Use regex to safely extract the JSON array only
    const match = rawText.match(/\[\s*{[\s\S]*?}\s*\]/);

    if (!match) {
      throw new Error('Valid JSON array not found in response');
    }

    const cleanJson = match[0];
    const data = JSON.parse(cleanJson);

    return data;
  } catch (error) {
    console.error('Error fetching data from custom API:', error);
    throw error;
  }
};


export const fetchContactData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/custom/v1/custom-fields`);
    
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const rawText = await response.text();
   // Find the end of the JSON block
   const jsonEndIndex = rawText.indexOf('}</script>') !== -1
   ? rawText.indexOf('}') + 1
   : rawText.indexOf('}') + 1;

 const jsonString = rawText.slice(0, jsonEndIndex);
 const data = JSON.parse(jsonString);
    return data;
  } catch (error) {
    console.error('Error fetching data from custom API:', error);
    throw error; // rethrow the error after logging it
  }
};
