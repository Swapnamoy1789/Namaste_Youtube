//export const GOOGLE_API_KEY="AIzaSyCS8BSQJZB3z6pBKhGd8zAVv2gTVqlCTgM";

//export const YOUTUBE_VIDEOS_API="https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key="+ GOOGLE_API_KEY;
export const API_KEY = "AIzaSyC6_H9Dnx5P0T_eHvmtVCpYspHt-vCVAcY";  // Replace with your API Key

export const YOUTUBE_VIDEOS_API = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&maxResults=20&key=${API_KEY}`;

//export const YOUTUBE_SEARCH_API = (query) =>
  //`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&maxResults=20&key=${API_KEY}`;

//export const YOUTUBE_CATEGORY_API = (categoryId) =>`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=${categoryId}&regionCode=US&maxResults=20&key=${API_KEY}`;
export const YOUTUBE_CATEGORY_VIDEOS_API = 
  "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=20&regionCode=IN&videoCategoryId=";

  // constants.js
  export const YOUTUBE_SEARCH_RESULTS_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=`;
// YouTube Search API for suggestions
export const YOUTUBE_SEARCH_API = "https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=";

// YouTube Search Videos API for fetching video details
export const YOUTUBE_SEARCH_VIDEOS_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&key=${API_KEY}&q=`;

//export const YOUTUBE_SEARCH_API = "https://youtube138.p.rapidapi.com/search/?q=";
//export const YOUTUBE_CATEGORY_API = "https://www.googleapis.com/youtube/v3/search?part=snippet&key="+GOOGLE_API_KEY;

export const YOUTUBE_VIDEO_DETAILS_API = 
  "https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=";


export const OFFSET_LIVE_COUNT=25;

/*export const fetchYouTubeSearchResults = async (query) => {
    const url = `${YOUTUBE_SEARCH_API}${query}&hl=en&gl=US`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '197f2a7ae9mshddf80f39bdc12d5p100edcjsn75e7ca47fa4c',
            //'76223a5449msh7ae96b52be0495ep1d701cjsn82a6cff0755a',
            'x-rapidapi-host': 'youtube138.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.contents || [];
    } catch (error) {
        console.error("Error fetching YouTube search results:", error);
        return [];
    }
};
//export const YOUTUBE_VIDEO_DETAILS_API = "https://youtube138.p.rapidapi.com/video/details/?id=";

export const fetchYouTubeVideoDetails = async (videoId) => {
    const url = `${YOUTUBE_VIDEO_DETAILS_API}${videoId}&hl=en&gl=US`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key':'197f2a7ae9mshddf80f39bdc12d5p100edcjsn75e7ca47fa4c', 
            //'76223a5449msh7ae96b52be0495ep1d701cjsn82a6cff0755a',
            'x-rapidapi-host': 'youtube138.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching video details:", error);
        return null;
    }
};*/
