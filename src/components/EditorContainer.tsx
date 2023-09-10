import { Editor } from './Editor';
import { CSSProperties, FC } from 'react';
import { CustomTools } from './CustomTools';
import { useAppContext } from '@/context/AppContext';
import { DesktopIcon } from '@radix-ui/react-icons';

const styles: CSSProperties = {
  width: '100%',
  height: '100%',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
};

const EditorContainer: FC = (): JSX.Element => {
  const { state } = useAppContext();
  return (
    <div style={{ ...styles }}>
      {state.currentNote._id ? (
        <>
          <CustomTools />
          <Editor />
        </>
      ) : (
        <section className='empty-editor-cover'>
          <div className='content'>
            <DesktopIcon />
            <h3>
              <span>Note Editor</span>
            </h3>
            <p>
              Press <i>Compose</i> button to start writing a note or click a
              note to view here
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

export default EditorContainer;
