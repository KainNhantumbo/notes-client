import actions from '@/shared/actions';
import EditorToolbar from './EditorToolbar';
import { CSSProperties, useState } from 'react';
import { StarterKit } from '@tiptap/starter-kit';
import { useAppContext } from '@/context/AppContext';
import { useThemeContext } from '@/context/ThemeContext';
import { EditorProvider, FloatingMenu, BubbleMenu } from '@tiptap/react';

const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {
        title: 'Select heading'
      }
    }
  })
];

export default function Editor() {
  const { colorScheme } = useThemeContext();
  const { state, dispatch } = useAppContext();

  const editorStyles: CSSProperties = {
    fontFamily: state.settings.editor.font.font_family,
    fontSize: state.settings.editor.font.font_size,
    fontWeight: state.settings.editor.font.font_weight,
    lineHeight: `${String(state.settings.editor.font.line_height)} px`,
    wordWrap: 'break-word',
    lineBreak: 'anywhere',
    maxWidth: '1080px'
  };

  const [data, setData] = useState('');

  return (
    <div
      style={{ width: '100%', height: 'fit-content' }}
      data-color-mode={colorScheme.scheme}>
      <EditorProvider
        extensions={extensions}
        content={data}
        editorProps={{}}
        slotBefore={<EditorToolbar />}>
        <FloatingMenu>This is the floating menu</FloatingMenu>
        <BubbleMenu>This is the bubble menu</BubbleMenu>
      </EditorProvider>
    </div>
  );
}
