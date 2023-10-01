import styled from 'styled-components';
import { BaseButtonOutline } from '../defaults';

export const _customTools = styled.section`
  width: 100%;
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
  
  .metadata-modifiers-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    padding: 5px;
    border-radius: 12px;
    border: 2px dashed rgba(${({ theme }) => theme.font}, 0.25);
  }

  .properties-container {
    display: flex;
    flex-direction: row;
    gap: 12px;
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
`;
