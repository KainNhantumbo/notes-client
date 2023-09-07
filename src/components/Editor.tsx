import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-markdown-editor/esm/index.css';
import '@uiw/react-markdown-editor/esm/components/ToolBar/index.css';

import { FC, useCallback } from 'react';
import actions from '@/data/actions';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useAppContext } from '@/context/AppContext';
import { bold } from '@uiw/react-markdown-editor/esm/commands/bold';
import { RehypeRewriteOptions } from 'rehype-rewrite';
import rehypeHighlight from 'rehype-highlight';
import rehypeformat from 'rehype-format';
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';

import { unified } from 'unified';
import { useThemeContext } from '@/context/ThemeContext';
import { lineNumbersRelative } from '@uiw/codemirror-extensions-line-numbers-relative';
import {} from '@uiw/codemirror-themes-all';
import { DefaultTheme, useTheme } from 'styled-components';
import { ReactCodeMirrorProps } from '@uiw/react-codemirror';

export const Editor: FC = (): JSX.Element => {
  const { colorScheme } = useThemeContext();
  const { state, dispatch } = useAppContext();
  const theme: DefaultTheme = useTheme();

  const usableExtensions =
    useCallback((): ReactCodeMirrorProps['extensions'] => {
      const extensions: ReactCodeMirrorProps['extensions'] = [];
      return extensions;
    }, []);



  return (
    <div data-color-mode={colorScheme.scheme}>
      <MarkdownEditor
        hideToolbar={true}
        value={state.currentNote.content}
        previewProps={{}}
        basicSetup={{ indentOnInput: true }}
        extensions={usableExtensions()}
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
