import styled from 'styled-components';
import {
  BaseButton,
  BaseButtonOutline,
  Button_Mono_A,
  StyledCornerButton,
  styledEndMark,
} from '../defaults';

export const _notesList = styled.section`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 300px;
  background: none;

  .header-container {
    width: 100%;
    display: flex;
    flex-direction: column;

    h2 {
      font-size: 1.2rem;
      line-height: 1.6rem;
      font-weight: 500;
      margin: 0 auto;
      text-transform: capitalize;
    }

    .form-container {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 3px;

      button {
        ${StyledCornerButton}
        padding: 0;
        border: none;
      }

      .search-container {
        display: flex;
        flex-direction: row;
        align-items: center;

        svg {
          width: 20px;
          height: 20px;
          color: rgba(${({ theme }) => theme.font}, 0.5);
        }

        input {
          width: 100%;
          height: fit-content;
          border: 1px solid red;
          padding: 5px;
          line-height: 1.2rem;
          font-weight: 400;
          outline: none;
          background: none;
          color: rgb(${({ theme }) => theme.font});

          ::placeholder {
            color: rgba(${({ theme }) => theme.font}, 0.8);
            font-size: 0.9rem;
          }
        }
      }
    }

    .filters-container {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      gap: 12px;

      .button {
        ${BaseButtonOutline}
        display: flex;
        flex-direction: row;
        gap: 8px;
        align-items: center;
        background: transparent;
      }
    }
  }

  .fluent-button {
    z-index: 3000;
    position: fixed;
    bottom: 20px;
    left: 0;
    width: 32px;
    height: 32px;
    margin-top: 8px;
    border: none;
    display: grid;
    background: rgba(${({ theme }) => theme.primary}, 0.2);
    border-radius: 10px;
    backdrop-filter: blur(10px);
    place-content: center;
    position: relative;
    cursor: pointer;
    outline: none;

    svg {
      width: 24px;
      height: 24px;
      color: rgb(${({ theme }) => theme.primary});

      :hover {
        transition: all 200ms ease-in-out;
        color: rgb(${({ theme }) => theme.secondary});
      }
    }
  }

  .empty-notes-container {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center center;
    align-items: center center;
  }

  .error-container {
    width: 100%;
    height: 100%;
    display: grid;
    place-content: center;
    place-items: center;

    .fetch-error-message {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      margin: 20px 0;
      color: rgb(${({ theme }) => theme.error});
      font-weight: 500;
      font-size: 1.1rem;
      line-height: 1.4rem;
      align-self: flex-end;

      button {
        ${BaseButton}
      }
    }
  }

  .container-items__end-mark {
    ${styledEndMark}
  }
`;
