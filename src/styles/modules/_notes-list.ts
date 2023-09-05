import styled from 'styled-components';
import { BaseButton, BaseButtonOutline } from '../defaults';

export const _notesList = styled.section`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

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

  .header-container {
    width: 100%;
    display: flex;
    flex-direction: column;

    .form-container {
      width: 100%;
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

  .container-items__end-mark {
    width: 100%;
    display: grid;
    justify-content: center;
    align-items: center;
    background: rgb(${({ theme }) => theme.foreground});
    color: rgb(${({ theme }) => theme.primary});
    border-radius: 8px;
    margin-top: 5px;
    svg {
      width: 25px;
      height: 25px;
    }

    @media screen and (max-width: 1000px) {
      border-radius: 10px;
      margin-left: 10px;
      margin-right: 10px;
    }
  }

  .fluent-button {
    z-index: 3000;
    position: fixed;
    bottom: 20px;
    left: 0;
    display: grid;
    place-content: center;
    width: 100%;
    height: 10vh;
    left: 97vw;
    bottom: 135px;
    width: 0;
    height: 0;

    @media screen and (max-width: 690px) {
      left: 95vw;
    }
    @media screen and (max-width: 480px) {
      left: 90vw;
    }

    button {
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
    span {
      padding: 0;
    }
  }

  .empty-notes-container {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center center;
    align-items: center center;
  }
`;
