import {
  CheckCircledIcon,
  CheckIcon,
  ColorWheelIcon,
  CrossCircledIcon,
  DashboardIcon,
  GearIcon,
  GitHubLogoIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  ReloadIcon,
  UpdateIcon
} from '@radix-ui/react-icons';
import {
  RiBubbleChartLine,
  RiMailCheckLine,
  RiStackLine
} from 'react-icons/ri';
import Package from '../../package.json';
import { Option } from '@/types';

export const app_metadata = {
  author: Package.author,
  appName: Package.metadata.name,
  version: Package.version,
  license: Package.license.name,
  repository: Package.repository,
  websiteName: Package.website_name,
  tags: Package.keywords.join(' '),
  websiteUrl: Package.url,
  description: 'A simple taking notes application to fit your daily needs.',
  copyright: `${new Date().getFullYear()} ${Package.metadata.name}`,
  contacts: [
    {
      name: 'Github',
      icon: GitHubLogoIcon,
      url: Package.author.github
    },
    {
      name: 'Portfolio',
      icon: RiStackLine,
      url: Package.author.portfolio
    },
    {
      name: 'E-mail',
      icon: RiMailCheckLine,
      url: Package.author.email
    }
  ]
};

export const navigationAnchors = [
  { name: 'Overview', url: '/', alias: 'overview' },
  { name: 'Features', url: '#features', alias: 'features' }
];

export const app_features = [
  {
    icon: CheckIcon,
    title: 'Use it everywere',
    content: `Notes stay updated across all your devices, automaticaly and in real time. There's no "sync" button: it just works fine. `
  },
  {
    icon: DashboardIcon,
    title: 'Powerful features',
    content: `Sharing is made simple by exporting your notes to where you want - Plain Text, CSV, HTML & Markdown export: ${app_metadata.appName} is jammed with useful features.`
  },
  {
    icon: HeartIcon,
    title: 'Ease to use',
    content:
      'Just open, write and organize without any interruptions: no heavy-lifting, no steep learning curve. Enjoy an ease experience.'
  },
  {
    icon: GearIcon,
    title: 'Make it Yours',
    content: `Customize your notes with filters, colors, status labels, priorities, and more.`
  },
  {
    icon: ColorWheelIcon,
    title: 'Beautiful animations',
    content: `Everything you do in ${app_metadata.appName} is  nicely animated for better experience.`
  },
  {
    icon: MagnifyingGlassIcon,
    title: 'Quick find',
    content: `All you need to do is start typing - name of a note, content or tag - and instantly you're taken there.`
  }
];

export const footerAnchors = [
  { name: 'Privacy Policy', anchor: '/docs/privacy-policy' },
  { name: 'Contact', anchor: '/docs/contact' },
  { name: 'FAQ', anchor: '/docs/faq' },
  { name: 'Donate', anchor: 'https://www.buymeacoffee.com/nhantumbokU' },
  { name: 'Github', anchor: app_metadata.repository },
  { name: 'Portfolio', anchor: 'https://portifolio-dev-mu.vercel.app' }
].sort((a, b) => (a.name > b.name ? 1 : -1));

export const sortOptions: Option[] = [
  { value: 'title', label: 'Title [A-Z]' },
  { value: '-title', label: 'Title [Z-A]' },
  { value: '-createdAt', label: 'Date Created' },
  { value: 'createdAt', label: 'Date Created [Inverted]' },
  { value: '-updatedAt', label: 'Date Updated' },
  { value: 'updatedAt', label: 'Date Updated [Inverted]' }
];

export const priorityOptions: Option[] = [
  { value: 'none', label: 'None' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
];

export const statusOptions: Option[] = [
  { value: 'none', label: 'None' },
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'completed', label: 'Completed' }
];

export const colorOptions: Option[] = [
  { value: '#FFFFFF', label: 'Default' },
  { value: '#0091FF', label: 'Blue' },
  { value: '#99543A', label: 'Brown' },
  { value: '#3D9A50', label: 'Green' },
  { value: '#B5CC18', label: 'Olive' },
  { value: '#F2711C', label: 'Orange' },
  { value: '#DC3175', label: 'Rose' },
  { value: '#00B5AD', label: 'Teal' },
  { value: '#FBBD08', label: 'Yellow' }
];

export const colorSchemeOptions = [
  { label: 'Light Theme', value: `{"mode":"manual", "scheme": "light"}` },
  { label: 'Dark Theme', value: `{"mode":"manual", "scheme": "dark"}` },
  { label: 'Automatic', value: `{"mode":"auto", "scheme": "dark"}` }
];

export const prioritiesMap = [
  { value: 'none', data: { label: 'None', color: '#ccc' } },
  { value: 'low', data: { label: 'Low', color: '#3D9A50' } },
  { value: 'medium', data: { label: 'Medium', color: '#FBBD08' } },
  { value: 'high', data: { label: 'High', color: '#C62A2F' } }
];

export const statusMap = [
  {
    value: 'none',
    data: { label: 'None', color: '#ccc', icon: RiBubbleChartLine }
  },
  {
    value: 'active',
    data: { label: 'Active', color: '#0091FF', icon: UpdateIcon }
  },
  {
    value: 'pending',
    data: { label: 'Pending', color: '#F76808', icon: CrossCircledIcon }
  },
  {
    value: 'reviewing',
    data: { label: 'Reviewing', color: '#7E808A', icon: ReloadIcon }
  },
  {
    value: 'completed',
    data: { label: 'Completed', color: '#3D9A50', icon: CheckCircledIcon }
  }
];
