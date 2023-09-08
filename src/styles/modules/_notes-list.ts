import {
  BaseButton,
  BaseButtonOutline,
  StyledCornerButton,
  styledEndMark,
} from '../defaults';
import styled from 'styled-components';

export const _notesList = styled.section`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 300px;
  background: rgb(${({ theme }) => theme.foreground});

  .header-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 12px;
    background: rgb(${({ theme }) => theme.background_shade});

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
      padding: 5px 8px;
      background: rgb(${({ theme }) => theme.foreground});
      border: 1px solid rgba(${({ theme }) => theme.black}, 0.05);
      border-radius: 8px;

      button {
        ${StyledCornerButton}
        padding: 0;
        border: none;
      }

      input {
        width: 100%;
        height: fit-content;
        border: none;
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

  .loading-indicator {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    font-weight: 500;
    font-size: 0.95rem;
    color: rgb(${({ theme }) => theme.primary_shade});
    align-self: center;
    justify-self: center;
    place-self: center center;
    padding: calc(50% - 1px) 12px;
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
