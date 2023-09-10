import { BaseButton, StyledCornerButton, styledEndMark } from '../defaults';
import styled from 'styled-components';

export const _notesList = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 300px;
  background: rgb(${({ theme }) => theme.foreground});
  border-right: 1px solid rgba(${({ theme }) => theme.font}, 0.15);

  .header-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-bottom: 12px;
    gap: 12px;
    background: rgb(${({ theme }) => theme.foreground});
    z-index: 200;

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
      border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
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

  .notes-list-container {
    width: 100%;
    height: 100%;
    padding: 12px 8px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    background: rgb(${({ theme }) => theme.background});

    .note-container {
      display: flex;
      flex-direction: column;
      border-radius: 8px;
      border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
      background: rgb(${({ theme }) => theme.foreground});
      padding: 12px 8px;
      font-size: 0.9rem;
      gap: 5px;
      user-select: none;
      cursor: pointer;

      :hover {
        transition: all 200ms ease-in-out;
        border: 1px solid rgba(${({ theme }) => theme.primary_shade}, 0.1);
      }
    }

    .selected-note {
      background: rgba(${({ theme }) => theme.font}, 0.08);
    }
  }

  .compose-button {
    z-index: 200;
    position: fixed;
    left: 230px;
    bottom: 50px;
    ${StyledCornerButton}
    border-radius: 50%;
    padding: 8px;
    background: rgba(${({ theme }) => theme.primary}, 0.2);
    backdrop-filter: blur(10px);
  }

  .empty-notes-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: calc(50% - 1px) 20px;
    gap: 20px;
    align-items: center;

    h3 {
      font-size: 1.2rem;
      font-weight: 500;
    }

    p {
      text-align: center;
      line-height: 1.6rem;
      font-size: 0.95rem;

      i {
        color: rgb(${({ theme }) => theme.primary_shade});
      }
    }

    svg {
      width: 60px;
      height: 60px;
      color: rgb(${({ theme }) => theme.primary});
    }
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
    padding: calc(50% - 1px) 12px;
  }

  .error-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    color: rgb(${({ theme }) => theme.error});
    font-weight: 500;
    font-size: 0.95rem;
    line-height: 1.6rem;
    padding: calc(50% - 1px) 12px;

    button {
      ${BaseButton}
    }
  }
`;
