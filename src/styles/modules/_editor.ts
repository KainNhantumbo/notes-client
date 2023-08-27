import styled from 'styled-components';

export const _editor = styled.section`
  padding-bottom: 50px;

  .w-md-editor {
    width: 100%;
    height: 100%;
    border: none;
  }

  /* add background support for the editor */
  .w-md-editor-text-pre > code,
  .w-md-editor-text-input {
    font-size: 1.3rem !important;
    line-height: 1.4rem !important;
    font-family: Consolas, Hack, Menlo, Inter, monospace;
  }

  .w-md-editor-toolbar {
    border: none;
    border-radius: 0px;
    background-color: rgb(${({ theme }) => theme.foreground});
  }

  .w-md-editor-toolbar li > button:hover,
  .w-md-editor-toolbar li > button:focus,
  .w-md-editor-toolbar li > button:active,
  .w-md-editor-toolbar li.active > button {
    color: rgb(${({ theme }) => theme.primary_shade});
    background-color: rgba(${({ theme }) => theme.primary}, 0.2);
  }

  .w-md-editor-toolbar li > button {
    color: rgb(${({ theme }) => theme.font});
  }

  .w-md-editor-toolbar-divider {
    background-color: rgba(${({ theme }) => theme.font}, 0.4);
  }
`;
