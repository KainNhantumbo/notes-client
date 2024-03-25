import { useAppContext } from '@/context/AppContext';
import actions from '@/shared/actions';
import { _editorToolbar as Container } from '@/styles/modules/_editor-toolbar';
import { useCurrentEditor } from '@tiptap/react';
import * as Ri from 'react-icons/ri';
import { Tooltip } from 'react-tooltip';
import Headings from './Headings';
import Image from './Image';
import TextAlign from './TextAlign';

export default function EditorToolbar() {
  const { editor } = useCurrentEditor();
  const { state, dispatch, syncCurrentNote } = useAppContext();

  if (!editor) return null;

  const saveNoteChanges = () => {
    syncCurrentNote();
    dispatch({
      type: actions.TOAST,
      payload: {
        ...state,
        toast: {
          title: 'Note Sync',
          message: 'Note changes saved successfully!',
          status: true,
          closeOnDelay: true
        }
      }
    });
  };

  return (
    <Container>
      <section className='toolbar-wrapper-container'>
        {!state.settings.editor.auto_save.enabled ? (
          <button
            data-tooltip-id='save'
            data-tooltip-content='Save changes'
            onClick={saveNoteChanges}
            disabled={false}>
            <Ri.RiSave2Line />
            <Tooltip
              classNameArrow='tooltip-border-class'
              className='tooltip-class'
              id='save'
            />
          </button>
        ) : null}

        {state.settings.editor.toolbar.undo ? (
          <button
            data-tooltip-id='undo'
            data-tooltip-content='Undo'
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}>
            <Ri.RiArrowGoBackLine />
            <Tooltip
              classNameArrow='tooltip-border-class'
              className='tooltip-class'
              id='undo'
            />
          </button>
        ) : null}

        {state.settings.editor.toolbar.redo ? (
          <button
            data-tooltip-id='redo'
            data-tooltip-content='Redo'
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}>
            <Ri.RiArrowGoForwardLine />
            <Tooltip
              classNameArrow='tooltip-border-class'
              className='tooltip-class'
              id='redo'
            />
          </button>
        ) : null}

        {state.settings.editor.toolbar.bold ? (
          <button
            data-tooltip-id='bold'
            data-tooltip-content='Toggle Bold'
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}>
            <Ri.RiBold />
            <Tooltip
              classNameArrow='tooltip-border-class'
              className='tooltip-class'
              id='bold'
            />
          </button>
        ) : null}

        {state.settings.editor.toolbar.italic ? (
          <button
            data-tooltip-id='italic'
            data-tooltip-content='Toggle Italic'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}>
            <Ri.RiItalic />
            <Tooltip
              classNameArrow='tooltip-border-class'
              className='tooltip-class'
              id='italic'
            />
          </button>
        ) : null}

        {state.settings.editor.toolbar.headings ? <Headings /> : null}

        {state.settings.editor.toolbar.underline ? (
          <button
            data-tooltip-id='underline'
            data-tooltip-content='Toggle Underline'
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'is-active' : ''}>
            <Ri.RiUnderline />
            <Tooltip
              classNameArrow='tooltip-border-class'
              className='tooltip-class'
              id='underline'
            />
          </button>
        ) : null}

        {state.settings.editor.toolbar.textAlign ? <TextAlign /> : null}

        {state.settings.editor.toolbar.strike ? (
          <button
            data-tooltip-id='strike'
            data-tooltip-content='Toggle Strike'
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}>
            <Ri.RiStrikethrough />
            <Tooltip
              classNameArrow='tooltip-border-class'
              className='tooltip-class'
              id='strike'
            />
          </button>
        ) : null}

        {state.settings.editor.toolbar.highlight ? (
          <button
            data-tooltip-id='highlight-text'
            data-tooltip-content='Highlight'
            type='button'
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive('highlight') ? 'is-active' : ''}>
            <Ri.RiMarkPenLine />
            <Tooltip
              classNameArrow='tooltip-border-class'
              className='tooltip-class'
              id='highlight-text'
            />
          </button>
        ) : null}

        {state.settings.editor.toolbar.subscript ? (
          <button
            data-tooltip-id='subscript'
            data-tooltip-content='Toggle Subscript'
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            disabled={!editor.can().chain().focus().toggleSubscript().run()}
            className={editor.isActive('subscript') ? 'is-active' : ''}>
            <Ri.RiSubscript />
            <Tooltip
              classNameArrow='tooltip-border-class'
              className='tooltip-class'
              id='subscript'
            />
          </button>
        ) : null}

        {state.settings.editor.toolbar.superscript ? (
          <button
            data-tooltip-id='superscript'
            data-tooltip-content='Toggle Superscript'
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            disabled={!editor.can().chain().focus().toggleSuperscript().run()}
            className={editor.isActive('superscript') ? 'is-active' : ''}>
            <Ri.RiSuperscript />
            <Tooltip
              classNameArrow='tooltip-border-class'
              className='tooltip-class'
              id='superscript'
            />
          </button>
        ) : null}

        {state.settings.editor.toolbar.code ? (
          <button
            data-tooltip-id='code'
            data-tooltip-content='Inline Code'
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={editor.isActive('code') ? 'is-active' : ''}>
            <Ri.RiCodeLine />
            <Tooltip
              classNameArrow='tooltip-border-class'
              className='tooltip-class'
              id='code'
            />
          </button>
        ) : null}

        {state.settings.editor.toolbar.paragraph ? (
          <button
            data-tooltip-id='paragraph'
            data-tooltip-content='Paragraph'
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? 'is-active' : ''}>
            <Ri.RiParagraph />
            <Tooltip
              classNameArrow='tooltip-border-class'
              className='tooltip-class'
              id='paragraph'
            />
          </button>
        ) : null}

        {state.settings.editor.toolbar.bulletList ? (
          <button
            data-tooltip-id='bullet-list'
            data-tooltip-content='Toggle Bullet List'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}>
            <Ri.RiListRadio />
            <Tooltip
              classNameArrow='tooltip-border-class'
              className='tooltip-class'
              id='bullet-list'
            />
          </button>
        ) : null}

        {state.settings.editor.toolbar.orderedList ? (
          <button
            data-tooltip-id='ordered-list'
            data-tooltip-content='Toggle Ordered List'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}>
            <Ri.RiListOrdered2 />
            <Tooltip
              classNameArrow='tooltip-border-class'
              className='tooltip-class'
              id='ordered-list'
            />
          </button>
        ) : null}

        {state.settings.editor.toolbar.taskList ? (
          <button
            data-tooltip-id='task-list'
            data-tooltip-content='Toggle Task List'
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={editor.isActive('taskList') ? 'is-active' : ''}>
            <Ri.RiListCheck2 />
            <Tooltip
              classNameArrow='tooltip-border-class'
              className='tooltip-class'
              id='task-list'
            />
          </button>
        ) : null}

        {state.settings.editor.toolbar.codeBlock ? (
          <button
            data-tooltip-id='code-block'
            data-tooltip-content='Insert Code Block'
            type='button'
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}>
            <Ri.RiBracesLine />
            <Tooltip
              classNameArrow='tooltip-border-class'
              className='tooltip-class'
              id='code-block'
            />
          </button>
        ) : null}

        {state.settings.editor.toolbar.blockquote ? (
          <button
            data-tooltip-id='blockquote'
            data-tooltip-content='Toggle Blockquote'
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}>
            <Ri.RiDoubleQuotesR />
            <Tooltip
              classNameArrow='tooltip-border-class'
              className='tooltip-class'
              id='blockquote'
            />
          </button>
        ) : null}

        {state.settings.editor.toolbar.image ? <Image /> : null}

        {state.settings.editor.toolbar.horizontalRuler ? (
          <button
            data-tooltip-id='horizontal-ruler'
            data-tooltip-content='Insert Horizontal Ruler'
            onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            <Ri.RiRulerLine />
            <Tooltip
              classNameArrow='tooltip-border-class'
              className='tooltip-class'
              id='horizontal-ruler'
            />
          </button>
        ) : null}

        {state.settings.editor.toolbar.hardBreak ? (
          <button
            data-tooltip-id='hard-break'
            data-tooltip-content='Insert Hard Break'
            onClick={() => editor.chain().focus().setHardBreak().run()}>
            <Ri.RiTextWrap />
            <Tooltip
              classNameArrow='tooltip-border-class'
              className='tooltip-class'
              id='hard-break'
            />
          </button>
        ) : null}

        <button
          data-tooltip-id='toolbar-settings'
          data-tooltip-content='Toolbar Settings'
          onClick={() =>
            dispatch({
              type: actions.EDITOR_TOOLS_TOGGLER_MODAL,
              payload: { ...state, isEditorToolsTogglerModal: true }
            })
          }>
          <Ri.RiSettings5Line />
          <Tooltip
            classNameArrow='tooltip-border-class'
            className='tooltip-class'
            id='toolbar-settings'
          />
        </button>
      </section>
    </Container>
  );
}
