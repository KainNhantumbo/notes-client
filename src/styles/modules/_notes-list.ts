import {
  BaseButton,
  BaseButtonOutline,
  StyledCornerButton,
  styledEndMark,
} from '../defaults';
import styled from 'styled-components';

export const _notesList = styled.section`
  width: 100%;
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
    padding-bottom: 12px;
    gap: 12px;
    background: rgb(${({ theme }) => theme.foreground});
    z-index: 2000;

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
    right: 0;
    width: 32px;
    height: 32px;
    margin-top: 8px;

    border-radius: 10px;
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
  
  .compose-button {
    z-index: 3000;
    position: absolute;
    right: 20px;
    bottom: 20px;
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

  .container-items__end-mark {
    ${styledEndMark}
  }
`;
