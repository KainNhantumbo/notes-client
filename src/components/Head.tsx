import Head from 'next/head';
import type { FC } from 'react';
import { app_metadata } from '../data/app-data';
import { Inter, Roboto, Nunito, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  weight: ['400', '500', '600'],
  style: ['normal'],
  subsets: ['latin'],
});

const roboto = Roboto({
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

const nunito = Nunito({
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

export type TProps =
  | {
      title?: string;
      createdAt?: string;
      updatedAt?: string;
    }
  | undefined;

const HeadContainer: FC<TProps> = (props): JSX.Element => (
  <Head>
    <link rel='manifest' href='/manifest.json' />
    <link rel='apple-touch-icon' href='/favicon-192x192.png' />
    <meta name='theme-color' content='#000' />
    <meta name='apple-mobile-web-app-title' content={app_metadata.appName} />
    <meta
      name='viewport'
      content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
    />
    <meta name='apple-mobile-web-app-capable' content='yes' />
    <meta name='apple-mobile-web-app-status-bar-style' content='default' />
    <meta name='format-detection' content='telephone=no' />
    <meta name='mobile-web-app-capable' content='yes' />
    <link rel='icon' type='image/png' href='/favicon-192x192.png' />
    <meta name='msapplication-tap-highlight' content='no' />
    <link rel='shortcut icon' href='/favicon-192x192.png' />
    <meta name='msapplication-TileColor' content='#000000' />
    <meta property='og:locale' content='en' />
    <meta property='og:type' content='website' />
    <meta name='theme-color' content='#000' />
    <meta httpEquiv='Content-Type' content='text/html; charset=UTF-8' />
    <link rel='canonical' href={app_metadata.websiteUrl} />
    <meta property='og:url' content={app_metadata.websiteUrl} />
    <meta property='og:site_name' content={app_metadata.websiteName} />
    <meta
      name='robots'
      content='follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large'
    />
    <meta property='og:description' content={app_metadata.description} />
    <meta property='og:title' content={props?.title || app_metadata.appName} />
    <meta property='og:created_time' content={props?.createdAt} />
    <meta property='og:updated_time' content={props?.updatedAt} />
    <meta property='article:published_time' content={props?.createdAt} />
    <meta property='article:modified_time' content={props?.updatedAt} />
    <meta name='author' content={app_metadata.websiteName} />
    <meta name='tags' content={app_metadata.tags} />
    <meta name='description' content={app_metadata.description} />
    <title>{props?.title || app_metadata.appName}</title>
    <style jsx global>{`
      html {
        font-family: ${inter.style.fontFamily}, ${roboto.style.fontFamily},
          ${nunito.style.fontFamily}, ${jetbrainsMono.style.fontFamily};
      }
    `}</style>
  </Head>
);

export default HeadContainer;
