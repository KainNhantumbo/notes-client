import styled from 'styled-components';

export const _workspace = styled.main`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 1px;

  .md-editor-toolbar,
  .md-editor-toolbar-wrap {
    background: none !important;
    border: none !important;
  }

  .cm-editor {
    border: none !important;
    border-radius: 0px !important;
  }

  .cm-scroller {
    border: none;
    border-radius: 0px !important;
  }
`;
