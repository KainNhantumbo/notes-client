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
      color: rgb(${({ theme }) => theme.font});

      ::placeholder {
        color: rgba(${({ theme }) => theme.font}, 0.4);
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
          color: rgb(${({ theme }) => theme.font}) !important;
          padding-left: 25px;
        }
        svg {
          width: 16px;
          height: 16px;
          color: rgb(${({ theme }) => theme.font});
        }
      }
    }
  }

  .editor-container {
    background: inherit;
  }

`;
