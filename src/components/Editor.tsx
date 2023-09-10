import actions from '@/data/actions';
import { CSSProperties, FC, useMemo } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useAppContext } from '@/context/AppContext';
import { useThemeContext } from '@/context/ThemeContext';
import { lineNumbersRelative } from '@uiw/codemirror-extensions-line-numbers-relative';
import * as editorTheme from '@uiw/codemirror-themes-all';
import { DefaultTheme, useTheme } from 'styled-components';
import { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { RehypeRewriteOptions } from 'rehype-rewrite';
import rehypeHighlight from 'rehype-highlight';
import rehypeformat from 'rehype-format';
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

export const Editor: FC = (): JSX.Element => {
  const { colorScheme } = useThemeContext();
  const { state, dispatch } = useAppContext();
  const theme: DefaultTheme = useTheme();

  const usableExtensions = useMemo((): ReactCodeMirrorProps['extensions'] => {
    const extensions: ReactCodeMirrorProps['extensions'] = [];
    if (state.settings.editor.editing.enable_relative_line_numbers === true) {
      extensions.push(lineNumbersRelative);
    }
    return extensions;
  }, [state.settings]);

  const editorStyles: CSSProperties = {
    fontFamily: state.settings.editor.font.font_family,
    fontSize: state.settings.editor.font.font_size,
    fontWeight: state.settings.editor.font.font_weight,
    lineHeight: `${String(state.settings.editor.font.line_height)} px`,
  };

  return (
    <div data-color-mode={colorScheme.scheme}>
      <MarkdownEditor
        style={{ ...editorStyles }}
        value={state.currentNote.content}
        previewProps={{}}
        // @ts-ignore
        // theme={editorTheme['']}
        extensions={usableExtensions}
        hideToolbar={state.settings.editor.editing.enable_toolbar}
        basicSetup={{
          highlightActiveLine:
            state.settings.editor.editing.highlight_active_line,
          tabSize: state.settings.editor.editing.tab_size,
          lineNumbers: state.settings.editor.editing.line_numbers,
          foldGutter: state.settings.editor.editing.line_numbers,
        }}
        onChange={(value: string, viewUpdate) => {
          dispatch({
            type: actions.CURRENT_NOTE,
            payload: {
              ...state,
              currentNote: { ...state.currentNote, content: String(value) },
            },
          });
        }}
        toolbars={[
          'bold',
          'header',
          'italic',
          'strike',
          'underline',
          'link',
          'quote',
          'todo',
          'olist',
          'ulist',
          'image',
          'code',
          'codeBlock',
        ]}
        toolbarsMode={['preview']}
        
        height={String(state.windowInnerSize.height - 92 + 'px')}
        maxHeight={String(state.windowInnerSize.height - 92 + 'px')}
        placeholder={'Start writing...'}
      />
    </div>
  );
};
