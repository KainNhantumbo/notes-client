import styled from 'styled-components';
import { StyledCornerButton } from '../defaults';

export const _tools = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .form-container {
    input {
      width: 100%;
      height: fit-content;
      border: none;
      padding: 10px 0;
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

  .extra-tools-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 5px;
    border-radius: 12px;
    border: 2px dashed rgba(${({ theme }) => theme.font}, 0.25);

    .right-side-container,
    .left-side-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 12px;
    }

    .trigger-left-pannel-button {
      ${StyledCornerButton}
      border: none;
      :hover {
        color: rgb(${({ theme }) => theme.primary_shade});
        background: rgb(${({ theme }) => theme.primary}, 0.2);
      }
    }
  }

  .properties-container {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
  }
`;
