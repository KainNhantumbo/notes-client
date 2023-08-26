// css imports are here to avoid the use of css modules
import '../styles/global.css';

import '../libs/editor/nodes/ExcalidrawNode/ExcalidrawModal.css';
import '../libs/editor/nodes/ImageNode.css';
import '../libs/editor/nodes/InlineImageNode.css';
import '../libs/editor/nodes/PollNode.css';
import '../libs/editor/nodes/StickyNode.css';

import '../libs/editor/plugins/CodeActionMenuPlugin/index.css';
import '../libs/editor/plugins/CodeActionMenuPlugin/components/PrettierButton/index.css';
import '../libs/editor/plugins/CollapsiblePlugin/Collapsible.css';
import '../libs/editor/plugins/CommentPlugin/index.css';
import '../libs/editor/plugins/DraggableBlockPlugin/index.css';
import '../libs/editor/plugins/FloatingLinkEditorPlugin/index.css';
import '../libs/editor/plugins/FloatingTextFormatToolbarPlugin/index.css';
import '../libs/editor/plugins/TableCellResizer/index.css';
import '../libs/editor/plugins/TableOfContentsPlugin/index.css';

import '../libs/editor/themes/CommentEditorTheme.css';
import '../libs/editor/themes/PlaygroundEditorTheme.css';
import '../libs/editor/themes/StickyEditorTheme.css';

import '../libs/editor/ui/Button.css';
import '../libs/editor/ui/Checkbox.css';
import '../libs/editor/ui/ContentEditable.css';
import '../libs/editor/ui/Dialog.css';
import '../libs/editor/ui/EquationEditor.css';
import '../libs/editor/ui/Input.css';
import '../libs/editor/ui/KatexEquationAlterer.css';
import '../libs/editor/ui/Modal.css';
import '../libs/editor/ui/Placeholder.css';
import '../libs/editor/ui/Select.css';

import '../libs/editor/editor.css';

import type { FC } from 'react';
import type { AppProps } from 'next/app';
import AppContext from '../context/AppContext';

const App: FC<AppProps> = ({ Component, pageProps }): JSX.Element => (
  <AppContext>
    <Component {...pageProps} />
  </AppContext>
);

export default App;
