import EditorToolbar from './EditorToolbar';
import { CSSProperties } from 'react';
import { StarterKit } from '@tiptap/starter-kit';
import { useAppContext } from '@/context/AppContext';
import { useThemeContext } from '@/context/ThemeContext';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import { EditorProvider, FloatingMenu, BubbleMenu } from '@tiptap/react';
import actions from '@/shared/actions';

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

  return (
    <div
      style={{ width: '100%', height: 'fit-content' }}
      data-color-mode={colorScheme.scheme}>
      <EditorProvider
        extensions={editorExtensions}
        content={state.currentNote.content}
        onUpdate={({ editor, transaction }) => {
          console.info(editor.getText());
          dispatch({
            type: actions.CURRENT_NOTE,
            payload: {
              ...state,
              currentNote: { ...state.currentNote, content: editor.getText() }
            }
          });
        }}
        editorProps={{ attributes: { class: 'editor-container' } }}
        slotBefore={<EditorToolbar />}>
        {/* <FloatingMenu></FloatingMenu> */}
        <BubbleMenu>This is the bubble menu</BubbleMenu>
      </EditorProvider>
    </div>
  );
}

const editorExtensions = [
  TextStyle,
  Typography,
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {
        title: 'Select heading'
      }
    },
    bulletList: { keepMarks: true, keepAttributes: false },
    orderedList: { keepMarks: true, keepAttributes: false },
    dropcursor: {
      color: '#ff0000',
      width: 5,
      class: 'class-dropcursor'
    }
  })
];
