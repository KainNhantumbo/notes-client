import {
  RiBold,
  RiItalic,
  RiUnderline,
  RiStrikethrough,
  RiCodeLine,
  RiRulerLine,
  RiTextWrap
} from 'react-icons/ri';
import { Tooltip } from 'react-tooltip';
import { BubbleMenu as FloatingBubble, useCurrentEditor } from '@tiptap/react';

export default function BubbleMenu() {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  return (
    <FloatingBubble>
      <section className='bubble-menu-container'>
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
    </FloatingBubble>
  );
}
