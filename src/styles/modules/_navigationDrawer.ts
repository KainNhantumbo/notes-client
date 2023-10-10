import styled from 'styled-components';
import { StyledCornerButton } from '../defaults';

export const _navigationDrawer = styled.section`
  top: 0;
  left: 0;
  width: 100%;
  z-index: 11000;
  position: fixed;
  height: 100vh;
  user-select: none;
  max-width: 220px;

  .main-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 0 12px 12px 0;
    backdrop-filter: blur(8px);
    background: rgba(${({ theme }) => theme.foreground}, 0.8);
    border-right: 1px solid rgba(${({ theme }) => theme.font}, 0.15);
  }

  .header {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    user-select: none;
    padding: 8px 12px;
    border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.15);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 12000;
    background: rgb(${({ theme }) => theme.foreground});
    border-top-right-radius: 12px;

    h3 {
      padding-top: 2px;
      text-transform: uppercase;
      font-size: 0.92rem;
      font-weight: 600;

      i {
        color: rgb(${({ theme }) => theme.primary_shade});
      }
    }

    button {
      ${StyledCornerButton}
      width: 100%;
      max-width: 18px;
      height: 18px;
      border-radius: 10px;
      border: none;

      :hover {
        color: rgb(${({ theme }) => theme.error});
        background: rgb(${({ theme }) => theme.primary}, 0.2);
      }
    }
  }

  ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .top-navigator {
      width: 100%;
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 8px 12px;
      gap: 12px;
      padding-top: 50px;

      .navigation-item {
        width: 100%;
        position: relative;
        border-radius: 8px;
        padding: 12px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        :hover {
          background: rgba(${({ theme }) => theme.primary}, 0.5);
        }

        .navigation-item-title {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 5px;
          text-transform: capitalize;
        }

        .navigation-item-length {
          width: fit-content;
          height: fit-content;
          display: grid;
          place-content: center center;
          place-items: center center;
          font-size: 0.8rem;
          padding: 5px;
          border-radius: 4px;
          font-weight: 500;
          background: rgb(${({ theme }) => theme.foreground});
          color: rgb(${({ theme }) => theme.primary_shade});
          border: 1px solid rgba(${({ theme }) => theme.primary}, 0.3);
        }
      }

      .navigation-item-active {
        background: rgb(${({ theme }) => theme.primary}, 0.2);
        color: rgb(${({ theme }) => theme.primary_shade});

        .navigation-item-length {
          border: 1px solid transparent;
        }

        :before {
          position: absolute;
          content: '';
          width: 3.5px;
          height: 24px;
          border-radius: 5px;
          background: rgba(${({ theme }) => theme.primary_shade}, 0.8);
          top: calc(50% - 12px);
          left: -8px;
        }
      }

      /* .navigation-item-button {
        padding: 3px 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
        font-size: 0.9rem;
        line-height: 1.6rem;
        cursor: pointer;
      } */
    }

    .bottom-navigator {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding: 20px 12px;
      border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.15);
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 3000;
      background: rgb(${({ theme }) => theme.foreground});
      border-bottom-right-radius: 12px;

      button {
        all: unset;
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        border-radius: 5px;
        padding: 10px 8px;
        font-weight: 500;

        :hover {
          background: rgb(${({ theme }) => theme.primary}, 0.2);
          color: rgb(${({ theme }) => theme.primary_shade});

          :before {
            position: absolute;
            content: '';
            width: 3.5px;
            height: 24px;
            border-radius: 5px;
            background: rgba(${({ theme }) => theme.primary_shade}, 0.8);
            top: calc(50% - 12px);
            left: -8px;
          }
        }
      }
    }
  }
`;
