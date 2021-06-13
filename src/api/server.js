const axios = require('axios');
const SERVER_URI = process.env.REACT_APP_SERVER_URL;

const fetchPostsOfProviders = async (providerIds) => {
    let posts = [];
    for (const providerId of providerIds) {
        const response = await axios.get(`${SERVER_URI}/fetch?providerId=${providerId}`);
        posts = posts.concat(response.data);
    }
    return posts;
};

const fetchProviders = async () => {
    const response = await axios.get(`${SERVER_URI}/fetch?mode=providers`);
    return response.data;
};

const server = {
    fetchPostOfProviders: fetchPostsOfProviders,
    fetchProviders: fetchProviders,
};

export default server;