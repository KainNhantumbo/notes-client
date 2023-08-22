import Package from '../../package.json';

export const app_metadata = {
  appName: Package.metadata.name,
  version: Package.version,
  license: Package.license,
  websiteName: Package.website_name,
  websiteUrl: Package.url,
  description: 'A simple taking notes application to fit your daily needs.',
  copyright: `© ${new Date().getFullYear()} - ${Package.author.name}`,
};

export const navigationAnchors = [
  { name: 'Overview', url: '/', alias: 'overview' },
  { name: 'Features', url: '/#features', alias: 'features' },
  { name: 'About', url: '/docs/about', alias: 'about' },
];
