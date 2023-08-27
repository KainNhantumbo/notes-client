import styled from 'styled-components';
import { BaseButtonOutline, StyledInputs } from '../defaults';

export const _editor = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;

  .header-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

    input {
      width: 100%;
      height: fit-content;
      border: none;
      padding: 10px;
      line-height: 1.2rem;
      font-weight: 400;
      outline: none;
      background: none;
      font-weight: 500;
      font-size: 1.6rem;
      color: rgb(${({ color }) => color});

      ::placeholder {
        color: rgba(${({ color }) => color}, 0.8);
        font-weight: 500;
        font-size: 1.6rem;
      }
    }

    .properties-container {
      display: flex;
      flex-direction: row;
      gap: 12px;
    }

    button {
      ${BaseButtonOutline}
      padding: 5px;
      background: none;
      font-weight: 500;
      font-size: 0.9rem;

      span {
        color: rgb(${({ color }) => color}) !important;
      }

      svg {
        width: 16px;
        height: 16px;
        color: rgb(${({ color }) => color});
      }
    }
  }

  /* add background support for the editor */
  .w-md-editor {
    width: 100%;
    height: 100%;
    border: none;
    background-color: rgb(${({ theme }) => theme.foreground});
    color: rgb(${({ theme }) => theme.font}) !important;
    border-radius: 0px;
    box-shadow: none;
  }

  .w-md-editor-content {
    border-radius: 0px;
  }

  .w-md-editor-text-pre > code,
  .w-md-editor-text-input {
    font-size: 1.1rem !important;
    line-height: 1.4rem !important;
    font-family: Consolas, Hack, Menlo, Inter, monospace;
  }

  .w-md-editor-text,
  .w-md-editor-text-input,
  .w-md-editor-text-pre .title,
  .w-md-editor-text-pre .bold,
  .w-md-editor-text-pre .blockquote,
  .w-md-editor-text-pre .table .punctuation,
  .w-md-editor-text-pre .hr,
  .w-md-editor-text-pre .table .table-header {
    color: rgb(${({ theme }) => theme.font}) !important;
  }

  .w-md-editor-text-input {
    color: rgb(${({ theme }) => theme.font}) !important;
  }

  .wmde-markdown-color,
  .language-markdown {
    color: rgb(${({ theme }) => theme.font}) !important;
    ::selection {
      background-color: rgb(105, 135, 175) !important;
      color: rgb(${({ theme }) => theme.white}) !important;
    }
  }

  .token,
  .title,
  .important {
    ::selection {
      background-color: rgb(105, 135, 175) !important;
      color: rgb(${({ theme }) => theme.white}) !important;
    }
  }

  hr {
    background-color: rgba(${({ theme }) => theme.font}, 0.5) !important;
  }

  table {
    tr {
      background: rgb(${({ theme }) => theme.background}) !important;
    }

    td,
    th {
      border-color: rgba(${({ theme }) => theme.font}, 0.5) !important;
    }

    th {
      font-weight: bold;
    }
  }

  a {
    color: rgb(105, 135, 175) !important;
  }

  .w-md-editor-text-pre .url {
    color: rgb(105, 135, 175) !important;
    background-color: transparent !important;
  }

  .w-md-editor-text-pre .strike {
    background-color: transparent !important;
  }

  .w-md-editor-text-pre .url .content {
    color: rgb(105, 135, 175) !important;
  }

  .w-md-editor-toolbar {
    border: none;
    border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
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

  .w-md-editor-preview {
    box-shadow: none;
  }

  span {
    background-color: transparent !important;
    color: rgb(${({ theme }) => theme.primary_shade}) !important;
    .token .variable {
      color: rgb(${({ theme }) => theme.secondary}) !important;
    }
  }
`;
