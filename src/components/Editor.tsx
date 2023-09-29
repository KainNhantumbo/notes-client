import actions from '@/shared/actions';
import { CSSProperties, useMemo } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useAppContext } from '@/context/AppContext';
import { useThemeContext } from '@/context/ThemeContext';
import { lineNumbersRelative } from '@uiw/codemirror-extensions-line-numbers-relative';
import * as editorTheme from '@uiw/codemirror-themes-all';
import { ReactCodeMirrorProps } from '@uiw/react-codemirror';

export function Editor() {
  const { colorScheme } = useThemeContext();
  const { state, dispatch } = useAppContext();

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
    wordWrap: 'break-word',
    lineBreak: 'anywhere',
    maxWidth: '400px'
  };

  return (
    <div data-color-mode={colorScheme.scheme}>
      <MarkdownEditor
        style={{ ...editorStyles }}
        value={state.currentNote.content}
        previewProps={{}}
        // @ts-ignore
        theme={editorTheme[state.settings.theme.editor_theme]}
        extensions={usableExtensions}
        hideToolbar={state.settings.editor.editing.enable_toolbar}
        basicSetup={{
          highlightActiveLine:
            state.settings.editor.editing.highlight_active_line,
          tabSize: state.settings.editor.editing.tab_size,
          lineNumbers: state.settings.editor.editing.line_numbers,
          foldGutter: state.settings.editor.editing.line_numbers
        }}
        onChange={(value, viewUpdate) => {
          dispatch({
            type: actions.CURRENT_NOTE,
            payload: {
              ...state,
              currentNote: { ...state.currentNote, content: String(value) }
            }
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
          'codeBlock'
        ]}
        toolbarsMode={['preview']}
        placeholder={'Start writing...'}
        height={String(state.windowInnerSize.height - 90 + 'px')}
        maxHeight={String(state.windowInnerSize.height - 90 + 'px')}
      />
    </div>
  );
}
