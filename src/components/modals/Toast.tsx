import actions from '@/shared/actions';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useAppContext } from '@/context/AppContext';
import { m as motion, AnimatePresence } from 'framer-motion';
import { _toast as Container } from '@/styles/modules/_toast';

export default function Toast() {
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
              transition: { duration: 1.2 }
            }}
            exit={{
              opacity: 0,
              y: 500,
              transition: { duration: 1.2 }
            }}>
            <div className='dialog-prompt'>
              <div className='prompt-info'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  title='Close and dismiss'
                  aria-label='Close and dismiss'
                  className='box-btn_close'
                  onClick={() =>
                    dispatch({
                      type: actions.TOAST,
                      payload: {
                        ...state,
                        toast: { ...state.toast, status: false }
                      }
                    })
                  }>
                  <Cross2Icon />
                </motion.button>
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
                <motion.button
                  title='Dismiss'
                  aria-label='Dismiss'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  className='prompt-cancel'
                  onClick={() =>
                    dispatch({
                      type: actions.TOAST,
                      payload: {
                        ...state,
                        toast: { ...state.toast, status: false }
                      }
                    })
                  }>
                  <span>Dismiss</span>
                </motion.button>

                {!state.toast.handleFunction ||
                !state.toast.actionButtonMessage ? null : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    title={state.toast.actionButtonMessage}
                    aria-label={state.toast.actionButtonMessage}
                    className='prompt-accept'
                    onClick={state.toast.handleFunction}>
                    <span>{state.toast.actionButtonMessage}</span>
                  </motion.button>
                )}
              </div>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
}
