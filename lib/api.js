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

export async function fetchPosts(page = 1, perPage = 5) {
  try {
    const res = await fetch(
      `https://www.mocky.io/v2/5e8a8eac2f0000b031a0fb34/wp/v2/posts?_embed=true&page=${page}&per_page=${perPage}`
    );

    console.log('🌐 Fetching from:', res.url);

    if (!res.ok) {
      console.warn('❌ Server responded with error:', res.status);
      return { data: [], totalPages: 0 };
    }

    const contentType = res.headers.get('Content-Type') || '';

    // Check for non-JSON response early
    if (!contentType.includes('application/json')) {
      const raw = await res.text();
      console.warn('⚠️ Non-JSON content received. Skipping parsing.', raw.slice(0, 200));
      return { data: [], totalPages: 0 };
    }

    let posts = [];
    let rawText = '';

    try {
      rawText = await res.text();

      // Clean the response: Strip out any non-JSON (e.g., scripts, HTML tags)
      // Start looking for the first '[' and ending with the last ']'
      const firstBracket = rawText.indexOf('[');
      const lastBracket = rawText.lastIndexOf(']');

      if (firstBracket === -1 || lastBracket === -1) {
        throw new Error('Invalid JSON format, brackets not found');
      }

      // Extract the valid JSON portion
      const cleanJson = rawText.slice(firstBracket, lastBracket + 1);

      // Attempt parsing the clean JSON
      posts = JSON.parse(cleanJson);
    } catch (parseErr) {
      console.error('🚨 JSON Parse Error:', parseErr.message);
      console.log('⚠️ Raw Response for Debugging:', rawText); // Log the raw response for troubleshooting
      return { data: [], totalPages: 0 };
    }

    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);

    const formattedPosts = posts.map(post => ({
      id: post.id,
      title: post.title?.rendered || 'Untitled',
      slug: post.slug,
      date: post.date,
      excerpt: stripHtmlTags(post.excerpt?.rendered || ''),
      content: post.content?.rendered || '',
      image: post.content?.rendered?.match(/<img.*?src="(.*?)"/)?.[1] || null,
      author: post._embedded?.author?.[0]?.name || 'Unknown',
    }));

    return {
      data: formattedPosts,
      totalPages,
    };
  } catch (err) {
    console.error('🔥 Final Catch Block Error:', err.message);
    return { data: [], totalPages: 0 };
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
