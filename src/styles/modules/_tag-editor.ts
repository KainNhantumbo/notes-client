import styled from 'styled-components';
import {
  BaseButton,
  BaseButtonOutline,
  StyledCornerButton,
  StyledInputs
} from '../defaults';

export const _tagEditor = styled.section`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(${({ theme }) => theme.background}, 0.2);
  backdrop-filter: blur(2px);
  z-index: 11000;
  top: 0;
  left: 0;
  display: grid;
  place-content: center;
  user-select: none;
  line-height: 1.4rem;

  .data-container {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border-radius: 12px;
    background: rgb(${({ theme }) => theme.foreground});
    width: 100%;
    max-width: 500px;
    margin: 25px;
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.15);
    box-shadow: 0 0 25px rgba(${({ theme }) => theme.black}, 0.1);
    position: relative;

    h2 {
      font-weight: 500;
      line-height: 1.6rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 5px;
      color: rgb(${({ theme }) => theme.primary_shade});
    }

    .tag-form-container {
      ${StyledInputs}
      input {
        width: 100%;
      }

      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
      font-size: 0.9rem;

      .counter {
        align-self: end;
        font-size: 0.9rem;
      }
    }

    .close-button {
      ${StyledCornerButton}
      position: absolute;
      top: 16px;
      right: 12px;

      :hover {
        color: rgb(${({ theme }) => theme.error});
      }
    }

    .save-button {
      ${BaseButton}
      justify-self: center;
      align-self: center;
      text-align: center;
    }
  }
`;
