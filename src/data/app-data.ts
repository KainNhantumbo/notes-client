import {
  BsBalloon,
  BsCloudCheck,
  BsGear,
  BsGrid,
  BsHeart,
} from 'react-icons/bs';
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

export const app_features = [
  {
    icon: BsCloudCheck,
    title: 'Use it everywere',
    content: `Notes stay updated across all your devices, automaticaly and in real time. There's no "sync" button: it just works fine. `,
  },
  {
    icon: BsGrid,
    title: 'Powerful features',
    content: `Blocks, tables, HTML & Markdown, multi document export: ${app_metadata.appName} is jammed with useful features.`,
  },
  {
    icon: BsHeart,
    title: 'Ease to use',
    content:
      'Just open, write and organize without any interruptions: no heavy-lifting, no steep learning curve. Enjoy an ease experience.',
  },
  {
    icon: BsGear,
    title: 'Make it Yours',
    content: `Customize your notes with filters, labels, priorities, and more.`,
  },
  { icon: BsBalloon, title: '', content: '' },
];
