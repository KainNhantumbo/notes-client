import actions from '@/shared/actions';
import { RiCloseLine } from 'react-icons/ri';
import { useAppContext } from '@/context/AppContext';
import { AnimatePresence, m as motion } from 'framer-motion';
import { _editorToolsToggler as Container } from '@/styles/modules/_editor-tools-toggler';
import { useMemo } from 'react';
import { FetchError, Settings } from '@/types';

export default function EditorToolsToggler() {
  const { state, dispatch, useFetchAPI } = useAppContext();

  const syncSettings = async (data: Settings) => {
    try {
      await useFetchAPI({ method: 'patch', url: '/api/v1/settings', data });
    } catch (error) {
      console.error((error as FetchError).response?.data?.message || error);
      dispatch({
        type: actions.TOAST,
        payload: {
          ...state,
          toast: {
            title: 'Settings Sync Error',
            message:
              (error as FetchError).response?.data?.message || 'Failed to sync your settings.',
            status: true,
            actionButtonMessage: 'Retry',
            handleFunction: syncSettings
          }
        }
      });
    }
  };

  const handleToggle = (key: string, value: boolean) => {
    const data: Settings = {
      ...state.settings,
      editor: {
        ...state.settings.editor,
        toolbar: { ...state.settings.editor.toolbar, [key]: value }
      }
    };

    dispatch({
      type: actions.SETTINGS,
      payload: { ...state, settings: data }
    });

    syncSettings(data);
  };

  const options = useMemo(() => {
    return Object.entries(state.settings.editor.toolbar).map(
      ([key, value]) => ({
        value: value,
        key
      })
    );
  }, [state.settings]);

  return (
    <AnimatePresence>
      {state.isEditorToolsTogglerModal && (
        <Container
          className='main'
          onClick={(e): void => {
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
                  Switch on or off the tools that appear on your editor toolbar.
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
