const target = process.env.BLOG_DEV_SERVER || 'http://localhost:4321';

module.exports = {
  '/blog': {
    target,
    secure: false,
    changeOrigin: true,
    ws: true,
  },
  '/_astro': {
    target,
    secure: false,
    changeOrigin: true,
    ws: true,
  },
};
