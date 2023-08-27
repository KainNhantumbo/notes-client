import {
  bold,
  italic,
  code,
  codeBlock,
  codeEdit,
  link,
  codeLive,
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
} from '@uiw/react-md-editor/lib/commands';
import { FC, useState } from 'react';
import actions from '../data/actions';
import { useRouter, NextRouter } from 'next/router';
import { useAppContext } from '../context/AppContext';
import { _editor as Container } from '@/src/styles/modules/_editor';
import dynamic from 'next/dynamic';
import { MDEditorProps } from '@uiw/react-md-editor';
import { DefaultTheme, useTheme } from 'styled-components';
import { useThemeContext } from '../context/ThemeContext';

const MDEditor = dynamic<MDEditorProps>(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

const EditorContainer: FC = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const theme:DefaultTheme = useTheme()
  const {darkmode} = useThemeContext()
  const { state, dispatch, fetchAPI } = useAppContext();
  const [value, setValue] = useState<string | undefined>('**Hello world!!!**');

  console.log(value);

  return (
    <Container>
      <MDEditor
        value={value}
        data-color-mode='dark'
        onChange={(value) => setValue(() => value)}
        autoFocus={true}
        commands={[
          group([title1, title2, title3]),
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
          codeEdit,
        ]}
      />
    </Container>
  );
};

export default EditorContainer;
