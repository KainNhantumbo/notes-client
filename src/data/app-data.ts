import {
  CheckIcon,
  ColorWheelIcon,
  DashboardIcon,
  GearIcon,
  HeartIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';
import Package from '../../package.json';

export const app_metadata = {
  appName: Package.metadata.name,
  version: Package.version,
  license: Package.license,
  repository: Package.repository,
  websiteName: Package.website_name,
  tags: Package.keywords.join(' '),
  websiteUrl: Package.url,
  description: 'A simple taking notes application to fit your daily needs.',
  copyright: `© ${new Date().getFullYear()} ${Package.metadata.name} | ${
    Package.author.name
  }`,
};

export const navigationAnchors = [
  { name: 'Overview', url: '/', alias: 'overview' },
  { name: 'Features', url: '/#features', alias: 'features' },
  { name: 'About', url: '/docs/about', alias: 'about' },
];

export const app_features = [
  {
    icon: CheckIcon,
    title: 'Use it everywere',
    content: `Notes stay updated across all your devices, automaticaly and in real time. There's no "sync" button: it just works fine. `,
  },
  {
    icon: DashboardIcon,
    title: 'Powerful features',
    content: `Sharing is made simple by exporting your notes to where you want - PDF, HTML & Markdown export: ${app_metadata.appName} is jammed with useful features.`,
  },
  {
    icon: HeartIcon,
    title: 'Ease to use',
    content:
      'Just open, write and organize without any interruptions: no heavy-lifting, no steep learning curve. Enjoy an ease experience.',
  },
  {
    icon: GearIcon,
    title: 'Make it Yours',
    content: `Customize your notes with filters, labels, priorities, and more.`,
  },
  {
    icon: ColorWheelIcon,
    title: 'Beautiful animations',
    content: `Everything you do in ${app_metadata.appName} is  nicely animated for better experience.`,
  },
  {
    icon: MagnifyingGlassIcon,
    title: 'Quick find',
    content: `All you need to do is start typing - name of a note, description or tag - and instantly you're taken there.`,
  },
];

export const footerAnchors = [
  { name: 'Privacy Policy', anchor: '/docs/privacy-policy' },
  { name: 'Terms of use', anchor: '/docs/terms-of-use' },
  { name: 'Contact', anchor: '/docs/contact' },
  { name: 'FAQ', anchor: '/docs/faq' },
  { name: 'Donate', anchor: 'https://www.buymeacoffee.com/nhantumbokU' },
  { name: 'Github', anchor: app_metadata.repository },
  { name: 'Portfolio', anchor: 'https://portifolio-dev-mu.vercel.app' },
].sort((a, b) => (a.name > b.name ? 1 : -1));

export const colorsOptions: string[] = [
  '#E93A9A',
  '#E93D58',
  '#E9643A',
  '#E8CB2D',
  '#3DD425',
  '#00D3B8',
  '#3DAEE9',
  '#B875DC',
  '#926EE4',
];
