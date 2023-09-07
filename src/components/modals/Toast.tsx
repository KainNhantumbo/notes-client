import { FC } from 'react';
import actions from '@/data/actions';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useAppContext } from '@/context/AppContext';
import { m as motion, AnimatePresence } from 'framer-motion';
import { _toast as Container } from '@/styles/modules/_toast';

const Toast: FC = (): JSX.Element => {
  const { state, dispatch } = useAppContext();

  return (
    <AnimatePresence>
      {state.toast.status && (
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
                      type: actions.TOAST,
                      payload: {
                        ...state,
                        toast: { ...state.toast, status: false },
                      },
                    })
                  }>
                  <Cross2Icon />
                </button>
                <span className='prompt-title'>{state.toast.title}</span>
                <section className='prompt-message'>
                  {state.toast.message.includes('\n') ? (
                    state.toast.message
                      .split('\n')
                      .map((phrase) => <p>{phrase}</p>)
                  ) : (
                    <p>{state.toast.message}</p>
                  )}
                </section>
              </div>
              <div className='prompt-actions'>
                <button
                  className='prompt-cancel'
                  onClick={() =>
                    dispatch({
                      type: actions.TOAST,
                      payload: {
                        ...state,
                        toast: { ...state.toast, status: false },
                      },
                    })
                  }>
                  <span>Dismiss</span>
                </button>
                <button
                  className='prompt-accept'
                  onClick={state.toast.handleFunction}>
                  <span>{state.toast.actionButtonMessage}</span>
                </button>
              </div>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default Toast;
