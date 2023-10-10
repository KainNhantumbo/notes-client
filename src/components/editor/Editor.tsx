import actions from '@/shared/actions';
import { CSSProperties } from 'react';
import EditorToolbar from './EditorToolbar';
import { StarterKit } from '@tiptap/starter-kit';
import { useAppContext } from '@/context/AppContext';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import { EditorProvider, BubbleMenu } from '@tiptap/react';
import FontFamily from '@tiptap/extension-font-family';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Subscript from '@tiptap/extension-subscript';
import Underline from '@tiptap/extension-underline';
import Superscript from '@tiptap/extension-superscript';
import Image from '@tiptap/extension-image';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';

export default function Editor() {
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
    <div className='editor-box-container'>
      <EditorProvider
        extensions={editorExtensions}
        content={state.currentNote.content}
        onUpdate={({ editor }) => {
          dispatch({
            type: actions.CURRENT_NOTE,
            payload: {
              ...state,
              currentNote: { ...state.currentNote, content: editor.getHTML() }
            }
          });
        }}
        editorProps={{ attributes: { class: 'editor-container' } }}
        slotBefore={<EditorToolbar />}>
        <BubbleMenu className='editor-bubble-menu'>
          <p></p>
        </BubbleMenu>
      </EditorProvider>
    </div>
  );
}

export const editorExtensions = [
  TextStyle,
  Typography,
  Subscript.configure({
    HTMLAttributes: { class: 'subscript-class' }
  }),
  Superscript.configure({
    HTMLAttributes: { class: 'superscript-class' }
  }),
  Underline.configure({
    HTMLAttributes: { class: 'underline-class' }
  }),
  Link.configure({
    protocols: ['ftp', 'mailto', 'http', 'https', 'tls'],
    openOnClick: false,
    linkOnPaste: true,
    HTMLAttributes: {
      class: 'link-class'
    }
  }),
  Image.configure({
    allowBase64: true,
    inline: false,
    HTMLAttributes: { class: 'image-class' }
  }),
  Placeholder.configure({
    emptyEditorClass: 'placeholder-class',
    placeholder: 'Start typing something...'
  }),
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TaskList.configure({
    HTMLAttributes: { class: 'task-list-class' }
  }),
  TaskItem.configure({
    nested: true,
    HTMLAttributes: { class: 'task-item-class' }
  }),
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: { class: 'headings-class' }
    },
    italic: { HTMLAttributes: { class: 'italics-class' } },
    bulletList: { keepMarks: true, keepAttributes: false },
    orderedList: { keepMarks: true, keepAttributes: false },
    dropcursor: { width: 3, class: 'dropcursor-class' }
  })
];
