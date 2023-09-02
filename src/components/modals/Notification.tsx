import { FC } from 'react';
import actions from '@/src/data/actions';
import { m as motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/src/context/AppContext';
import { _notification as Container } from '@/src/styles/modules/_notification';
import { ArrowLeftIcon, CardStackIcon, Cross2Icon } from '@radix-ui/react-icons';

const Notification: FC = (): JSX.Element => {
  const { state, dispatch } = useAppContext();

  return (
    <AnimatePresence>
      {state.notification.status && (
        <Container>
          <motion.section
            className='dialog-modal'
            initial={{ opacity: 0, y: 500 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 1.2 },
            }}
            exit={{
              opacity: 0,
              y: 500,
              transition: { duration: 1.2 },
            }}>
            <div className='dialog-prompt'>
              <div className='prompt-info'>
                <button
                  title='Close and dismiss'
                  className='box-btn_close'
                  onClick={() =>
                    dispatch({
                      type: actions.NOTIFICATION,
                      payload: {
                        ...state,
                        notification: { ...state.notification, status: false },
                      },
                    })
                  }>
                  <Cross2Icon />
                </button>
                <span className='prompt-title'>{state.notification.title}</span>
                <section className='prompt-message'>
                  {state.notification.message.includes('\n') ? (
                    state.notification.message
                      .split('\n')
                      .map((phrase) => <p>{phrase}</p>)
                  ) : (
                    <p>{state.notification.message}</p>
                  )}
                </section>
              </div>
              <div className='prompt-actions'>
                <button
                  className='prompt-cancel'
                  onClick={() =>
                    dispatch({
                      type: actions.NOTIFICATION,
                      payload: {
                        ...state,
                        notification: { ...state.notification, status: false },
                      },
                    })
                  }>
                  <ArrowLeftIcon />
                  <span>Dismiss</span>
                </button>
                <button
                  className='prompt-accept'
                  onClick={state.notification.handleFunction}>
                  <CardStackIcon />
                  <span>{state.notification.actionButtonMessage}</span>
                </button>
              </div>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default Notification;
