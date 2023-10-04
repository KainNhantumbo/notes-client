import {
  CodeIcon,
  FontBoldIcon,
  FontItalicIcon,
  ListBulletIcon,
  ResetIcon,
  RulerHorizontalIcon,
  StrikethroughIcon,
  TextIcon
} from '@radix-ui/react-icons';
import { useCurrentEditor } from '@tiptap/react';
import {
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiBold,
  RiBracesLine,
  RiCodeBoxLine,
  RiCodeLine,
  RiDoubleQuotesR,
  RiFontColor,
  RiItalic,
  RiListOrdered,
  RiListRadio,
  RiParagraph,
  RiQuoteText,
  RiRulerLine,
  RiStrikethrough,
  RiTextWrap
} from 'react-icons/ri';
import { _editorToolbar as Container } from '@/styles/modules/_editor-toolbar';

export default function EditorToolbar() {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  return (
    <Container>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}>
        <RiArrowGoBackLine />
      </button>

      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}>
        <RiArrowGoForwardLine />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}>
        <RiBold />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}>
        <RiItalic />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}>
        <RiStrikethrough />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}>
        <RiCodeLine />
      </button>

      <button
        onClick={() => editor.chain().focus().setColor('#958DF1').run()}
        className={
          editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''
        }>
        <RiFontColor/>
      </button>

      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}>
        <RiParagraph />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}>
        <RiListRadio />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}>
        <RiListOrdered />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}>
        <RiBracesLine />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}>
        <RiDoubleQuotesR />
      </button>

      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <RiRulerLine />
      </button>

      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        <RiTextWrap />
      </button>

    </Container>
  );
}

/**
 * <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        h6
      </button>
 * 
 * 
 * 
 */
