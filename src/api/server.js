import posts from "../features/posts/posts";
import providers from "../features/providers/providers";

const fetchPostsOfProviders = (providerIds) => {
    const filteredPosts = posts.filter((post) => providerIds.indexOf(post.providerId) !== -1);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(filteredPosts);
        }, 1500);
    });
};

const fetchProviders = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(providers);
        }, 1500);
    });
};

const server = {
    fetchPostOfProviders: fetchPostsOfProviders,
    fetchProviders: fetchProviders,
};

export default server;