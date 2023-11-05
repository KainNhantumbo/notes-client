import {
  RiGithubLine,
  RiLinkedinBoxLine,
  RiMailLine,
  RiProfileLine
} from 'react-icons/ri';
import { Tooltip } from 'react-tooltip';
import { m as motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import demo_dark from '@/assets/demo-dark.png';
import app_logo from '@/assets/logo-192x192.png';
import demo_light from '@/assets/demo-light.png';
import { useTheme } from 'styled-components';
import { useThemeContext } from '../context/ThemeContext';
import { _home as Container } from '@/styles/routes/_home';
import { app_features, app_metadata, comments } from '@/shared/data';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { colorScheme } = useThemeContext();
  const { appName, repository, author } = app_metadata;

  return (
    <Layout
      renderHeader
      renderFooter
      metadata={{ title: `${appName} | Overview` }}>
      <Container>
        <div className='wrapper-container'>
          <article>
            <section className='introduction-container'>
              <h1>
                <span>Collect your thoughts and convert into notes</span>
              </h1>

              <p>
                All your notes, synced on your devices. Get started with{' '}
                {appName} now for free on all your devices or use it in your
                browser.
              </p>

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

              <img
                loading='lazy'
                decoding='async'
                src={colorScheme.scheme === 'dark' ? demo_dark : demo_light}
                alt={`${appName} demo image`}
                placeholder={`${appName} demo image`}
              />
            </section>

            <section className='presentaion-container'>
              <img
                loading='lazy'
                decoding='async'
                src={'/src/assets/annotation-unsplash.jpg'}
                alt={`${appName} demo image`}
                placeholder={`${appName} demo image`}
              />

              <div>
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
              <h2>
                Empowering features to boost your{' '}
                <i>productivity capabilities</i>...
              </h2>
              <section>
                {app_features.map((feature, index) => (
                  <motion.div
                    whileHover={{
                      boxShadow: `0 0 25px rgba(${theme.black}, 0.09)`,
                      translateY: -8
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

            <section className='comments-container'>
              <h2>
                <i>Trusted</i> by various type of people
              </h2>

              <section className='content-container'>
                {comments.map(({ comment, author }, index) => (
                  <div key={index} className='comment-container'>
                    <p>{comment}</p>
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
                  </div>
                ))}
              </section>
            </section>

            <section className='identity-container'>
              <h2>Who is behind {appName}?</h2>
              <p>
                This app is developed by a indie developer, {author.name}, based
                in Maputo, Mozambique.
              </p>

              <div className='shields-container'>
                <a
                  data-tooltip-id={author.email}
                  data-tooltip-content={`@Gmail | ${author.email}`}
                  href={`mailto:${author.email}`}
                  target='_blank'
                  rel='noopener noreferrer'>
                  <RiMailLine />
                  <Tooltip
                    classNameArrow='tooltip-border-class'
                    className='tooltip-class'
                    id={author.email}
                  />
                </a>
                <a
                  href={author.github}
                  data-tooltip-id={author.github}
                  data-tooltip-content={`@Github | ${author.github}`}
                  target='_blank'
                  rel='noopener noreferrer'>
                  <RiGithubLine />
                  <Tooltip
                    classNameArrow='tooltip-border-class'
                    className='tooltip-class'
                    id={author.github}
                  />
                </a>

                <a
                  href={author.portfolio}
                  data-tooltip-id={author.portfolio}
                  data-tooltip-content={`@Homepage | ${author.portfolio}`}
                  target='_blank'
                  rel='noopener noreferrer'>
                  <RiProfileLine />
                  <Tooltip
                    classNameArrow='tooltip-border-class'
                    className='tooltip-class'
                    id={author.portfolio}
                  />
                </a>

                <a
                  href={author.linkedin}
                  data-tooltip-id={author.linkedin}
                  data-tooltip-content={`@LinkedIn | ${author.linkedin}`}
                  target='_blank'
                  rel='noopener noreferrer'>
                  <RiLinkedinBoxLine />
                  <Tooltip
                    classNameArrow='tooltip-border-class'
                    className='tooltip-class'
                    id={author.linkedin}
                  />
                </a>
              </div>
            </section>

            <section className='call-to-action'>
              <img
                loading='lazy'
                decoding='async'
                src={app_logo}
                alt={`${appName} logo image`}
                placeholder={`${appName} logo image`}
              />

              <h2>
                <span>Ready to get started?</span>
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
            </section>
          </article>
        </div>
      </Container>
    </Layout>
  );
}
