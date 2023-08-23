import { NextPage } from 'next';
import Layout from '../components/Layout';
import { m as motion } from 'framer-motion';
import { app_features, app_metadata } from '../data/app-data';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '../context/AppContext';
import { _home as Container } from '../styles/routes/_home';
import { BsArrowRightShort, BsGift } from 'react-icons/bs';

const Home: NextPage = (): JSX.Element => {
  const { state } = useAppContext();
  const router: NextRouter = useRouter();

  return (
    <Layout
      renderHeader={true}
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
                <motion.button className='download-button'>
                  <span>Download</span>
                </motion.button>
                <motion.button className='browser-button'>
                  <span>Open in Browser</span>
                </motion.button>
              </div>
            </section>
            <section id='features' className=''>
              {app_features.map((feature, index) => (
                <motion.div title={feature.title} key={String(index)}>
                  <feature.icon />
                  <h3>
                    <span>{feature.title}</span>
                  </h3>
                </motion.div>
              ))}
            </section>
          </article>
        </div>
      </Container>
    </Layout>
  );
};

export default Home;
