import {
  bold,
  italic,
  code,
  codeBlock,
  link,
  strikethrough,
  image,
  checkedListCommand,
  hr,
  unorderedListCommand,
  orderedListCommand,
  quote,
  divider,
  group,
  title1,
  title2,
  title3,
  title4,
  title5,
  title6,
} from '@uiw/react-md-editor/lib/commands';
import { FC, useEffect, useLayoutEffect, useState } from 'react';
import actions from '../data/actions';
import { useRouter, NextRouter } from 'next/router';
import { useAppContext } from '../context/AppContext';
import { _editor as Container } from '@/src/styles/modules/_editor';
import dynamic from 'next/dynamic';
import { MDEditorProps } from '@uiw/react-md-editor';
import { DefaultTheme, useTheme } from 'styled-components';
import { useThemeContext } from '../context/ThemeContext';
import rehypeSanitize from 'rehype-sanitize';
import { BsFillHeartFill, BsHeart, BsStar, BsStarFill } from 'react-icons/bs';
import { color } from 'framer-motion';

const MDEditor = dynamic<MDEditorProps>(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

const EditorContainer: FC = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const theme: DefaultTheme = useTheme();
  const { darkmode } = useThemeContext();
  const { state, dispatch, fetchAPI } = useAppContext();
  const [value, setValue] = useState<string | undefined>('');

  const [innerHeight, setInnerHeight] = useState<number>(0);

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
    <Container 
      color={state.currentNote.metadata.color ? theme.white : theme.font}>

      <section
        style={{
          background: darkmode
            ? `${state.currentNote.metadata.color}`
            : `${state.currentNote.metadata.color}`,
          color: darkmode ? 'white' : 'black',
        }}
        className='header-container'>
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
          <button className='tags-container'></button>
        </div>
      </section>
      <MDEditor
        value={state.currentNote.content}
        onChange={(value) =>
          dispatch({
            type: actions.CURRENT_NOTE,
            payload: {
              ...state,
              currentNote: { ...state.currentNote, content: String(value) },
            },
          })
        }
        autoFocus={true}
        toolbarHeight={30}
        highlightEnable={true}
        height={innerHeight}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        commands={[
          group([title1, title2, title3, title4, title5, title6], {
            groupName: 'Toggle title',
            name: 'Toggle Title',
            buttonProps: {
              'aria-label': 'Insert title',
              title: 'Toggle title',
            },
          }),
          bold,
          italic,
          strikethrough,
          link,
          divider,
          checkedListCommand,
          unorderedListCommand,
          orderedListCommand,
          divider,
          image,
          quote,
          code,
          hr,
          codeBlock,
        ]}
      />
    </Container>
  );
};

export default EditorContainer;
