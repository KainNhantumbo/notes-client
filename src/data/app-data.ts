import Package from '../../package.json'

export const app_metadata = {
  appName: Package.metadata.name,
  version: Package.version,
  license: Package.license,
  copyright: `© ${new Date().getFullYear()} - ${Package.author.name}`,
};