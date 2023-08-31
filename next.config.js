/** @type {import('next').NextConfig} */

const nextPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  scope: '/',
});

const nextConfig = {
  compiler: { styledComponents: true },
  swcMinify: true,
  images: { domains: ['https://res.cloudinary.com'] },
  transpilePackages: ['@mdxeditor/editor', 'react-diff-view'],
  reactStrictMode: true,
  webpack: (config, options) => {
    if (!options.isServer) {
      config.module.rules.unshift({
        test: /node_modules([\s\S]*?)\.(tsx|ts|js|mjs|jsx)$/,
        loader: require.resolve('babel-loader', {
          paths: [process.cwd()],
        }),
        options: {
          plugins: [
            [
              require.resolve('babel-plugin-transform-remove-imports', {
                paths: [process.cwd()],
              }),
              { test: '\\.(less|css|scss|sass|styl)$' },
            ],
          ],
        },
      });
    }
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
};

module.exports = nextPWA({ ...nextConfig });
