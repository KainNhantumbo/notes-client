/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: { styledComponents: true },
  swcMinify: true,
  images: { domains: ['https://res.cloudinary.com'] },
  transpilePackages: ['@mdxeditor/editor', 'react-diff-view'],
  reactStrictMode: true,
  webpack: (config, options) => {
    const test = /node_modules([\s\S]*?)\.(tsx|ts|js|mjs|jsx)$/;
    const matchImports = '\\.(less|css|scss|sass|styl)$';

    if (!options.isServer) {
      config.module.rules.unshift({
        test: test,
        loader: require.resolve('babel-loader', {
          paths: [process.cwd()],
        }),
        options: {
          plugins: [
            [
              require.resolve('babel-plugin-transform-remove-imports', {
                paths: [process.cwd()],
              }),
              {
                test: matchImports,
              },
            ],
          ],
        },
      });
    }
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
};

module.exports = nextConfig;
