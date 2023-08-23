import {
  app_extra_features,
  app_features,
  app_metadata,
} from '../data/app-data';
import { NextPage } from 'next';
import app_logo from '../../public/favicon-192x192.png';
import Layout from '../components/Layout';
import { m as motion } from 'framer-motion';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '../context/AppContext';
import { _home as Container } from '../styles/routes/_home';
import { BsArrowRightShort, BsGift } from 'react-icons/bs';
import Image from 'next/image';
import { DefaultTheme, useTheme } from 'styled-components';
import { useThemeContext } from '../context/ThemeContext';
import demo_light from '../../public/assets/demo-light.jpg';
import demo_dark from '../../public/assets/demo-dark.jpg';

const Home: NextPage = (): JSX.Element => {
  const { state } = useAppContext();
  const { darkmode } = useThemeContext();
  const router: NextRouter = useRouter();
  const theme: DefaultTheme = useTheme();

  return (
    <Layout
      renderHeader
      metadata={{ title: `${app_metadata.appName} | Overview` }}>
      <Container>
        <div className='wrapper-container'>
          <article>
            <section className='introduction-container'>
              <a href='/'>
                <BsGift />
                <span>See what's new</span>
                <BsArrowRightShort />
              </a>
              <h1>
                <span>Collect your thoughts and convert into notes</span>
              </h1>

              <p>
                All your notes, synced on your devices. Get{' '}
                {app_metadata.appName} now for free on all your devices or use
                it in your browser.
              </p>

              <div className='action-buttons'>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  className='download-button'>
                  <span>Download</span>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  className='browser-button'>
                  <span>Open in Browser</span>
                </motion.button>
              </div>

              <Image
                width={undefined}
                height={undefined}
                src={darkmode ? demo_dark : demo_light}
                priority={false}
                alt={`${app_metadata.appName} demo image`}
              />
            </section>

            <section id='features' className='features-container'>
              {app_features.map((feature, index) => (
                <motion.div
                  whileHover={{
                    boxShadow: `0 0 25px rgba(${theme.black}, 0.09)`,
                    border: '1px solid transparent',
                  }}
                  title={feature.title}
                  key={String(index)}>
                  <h3>
                    <feature.icon />
                    <span>{feature.title}</span>
                  </h3>
                  <p>{feature.content}</p>
                </motion.div>
              ))}
            </section>

            <section className='extra-features-container'>
              {app_extra_features.map((feature, index) => (
                <motion.div
                  whileHover={{
                    boxShadow: `0 0 25px rgba(${theme.black}, 0.09)`,
                    border: '1px solid transparent',
                  }}
                  title={feature.title}
                  key={String(index)}>
                  <h3>
                    <feature.icon />
                    <span>{feature.title}</span>
                  </h3>
                  <p>{feature.content}</p>
                </motion.div>
              ))}
            </section>

            <section className='call-to-action'>
              <Image
                width={192}
                height={192}
                src={app_logo}
                priority={false}
                alt={`${app_metadata.appName} logo image`}
              />

              <h3>
                <span>Ready to get started?</span>
              </h3>
              <p>
                Don't have a account yet? Sign up for a free account and take
                your produtivity to next level...
              </p>

              <div className='action-buttons'>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  className='download-button'>
                  <span>Download</span>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  className='browser-button'>
                  <span>Open in Browser</span>
                </motion.button>
              </div>
            </section>
          </article>
        </div>
      </Container>
    </Layout>
  );
};

export default Home;
