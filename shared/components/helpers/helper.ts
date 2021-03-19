// Helper functions
export const getNavigationLink = (slug) => `/post/${slug}`;
export const getHref = (slug) => ({
    pathname: '/post',
    query: {post: slug},
});