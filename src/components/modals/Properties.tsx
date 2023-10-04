import {
  RiBubbleChartLine,
  RiClipboardLine,
  RiDeleteBin7Line,
  RiFileCopy2Line,
  RiHashtag,
  RiHistoryLine,
  RiTimerFlashLine,
  RiTimerLine
} from 'react-icons/ri';
import moment from 'moment';
import actions from '@/shared/actions';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useAppContext } from '@/context/AppContext';
import { AnimatePresence, m as motion } from 'framer-motion';
import { _properties as Container } from '@/styles/modules/_properties';

export default function Properties() {
  const { state, dispatch } = useAppContext();

  return (
    <AnimatePresence>
      {state.isPropertiesDrawer && (
        <Container>
          <motion.div
            className='main-container'
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, x: 300, transition: { duration: 0.5 } }}>
            <div className='header-container'>
              <h3>{state.currentNote.title || 'Untitled'}</h3>

              <motion.button
                whileTap={{ scale: 0.8 }}
                title='Close'
                className='box-btn_close'
                onClick={() =>
                  dispatch({
                    type: actions.PROPERTIES_DRAWER,
                    payload: {
                      ...state,
                      isPropertiesDrawer: false
                    }
                  })
                }>
                <Cross2Icon />
              </motion.button>
            </div>

            <div className='data-container'>
              <h2>
                <span>Properties</span>
              </h2>
              <section>
                <div className='item-container priority-container'>
                  <h3>
                    <RiTimerFlashLine />
                    <span>Priority: </span>
                  </h3>
                  <span>{state.currentNote.metadata.priority}</span>
                </div>

                <div className='item-container priority-container'>
                  <h3>
                    <RiBubbleChartLine />
                    <span>Status: </span>
                  </h3>
                  <span>{state.currentNote.metadata.status}</span>
                </div>
                {state.currentNote.metadata.tags.length > 0 ? (
                  <div className='item-container tags-container'>
                    <h3>
                      <RiHashtag />
                      <span>Tags: </span>
                    </h3>
                    <div className='tags-container_content'>
                      {state.currentNote.metadata.tags.map((tag) => (
                        <div
                          style={{ backgroundColor: tag.color }}
                          key={tag.id}>
                          <span>{tag.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className='item-container'>
                  <h3>
                    <RiTimerLine />
                    <span>Created:</span>
                  </h3>
                  <span>
                    {moment(state.currentNote.createdAt || Date.now()).format(
                      'DD-MM-YY, hh:mm:ss'
                    )}
                  </span>
                </div>
                <div className='item-container'>
                  <h3>
                    <RiHistoryLine />
                    <span>Updated</span>
                  </h3>
                  <span>
                    {moment(state.currentNote.updatedAt || Date.now()).format(
                      'DD-MM-YY, hh:mm:ss'
                    )}
                  </span>
                </div>
              </section>
            </div>

            <hr />

            <div className='actions-container'>
              <h2>
                <span>Actions</span>
              </h2>
              <section>
                <motion.button whileTap={{ scale: 0.8 }} className='action'>
                  <RiFileCopy2Line />
                  <span>Duplicate</span>
                </motion.button>

                <motion.button whileTap={{ scale: 0.8 }} className='action'>
                  <RiClipboardLine />
                  <span>Copy as text</span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.8 }}
                  className='action delete-button'>
                  <RiDeleteBin7Line />
                  <span>Move to trash</span>
                </motion.button>
              </section>
            </div>
          </motion.div>
        </Container>
      )}
    </AnimatePresence>
  );
}
