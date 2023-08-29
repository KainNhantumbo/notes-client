/** @type {import('next').NextConfig} */
// const removeImports = require('next-remove-imports')({
//   test: /node_modules([\s\S]*?)\.(tsx|ts|js|mjs|jsx)$/,
//   matchImports: '\\.(less|css|scss|sass|styl)$',
// });

// module.exports = removeImports({
//   reactStrictMode: true,
//   compiler: { styledComponents: true },
//   swcMinify: true,
//   images: { domains: ['https://res.cloudinary.com'] },
// });

const nextConfig = {
  compiler: { styledComponents: true },
  swcMinify: true,
  images: { domains: ['https://res.cloudinary.com'] },
  transpilePackages: ['@mdxeditor/editor', 'react-diff-view'],
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
};

module.exports = nextConfig;
