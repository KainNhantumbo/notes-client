import { useAppContext } from '@/context/AppContext';
import actions from '@/shared/actions';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import { EditorProvider, ReactNodeViewRenderer } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import css from 'highlight.js/lib/languages/css';
import go from 'highlight.js/lib/languages/go';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { lowlight } from 'lowlight/lib/core';
import * as React from 'react';
import BubbleMenu from './BubbleMenu';
import CodeBlockWrapper from './CodeBlockWrapper.tsx';
import EditorToolbar from './EditorToolbar';

lowlight.registerLanguage('html', html);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('js', js);
lowlight.registerLanguage('ts', ts);
lowlight.registerLanguage('go', go);

function Editor(): JSX.Element {
  const { state, dispatch } = useAppContext();

  const editorStyles: React.CSSProperties = React.useMemo(
    () => ({
      fontFamily: state.settings.editor.font.font_family,
      fontSize: state.settings.editor.font.font_size,
      fontWeight: state.settings.editor.font.font_weight,
      lineHeight: `${String(state.settings.editor.font.line_height)} px`,
      wordWrap: 'break-word',
      lineBreak: 'anywhere',
      maxWidth: '1080px',
      overflow: 'auto',
      position: 'relative'
    }),
    [state.settings]
  );

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
          state.settings.editor.editing.enable_toolbar ? <EditorToolbar /> : null
        }>
        <BubbleMenu />
      </EditorProvider>
    </div>
  );
}

export default React.memo(Editor);

export const editorExtensions = [
  Typography,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    alignments: ['left', 'center', 'right', 'justify'],
    defaultAlignment: 'left'
  }),
  Subscript.configure({ HTMLAttributes: { class: 'subscript-class' } }),
  Superscript.configure({ HTMLAttributes: { class: 'superscript-class' } }),
  Underline.configure({ HTMLAttributes: { class: 'underline-class' } }),
  Link.configure({
    protocols: ['ftp', 'mailto', 'http', 'https', 'tls'],
    openOnClick: false,
    linkOnPaste: true,
    HTMLAttributes: { class: 'link-class' }
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
  Highlight.configure({
    HTMLAttributes: { class: 'highlight-class' },
    multicolor: false
  }),
  TaskList.configure({
    HTMLAttributes: { class: 'task-list-class' }
  }),
  TaskItem.configure({
    nested: false,
    HTMLAttributes: { class: 'task-item-class' }
  }),
  CodeBlockLowlight.extend({
    addNodeView() {
      return ReactNodeViewRenderer(CodeBlockWrapper, {
        attrs: { language: 'javascript' }
      });
    }
  }).configure({ lowlight }),

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
    codeBlock: false
  })
];
