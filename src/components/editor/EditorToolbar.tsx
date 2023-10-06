import {
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiBold,
  RiBracesLine,
  RiCodeLine,
  RiDoubleQuotesR,
  RiFontColor,
  RiItalic,
  RiListCheck,
  RiListCheck2,
  RiListOrdered,
  RiListOrdered2,
  RiListRadio,
  RiParagraph,
  RiRulerLine,
  RiStrikethrough,
  RiSubscript,
  RiSuperscript,
  RiTaskLine,
  RiTextWrap,
  RiUnderline
} from 'react-icons/ri';
import { useCurrentEditor } from '@tiptap/react';
import { _editorToolbar as Container } from '@/styles/modules/_editor-toolbar';
import Headings from './Hedings';
import TurndownService from 'turndown';
import Image from './Image';

export default function EditorToolbar() {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  return (
    <Container>
      <button
        title='Undo'
        aria-placeholder='Undo'
        type='button'
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}>
        <RiArrowGoBackLine />
      </button>

      <button
        title='Redo'
        aria-placeholder='Redo'
        type='button'
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}>
        <RiArrowGoForwardLine />
      </button>

      <button
        title='Bold'
        aria-placeholder='Bold'
        type='button'
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}>
        <RiBold />
      </button>

      <button
        title='Italic'
        aria-placeholder='Italic'
        type='button'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}>
        <RiItalic />
      </button>

      <button
        title='Underline'
        aria-placeholder='Underline'
        type='button'
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}>
        <RiUnderline />
      </button>

      <button
        title='Strike'
        aria-placeholder='Strike'
        type='button'
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}>
        <RiStrikethrough />
      </button>

      <Headings />

      <button
        title='Toogle subscript'
        aria-placeholder='Toogle subscript'
        type='button'
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        disabled={!editor.can().chain().focus().toggleSubscript().run()}
        className={editor.isActive('subscript') ? 'is-active' : ''}>
        <RiSubscript />
      </button>

      <button
        title='Toogle superscript'
        aria-placeholder='Toogle superscript'
        type='button'
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        disabled={!editor.can().chain().focus().toggleSuperscript().run()}
        className={editor.isActive('superscript') ? 'is-active' : ''}>
        <RiSuperscript />
      </button>
      <button
        title='Code'
        aria-placeholder='Code'
        type='button'
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}>
        <RiCodeLine />
      </button>

      <button
        title='Text style'
        aria-placeholder='Text style'
        type='button'
        onClick={() => editor.chain().focus().setColor('#958DF1').run()}
        className={
          editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''
        }>
        <RiFontColor />
      </button>

      <button
        title='Paragraph'
        aria-placeholder='Paragraph'
        type='button'
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}>
        <RiParagraph />
      </button>

      <button
        title='Bullet list'
        aria-placeholder='Bullet list'
        type='button'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}>
        <RiListRadio />
      </button>

      <button
        title='Toggle ordered list'
        aria-placeholder='Toggle ordered list'
        type='button'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}>
        <RiListOrdered2 />
      </button>

      <button
        title='Toggle check list'
        aria-placeholder='Toggle check list'
        type='button'
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={editor.isActive('taskList') ? 'is-active' : ''}>
        <RiListCheck2 />
      </button>

      <button
        title='Toggle code block'
        aria-placeholder='Toggle code block'
        type='button'
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}>
        <RiBracesLine />
      </button>

      <button
        title='Toggle block quote'
        aria-placeholder='Toggle block quote'
        type='button'
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}>
        <RiDoubleQuotesR />
      </button>

      <Image />

      <button
        title='Set horizontal rule'
        aria-placeholder='Set horizontal rule'
        type='button'
        onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <RiRulerLine />
      </button>

      <button
        title='Hard breack to new line'
        aria-placeholder='Hard breack to new line'
        type='button'
        onClick={() => editor.chain().focus().setHardBreak().run()}>
        <RiTextWrap />
      </button>
    </Container>
  );
}