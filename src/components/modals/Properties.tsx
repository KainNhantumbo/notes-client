import { FC, JSX } from 'react';
import actions from '@/data/actions';
import { useAppContext } from '@/context/AppContext';
import { AnimatePresence, m as motion } from 'framer-motion';
import { _properties as Container } from '@/styles/modules/_properties';
import { Cross2Icon } from '@radix-ui/react-icons';

const Properties: FC = (): JSX.Element => {
  const { state, dispatch } = useAppContext();
  return (
    <AnimatePresence>
      {state.isPropertiesModal && (
        <Container
          className='main'
          onClick={(e: any): void => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              dispatch({
                type: actions.PROPERTIES_MODAL,
                payload: {
                  ...state,
                  isPropertiesModal: false,
                },
              });
            }
          }}>
          <motion.section
            className='dialog-modal'
            initial={{ x: -300 }}
            animate={{ x: 0, transition: { duration: 0.3 } }}
            exit={{ x: 300 }}>
            <div className='header-container'>
              <h3>Properties</h3>
              <motion.button
                whileTap={{ scale: 0.8 }}
                title='Close'
                className='box-btn_close'
                onClick={() =>
                  dispatch({
                    type: actions.PROPERTIES_MODAL,
                    payload: {
                      ...state,
                      isPropertiesModal: false,
                    },
                  })
                }>
                <Cross2Icon />
              </motion.button>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default Properties;
