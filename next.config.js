/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')({
  test: /node_modules([\s\S]*?)\.(tsx|ts|js|mjs|jsx)$/,
  matchImports: '\\.(less|css|scss|sass|styl)$',
});

module.exports = removeImports({
  reactStrictMode: true,
  compiler: { styledComponents: true },
  swcMinify: true,
});


// const nextPWA = require('next-pwa')({
//   dest: 'public',
//   disable: process.env.NODE_ENV === 'development',
//   register: true,
//   scope: '/',
// });

// module.exports = nextPWA({
//   reactStrictMode: true,
//   swcMinify: true,
//   compiler: { styledComponents: true },
//   images: { domains: ['https://res.cloudinary.com'] },
// });
