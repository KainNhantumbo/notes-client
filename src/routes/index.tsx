import {
  RiGithubLine,
  RiLinkedinBoxLine,
  RiMailLine,
  RiProfileLine
} from 'react-icons/ri';
import { Contact } from '@/types';
import { Tooltip } from 'react-tooltip';
import { m as motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import demoDarkImage from '@/assets/demo-dark.png';
import demoDarkSmImage from '@/assets/demo-dark-placeholder.png';
import app_logo from '@/assets/logo-19x192.png';
import demoLightImage from '@/assets/demo-light.png';
import demoLightSmImage from '@/assets/demo-light-placeholder.png';
import { useTheme } from 'styled-components';
import annotationImage from '@/assets/annotation-unsplash.jpg';
import annotationSmImage from '@/assets/annotation-unsplash-placeholder.jpg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useThemeContext } from '../context/ThemeContext';
import { _home as Container } from '@/styles/routes/_home';
import { app_features, app_metadata, comments } from '@/shared/data';

export default function Home() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { colorScheme } = useThemeContext();
  const { appName, repository, author } = app_metadata;

  const contacts: Contact[] = [
    {
      alias: '@Gmail',
      path: author.email,
      icon: RiMailLine
    },
    {
      alias: '@LinkedIn',
      path: author.linkedin,
      icon: RiLinkedinBoxLine
    },
    {
      alias: '@Portfolio',
      path: author.portfolio,
      icon: RiProfileLine
    },
    {
      alias: '@Github',
      path: author.github,
      icon: RiGithubLine
    }
  ];

  return (
    <Layout
      renderHeader
      renderFooter
      metadata={{ title: `${appName} | Overview` }}>
      <Container>
        <div className='wrapper-container'>
          <article>
            <section id='overview' className='introduction-container'>
              <motion.h1
                initial={{ scale: 0, x: 820, opacity: 0 }}
                animate={{ scale: 1, x: 0, opacity: 1 }}>
                <span>
                  Collect <i>your</i> thoughts and convert into <i>notes</i>!
                </span>
              </motion.h1>

              <motion.p
                initial={{ scale: 0, x: -820, opacity: 0 }}
                animate={{
                  scale: 1,
                  x: 0,
                  opacity: 1,
                  transition: { delay: 0.2 }
                }}>
                All your notes, synced on your devices. Get started with{' '}
                {appName} now for free on all your devices or use it in your
                browser.
              </motion.p>

              <div className='action-buttons'>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  className='browser-button'
                  onClick={() =>
                    navigate('/workspace?tab=all-notes&folder=none')
                  }>
                  <span>Get started</span>
                </motion.button>
                <motion.a
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  target='_blank'
                  href={repository}>
                  <span>Give a star</span>
                  <RiGithubLine />
                </motion.a>
              </div>

              <motion.div
                initial={{ y: -820, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: { delay: 0.4 }
                }}>
                <LazyLoadImage
                  src={
                    colorScheme.scheme === 'dark'
                      ? demoDarkImage
                      : demoLightImage
                  }
                  width={'100%'}
                  height={'100%'}
                  alt={`${appName} demo image`}
                  effect='blur'
                  placeholderSrc={
                    colorScheme.scheme === 'dark'
                      ? demoDarkSmImage
                      : demoLightSmImage
                  }
                />
              </motion.div>
            </section>

            <section id='learn' className='presentaion-container'>
              <LazyLoadImage
                src={annotationImage}
                effect='blur'
                width={'100%'}
                height={'100%'}
                alt={`${appName} demo image`}
                placeholderSrc={annotationSmImage}
              />

              <div className='content-container'>
                <h2>
                  Keep track of your annotations <i>more easier</i> than before
                </h2>

                <p>
                  Say goodbye to the hassle of juggling notes and ensure you
                  never miss important details again. With{' '}
                  <i>
                    <strong>Choconotey</strong>
                  </i>
                  , you can effortlessly capture your daily key insights.
                </p>

                <p>
                  Our innovative solution revolutionizes the way you document
                  your work. It streamlines the process, making it more
                  efficient and accurate. Embrace the future of work companion
                  with{' '}
                  <i>
                    <strong>Choconotey</strong>
                  </i>
                  .
                </p>
              </div>
            </section>

            <section id='features' className='features-container'>
              <motion.h2
                initial={{ opacity: 0, x: 200 }}
                whileInView={{ opacity: 1, x: 0 }}>
                Empowering features to boost your{' '}
                <i>productivity capabilities</i>...
              </motion.h2>
              <motion.h3
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}>
                We create deep expertise and outcomes-oriented methods to
                created meaningful impact for people.
              </motion.h3>

              <section>
                {app_features.map((feature, index) => (
                  <motion.div
                    whileHover={{
                      boxShadow: `0 0 25px rgba(${theme.black}, 0.09)`,
                      translateY: -8
                    }}
                    initial={{ scale: 0, opacity: 0, y: 200 }}
                    whileInView={{
                      scale: 1,
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.2, duration: 0.5 }
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
            </section>

            <section id='comments' className='comments-container'>
              <h2>
                <i>Trusted</i> by various type of people
              </h2>

              <section className='content-container'>
                {comments.map(({ comment, author }, index) => (
                  <motion.div
                    key={index}
                    className='comment-container'
                    initial={{ scale: 0, opacity: 0, y: -200 }}
                    whileInView={{
                      scale: 1,
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: index / comments.length,
                        duration: 0.5
                      }
                    }}>
                    <p className='comment'>{comment}</p>
                    <div className='author-container'>
                      <img
                        loading='lazy'
                        decoding='async'
                        src={author.picture}
                        alt={`${author.name} demo image`}
                        placeholder={`${author.name} demo image`}
                      />
                      <div className='author-details'>
                        <h3>{author.name}</h3>
                        <p>{author.carrier}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </section>
            </section>

            <section id='contact' className='contact-container'>
              <h2>Who is behind {appName}?</h2>
              <p>
                This app is developed by a indie developer, {author.name}, based
                in Maputo, Mozambique. Get in touch using one of the options
                below:
              </p>

              <div className='shields-container'>
                {contacts.map(({ alias, path, icon: Icon }, i) => (
                  <motion.a
                    key={path}
                    initial={{ scale: 0 }}
                    whileInView={{
                      scale: 1,
                      transition: { delay: i / contacts.length }
                    }}
                    data-tooltip-id={path}
                    data-tooltip-content={`${alias} | ${path}`}
                    href={path == author.email ? `mailto:${path}` : path}
                    target='_blank'
                    rel='noopener noreferrer'>
                    <Icon />
                    <Tooltip
                      id={path}
                      classNameArrow='tooltip-border-class'
                      className='tooltip-class'
                    />
                  </motion.a>
                ))}
              </div>
            </section>

            <motion.section
              className='call-to-action'
              initial={{ scale: 0, y: 100 }}
              whileInView={{ scale: 1, y: 0, transition: { duration: 0.5 } }}>
              <img
                loading='lazy'
                decoding='async'
                src={app_logo}
                alt={`${appName} logo image`}
                placeholder={`${appName} logo image`}
              />

              <h2>
                <span>
                  <i>Ready</i> to get started?
                </span>
              </h2>
              <p>
                Don't have an account yet? Sign up for a free account and take
                your produtivity to next level...
              </p>

              <div className='action-buttons'>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() =>
                    navigate('/workspace?tab=all-notes&folder=none')
                  }
                  className='browser-button'>
                  <span>Get started</span>
                </motion.button>
              </div>
            </motion.section>
          </article>
        </div>
      </Container>
    </Layout>
  );
}
