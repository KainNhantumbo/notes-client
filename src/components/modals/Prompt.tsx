import actions from '@/shared/actions';
import { m as motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { _prompt as Container } from '@/styles/modules/_prompt';

export function PromptModal() {
  const { state, dispatch } = useAppContext();

  return (
    <AnimatePresence>
      {state.prompt.status && (
        <Container
          className='main'
          onClick={(e: any): void => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              dispatch({
                type: actions.PROMPT,
                payload: {
                  ...state,
                  prompt: { ...state.prompt, status: false }
                }
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
            <div className='dialog-prompt'>
              <div className='prompt-info'>
                <span className='prompt-title'>{state.prompt.title}</span>
                <p className='prompt-message'>{state.prompt.message}</p>
              </div>
              <div className='prompt-actions'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.8 }}
                  className='prompt-cancel'
                  onClick={() =>
                    dispatch({
                      type: actions.PROMPT,
                      payload: {
                        ...state,
                        prompt: { ...state.prompt, status: false }
                      }
                    })
                  }>
                  <span>Cancel</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.8 }}
                  className='prompt-accept'
                  onClick={state.prompt.handleFunction}>
                  <span>{state.prompt.actionButtonMessage}</span>
                </motion.button>
              </div>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
}
