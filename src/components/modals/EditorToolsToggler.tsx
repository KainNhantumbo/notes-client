import actions from '@/shared/actions';
import { RiCloseLine } from 'react-icons/ri';
import { useAppContext } from '@/context/AppContext';
import { AnimatePresence, m as motion } from 'framer-motion';
import { _editorToolsToggler as Container } from '@/styles/modules/_editor-tools-toggler';

export default function EditorToolsToggler() {
  const { state, dispatch } = useAppContext();

  const handleToggle = (key: string, value: boolean) => {
    dispatch({
      type: actions.SETTINGS,
      payload: {
        ...state,
        settings: {
          ...state.settings,
          editor: {
            ...state.settings.editor,
            toolbar: { ...state.settings.editor.toolbar, [key]: value }
          }
        }
      }
    });

    console.log(state.settings.editor.toolbar);
    console.log({ [key]: value });
  };

  const options = Object.entries(state.settings.editor.toolbar).map(
    ([key, value]) => ({ value: value, key })
  );

  return (
    <AnimatePresence>
      {state.isEditorToolsTogglerModal && (
        <Container
          className='main'
          onClick={(e: any): void => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              dispatch({
                type: actions.EDITOR_TOOLS_TOGGLER_MODAL,
                payload: {
                  ...state,
                  isEditorToolsTogglerModal: false
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
                <span className='prompt-title'>Toolbar Settings</span>
                <p className='prompt-message'>
                  Switch on or off the tools that will appear on the toolbar
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.8 }}
                className='button-close'
                onClick={() =>
                  dispatch({
                    type: actions.EDITOR_TOOLS_TOGGLER_MODAL,
                    payload: {
                      ...state,
                      isEditorToolsTogglerModal: false
                    }
                  })
                }>
                <RiCloseLine />
              </motion.button>

              <section className='options-container'>
                {options.map((option, index) => (
                  <div key={index} className='option'>
                    <label htmlFor={`tool-${index}`} id={`tool-${index}`}>
                      <span>{option.key.toLowerCase()}</span>
                    </label>
                    <input
                      type='checkbox'
                      checked={option.value}
                      id={`tool-${index}`}
                      onChange={(e) =>
                        handleToggle(option.key, e.target.checked)
                      }
                    />
                  </div>
                ))}
              </section>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
}
