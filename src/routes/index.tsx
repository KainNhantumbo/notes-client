import { m as motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import demo_dark from '@/assets/demo-dark.png';
import app_logo from '@/assets/logo-192x192.png';
import demo_light from '@/assets/demo-light.png';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { useTheme } from 'styled-components';
import { useThemeContext } from '../context/ThemeContext';
import { _home as Container } from '@/styles/routes/_home';
import { app_features, app_metadata } from '@/shared/data';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export default function Home() {
  const { colorScheme } = useThemeContext();
  const theme = useTheme();
  const navigate: NavigateFunction = useNavigate();

  return (
    <Layout
      renderHeader
      renderFooter
      metadata={{ title: `${app_metadata.appName} | Overview` }}>
      <Container>
        <div className='wrapper-container'>
          <article>
            <section className='introduction-container'>
              <h1>
                <span>Collect your thoughts and convert into notes</span>
              </h1>

              <p>
                All your notes, synced on your devices. Get {app_metadata.appName} now for
                free on all your devices or use it in your browser.
              </p>

              <div className='action-buttons'>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  className='browser-button'
                  onClick={() => navigate('/workspace?tab=all-notes&folder=none')}>
                  <span>Get started</span>
                </motion.button>
                <motion.a
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  target='_blank'
                  href={app_metadata.repository}>
                  <span>Give a star</span>
                  <GitHubLogoIcon />
                </motion.a>
              </div>

              <img
                loading='lazy'
                decoding='async'
                src={colorScheme.scheme === 'dark' ? demo_dark : demo_light}
                alt={`${app_metadata.appName} demo image`}
                placeholder={`${app_metadata.appName} demo image`}
              />
            </section>

            <section id='features' className='features-container'>
              {app_features.map((feature, index) => (
                <motion.div
                  whileHover={{
                    boxShadow: `0 0 25px rgba(${theme.black}, 0.09)`,
                    translateY: -8,
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
              <img
                loading='lazy'
                decoding='async'
                src={app_logo}
                alt={`${app_metadata.appName} logo image`}
                placeholder={`${app_metadata.appName} logo image`}
              />

              <h2>
                <span>Ready to get started?</span>
              </h2>
              <p>
                Don't have an account yet? Sign up for a free account and take your
                produtivity to next level...
              </p>

              <div className='action-buttons'>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate('/workspace?tab=all-notes&folder=none')}
                  className='browser-button'>
                  <span>Get started</span>
                </motion.button>
              </div>
            </section>
          </article>
        </div>
      </Container>
    </Layout>
  );
}
