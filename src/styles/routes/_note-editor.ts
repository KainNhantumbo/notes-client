import styled from 'styled-components';

export const _noteEditor = styled.main`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  position: relative;

  .md-editor {
    border-radius: 0px;
    box-shadow: none;
    width: 100%;
  }

  .md-editor-toolbar,
  .md-editor-toolbar-wrap {
    background: transparent !important;
    border: none !important;
    border-radius: 0px;
  }

  .md-editor-toolbar-warp:not(.md-editor-toolbar-bottom) {
    border-bottom: none;
  }

  .cm-editor {
    width: 100%;
    border: none !important;
    border-radius: 0px !important;
  }

  .cm-scroller {
    border: none;
    border-radius: 0px !important;
  }
`;
