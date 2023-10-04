import actions from '@/shared/actions';
import EditorToolbar from './EditorToolbar';
import { CSSProperties, useState } from 'react';
import { StarterKit } from '@tiptap/starter-kit';
import { useAppContext } from '@/context/AppContext';
import { useThemeContext } from '@/context/ThemeContext';
import { EditorProvider, FloatingMenu, BubbleMenu } from '@tiptap/react';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import CharacterCount from '@tiptap/extension-character-count';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Dropcursor from '@tiptap/extension-dropcursor';
import GapCursor from '@tiptap/extension-gapcursor';
import { highlight } from 'lowlight';
import debounce from 'lodash.debounce';

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
        onUpdate={(props) => {
          console.info(props.editor.getHTML());
        }}
        editorProps={{}}
        slotBefore={<EditorToolbar />}>
        <FloatingMenu>This is the floating menu</FloatingMenu>
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
