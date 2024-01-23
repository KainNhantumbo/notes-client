import {
  RiAppsLine,
  RiCloseLine,
  RiCodeSSlashLine,
  RiCopyrightLine
} from 'react-icons/ri';
import { m as motion, AnimatePresence } from 'framer-motion';
import { _about as Container } from '@/styles/modules/_about';
import { useAppContext } from '@/context/AppContext';
import { app_metadata } from '@/shared/data';
import actions from '@/shared/actions';

export default function About() {
  const { state, dispatch } = useAppContext();
  const { appName, version, copyright, license, author, contacts } =
    app_metadata;

  return (
    <AnimatePresence>
      {state.isAboutModal && (
        <Container
          className='main'
          onClick={(e) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const isTarget = (e as any).target.classList.contains('main');
            if (isTarget) {
              dispatch({
                type: actions.ABOUT_MODAL,
                payload: { ...state, isAboutModal: false }
              });
            }
          }}>
          <motion.section
            className='dialog-modal'
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.3 }
            }}
            exit={{ opacity: 0, scale: 0 }}>
            <div className='dialog-box'>
              <div className='box-info'>
                <h2 className='box-app-name'>
                  <span>
                    {appName} v{version}
                  </span>
                </h2>
                <h3>
                  <RiCodeSSlashLine />
                  <span>
                    <i>Developer:</i> {author.name}
                  </span>
                </h3>
              </div>

              <section className='contacts'>
                {contacts.map((contact) => (
                  <div key={contact.name} className='contact'>
                    {<contact.icon />}
                    <span>{contact.name}: </span>
                    <a
                      href={contact.url}
                      target={'_blank'}
                      rel={'noreferrer noopener'}>
                      {contact.url.replace('https://', '')}
                    </a>
                  </div>
                ))}
              </section>

              <div className='legal'>
                <h3>
                  <RiAppsLine />
                  <span>{license}</span>
                </h3>

                <h3>
                  <RiCopyrightLine />
                  <span> {copyright}</span>
                </h3>
              </div>
              <button
                title='Close Panel'
                className='box-btn'
                onClick={() =>
                  dispatch({
                    type: actions.ABOUT_MODAL,
                    payload: { ...state, isAboutModal: false }
                  })
                }>
                <RiCloseLine />
              </button>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
}
