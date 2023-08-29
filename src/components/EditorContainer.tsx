import dynamic from 'next/dynamic';
import actions from '../data/actions';
import TagsInput from 'react-tagsinput';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { FC, useEffect, useMemo, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { DefaultTheme, useTheme } from 'styled-components';
import { useThemeContext } from '../context/ThemeContext';
import { _editor as Container } from '@/src/styles/modules/_editor';

import { MDEditorProps } from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { RehypeRewriteOptions } from 'rehype-rewrite';
import rehypeHighlight from 'rehype-highlight';
import rehypeformat from 'rehype-format';
import rehyped from 'rehype-stringify';
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

// import '@uiw/react-markdown-preview/markdown.css';
// import '@uiw/react-markdown-editor/esm/index.css';
// import '@uiw/react-markdown-editor/esm/components/ToolBar/index.css';

// const MarkdownEditor = dynamic(
//   () => import('@uiw/react-markdown-editor').then((mod) => mod.default),
//   { ssr: false }
// );

// const MDEditor = dynamic<MDEditorProps>(() => import('@uiw/react-md-editor'), {
//   ssr: false,
// });

import { listsPlugin } from '@mdxeditor/editor/plugins/lists';
import { quotePlugin } from '@mdxeditor/editor/plugins/quote';
import { thematicBreakPlugin } from '@mdxeditor/editor/plugins/thematic-break';
import { headingsPlugin } from '@mdxeditor/editor/plugins/headings';
import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo';
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles';
import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar';
import { linkPlugin } from '@mdxeditor/editor/plugins/link';
import { linkDialogPlugin } from '@mdxeditor/editor/plugins/link-dialog';
import { BlockTypeSelect } from '@mdxeditor/editor/plugins/toolbar/components/BlockTypeSelect';
export const MDXEditor = dynamic(
  () => import('@mdxeditor/editor/MDXEditor').then((mod) => mod.MDXEditor),
  { ssr: false }
);

const EditorContainer: FC = (): JSX.Element => {
  const theme: DefaultTheme = useTheme();
  const { darkmode } = useThemeContext();
  const { state, dispatch, fetchAPI } = useAppContext();
  const [innerHeight, setInnerHeight] = useState<number>(0);

  const currentActiveTags = useMemo(() => {
    return state.currentNote.metadata.tags.map((tag) => ({
      id: tag,
      text: tag,
    }));
  }, [state.currentNote.metadata.tags]);

  const handleChangeTag = (tags: string[], changed: string[]): void => {
    console.log(tags, changed);

    dispatch({
      type: actions.CURRENT_NOTE,
      payload: {
        ...state,
        currentNote: {
          ...state.currentNote,
          metadata: {
            ...state.currentNote.metadata,
            tags: [...changed],
          },
        },
      },
    });
  };

  const handleDeleteTag = (currentTagIndex: number): void => {
    dispatch({
      type: actions.CURRENT_NOTE,
      payload: {
        ...state,
        currentNote: {
          ...state.currentNote,
          metadata: {
            ...state.currentNote.metadata,
            tags: [
              ...state.currentNote.metadata.tags.filter(
                (tag, index) => index !== currentTagIndex
              ),
            ],
          },
        },
      },
    });
  };

  const handleDragnDropTag = (
    currentTag: { id: string; text: string },
    currentPosition: number,
    newPosition: number
  ): void => {
    const newTags = state.currentNote.metadata.tags
      .slice()
      .splice(currentPosition, 0)
      .splice(newPosition, 0, currentTag.text);

    dispatch({
      type: actions.CURRENT_NOTE,
      payload: {
        ...state,
        currentNote: {
          ...state.currentNote,
          metadata: {
            ...state.currentNote.metadata,
            tags: [...newTags],
          },
        },
      },
    });
  };

  const computeInnerHeight = (): void => {
    setInnerHeight(() => {
      return Number(window.innerHeight.toFixed(1)) - 250;
    });
  };

  useEffect(() => {
    computeInnerHeight();
    window.addEventListener('resize', computeInnerHeight);
    return () => {
      window.removeEventListener('resize', computeInnerHeight);
    };
  }, []);

  return (
    <Container>
      <section className='header-container'>
        <input
          type='text'
          name='title'
          placeholder='Untitled'
          aria-label='Your note title'
          value={state.currentNote.title}
          required
          onChange={(e): void =>
            dispatch({
              type: actions.CURRENT_NOTE,
              payload: {
                ...state,
                currentNote: { ...state.currentNote, title: e.target.value },
              },
            })
          }
        />

        <div className='properties-container'>
          <button
            className='favorite'
            onClick={() =>
              dispatch({
                type: actions.CURRENT_NOTE,
                payload: {
                  ...state,
                  currentNote: {
                    ...state.currentNote,
                    metadata: {
                      ...state.currentNote.metadata,
                      favorite: !state.currentNote.metadata.favorite,
                    },
                  },
                },
              })
            }>
            {state.currentNote.metadata.favorite ? (
              <>
                <BsStarFill />
                <span>Stared</span>
              </>
            ) : (
              <>
                <BsStar />
                <span>Star</span>
              </>
            )}
          </button>
          <div className='tags-container'>
            <TagsInput
              value={state.currentNote.metadata.tags}
              onChange={handleChangeTag}
            />
          </div>
        </div>
      </section>
      <section className='editor-container'>
        <MDXEditor
          className={darkmode ? 'dark-theme' : 'light-theme'}
          markdown={state.currentNote.content}
          onChange={(value) => {
            console.info(state.currentNote.content);
            dispatch({
              type: actions.CURRENT_NOTE,
              payload: {
                ...state,
                currentNote: { ...state.currentNote, content: String(value) },
              },
            });
          }}
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            linkPlugin(),
            linkDialogPlugin({
              linkAutocompleteSuggestions: [''],
            }),

            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <BlockTypeSelect />
                </>
              ),
            }),
          ]}
        />
      </section>
    </Container>
  );
};

export default EditorContainer;

type TEditorPreferences = {
  autoFocus: boolean;
};
