import styled from 'styled-components';
import { StyledCornerButton } from '../defaults';

export const _about = styled.section`
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

  .dialog-box {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;
    padding: 12px;
    min-width: 200px;
    max-width: 500px;
    margin: 25px;
    position: relative;
    line-height: 1.4rem;
    font-size: 0.9rem;
    backdrop-filter: blur(10px);
    background: rgba(${({ theme }) => theme.foreground}, 0.8);
    box-shadow: 0 0 25px rgba(${({ theme }) => theme.black}, 0.1);
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
    border-radius: 12px;

    button {
      ${StyledCornerButton}
      position: absolute;
      top: 15px;
      right: 15px;
      border-radius: 10px;
      border: none;

      :hover {
        color: rgb(${({ theme }) => theme.error});
        background: rgb(${({ theme }) => theme.primary}, 0.2);
      }
    }

    .box-info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 20px;

      h2 {
        margin: 0 auto;
        margin-top: 20px;
        font-size: 1.2rem;
        font-weight: 600;
        line-height: 1.6rem;
        span {
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      h3 {
        margin: 0 auto;
        margin-top: 12px;
        font-size: 0.92rem;
        font-weight: 500;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 5px;

        span {
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        i {
          color: rgb(${({ theme }) => theme.primary_shade});
        }

        svg {
          width: 18px;
          height: 18px;
          color: rgb(${({ theme }) => theme.primary_shade});
        }
      }
    }

    .contacts {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .contact {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 8px;

        a {
          color: #0091ff;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        span {
          white-space: nowrap;
          text-overflow: ellipsis;
          color: rgb(${({ theme }) => theme.font});
          font-weight: 500;
        }

        svg {
          width: 18px;
          height: 18px;
          color: rgb(${({ theme }) => theme.primary_shade});
        }
      }
    }

    .legal {
      margin: 0 auto;
      font-size: 0.92rem;

      h3 {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        gap: 8px;

        span {
          white-space: nowrap;
          text-overflow: ellipsis;
          color: rgb(${({ theme }) => theme.font});
          font-weight: 500;
        }

        svg {
          width: 18px;
          height: 18px;
          color: rgb(${({ theme }) => theme.primary_shade});
        }
      }
    }
  }
`;
