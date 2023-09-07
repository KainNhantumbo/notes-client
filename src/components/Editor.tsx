import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-markdown-editor/esm/index.css';
import '@uiw/react-markdown-editor/esm/components/ToolBar/index.css';

import { FC } from 'react';
import actions from '@/data/actions';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { bold } from '@uiw/react-markdown-editor/esm/commands/bold';
import rehypeSanitize from 'rehype-sanitize';
import { RehypeRewriteOptions } from 'rehype-rewrite';
import { useAppContext } from '@/context/AppContext';
import rehypeHighlight from 'rehype-highlight';
import rehypeformat from 'rehype-format';
import rehyped from 'rehype-stringify';
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { useThemeContext } from '@/context/ThemeContext';

export const Editor: FC = (): JSX.Element => {
  const { colorScheme } = useThemeContext();
  const { state, dispatch } = useAppContext();

  return (
    <div data-color-mode={colorScheme.scheme}>
      <MarkdownEditor
        hideToolbar={false}
        value={state.currentNote.content}
        onChange={(value: string, viewUpdate) => {
          dispatch({
            type: actions.CURRENT_NOTE,
            payload: {
              ...state,
              currentNote: { ...state.currentNote, content: String(value) },
            },
          });
        }}
        height={String(state.windowInnerSize.height - 250 + 'px')}
        placeholder={'Start writing a note...'}
        title='Start writing a note...'
      />
    </div>
  );
};
