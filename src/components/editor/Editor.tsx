import actions from '@/shared/actions';
import { CSSProperties, memo } from 'react';
import EditorToolbar from './EditorToolbar';
import { StarterKit } from '@tiptap/starter-kit';
import { useAppContext } from '@/context/AppContext';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import { EditorProvider } from '@tiptap/react';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Subscript from '@tiptap/extension-subscript';
import Underline from '@tiptap/extension-underline';
import Superscript from '@tiptap/extension-superscript';
import Image from '@tiptap/extension-image';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import BubbleMenu from './BubbleMenu';
import TextAlign from '@tiptap/extension-text-align';
import HighLight from '@tiptap/extension-highlight'

function Editor() {
  const { state, dispatch } = useAppContext();

  const editorStyles: CSSProperties = {
    fontFamily: state.settings.editor.font.font_family,
    fontSize: state.settings.editor.font.font_size,
    fontWeight: state.settings.editor.font.font_weight,
    lineHeight: `${String(state.settings.editor.font.line_height)} px`,
    wordWrap: 'break-word',
    lineBreak: 'anywhere',
    maxWidth: '1080px',
    maxHeight: '100%'
  };

  return (
    <div style={editorStyles} className='editor-box-container'>
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
        slotBefore={
          state.settings.editor.editing.enable_toolbar ? (
            <EditorToolbar />
          ) : null
        }>
        <BubbleMenu />
      </EditorProvider>
    </div>
  );
}

export default memo(Editor);

export const editorExtensions = [
  TextStyle.configure({ HTMLAttributes: { class: 'text-style-class' } }),
  Typography,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    alignments: ['left', 'center', 'right', 'justify'],
    defaultAlignment: 'left'
  }),
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
    nested: false,
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
    dropcursor: { width: 2, color: 'rgb(228, 113, 49)' },
    code: { HTMLAttributes: { class: 'code-class' } },
    blockquote: { HTMLAttributes: { class: 'blockquote-class' } },
    horizontalRule: { HTMLAttributes: { class: 'hr-class' } },
    codeBlock: { HTMLAttributes: { class: 'code-block-class' } }
  })
];
