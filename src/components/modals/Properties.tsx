import {
  ClockIcon,
  CopyIcon,
  CounterClockwiseClockIcon,
  Cross2Icon,
  LayersIcon,
  StackIcon,
  TokensIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import moment from 'moment';
import actions from '@/data/actions';
import { useAppContext } from '@/context/AppContext';
import { AnimatePresence, m as motion } from 'framer-motion';
import { _properties as Container } from '@/styles/modules/_properties';

export function Properties() {
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
            <div className='data-container'>
              <h2>
                <span>Note Properties</span>
              </h2>
              <section>
                <div className='item-conainer priority-container'>
                  <h3>
                    <LayersIcon />
                    <span>Priority</span>
                  </h3>
                  <span>
                    {state.currentNote.metadata.priority.toUpperCase()}
                  </span>
                </div>
                <div className='item-conainer label-container'>
                  <h3>
                    <TokensIcon />
                    <span>Label</span>
                  </h3>
                  <span>{state.currentNote.metadata.status.toUpperCase()}</span>
                </div>

                {state.currentNote.metadata.tags.length > 0 ? (
                  <div className='item-conateiner'>
                    <h3>
                      <StackIcon />
                      <span>Tags</span>
                    </h3>
                    <div className='tags-container'>
                      {state.currentNote.metadata.tags.map((tag) => (
                        <span
                          style={{ backgroundColor: tag.color }}
                          key={tag.id}>
                          {tag.value}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className='item-conainer'>
                  <h3>
                    <ClockIcon />
                    <span>Created</span>
                  </h3>
                  <span>
                    {moment(state.currentNote.createdAt).format('LL')}
                  </span>
                </div>
                <div className='item-conainer'>
                  <h3>
                    <CounterClockwiseClockIcon />
                    <span>Updated</span>
                  </h3>
                  <span>
                    {moment(state.currentNote.updatedAt).format('LL')}
                  </span>
                </div>
              </section>
            </div>

            <div className='actions-container'>
              <h2>
                <span>Note actions</span>
              </h2>
              <section>
                <motion.button whileTap={{ scale: 0.8 }} className='action'>
                  <CopyIcon />
                  <span>Duplicate</span>
                </motion.button>
                <motion.button whileTap={{ scale: 0.8 }} className='action'>
                  <TrashIcon />
                  <span>Move to Trash</span>
                </motion.button>
              </section>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
}
