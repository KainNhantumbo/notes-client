import {
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiBold,
  RiBracesLine,
  RiCodeLine,
  RiDoubleQuotesR,
  RiFontColor,
  RiItalic,
  RiListCheck2,
  RiListOrdered2,
  RiListRadio,
  RiParagraph,
  RiRulerLine,
  RiSave2Line,
  RiStrikethrough,
  RiSubscript,
  RiSuperscript,
  RiTextWrap,
  RiUnderline
} from 'react-icons/ri';
import Image from './Image';
import Headings from './Hedings';
import { Tooltip } from 'react-tooltip';
import { useCurrentEditor } from '@tiptap/react';
import { _editorToolbar as Container } from '@/styles/modules/_editor-toolbar';
import { useAppContext } from '@/context/AppContext';
import actions from '@/shared/actions';

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
            <RiSave2Line />
            <Tooltip
              classNameArrow='tooltip-border-class'
              className='tooltip-class'
              id='save'
            />
          </button>
        ) : null}

        <button
          data-tooltip-id='undo'
          data-tooltip-content='Undo'
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}>
          <RiArrowGoBackLine />
          <Tooltip
            classNameArrow='tooltip-border-class'
            className='tooltip-class'
            id='undo'
          />
        </button>

        <button
          data-tooltip-id='redo'
          data-tooltip-content='Redo'
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}>
          <RiArrowGoForwardLine />
          <Tooltip
            classNameArrow='tooltip-border-class'
            className='tooltip-class'
            id='redo'
          />
        </button>

        <button
          data-tooltip-id='bold'
          data-tooltip-content='Toggle Bold'
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}>
          <RiBold />
          <Tooltip
            classNameArrow='tooltip-border-class'
            className='tooltip-class'
            id='bold'
          />
        </button>

        <button
          data-tooltip-id='italic'
          data-tooltip-content='Toggle Italic'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}>
          <RiItalic />
          <Tooltip
            classNameArrow='tooltip-border-class'
            className='tooltip-class'
            id='italic'
          />
        </button>

        <button
          data-tooltip-id='underline'
          data-tooltip-content='Toggle Underline'
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}>
          <RiUnderline />
          <Tooltip
            classNameArrow='tooltip-border-class'
            className='tooltip-class'
            id='underline'
          />
        </button>

        <button
          data-tooltip-id='strike'
          data-tooltip-content='Toggle Strike'
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}>
          <RiStrikethrough />
          <Tooltip
            classNameArrow='tooltip-border-class'
            className='tooltip-class'
            id='strike'
          />
        </button>

        <Headings />

        <button
          data-tooltip-id='subscript'
          data-tooltip-content='Toggle Subscript'
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          disabled={!editor.can().chain().focus().toggleSubscript().run()}
          className={editor.isActive('subscript') ? 'is-active' : ''}>
          <RiSubscript />
          <Tooltip
            classNameArrow='tooltip-border-class'
            className='tooltip-class'
            id='subscript'
          />
        </button>

        <button
          data-tooltip-id='superscript'
          data-tooltip-content='Toggle Superscript'
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          disabled={!editor.can().chain().focus().toggleSuperscript().run()}
          className={editor.isActive('superscript') ? 'is-active' : ''}>
          <RiSuperscript />
          <Tooltip
            classNameArrow='tooltip-border-class'
            className='tooltip-class'
            id='superscript'
          />
        </button>
        <button
          data-tooltip-id='code'
          data-tooltip-content='Inline Code'
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active' : ''}>
          <RiCodeLine />
          <Tooltip
            classNameArrow='tooltip-border-class'
            className='tooltip-class'
            id='code'
          />
        </button>

        <button
          data-tooltip-id='text-style'
          data-tooltip-content='Toggle Text Style'
          type='button'
          onClick={() => editor.chain().focus().setColor('#E47131').run()}
          className={
            editor.isActive('textStyle', { color: '#E47131' })
              ? 'is-active'
              : ''
          }>
          <RiFontColor />
          <Tooltip
            classNameArrow='tooltip-border-class'
            className='tooltip-class'
            id='text-style'
          />
        </button>

        <button
          data-tooltip-id='paragraph'
          data-tooltip-content='Paragraph'
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}>
          <RiParagraph />
          <Tooltip
            classNameArrow='tooltip-border-class'
            className='tooltip-class'
            id='paragraph'
          />
        </button>

        <button
          data-tooltip-id='bullet-list'
          data-tooltip-content='Toggle Bullet List'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}>
          <RiListRadio />
          <Tooltip
            classNameArrow='tooltip-border-class'
            className='tooltip-class'
            id='bullet-list'
          />
        </button>

        <button
          data-tooltip-id='ordered-list'
          data-tooltip-content='Toggle Ordered List'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}>
          <RiListOrdered2 />
          <Tooltip
            classNameArrow='tooltip-border-class'
            className='tooltip-class'
            id='ordered-list'
          />
        </button>

        <button
          data-tooltip-id='task-list'
          data-tooltip-content='Toggle Task List'
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={editor.isActive('taskList') ? 'is-active' : ''}>
          <RiListCheck2 />
          <Tooltip
            classNameArrow='tooltip-border-class'
            className='tooltip-class'
            id='task-list'
          />
        </button>

        <button
          data-tooltip-id='code-block'
          data-tooltip-content='Insert Code Block'
          type='button'
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}>
          <RiBracesLine />
          <Tooltip
            classNameArrow='tooltip-border-class'
            className='tooltip-class'
            id='code-block'
          />
        </button>

        <button
          data-tooltip-id='blockquote'
          data-tooltip-content='Toggle Blockquote'
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}>
          <RiDoubleQuotesR />
          <Tooltip
            classNameArrow='tooltip-border-class'
            className='tooltip-class'
            id='blockquote'
          />
        </button>

        <Image />

        <button
          data-tooltip-id='horizontal-ruler'
          data-tooltip-content='Insert Horizontal Ruler'
          onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <RiRulerLine />
          <Tooltip
            classNameArrow='tooltip-border-class'
            className='tooltip-class'
            id='horizontal-ruler'
          />
        </button>

        <button
          data-tooltip-id='hard-break'
          data-tooltip-content='Insert Hard Break'
          onClick={() => editor.chain().focus().setHardBreak().run()}>
          <RiTextWrap />
          <Tooltip
            classNameArrow='tooltip-border-class'
            className='tooltip-class'
            id='hard-break'
          />
        </button>
      </section>
    </Container>
  );
}
