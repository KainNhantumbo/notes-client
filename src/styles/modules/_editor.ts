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
    padding-bottom: 12px;

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
      padding: 0 12px;

      button {
        ${BaseButtonOutline}
        border-radius: 3px;
        padding: 6px;
        background: none;
        font-weight: 500;
        font-size: 0.9rem;
        border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

        span {
          color: rgb(${({ color }) => color}) !important;
          padding-left: 25px;
        }
        svg {
          width: 16px;
          height: 16px;
          color: rgb(${({ color }) => color});
        }
      }
    }
  }

  /* add custom styles for the editor */
  .w-md-editor {
    width: 100%;
    height: 100%;
    border: none;
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
    font-family: Consolas, Hack, Menlo, Inter, monospace !important;
  }

  table {
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
`;
