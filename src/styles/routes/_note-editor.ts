import styled from 'styled-components';

export const _noteEditor = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .wrapper-container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    max-width: 1080px;
    align-self: center;
    /* border: 1px solid red; */
  }

  .md-editor {
    border-radius: 0px;
    box-shadow: none;
    width: 100%;
  }

  .md-editor-content-editor {
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
