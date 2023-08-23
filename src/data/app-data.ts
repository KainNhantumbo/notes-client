import {
  BsCloudCheck,
  BsGear,
  BsGrid,
  BsHeart,
  BsSearchHeart,
  BsShare,
  BsWind,
} from 'react-icons/bs';
import Package from '../../package.json';

export const app_metadata = {
  appName: Package.metadata.name,
  version: Package.version,
  license: Package.license,
  repository: Package.repository,
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
];

export const app_extra_features = [
  {
    icon: BsWind,
    title: 'Beautiful animations',
    content: `Everything you do in ${app_metadata.appName} is  nicely animated for better experience.`,
  },
  {
    icon: BsSearchHeart,
    title: 'Quick find',
    content: `All you need to do is start typing - name of a note, description or tag - and instantly you're taken there.`,
  },
  {
    icon: BsShare,
    title: 'Share your notes',
    content: `Sharing is made simple by exporting your notes to documents files to where you want.`,
  },
];

export const footerAnchors = [
  { name: 'Privacy policy', anchor: '/docs/privacy-policy' },
  { name: 'Terms of use', anchor: '/docs/terms-of-use' },
  { name: 'Contact', anchor: '/docs/contact' },
  { name: 'Donate', anchor: 'https://www.buymeacoffee.com/nhantumbokU' },
  { name: 'Github', anchor: app_metadata.repository },
  { name: 'FAQ', anchor: '/docs/faq' },
  { name: 'Portfolio', anchor: 'https://portifolio-dev-mu.vercel.app' },
].sort((a, b) => (a.name > b.name ? 1 : -1));
