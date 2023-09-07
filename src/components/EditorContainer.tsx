import { Editor } from './Editor';
import { CSSProperties, FC } from 'react';
import { CustomTools } from './CustomTools';

const styles: CSSProperties = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
};

const EditorContainer: FC = (): JSX.Element => {
  return (
    <div style={{ ...styles }}>
      <CustomTools />
      <Editor />
    </div>
  );
};

export default EditorContainer;
