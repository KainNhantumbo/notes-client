import styled from 'styled-components';
import { BaseButtonOutline } from '../defaults';

export const _customTools = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.15); */
  padding-bottom: 12px;

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 5px;

    input {
      width: 100%;
      height: fit-content;
      border: none;
      padding: 10px;
      line-height: 1.8rem;
      outline: none;
      background: none;
      font-weight: 500;
      font-size: 1.4rem;
      color: rgb(${({ theme }) => theme.font});

      ::placeholder {
        color: rgba(${({ theme }) => theme.font}, 0.4);
      }
    }
  }

  .properties-container {
    display: flex;
    flex-direction: row;
    gap: 12px;
    padding: 0 12px;
    align-items: center;

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

  .tags-container {
    .tags-input {
      background-color: transparent;
      border: none;
      border-radius: 5px;
      background: transparent;
      color: rgb(${({ theme }) => theme.font});
    }

    .tags-input--focused {
      border-color: transparent;
    }

    .tags-input-tag {
      background-color: rgba(${({ theme }) => theme.primary}, 0.2);
      border: 1px solid rgba(${({ theme }) => theme.font}, 0.15);
      color: rgb(${({ theme }) => theme.font});
      border-radius: 5px;
      font-family: inherit !important;
    }
  }
`;
