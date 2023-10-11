import {
  RiBold,
  RiItalic,
  RiUnderline,
  RiStrikethrough,
  RiCodeLine,
  RiFontColor,
  RiParagraph
} from 'react-icons/ri';
import Headings from './Headings';
import { Tooltip } from 'react-tooltip';
import { BubbleMenu as FloatingBubble, useCurrentEditor } from '@tiptap/react';
import TextAlign from './TextAlign';

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

        <TextAlign />

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
      </section>
    </FloatingBubble>
  );
}
