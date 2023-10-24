import styled from 'styled-components';
import { BaseButton, BaseButtonOutline, StyledCornerButton } from '../defaults';

export const _editorToolsToggler = styled.section`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 12000;
  background: rgba(${({ theme }) => theme.background}, 0.2);
  backdrop-filter: blur(2px);
  display: grid;
  place-content: center;
  user-select: none;
  line-height: 1.4rem;

  .dialog-prompt {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 12px;
    padding: 12px 20px;
    border-radius: 12px;
    background: rgb(${({ theme }) => theme.foreground});
    max-width: 400px;
    margin: 25px;
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
    box-shadow: 0 0 25px rgba(${({ theme }) => theme.black}, 0.1);
    position: relative;

    .prompt-info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 10px;
      span {
        font-weight: 500;
        color: rgb(${({ theme }) => theme.primary_shade});
      }
      p {
        line-height: 1.6rem;
        font-size: 0.9rem;
      }

      a {
        color: rgb(${({ theme }) => theme.primary_shade});
      }
    }

    .button-close {
      ${StyledCornerButton}
      position: absolute;
      right: 12px;
      top: 12px;
      border-radius: 10px;
      border: none;

      :hover {
        color: rgb(${({ theme }) => theme.error});
        background: rgb(${({ theme }) => theme.primary}, 0.2);
      }
    }

    .options-container {
      display: flex;
      flex-direction: column;
      gap: 3px;
      width: 100%;
      overflow-y: auto;
      max-height: 480px;

      .option {
        width: 100%;
        display: flex;
        justify-content: space-between;
        gap: 20px;
        cursor: pointer;
        text-transform: capitalize;
        font-size: 0.9rem;
        font-weight: 500;

        :hover {
          color: rgb(${({ theme }) => theme.primary_shade});
        }

        input[type='checkbox'] {
          position: relative;
          width: 40px;
          height: 22px;
          appearance: none;
          left: 0px;
          -moz-appearance: none;

          outline: none;
          border-radius: 15px;
          border: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
          transition: 0.5s ease;
          margin-top: 0.4em;
          margin-right: 0.2em;

          :checked {
            background: rgba(${({ theme }) => theme.primary_shade});
          }

          ::after {
            content: '';
            position: absolute;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            top: calc(50% - 9px);
            left: 2px;
            background: rgba(${({ theme }) => theme.primary});
            transition: all 0.2s ease;
          }

          :checked::after {
            transform: translateX(17px);
            background: rgba(${({ theme }) => theme.white});
          }
        }
      }
    }
  }
`;
