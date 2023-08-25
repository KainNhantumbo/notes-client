import { FC, ReactNode } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import PlaygroundEditorTheme from '@/src/libs/editor/themes/PlaygroundEditorTheme';
import PlaygroundNodes from '../libs/editor/nodes/PlaygroundNodes';
import { SharedHistoryContext } from '../libs/editor/context/SharedHistoryContext';
import { TableContext } from '../libs/editor/plugins/TablePlugin';
import { SharedAutocompleteContext } from '../libs/editor/context/SharedAutocompleteContext';

type TProps = { children: ReactNode };

const EditorContext: FC<TProps> = ({ children }): JSX.Element => {
  return (
    <LexicalComposer
      initialConfig={{
        namespace: 'Editor',
        onError: (error: Error) => {
          throw error;
        },
        nodes: [...PlaygroundNodes],
        theme: PlaygroundEditorTheme,
      }}>
      <SharedHistoryContext>
        <TableContext>
          <SharedAutocompleteContext>{children}</SharedAutocompleteContext>
        </TableContext>
      </SharedHistoryContext>
    </LexicalComposer>
  );
};

export default EditorContext;
