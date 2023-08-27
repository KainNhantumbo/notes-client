import { FC, Suspense, useState } from 'react';
import actions from '../data/actions';
import Layout from '@/src/components/Layout';
import { useRouter, NextRouter } from 'next/router';
import { useAppContext } from '../context/AppContext';
import { _editor as Container } from '@/src/styles/modules/_editor';
import dynamic from 'next/dynamic';

import { MDEditorProps } from '@uiw/react-md-editor';
import { bold, italic, code, codeBlock, codeEdit, codeLive } from '@uiw/react-md-editor/lib/commands';

const MDEditor = dynamic<MDEditorProps>(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

const Editor = dynamic(import('../libs/editor/Editor'), { ssr: false });

import { HexColorPicker } from "react-colorful";
import { WithContext as ReactTags } from 'react-tag-input';

// for md previewer
// const MarkdownPreview = dynamic(
//   () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
//   { ssr: false }

// );
// <MarkdownPreview source={content} className="mt-30" />

const EditorContainer: FC = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const { state, dispatch, fetchAPI } = useAppContext();
  const [value, setValue] = useState("**Hello world!!!**");
  return (
    <Container>
      <MDEditor value={value} onChange={setValue} commands={[bold, italic, code, codeEdit, codeLive]} />
    </Container>
  );
};

export default EditorContainer;

// <Suspense fallback={'Loading editor'}>
//   <Editor />
// </Suspense>
